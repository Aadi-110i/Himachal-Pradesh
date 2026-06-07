import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, Database, CheckCircle2 } from 'lucide-react';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General', rating: 5, message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load from local storage (mock database) on mount
  useEffect(() => {
    const stored = localStorage.getItem('himachal_heritage_feedback');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newFeedback = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      status: 'Received'
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    
    // Save to mock database
    localStorage.setItem('himachal_heritage_feedback', JSON.stringify(updatedFeedbacks));
    setFeedbacks(updatedFeedbacks);
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', category: 'General', rating: 5, message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const categories = ['General', 'Bug Report', 'Content Suggestion', 'Virtual Tour Issue', 'UI/UX Feedback'];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-maroon/5 border border-maroon/10 px-4 py-2 rounded-full mb-6"
          >
            <MessageSquare className="w-4 h-4 text-maroon" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">Community Voice</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif text-maroon mb-6">Share Your <span className="text-maroon/30 italic">Thoughts</span></h1>
          <p className="text-maroon/50 max-w-xl mx-auto text-sm leading-relaxed">
            Your feedback helps us preserve and present the heritage of Himachal Pradesh. Let us know how we can improve your digital journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-maroon/5 relative overflow-hidden"
          >
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-maroon mb-3">Feedback Saved!</h3>
                  <p className="text-sm text-maroon/60">
                    Thank you. Your thoughts have been securely stored in our database.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-2 block">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                    className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-3.5 px-4 text-sm text-maroon focus:outline-none focus:border-maroon/20"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-2 block">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                    className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-3.5 px-4 text-sm text-maroon focus:outline-none focus:border-maroon/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-2 block">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(p => ({...p, category: e.target.value}))}
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-3.5 px-4 text-sm text-maroon focus:outline-none focus:border-maroon/20 appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-2 block flex justify-between">
                  <span>Experience Rating</span>
                  <span className="text-maroon">{formData.rating} / 5</span>
                </label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(p => ({...p, rating: star}))}
                      className="transition-transform hover:scale-110 p-1"
                    >
                      <Star className={`w-8 h-8 ${formData.rating >= star ? 'text-orange-400 fill-orange-400' : 'text-maroon/10'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-2 block">Your Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(p => ({...p, message: e.target.value}))}
                  rows="4"
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-3.5 px-4 text-sm text-maroon focus:outline-none focus:border-maroon/20 resize-none"
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-maroon text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20 flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" /> Submit to Database
              </button>
            </form>
          </motion.div>

          {/* Database Viewer Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6 bg-white/50 p-4 rounded-2xl border border-maroon/5">
              <div className="w-10 h-10 bg-maroon/5 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-maroon" />
              </div>
              <div>
                <h3 className="font-serif text-maroon">Live Database Feed</h3>
                <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">{feedbacks.length} Entries Stored</p>
              </div>
            </div>

            <div className="flex-grow bg-cream-dark rounded-[2.5rem] border border-maroon/5 p-6 overflow-y-auto max-h-[600px] space-y-4 custom-scrollbar">
              {feedbacks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-maroon/30 text-center">
                  <Database className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-sm font-medium">Database is empty.</p>
                  <p className="text-xs">Be the first to leave feedback!</p>
                </div>
              ) : (
                feedbacks.map((fb, idx) => (
                  <motion.div 
                    key={fb.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-maroon/5 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-maroon">{fb.name}</h4>
                        <p className="text-[10px] text-maroon/40 font-bold uppercase">{fb.category}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < fb.rating ? 'text-orange-400 fill-orange-400' : 'text-maroon/10'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-maroon/70 leading-relaxed mb-3">"{fb.message}"</p>
                    <div className="flex justify-between items-center text-[9px] text-maroon/40 font-bold uppercase tracking-widest border-t border-maroon/5 pt-3">
                      <span>{fb.date}</span>
                      <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Stored</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;
