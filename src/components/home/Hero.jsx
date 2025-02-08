import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const studentImages = [
  "https://pbs.twimg.com/profile_images/1588988070870786048/JzgCE23L_400x400.jpg",
  "https://pbs.twimg.com/profile_images/1431330411666411521/lwj-gNtk_400x400.jpg",
  "https://pbs.twimg.com/profile_images/1826694510664945664/NMX4wNte_400x400.jpg",
  "https://pbs.twimg.com/profile_images/1758422743433838592/bftkXOT2_400x400.jpg",
  "https://pbs.twimg.com/profile_images/1886541676849811456/p-jwX2ex_400x400.jpg",
  "https://pbs.twimg.com/profile_images/1346762992096952320/s94VP49M_400x400.jpg",
];

export default function Hero() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Social Proof */}
      <div className="flex items-center gap-1 mb-8">
        <div className="flex -space-x-2">
          {studentImages.map((image, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-dark-700 border-2 border-dark-900"
            >
              <img
                src={image}
                alt="Student"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
        </div>
        <span className="ml-2 text-gray-400">399 students learning</span>
      </div>

      {/* Two-Column Hero */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Master Web Scraping
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              {" "}
              with JavaScript
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Learn the secrets of web scraping, and how to make money with it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/course"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/course"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
            >
              View Syllabus
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Video Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="aspect-video bg-dark-800 rounded-lg overflow-hidden"
        >
          <iframe
            src="https://www.loom.com/embed/0c8b4196357b4f4488aa9f6f6434babe"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
