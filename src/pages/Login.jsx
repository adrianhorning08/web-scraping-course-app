import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../api/stripe';
import { createUser } from '../api/user';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let userCredential;
      if (isSignUp) {
        setLoadingMessage('Creating your account...');
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        setLoadingMessage('Setting up your profile...');
        await createUser(
          userCredential.user.email,
          userCredential.user.displayName || email.split('@')[0],
          userCredential.user.uid
        );
        
        setLoadingMessage('Preparing checkout...');
        const checkoutUrl = await createCheckoutSession(
          userCredential.user.email,
          userCredential.user.uid
        );
        window.location.href = checkoutUrl;
        return;
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate('/course');
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoadingMessage('Signing in with Google...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if this is a new user
      if (result._tokenResponse?.isNewUser) {
        setLoadingMessage('Setting up your profile...');
        // Create user in database
        await createUser(
          result.user.email,
          result.user.displayName || result.user.email.split('@')[0],
          result.user.uid
        );
        setLoadingMessage('Preparing checkout...');
        const checkoutUrl = await createCheckoutSession(
          result.user.email,
          result.user.uid
        );
        window.location.href = checkoutUrl;
      } else {
        navigate('/course');
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-dark-900/80 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto" />
        <p className="text-lg font-medium text-white">{loadingMessage}</p>
        <p className="text-sm text-gray-400">Please don't close this window</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingOverlay />}
      <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-400 text-center bg-red-500/10 p-3 rounded-lg">{error}</div>
          )}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-dark-700 hover:bg-dark-600 transition-colors border border-dark-600"
            >
              <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-sm text-gray-400">
              <span className="px-2 bg-dark-800">Or continue with email</span>
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-t-lg relative block w-full px-3 py-3 bg-dark-700 border border-dark-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-b-lg relative block w-full px-3 py-3 bg-dark-700 border border-dark-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            disabled={isLoading}
            className="text-primary-400 hover:text-primary-300 transition-colors"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}