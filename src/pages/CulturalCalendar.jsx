import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight, Bell, Ticket } from 'lucide-react';

const CulturalCalendar = () => {
  const events = [
    { 
      name: "Losar Festival", 
      date: "Feb 24 - Feb 26, 2026", 
      loc: "Rumtek Monastery", 
      desc: "Tibetan New Year celebrations featuring traditional Cham dances and rituals to ward off evil spirits.",
      type: "Major Festival",
      img: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Saga Dawa", 
      date: "May 23, 2026", 
      loc: "Tsuklakhang Palace", 
      desc: "The most sacred day for Buddhists, marking the birth, enlightenment, and parinirvana of Lord Buddha.",
      type: "Religious Ritual",
      img: "https://images.unsplash.com/photo-1596495573706-2580556f8fba?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Pang Lhabsol", 
      date: "Aug 15, 2026", 
      loc: "Mt. Kanchenjunga Foothills", 
      desc: "Celebrating the guardian deity of Sikkim. A day of unity between the Lepcha and Bhutia communities.",
      type: "Cultural Heritage",
      img: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6"
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">2026 Ritual Schedule</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">Cultural <span className="text-orange-500 italic">Timeline</span></h1>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Participate in ancient traditions. Book your presence for upcoming ceremonies and witness the living heritage of the Himalayas.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
          {events.map((e, i) => (
            <motion.div 
              key={e.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-[#0a0a0b] z-10 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
              
              <div className="w-full md:w-1/2">
                <div className="bg-[#111114] border border-white/5 p-8 rounded-[2.5rem] group hover:border-orange-500/30 transition-all shadow-2xl">
                  <img src={e.img} className="w-full h-48 object-cover rounded-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700" alt={e.name} />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{e.type}</span>
                      <h3 className="text-3xl font-black mt-1">{e.name}</h3>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl">
                       <Calendar className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {e.desc}
                  </p>
                  <div className="flex items-center gap-6 mb-8 text-xs font-bold text-white/80">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /> {e.loc}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-orange-500" /> 2k+ expected</div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-grow bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <Ticket className="w-4 h-4" /> Book Participation
                    </button>
                    <button className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all">
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 text-left md:text-right hidden md:block">
                <span className="text-6xl font-black text-white/5 italic">{e.date.split(',')[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CulturalCalendar;
