import { motion } from 'framer-motion';
import { Instagram, Twitter, MessageCircle, LinkedinIcon, Building2, MapPin, ShoppingCart, Trophy, Plus } from 'lucide-react';

const sites = [
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter', icon: Twitter },
  { name: 'TikTok', icon: MessageCircle },
  { name: 'LinkedIn', icon: LinkedinIcon },
  { name: 'Zillow', icon: Building2 },
  { name: 'Google Maps', icon: MapPin },
  { name: 'Amazon', icon: ShoppingCart },
  { name: 'Indeed', icon: Building2 },
  { name: 'ESPN', icon: Trophy },
  { name: 'And More!', icon: Plus }
];

export default function SitesList() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Sites You'll Master</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
          Learn to scrape popular platforms with our battle-tested code and techniques
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sites.map((site, index) => (
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
                  transition: { duration: 0.3, delay: index * 0.05 }
                }
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
            Plus, I'll show you how I've built a following of 25k+ on social media and how to land high-paying clients!
          </p>
        </div>
      </div>
    </section>
  );
}