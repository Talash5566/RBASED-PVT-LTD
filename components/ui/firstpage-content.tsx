"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PremiumContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const features = [
    {
      title: "RBASED SERVICES PVT LTD",
      description: "Navigate through our intuitive interface with ease",
      image: "/map-img.jpg",
      gradient: "from-blue-500/20 to-cyan-500/30",
      borderGradient: "from-blue-400 via-cyan-400 to-teal-400",
      glow: "blue"
    },
    {
      title: "RBASED SERVICES PVT LTD",
      description: "Access professional-grade tools designed for efficiency",
      image: "/pic-rbased/capacity.jpg",
      gradient: "from-emerald-500/20 to-teal-500/30",
      borderGradient: "from-emerald-400 via-teal-400 to-green-400",
      glow: "emerald"
    },
    {
      title: "RBASED SERVICES PVT LTD",
      description: "Join thousands of satisfied users in our growing community",
      image: "/background-img.jpg",
      gradient: "from-purple-500/20 to-pink-500/30",
      borderGradient: "from-purple-400 via-pink-400 to-rose-400",
      glow: "purple"
    }
  ];

  // Fixed auto-slide functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % features.length);
    }, 4000);
  }, [features.length]);

  useEffect(() => {
    if (!isHovering) {
      startAutoPlay();
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovering, startAutoPlay]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % features.length);
    startAutoPlay();
  }, [features.length, startAutoPlay]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + features.length) % features.length);
    startAutoPlay();
  }, [features.length, startAutoPlay]);

  const navigateSlide = useCallback((index: number) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setDirection(newDirection);
    setCurrentSlide(index);
    startAutoPlay();
  }, [currentSlide, startAutoPlay]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    })
  };

  return (
    <div 
      className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-16">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl w-full">
              
              {/* Fixed Image Container - Image Now Visible */}
              <motion.div 
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Main Gradient Border Container */}
                <div className={`relative p-2 rounded-full bg-gradient-to-r ${features[currentSlide].borderGradient} shadow-2xl`}>
                  
                  {/* Outer Glow Effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${features[currentSlide].borderGradient} blur-xl opacity-50 animate-pulse`}></div>
                  
                  {/* Image Container with Proper Display */}
                  <div className="relative rounded-full overflow-hidden bg-black/50 backdrop-blur-sm">
                    <img
                      src={features[currentSlide].image}
                      alt={features[currentSlide].title}
                      className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/10"
                    />
                  </div>

                  {/* Animated Rotating Border */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${features[currentSlide].borderGradient.split(' ')[1]}, ${features[currentSlide].borderGradient.split(' ')[3]}, ${features[currentSlide].borderGradient.split(' ')[5]}, transparent)`
                    }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Floating Orb Elements */}
                  <motion.div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${features[currentSlide].borderGradient}`}
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className={`absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-r ${features[currentSlide].borderGradient}`}
                    animate={{ 
                      y: [0, 10, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>

                {/* Background Pattern Behind Image */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-sm"></div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className="text-center lg:text-left space-y-6 lg:space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Title with Gradient Text */}
                <div>
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <span className={`bg-gradient-to-r ${features[currentSlide].borderGradient} bg-clip-text text-transparent`}>
                      RBASED SERVICES
                    </span>
                    <br />
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-light">
                      PVT LTD
                    </span>
                  </motion.h1>

                  {/* Animated Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={`h-1 bg-gradient-to-r ${features[currentSlide].borderGradient} rounded-full max-w-md mx-auto lg:mx-0`}
                  />
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl"
                >
                  Research-Based Solutions to Real-Life Problems through Remote Sensing and GIS
                </motion.p>

                {/* Feature Tags */}
                <motion.div 
                  className="flex flex-wrap gap-3 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  {["Remote Sensing", "GIS Solutions", "Research Based", "Real-Life Applications"].map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button 
          onClick={prevSlide}
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-black/60 z-20 border border-white/20 shadow-2xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button 
          onClick={nextSlide}
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-black/60 z-20 border border-white/20 shadow-2xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => navigateSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              className="relative group"
            >
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? `bg-gradient-to-r ${feature.borderGradient} shadow-lg` 
                    : 'bg-white/40'
                }`}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Slide {index + 1}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Slide Counter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 right-6 bg-black/40 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20"
        >
          <span className="text-white font-mono text-sm">
            {String(currentSlide + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      {/* Auto-Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          key={currentSlide}
          className={`h-full bg-gradient-to-r ${features[currentSlide].borderGradient}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>
    </div>
  );
}