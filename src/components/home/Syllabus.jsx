import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    title: "1. Web Scraping Fundamentals",
    duration: "2 hours",
    topics: [
      "Understanding HTML structure",
      "Introduction to Python and BeautifulSoup",
      "Basic scraping techniques",
      "Handling different HTML elements"
    ]
  },
  {
    title: "2. Advanced Scraping Techniques",
    duration: "3 hours",
    topics: [
      "Working with JavaScript-rendered content",
      "Handling authentication and cookies",
      "Managing sessions and requests",
      "Rate limiting and proxies"
    ]
  },
  {
    title: "3. Real-World Applications",
    duration: "4 hours",
    topics: [
      "Scraping e-commerce websites",
      "Social media data extraction",
      "Real estate data scraping",
      "Job listing aggregation"
    ]
  },
  {
    title: "4. Professional Development",
    duration: "3 hours",
    topics: [
      "Finding and landing clients",
      "Project pricing strategies",
      "Building a portfolio",
      "Scaling your business"
    ]
  }
];

export default function Syllabus() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Course Syllabus</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          A comprehensive curriculum designed to take you from beginner to professional web scraper
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: index * 0.1 }
              }
            }}
            className="bg-dark-800 rounded-2xl p-8 hover:bg-dark-700 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">{module.title}</h3>
              <span className="text-primary-400 font-medium px-4 py-1 bg-primary-400/10 rounded-full">
                {module.duration}
              </span>
            </div>
            <ul className="space-y-4">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <Code className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/course"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Learning Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}