import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CreditCard, Mail, Phone, ArrowRight, CheckCircle2, Building, Send } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const BookingRequestModal = ({ isOpen, onClose, item }) => {
  const { user } = useGame();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    paymentMethod: 'pay_at_property',
    phone: '',
    specialRequests: ''
  });

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 800);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-maroon/20 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar border border-maroon/5 flex flex-col md:flex-row"
          >
            {/* Left/Top Side: Item Summary */}
            <div className="w-full md:w-2/5 bg-cream relative overflow-hidden">
               <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" />
               <div className="absolute inset-0 bg-gradient-to-b from-maroon/90 to-maroon/60" />
               
               <div className="relative z-10 p-8 h-full flex flex-col">
                  <button 
                    onClick={handleClose}
                    className="md:hidden self-end w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white mb-4"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mt-auto md:mt-0 mb-auto">
                     <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{item.loc}</span>
                     <h3 className="text-2xl font-serif text-white mt-1 mb-6 leading-tight">{item.name}</h3>
                     
                     <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                           <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Rate</p>
                           <p className="text-lg font-serif text-white">{item.price}</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 text-white/60 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                     <p className="flex items-center gap-2 mb-2"><Phone className="w-3 h-3" /> +91 98765 43210</p>
                     <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> stays@himachaltreasures.in</p>
                  </div>
               </div>
            </div>

            {/* Right/Bottom Side: Form */}
            <div className="w-full md:w-3/5 p-8 md:p-10 relative">
              <button 
                onClick={handleClose}
                className="hidden md:flex absolute top-6 right-6 w-10 h-10 rounded-full items-center justify-center hover:bg-maroon/5 text-maroon/40 hover:text-maroon transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {step === 'form' ? (
                <>
                  <div className="mb-8">
                     <h2 className="text-2xl font-serif text-maroon mb-2">Request Booking</h2>
                     <p className="text-xs text-maroon/60 font-medium">We'll connect you directly with the property host to confirm availability.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* User Info (Pre-filled) */}
                    <div className="bg-cream p-4 rounded-2xl border border-maroon/5 mb-6">
                       <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-1">Booking As</p>
                       <p className="text-sm font-bold text-maroon flex items-center gap-2">
                          {user?.name} <span className="font-normal text-maroon/60">({user?.email})</span>
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-maroon/60 uppercase tracking-widest ml-1">Check-in</label>
                        <div className="relative group">
                          <input 
                            type="date" 
                            required
                            value={formData.checkIn}
                            onChange={(e) => setFormData(p => ({...p, checkIn: e.target.value}))}
                            className="w-full bg-cream rounded-2xl py-3 px-4 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none text-maroon cursor-pointer font-sans"
                            style={{ minHeight: '48px' }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-maroon/60 uppercase tracking-widest ml-1">Check-out</label>
                        <div className="relative group">
                          <input 
                            type="date" 
                            required
                            value={formData.checkOut}
                            onChange={(e) => setFormData(p => ({...p, checkOut: e.target.value}))}
                            className="w-full bg-cream rounded-2xl py-3 px-4 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none text-maroon cursor-pointer font-sans"
                            style={{ minHeight: '48px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-maroon/60 uppercase tracking-widest ml-1">Guests</label>
                        <div className="relative group">
                          <select 
                            value={formData.guests}
                            onChange={(e) => setFormData(p => ({...p, guests: e.target.value}))}
                            className="w-full bg-cream rounded-2xl py-3 pl-4 pr-10 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none appearance-none cursor-pointer text-maroon font-sans"
                            style={{ minHeight: '48px' }}
                          >
                            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-maroon/40 bg-cream pl-2">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-maroon/60 uppercase tracking-widest ml-1">Contact Phone</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon/30 group-focus-within:text-maroon transition-colors" />
                          <input 
                            type="tel" 
                            required
                            placeholder="+91..."
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))}
                            className="w-full bg-cream rounded-2xl py-3 pl-11 pr-4 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none text-maroon font-sans"
                            style={{ minHeight: '48px' }}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-maroon/60 uppercase tracking-widest ml-1">Payment Preference</label>
                      <div className="relative group">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon/30 group-focus-within:text-maroon transition-colors" />
                        <select 
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData(p => ({...p, paymentMethod: e.target.value}))}
                          className="w-full bg-cream rounded-2xl py-3 pl-11 pr-4 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                        >
                          <option value="pay_at_property">Pay at Property</option>
                          <option value="upi">UPI / Online Transfer</option>
                          <option value="card">Credit/Debit Card</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-4 bg-maroon text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-maroon/20 flex items-center justify-center gap-3 group"
                    >
                      Send Request
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 h-full flex flex-col justify-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-maroon mb-4 leading-tight">Request Sent Successfully</h3>
                  <p className="text-sm text-maroon/60 mb-8 leading-relaxed">
                    The host for <strong>{item.name}</strong> has received your request. They will contact you shortly at <strong>{formData.phone}</strong> to confirm the booking details.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="w-full bg-cream text-maroon py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-maroon/5 transition-all border border-maroon/10"
                  >
                    Close
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

export default BookingRequestModal;
