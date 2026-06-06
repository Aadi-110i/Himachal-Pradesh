import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2, X, HeadphoneOff } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const AudioGuide = () => {
  const { language } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulated multi-lingual narration tracks
  const tracks = {
    English: "Narrating Rumtek Monastery History in English...",
    Hindi: "सिक्किम के रुमटेक मठ का इतिहास (हिंदी में)...",
    Tibetan: "རུམ་བཏེགས་དགོན་པའི་ལོ་རྒྱུས། (བོད་སྐད་ནང་།)..."
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-[#1a1a1c] border border-white/10 p-6 rounded-[2rem] shadow-2xl w-72 backdrop-blur-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">AI Audio Guide</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold mb-1 truncate">Heritage Walkthrough</h4>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{language} AI Voice</p>
            </div>

            <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5">
              <p className="text-[11px] text-white/60 italic leading-relaxed">
                "{tracks[language] || tracks.English}"
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button className="text-white/40 hover:text-white transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-lg"
              >
                {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
              </button>
              <button className="text-white/40 hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:bg-orange-500 hover:text-white transition-all group"
          >
            <Volume2 className="w-6 h-6 group-hover:animate-bounce" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 rounded-full border-4 border-[#0a0a0b] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioGuide;
