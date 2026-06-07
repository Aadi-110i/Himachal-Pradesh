import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Headphones, Camera, Sparkles, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const PremiumUpgradeModal = ({ isOpen, onClose }) => {
  const { unlockPremium } = useGame();

  const benefits = [
    { icon: Headphones, title: "Guided Audio Tours", desc: "Expert narration for all heritage sites" },
    { icon: Camera, title: "Exclusive 360° Access", desc: "Access inner sanctums and rare locations" },
    { icon: Sparkles, title: "AR Experience", desc: "Interactive augmented reality features" },
    { icon: Star, title: "Supporter Badge", desc: "Unique profile badge and leaderboard status" }
  ];

  const handleUnlock = () => {
    unlockPremium();
    alert("Welcome to Devbhumi Premium! All features are now unlocked.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Header / Hero */}
            <div className="bg-maroon p-10 text-center relative overflow-hidden">
               {/* Abstract decorative elements */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
               
               <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40">
                  <X className="w-5 h-5" />
               </button>

               <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-6">
                  <Star className="w-8 h-8 text-orange-300 fill-orange-300" />
               </div>
               <h3 className="text-3xl font-serif text-white mb-2">Devbhumi <span className="italic opacity-50">Premium</span></h3>
               <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">Unlock the Full Experience</p>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-1 gap-6 mb-10">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif text-maroon font-bold leading-tight">{b.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                 <button 
                  onClick={handleUnlock}
                  className="w-full bg-maroon text-white py-5 rounded-full font-bold text-sm shadow-2xl shadow-maroon/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   Unlock for ₹999
                   <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                   <span className="text-orange-300 opacity-80 uppercase tracking-widest text-[9px]">Lifetime Access</span>
                 </button>
                 <button 
                  onClick={onClose}
                  className="w-full text-gray-400 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:text-maroon transition-colors"
                 >
                   Maybe Later
                 </button>
              </div>
            </div>

            <div className="bg-cream/50 p-6 flex items-center justify-center gap-6 border-t border-maroon/5">
               <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Instant Activation</span>
               </div>
               <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Physical & Digital Impact</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PremiumUpgradeModal;
