import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2, X, Activity } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const AudioGuide = () => {
  const { language } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate audio playback progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300); // ~30 seconds total for mock demo
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulated multi-lingual narration tracks
  const tracks = {
    English: "Narrating heritage site history in English...",
    Hindi: "विरासत स्थल का इतिहास (हिंदी में)...",
    Tibetan: "ལོ་རྒྱུས་བཤད་པ། (བོད་སྐད་ནང་།)..."
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white border border-maroon/5 p-6 rounded-[2rem] shadow-2xl w-72 backdrop-blur-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-maroon/30'}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-maroon/40">AI Audio Guide</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-maroon/5 text-maroon/40 hover:text-maroon transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-serif text-maroon mb-1 truncate">Heritage Walkthrough</h4>
              <p className="text-[10px] text-maroon/60 font-bold uppercase tracking-widest">{language} AI Voice</p>
            </div>

            <div className="bg-cream rounded-2xl p-4 mb-6 border border-maroon/5">
              <p className="text-xs text-maroon/80 font-medium italic leading-relaxed">
                "{tracks[language] || tracks.English}"
              </p>
            </div>

            {/* Mock Progress Bar */}
            <div className="w-full h-1 bg-maroon/10 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-maroon transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-2">
              <button className="text-maroon/40 hover:text-maroon transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 bg-maroon text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-maroon/20"
              >
                {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current ml-1 w-5 h-5" />}
              </button>
              <button className="text-maroon/40 hover:text-maroon transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-maroon text-white rounded-full flex items-center justify-center shadow-xl shadow-maroon/20 hover:bg-maroon-dark transition-all group"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioGuide;
