import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Success() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800 rounded-2xl p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-400 mb-8">
          Your purchase was successful. You now have full access to all course content.
        </p>

        <button
          onClick={() => navigate('/course')}
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Learning
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </motion.div>
    </div>
  );
}