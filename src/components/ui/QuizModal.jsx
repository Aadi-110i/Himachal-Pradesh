import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Trophy, HelpCircle } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#1a1a1c] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <HelpCircle className="text-orange-500 w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Heritage Quiz</span>
              </div>
              <button onClick={resetAndClose} className="text-white/20 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <h3 className="text-2xl font-bold mb-8 leading-tight">{quiz.question}</h3>

            <div className="space-y-3 mb-10">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isSubmitted}
                  onClick={() => setSelected(i)}
                  className={`w-full p-5 rounded-2xl border text-left font-bold transition-all flex items-center justify-between group ${
                    selected === i 
                      ? 'bg-orange-500 border-orange-500 text-white' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10'
                  } ${isSubmitted && i === quiz.correct && 'bg-emerald-500 border-emerald-500 text-white'} ${
                    isSubmitted && selected === i && i !== quiz.correct && 'bg-red-500 border-red-500 text-white'
                  }`}
                >
                  {opt}
                  {isSubmitted && i === quiz.correct && <CheckCircle2 className="w-5 h-5" />}
                  {isSubmitted && selected === i && i !== quiz.correct && <AlertCircle className="w-5 h-5" />}
                </button>
              ))}
            </div>

            {!isSubmitted ? (
              <button
                disabled={selected === null}
                onClick={handleSubmit}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirm Answer
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-widest text-sm">
                  <Trophy className="w-5 h-5" /> {selected === quiz.correct ? '+100 XP' : 'Keep Learning'}
                </div>
                <button
                  onClick={resetAndClose}
                  className="w-full bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
                >
                  Continue Exploration
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
