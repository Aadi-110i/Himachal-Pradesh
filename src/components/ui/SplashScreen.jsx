import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../../assets/video.mp4';
import { ChevronRight } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Increase video speed by 50%
    }
    
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scrolling when splash screen is removed
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        src={heroVideo}
        className="absolute w-[100vh] h-[100vw] min-w-[100vh] min-h-[100vw] object-cover -rotate-90 origin-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight drop-shadow-2xl mb-4">
          Himachal<span className="italic opacity-80">Treasures</span>
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
          <p className="text-white/70 text-xs uppercase tracking-[0.3em] font-bold drop-shadow-md">
            Awakening Devbhumi
          </p>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 text-white/50 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-white/5"
      >
        Skip Intro <ChevronRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export default SplashScreen;
