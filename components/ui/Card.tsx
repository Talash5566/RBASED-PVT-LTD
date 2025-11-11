"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumVideoCard({
  title,
  src,
  description,
  videoSrc
}: {
  readonly title: string,
  readonly src: string,
  readonly description: string,
  readonly videoSrc?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  // Auto-play video when component mounts and on hover
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      const playVideo = async () => {
        try {
          setIsLoading(true);
          await videoRef.current?.play();
          setIsPlaying(true);
          setIsLoading(false);
          setShowOverlay(false);
        } catch (error) {
          console.log("Autoplay failed, will play on hover");
          setIsLoading(false);
        }
      };

      playVideo();
    }
  }, [videoSrc]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoSrc && videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setShowOverlay(false);
      });
    }
  }, [videoSrc, isPlaying]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Don't pause on leave - keep playing for better UX
  }, []);

  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
        });
      }
    }
  }, [isPlaying]);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleVideoEnd = useCallback(() => {
    // Loop the video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  return (
    <motion.div
      className="cursor-pointer group relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-700 shadow-2xl hover:shadow-cyan-500/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-cyan-500 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Media Container with Premium Design */}
        <div className="relative overflow-hidden">
          {videoSrc ? (
            <div className="relative">
              {/* Video Element */}
              <motion.video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                src={videoSrc}
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
                onLoadedData={handleVideoLoad}
                onEnded={handleVideoEnd}
                onClick={handleVideoClick}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Loading Animation */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <motion.div
                          className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <motion.p
                        className="text-white font-medium text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Loading premium content...
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Overlay with Gradient */}
              <AnimatePresence>
                {showOverlay && !isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40 backdrop-blur-[1px] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleVideoClick}
                  >
                    <motion.div
                      className="text-center space-y-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Play Button with Glow */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-50 animate-pulse" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </motion.div>

                      <motion.p
                        className="text-white font-semibold text-lg bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Click to {isPlaying ? 'Pause' : 'Play'}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Control Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-amber-400'} shadow-lg`}
                      animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                    />
                    <span className="text-white font-medium text-sm">
                      {isPlaying ? "Now Playing" : "Ready to Play"}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleVideoClick}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group/btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-white group-hover/btn:text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white group-hover/btn:text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Corner Badge */}
              <div className="absolute top-4 left-4">
                <motion.div
                  className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  Video
                </motion.div>
              </div>
            </div>
          ) : (
            /* Enhanced Image Fallback */
            <motion.div
              className="relative aspect-video bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${src})` }}
            >
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Image Badge */}
              <motion.div
                className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-gray-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Image
              </motion.div>

              {/* View Indicator */}
              <motion.div
                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-2xl text-sm font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <span>View Content</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    👁️
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 p-8 space-y-6">
          {/* Title with Animated Gradient */}
          <motion.h3
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-cyan-100 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-cyan-400 transition-all duration-500">
              {title}
            </span>
          </motion.h3>

          {/* Description with Enhanced Typography */}
          <motion.p
            className="text-gray-300 text-lg leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Interactive Status Bar */}
          <motion.div
            className="flex items-center justify-between pt-4 border-t border-gray-700/50 group-hover:border-cyan-500/30 transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-400 group-hover:text-cyan-300 transition-colors duration-300">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
               
              </motion.span>
             
            </div>

            <motion.div
              className="flex items-center space-x-1 text-cyan-400 text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
              
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000 -z-10" />
    </motion.div>
  );
}