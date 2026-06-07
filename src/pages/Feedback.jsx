import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Sparkles, Send, Heart, Star, MessageSquare, Wind, Cloud, Sun } from 'lucide-react';

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px-56px)] bg-[#fdfaf6] relative overflow-hidden flex items-center justify-center p-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 text-maroon/20"
          >
            <Cloud className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 30, 0],
              opacity: [0.05, 0.15, 0.05] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 right-20 text-orange-900/10"
          >
            <Wind className="w-48 h-48" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(107,76,76,0.1)] border border-maroon/5 relative z-10 overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="h-3 bg-gradient-to-r from-blue-400 via-white to-orange-400 opacity-30" />
          
          <div className="p-10 md:p-16">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-orange-50 rounded-3xl mb-6 relative">
                 <MessageSquare className="w-8 h-8 text-orange-600" />
                 <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-maroon rounded-full border-2 border-white"
                 />
              </div>
              <h2 className="text-4xl font-serif text-maroon mb-4">Leave Your <span className="italic opacity-40">Mark</span></h2>
              <p className="text-sm text-maroon/50 leading-relaxed max-w-sm mx-auto uppercase tracking-widest font-bold">
                Help us preserve and perfect the digital sanctuary of Himachal.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-10"
                >
                  {/* Rating Section */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">Rate Your Experience</span>
                    <div className="flex justify-center gap-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <motion.button
                          key={s}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoveredStar(s)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => setRating(s)}
                          className="relative"
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors duration-300 ${
                              (hoveredStar || rating) >= s ? 'text-orange-400 fill-orange-400' : 'text-gray-100'
                            }`}
                          />
                          {rating === s && (
                            <motion.div 
                              layoutId="star-glow"
                              className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full"
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="relative">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Your Thoughts</label>
                     <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what moved you, or how we can improve..."
                      className="w-full bg-cream/50 rounded-[2rem] p-8 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none min-h-[160px] resize-none font-sans leading-relaxed"
                     />
                     <div className="absolute bottom-6 right-8 flex items-center gap-2 text-maroon/20">
                        <Sun className="w-4 h-4 animate-spin-slow" />
                     </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={!rating}
                    className={`w-full py-5 rounded-full font-bold text-sm shadow-2xl transition-all flex items-center justify-center gap-3 group overflow-hidden relative ${
                      rating 
                        ? 'bg-maroon text-white shadow-maroon/20 hover:scale-[1.02] active:scale-95' 
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Send Blessing 
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    {rating > 0 && (
                      <motion.div 
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-10"
                >
                   <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Heart className="w-10 h-10 text-green-600 fill-green-600" />
                   </div>
                   <h3 className="text-3xl font-serif text-maroon mb-4">Thank You, Guardian.</h3>
                   <p className="text-sm text-maroon/50 leading-relaxed max-w-xs mx-auto">
                      Your feedback has been cast into the digital winds. It will guide our efforts in preserving the sacred heritage of Himachal.
                   </p>
                   <button 
                    onClick={() => navigate('/')}
                    className="mt-10 text-[10px] font-bold text-maroon uppercase tracking-[0.3em] hover:opacity-60 transition-opacity underline underline-offset-8"
                   >
                     Return to Discovery
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Quote */}
          <div className="bg-cream/30 p-8 text-center border-t border-maroon/5">
             <p className="text-[9px] text-maroon/30 uppercase tracking-[0.2em] font-bold italic">
               "Truth is the same for all, though it has many names."
             </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Feedback;
