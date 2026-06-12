import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Trophy, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const QuizModal = ({ quiz, isOpen, onClose }) => {
  const { addPoints, awardBadge } = useGame();
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quiz) return null;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selected === quiz.correct) {
      addPoints(100);
      if (quiz.badge) awardBadge(quiz.badge);
    }
  };

  const resetAndClose = () => {
    setSelected(null);
    setIsSubmitted(false);
    onClose();
  };

  const isCorrect = selected === quiz.correct;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-maroon/20 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 overflow-hidden shadow-2xl border border-maroon/5"
          >
            {/* Ornament */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Sparkles className="w-32 h-32 text-maroon" />
            </div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-maroon/5 rounded-xl flex items-center justify-center border border-maroon/10">
                  <HelpCircle className="text-maroon w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon/40">Heritage Quiz</span>
              </div>
              <button 
                onClick={resetAndClose} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-maroon/5 text-maroon/20 hover:text-maroon transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-serif text-maroon mb-8 leading-tight">{quiz.question}</h3>

              <div className="space-y-3 mb-10">
                {quiz.options.map((opt, i) => {
                  let buttonStyle = "bg-cream border-transparent text-maroon/60 hover:bg-maroon/5";
                  
                  if (selected === i) {
                    buttonStyle = "bg-maroon border-maroon text-white shadow-lg shadow-maroon/20";
                  }

                  if (isSubmitted) {
                    if (i === quiz.correct) {
                      buttonStyle = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20";
                    } else if (selected === i && i !== quiz.correct) {
                      buttonStyle = "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20";
                    } else {
                      buttonStyle = "bg-cream border-transparent text-maroon/20 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => setSelected(i)}
                      className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group ${buttonStyle}`}
                    >
                      <span className="text-sm tracking-tight">{opt}</span>
                      {isSubmitted && i === quiz.correct && <CheckCircle2 className="w-5 h-5" />}
                      {isSubmitted && selected === i && i !== quiz.correct && <AlertCircle className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              {!isSubmitted ? (
                <button
                  disabled={selected === null}
                  onClick={handleSubmit}
                  className="w-full bg-maroon text-white py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-maroon/20 flex items-center justify-center gap-3 group"
                >
                  Confirm Answer
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className={`flex items-center gap-3 font-bold uppercase tracking-widest text-xs ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isCorrect ? (
                      <>
                        <Trophy className="w-5 h-5" />
                        <span>Sacred Knowledge Attained • +100 XP</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-5 h-5" />
                        <span>The Path to Wisdom Continues</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={resetAndClose}
                    className="w-full bg-cream text-maroon py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-maroon/5 transition-all border border-maroon/10"
                  >
                    Continue Exploration
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
