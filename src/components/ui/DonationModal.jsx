import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShieldCheck, Landmark } from 'lucide-react';

const DonationModal = ({ isOpen, onClose, locationName }) => {
  const [amount, setAmount] = useState(500);
  const presets = [500, 1000, 2000, 5000];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon">
                  <Heart className="w-6 h-6 fill-maroon" />
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <h3 className="text-2xl font-serif text-maroon mb-2">Support {locationName}</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Your contribution goes directly towards the physical preservation and digital documentation of this sacred heritage site.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Select Amount (INR)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => setAmount(p)}
                        className={`py-3 rounded-2xl font-serif text-lg transition-all border ${
                          amount === p 
                            ? 'bg-maroon text-white border-maroon shadow-lg shadow-maroon/20' 
                            : 'bg-cream border-transparent text-maroon hover:bg-maroon/5'
                        }`}
                      >
                        ₹{p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <p className="text-[10px] text-orange-900/70 leading-relaxed font-bold uppercase tracking-tight">
                    Secure transaction. 100% of the funds are utilized for heritage maintenance and cultural preservation.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    alert(`Redirecting to secure payment for ₹${amount}...`);
                    onClose();
                  }}
                  className="w-full bg-maroon text-white py-4 rounded-full font-bold text-sm shadow-xl shadow-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Confirm Contribution
                </button>
              </div>
            </div>
            
            <div className="bg-cream/50 p-6 text-center border-t border-maroon/5">
               <div className="flex items-center justify-center gap-2 text-maroon/40 mb-1">
                  <Landmark className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Devbhumi Heritage Foundation</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
