import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Plane, Car, Home, Compass, MapPin, Star, Clock, ChevronRight, Filter } from 'lucide-react';
import spitiHomestayImg from '../assets/spiti_valley_homestay.png';
import hamptaPassImg from '../assets/hampta_pass_trek.png';

const TravelBooking = () => {
  const [activeTab, setActiveTab] = useState('stays');

  const categories = [
    { id: 'stays', name: 'Homestays', icon: Home },
    { id: 'transport', name: 'Transport', icon: Car },
    { id: 'tours', name: 'Expeditions', icon: Compass },
  ];

  const bookings = {
    stays: [
      { id: 1, name: "Spiti Valley Homestay", loc: "Kaza", price: "₹1,200/night", rating: 4.9, img: spitiHomestayImg },
      { id: 2, name: "Old Manali Riverside", loc: "Manali", price: "₹2,500/night", rating: 4.8, img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400" },
    ],
    transport: [
      { id: 3, name: "Manali to Kaza 4x4", loc: "Daily Service", price: "₹3,500/seat", rating: 4.7, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400" },
      { id: 4, name: "Royal Enfield Rental", loc: "Manali/Dharamshala", price: "₹1,500/day", rating: 4.9, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400" },
    ],
    tours: [
      { id: 5, name: "Key Monastery Spiritual Tour", loc: "3 Days", price: "₹8,500", rating: 5.0, img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=400" },
      { id: 6, name: "Hampta Pass Trek", loc: "5 Days", price: "₹12,000", rating: 4.8, img: hamptaPassImg },
    ]
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-cream px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 text-maroon mb-4">
                <Plane className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] font-sans">Devbhumi Travels</span>
              </div>
              <h2 className="text-5xl font-serif text-maroon leading-tight">
                Plan Your <span className="opacity-30 italic">Journey</span>
              </h2>
            </div>
            
            <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-3xl border border-maroon/5 shadow-xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                    activeTab === cat.id 
                      ? 'bg-maroon text-white shadow-lg shadow-maroon/20' 
                      : 'text-maroon/60 hover:bg-maroon/5'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookings[activeTab].map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-maroon/5 border border-maroon/5 group hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-64">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span className="text-[10px] font-bold text-maroon">{item.rating}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif text-maroon mb-1">{item.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.loc}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-serif text-maroon">{item.price}</p>
                      <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Available Now</p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-cream border border-maroon/10 text-maroon py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] group-hover:bg-maroon group-hover:text-white transition-all flex items-center justify-center gap-2">
                    Request Booking
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special Offer / Call to Action */}
          <div className="mt-16 bg-maroon rounded-[3rem] p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10">
                <h4 className="text-2xl font-serif text-white mb-4">Custom Spiritual Retreats</h4>
                <p className="text-white/60 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Looking for a deeper experience? Our team can organize private visits to restricted monastery sections and personal audiences with senior monks.
                </p>
                <button className="bg-white text-maroon px-10 py-4 rounded-full text-xs font-bold shadow-2xl hover:scale-105 transition-transform">
                   Contact Travel Expert
                </button>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TravelBooking;
