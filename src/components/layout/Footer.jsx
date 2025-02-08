import { Link } from 'react-router-dom';
import { Github, LinkedinIcon, Twitter, MessageCircle, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">WebScraping Pro</div>
            <p className="text-gray-400 max-w-md">
              Learn professional web scraping techniques and build a successful career in data extraction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/course" className="text-gray-400 hover:text-white transition-colors">
                  Course Content
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a href="mailto:adrian@thewebscrapingguy.com" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">My Products</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://scrapecreators.com" 
                  target="_blank" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ScrapeCreators
                </a>
              </li>
              <li>
                <a 
                  href="https://thewebscrapingguy.com" 
                  target="_blank" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Personal Website
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/thewebscrapingguy" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/thewebscrapingguy" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/webscrapingguy" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@thewebscrapingguy" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> TikTok
                </a>
              </li>
              <li>
                <a href="https://instagram.com/thewebscrapingguy" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} WebScraping Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}