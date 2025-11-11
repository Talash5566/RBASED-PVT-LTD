"use client";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Import Map with no SSR
const MapWithNoSSR = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="absolute inset-0 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mx-auto animation-delay-500"></div>
          </div>
          <p className="mt-2 text-sm text-gray-300">Loading map...</p>
        </div>
      </div>
    )
  }
);

export default function AdvancedFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800 text-white w-full py-12 lg:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="container-fluid max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Column 1: Company Information */}
          <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-sm opacity-75"></div>
                <Image 
                  src="/logo.jpg" 
                  alt="RBS Logo" 
                  width={80} 
                  height={60} 
                  className="h-12 w-auto relative rounded-xl"
                />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                RBased Services
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                B-28 A, RAJIV NAGAR, BEGUMPUR,<br />
                OPP. ROHINI SECTOR-22, DELHI-110008 
              </span>
            </p>
            <div className="space-y-3">
              {[
                "office@rbasedservices.in",
                "rbasedservices@outlook.com", 
                "rbasedservice@gmail.com"
              ].map((mail, index) => (
                <motion.a
                  key={mail}
                  href={`mailto:${mail}`}
                  className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-all duration-300 group text-sm"
                  whileHover={{ x: 5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="group-hover:underline">{mail}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Contact Us */}
          <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-4">
              <motion.p 
                className="flex items-center space-x-3 text-gray-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="font-medium">8005390053, 7017879339</span>
              </motion.p>
              <motion.p 
                className="flex items-center space-x-3 text-gray-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-50"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>office@rbasedservices.in</span>
              </motion.p>
              <motion.p 
                className="flex items-center space-x-3 text-gray-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-50"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Delhi, India</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Column 3: Map */}
          <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
              Visit Us
              <motion.span 
                className="ml-2 text-cyan-400"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ↗
              </motion.span>
            </h3>
            <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
              <MapWithNoSSR />
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Subscribe Newsletter
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Stay updated with our latest news, services and exclusive offers.
            </p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-center"
              >
                <div className="flex items-center justify-center space-x-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Thank you for subscribing!</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-sm -z-10"></div>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Subscribe Now</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <BottomGradient />
                </motion.button>
              </form>
            )}

            <div className="flex items-start space-x-3">
              <motion.input
                type="checkbox"
                id="consent"
                className="h-5 w-5 rounded border-gray-700 bg-gray-800/50 focus:ring-2 focus:ring-cyan-500 text-cyan-500 mt-0.5 hover:cursor-pointer"
                whileTap={{ scale: 0.9 }}
                required
              />
              <label htmlFor="consent" className="text-gray-300 text-sm leading-relaxed">
                Yes, I would like to receive communications by call / email about RBased services.
              </label>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer Bottom */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RBased Services. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </>
  );
};