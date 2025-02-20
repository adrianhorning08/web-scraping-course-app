import { Link } from "react-router-dom";
import {
  Code,
  Users,
  ArrowRight,
  Instagram,
  Twitter,
  MapPin,
  ShoppingCart,
  Building2,
  Trophy,
  Plus,
  MessageCircle,
  LinkedinIcon,
  ChevronDown,
  Github,
  Star,
  StarHalf,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Hero from "../components/home/Hero";
import {
  // SiYoutube,
  // SiTwitch,
  SiTiktok,
  // SiInstagram,
  // SiFacebook,
  // SiX,
  // SiReddit,
  SiKick,
  SiX,
} from "react-icons/si";

const testimonialImages = [
  "https://public-files.gumroad.com/6dj8yyrjtc9im7t3dif5pb58i9x3",
  "https://public-files.gumroad.com/z50z3y2f8qk7qci8gatbffmkxhaz",
  "https://public-files.gumroad.com/qos51tg8qkrmoctmlza4v6zrie39",
  "https://public-files.gumroad.com/hmy0vo39dstylfvez94hikhwy6bm",
  "https://public-files.gumroad.com/qgtvvckpx5tpnkot8vgpqsn59qfj",
  "https://public-files.gumroad.com/tdtbog9tk567elx4h10szhlwws4a",
  "https://public-files.gumroad.com/71qnqdy8tbiq1uktdiw89q8m6ids",
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const controls = useAnimation();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-16 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-[800px] h-[800px] gradient-blob"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] gradient-blob"
      />

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
          <Link
            to="/course"
            className="px-6 py-2 text-gray-400 hover:text-white font-medium transition-colors"
          >
            Course
          </Link>
        </motion.div>
      </nav>

      <main>
        <Hero />
      </main>

      {/* Syllabus Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Course Syllabus</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A comprehensive curriculum designed to take you from beginner to
            professional web scraper
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              title: "1. Getting Started",
              duration: "2 hours",
              topics: [
                "Where the data is coming from",
                "Go to packages, proxies, etc",
                "My process for scraping any site",
                "Setting up proxies",
              ],
            },
            {
              title: "2. Scraping Techniques",
              duration: "3 hours",
              topics: [
                "Scraping by Framework",
                "Scraping by API",
                "Scraping by Mobile App",
                "Scraping by Headless Browser",
              ],
            },
            {
              title: "3. Real-World Applications",
              duration: "4 hours",
              topics: [
                "Scraping social media",
                "Scraping e-commerce",
                "Scraping job sites",
                "Scraping real estate",
              ],
            },
            {
              title: "4. Professional Development",
              duration: "3 hours",
              topics: [
                "How to get clients",
                "How to grow on social media",
                "Real estate data scraping",
              ],
            },
          ].map((module, index) => (
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
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
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

        {/* Call to Action */}
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

      {/* Sites You'll Master Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Sites You'll Master</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Learn to scrape popular platforms with our battle-tested code and
            techniques
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Instagram", icon: Instagram },
              { name: "Twitter", icon: Twitter },
              { name: "TikTok", icon: SiTiktok },
              { name: "LinkedIn", icon: LinkedinIcon },
              { name: "Zillow", icon: Building2 },
              { name: "Google Maps", icon: MapPin },
              { name: "Amazon", icon: ShoppingCart },
              { name: "Google", icon: Google },
              { name: "ESPN", icon: Trophy },
              { name: "And More!", icon: Plus },
            ].map((site, index) => (
              <motion.div
                key={site.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, delay: index * 0.05 },
                  },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-dark-800 rounded-xl p-6 hover:bg-dark-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
              >
                <site.icon className="w-8 h-8 text-primary-400" />
                <span className="text-lg font-medium">{site.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-dark-800 rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-xl text-primary-400">
              Plus, I'll show you how I've built a following of 25k+ on social
              media and how to land high-paying clients!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Join hundreds of successful developers who have mastered web
            scraping with our course
          </p>
        </div>

        {/* Featured Video Testimonial */}
        <div className="mb-16">
          <div className="aspect-video w-full max-w-4xl mx-auto bg-dark-800 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.loom.com/embed/9c2abcb376db45928d9ba80ddd636a49"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Screenshot Testimonials */}
        <div className="space-y-8">
          {testimonialImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <img
                src={image}
                alt={`Student Testimonial ${i + 1}`}
                className="w-full rounded-2xl shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Reviews Section */}
      {/* <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Student Reviews</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.9</span>
            <span className="text-gray-400">(127 reviews)</span>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              name: "Sarah Johnson",
              role: "Data Analyst",
              rating: 5,
              date: "2 weeks ago",
              review:
                "This course completely transformed how I approach data collection. The techniques taught are practical and immediately applicable. I've already automated several tasks at work!",
              avatar: "SJ",
            },
            {
              name: "Michael Chen",
              role: "Software Developer",
              rating: 5,
              date: "1 month ago",
              review:
                "Incredibly comprehensive. The section on handling JavaScript-rendered content was particularly valuable. Worth every penny for the advanced techniques alone.",
              avatar: "MC",
            },
            {
              name: "Emily Rodriguez",
              role: "Marketing Specialist",
              rating: 4.5,
              date: "3 weeks ago",
              review:
                "As someone with minimal coding experience, this course made web scraping accessible. Now I can gather competitor data efficiently. Great investment!",
              avatar: "ER",
            },
            {
              name: "David Kim",
              role: "Freelance Developer",
              rating: 5,
              date: "2 months ago",
              review:
                "The section on landing clients and pricing strategies helped me start my own web scraping consultancy. Already landed three clients!",
              avatar: "DK",
            },
            {
              name: "Lisa Thompson",
              role: "Business Analyst",
              rating: 5,
              date: "1 week ago",
              review:
                "Clear explanations and real-world examples make this course stand out. The instructor's expertise in both technical and business aspects is evident.",
              avatar: "LT",
            },
            {
              name: "James Wilson",
              role: "E-commerce Manager",
              rating: 4.5,
              date: "5 days ago",
              review:
                "Finally found a course that covers both basic and advanced techniques. The e-commerce scraping examples were exactly what I needed.",
              avatar: "JW",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-dark-800 rounded-xl p-6 hover:bg-dark-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-gray-400 text-sm">{review.role}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                {review.rating % 1 !== 0 && (
                  <StarHalf className="w-5 h-5 text-yellow-400 fill-current" />
                )}
              </div>
              <p className="text-gray-300">{review.review}</p>
            </motion.div>
          ))}
        </motion.div>
      </section> */}

      {/* FAQ Section */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              question: "What are the prerequisites for this course?",
              answer:
                "You should have a good understanding of JavaScript, or some programming language, to get the most out of this course. If you don't know how to code at all, this course isn't suitable for you as I don't teach the basics of coding or JavaScript.",
            },
            {
              question: "What's included in the course?",
              answer:
                "The course includes JavaScript code for scraping public data (no login required), using a Mac with VS Code editor. While Puppeteer is covered briefly, we focus on more effective scraping methods.",
            },
            {
              question: "Is web scraping legal?",
              answer:
                "Web scraping is legal for publicly available data. Check out the BrightData vs Meta crunchbase article for more info.",
            },
            {
              question: "What if I'm not satisfied?",
              answer:
                "If you're dissatisfied with the content, I offer a 100% refund. Simply contact me at adrian@thewebscrapingguy.com.",
            },
            {
              question: "Can I scrape any website?",
              answer:
                "Almost. I wouldn't say *any* website. And I just show how to scrape publicly available data.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-400 transition-transform ${
                    openFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 pb-4 transition-all duration-200 ${
                  openFaq === index ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-800 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Master Web Scraping?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students who have transformed their
            careers with professional web scraping skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/course"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
            >
              View Course Details
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                The Ultimate Web Scraping Course
              </div>
              <p className="text-gray-400 max-w-md">
                Learn professional web scraping techniques and build a
                successful career in data extraction.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                My Products
              </h3>
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/adrianhorning08"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/adrianhorning"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/adrian_horning_"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@thewebscrapingguy"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <SiTiktok className="w-4 h-4" /> TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/adrianhorning"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-dark-700 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} The Web Scraping Guy. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
