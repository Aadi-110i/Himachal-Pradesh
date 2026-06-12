import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight, Bell, Ticket, X, CheckCircle2, Clock, User, Mail, Phone } from 'lucide-react';

// Assets
import templeInteriorImg from '../assets/temple_interior.png';
import monasteryExteriorImg from '../assets/monastery_exterior.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';

const CulturalCalendar = () => {
  const [bookingEvent, setBookingEvent] = useState(null);
  const [bookingStep, setBookingStep] = useState('form'); // 'form' | 'confirmed'
  const [reminders, setReminders] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', guests: '1', notes: '' });

  const events = [
    { 
      name: "Losar Festival", 
      date: "Feb 24 - Feb 26, 2026", 
      loc: "Rumtek Monastery", 
      desc: "Tibetan New Year celebrations featuring traditional Cham dances and rituals to ward off evil spirits.",
      type: "Major Festival",
      img: templeInteriorImg,
      time: "6:00 AM - 8:00 PM",
      capacity: "2,500 visitors",
      fee: "Free (Donation welcome)",
    },
    { 
      name: "Saga Dawa", 
      date: "May 23, 2026", 
      loc: "Tsuklakhang Palace", 
      desc: "The most sacred day for Buddhists, marking the birth, enlightenment, and parinirvana of Lord Buddha.",
      type: "Religious Ritual",
      img: monasteryExteriorImg,
      time: "5:00 AM - 6:00 PM",
      capacity: "1,500 visitors",
      fee: "Free",
    },
    { 
      name: "Pang Lhabsol", 
      date: "Aug 15, 2026", 
      loc: "Mt. Kanchenjunga Foothills", 
      desc: "Celebrating the guardian deity of Sikkim. A day of unity between the Lepcha and Bhutia communities.",
      type: "Cultural Heritage",
      img: ceremonialMaskImg,
      time: "7:00 AM - 5:00 PM",
      capacity: "3,000 visitors",
      fee: "₹200 (Heritage pass)",
    }
  ];

  const handleBooking = (event) => {
    setBookingEvent(event);
    setBookingStep('form');
    setFormData({ name: '', email: '', phone: '', guests: '1', notes: '' });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setBookingStep('confirmed');
  };

  const toggleReminder = (eventName) => {
    setReminders(prev => ({ ...prev, [eventName]: !prev[eventName] }));
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-maroon/5 border border-maroon/10 px-4 py-2 rounded-full mb-6"
          >
            <Calendar className="w-4 h-4 text-maroon" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">2026 Ritual Schedule</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif text-maroon mb-6">Cultural <span className="text-maroon/30 italic">Timeline</span></h1>
          <p className="text-maroon/50 max-w-xl mx-auto text-sm leading-relaxed">
            Participate in ancient traditions. Book your presence for upcoming ceremonies and witness the living heritage of the Himalayas.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-maroon/10">
          {events.map((e, i) => (
            <motion.div 
              key={e.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-maroon rounded-full border-4 border-cream z-10 shadow-lg" />
              
              <div className="w-full md:w-1/2">
                <div className="bg-white border border-maroon/5 p-8 rounded-[2.5rem] group hover:border-maroon/20 transition-all shadow-sm hover:shadow-xl">
                  <img src={e.img} className="w-full h-48 object-cover rounded-3xl mb-8 group-hover:shadow-lg transition-all duration-700" alt={e.name} />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-maroon/50 uppercase tracking-widest">{e.type}</span>
                      <h3 className="text-3xl font-serif text-maroon mt-1">{e.name}</h3>
                    </div>
                    <div className="bg-cream-dark p-3 rounded-2xl">
                       <Calendar className="w-5 h-5 text-maroon/40" />
                    </div>
                  </div>
                  <p className="text-maroon/60 text-sm leading-relaxed mb-4">
                    {e.desc}
                  </p>

                  {/* Event details */}
                  <div className="bg-cream-dark rounded-2xl p-4 mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-maroon/70">
                      <Clock className="w-3.5 h-3.5 text-maroon" /> <span className="font-bold">{e.date}</span> · {e.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-maroon/70">
                      <Users className="w-3.5 h-3.5 text-maroon" /> Capacity: {e.capacity}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-maroon/70">
                      <Ticket className="w-3.5 h-3.5 text-maroon" /> {e.fee}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-xs font-bold text-maroon/70">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-maroon" /> {e.loc}</div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleBooking(e)}
                      className="flex-grow bg-maroon text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-maroon-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-maroon/20"
                    >
                      <Ticket className="w-4 h-4" /> Book Participation
                    </button>
                    <button 
                      onClick={() => toggleReminder(e.name)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
                        reminders[e.name] 
                          ? 'bg-maroon text-white border-maroon' 
                          : 'border-maroon/10 text-maroon/40 hover:bg-cream-dark hover:text-maroon'
                      }`}
                    >
                      <Bell className={`w-4 h-4 ${reminders[e.name] ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>
                  {reminders[e.name] && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-maroon/50 mt-3 text-center font-medium"
                    >
                      ✓ Reminder set — we'll notify you before the event
                    </motion.p>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-1/2 text-left md:text-right hidden md:block">
                <span className="text-6xl font-serif text-maroon/5 italic">{e.date.split(',')[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingEvent && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingEvent(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Modal Header */}
              <div className="relative h-48 overflow-hidden">
                <img src={bookingEvent.img} className="w-full h-full object-cover" alt={bookingEvent.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/20 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-1">{bookingEvent.type}</span>
                  <h2 className="text-3xl font-serif text-white">{bookingEvent.name}</h2>
                </div>
                <button 
                  onClick={() => setBookingEvent(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all z-10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 md:p-10">
                {bookingStep === 'form' ? (
                  <>
                    {/* Event Info */}
                    <div className="bg-cream rounded-[2rem] p-6 mb-10 space-y-3 border border-maroon/5">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-maroon/60 uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-maroon" /> {bookingEvent.date}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-maroon/60 uppercase tracking-widest">
                        <MapPin className="w-4 h-4 text-maroon" /> {bookingEvent.loc}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-maroon/60 uppercase tracking-widest">
                        <Ticket className="w-4 h-4 text-maroon" /> {bookingEvent.fee}
                      </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmitBooking} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                        <div className="relative group">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                            placeholder="Tenzin Gyatso"
                            className="w-full bg-cream rounded-2xl py-4 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                        <div className="relative group">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                            placeholder="monk@devbhumi.com"
                            className="w-full bg-cream rounded-2xl py-4 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                          <div className="relative group">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                            <input 
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))}
                              placeholder="+91..."
                              className="w-full bg-cream rounded-2xl py-4 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Guests *</label>
                          <select 
                            value={formData.guests}
                            onChange={(e) => setFormData(p => ({...p, guests: e.target.value}))}
                            className="w-full bg-cream rounded-2xl py-4 px-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Special Requests</label>
                        <textarea 
                          value={formData.notes}
                          onChange={(e) => setFormData(p => ({...p, notes: e.target.value}))}
                          placeholder="Dietary requirements, accessibility needs..."
                          rows={3}
                          className="w-full bg-cream rounded-3xl py-4 px-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-maroon text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-maroon/20 flex items-center justify-center gap-3 group"
                      >
                        Confirm Booking
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </>
                ) : (
                  /* Confirmation */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-serif text-maroon mb-3">Booking Confirmed!</h3>
                    <p className="text-sm text-maroon/60 mb-2">
                      You're registered for <strong>{bookingEvent.name}</strong>
                    </p>
                    <p className="text-xs text-maroon/40 mb-8">
                      A confirmation email has been sent to <strong>{formData.email}</strong>
                    </p>

                    <div className="bg-cream-dark rounded-2xl p-5 mb-8 text-left space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-maroon/40 font-bold">Booking ID</span>
                        <span className="text-maroon font-serif">HH-{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="w-full h-px bg-maroon/5" />
                      <div className="flex justify-between text-xs">
                        <span className="text-maroon/40 font-bold">Guest</span>
                        <span className="text-maroon">{formData.name}</span>
                      </div>
                      <div className="w-full h-px bg-maroon/5" />
                      <div className="flex justify-between text-xs">
                        <span className="text-maroon/40 font-bold">Party Size</span>
                        <span className="text-maroon">{formData.guests} {parseInt(formData.guests) === 1 ? 'person' : 'people'}</span>
                      </div>
                      <div className="w-full h-px bg-maroon/5" />
                      <div className="flex justify-between text-xs">
                        <span className="text-maroon/40 font-bold">Date</span>
                        <span className="text-maroon">{bookingEvent.date}</span>
                      </div>
                      <div className="w-full h-px bg-maroon/5" />
                      <div className="flex justify-between text-xs">
                        <span className="text-maroon/40 font-bold">Location</span>
                        <span className="text-maroon">{bookingEvent.loc}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setBookingEvent(null)}
                      className="w-full bg-maroon text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-maroon-dark transition-all"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default CulturalCalendar;
