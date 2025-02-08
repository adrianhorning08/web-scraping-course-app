import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function UserAvatar({ user }) {
  if (user?.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || user.email}
        className="w-8 h-8 rounded-full"
      />
    );
  }

  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    user?.email || "default"
  }`;
  return (
    <img
      src={dicebearUrl}
      alt={user?.displayName || user?.email}
      className="w-8 h-8 rounded-full bg-dark-700"
    />
  );
}

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="text-2xl font-bold text-white">
          The Ultimate Web Scraping Course
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/course"
                className="px-6 py-2 text-gray-400 hover:text-white font-medium transition-colors"
              >
                Go to Course
              </Link>
              <UserAvatar user={user} />
            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 text-gray-400 hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
