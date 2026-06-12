import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Radio, Compass, Mountain, Tent, Landmark } from 'lucide-react';
import { locations } from '../data/locations';

// Assets
import mapImageHimachal from '../assets/map2.png'; 

const MapNavigation = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Temple", "Monastery", "Nature"];

  const filteredLocations = activeCategory === "All" 
    ? locations 
    : locations.filter(l => l.category === activeCategory);

  const getIcon = (cat) => {
    switch(cat) {
      case 'Temple': return Landmark;
      case 'Monastery': return Tent;
      case 'Nature': return Mountain;
      default: return MapPin;
    }
  };

  const handleLocationClick = (id) => {
    navigate(`/panorama/${id}`);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px-56px)] flex bg-[#fdfaf6] overflow-hidden relative">
        {/* Left Sidebar / List */}
        <div className="hidden md:flex flex-col w-[350px] border-r border-orange-900/5 bg-white z-10 shadow-xl overflow-y-auto no-scrollbar">
          <div className="p-8">
            <div className="flex items-center gap-3 text-orange-900 mb-4">
               <Compass className="w-5 h-5" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-sans">Himachal Explorer</span>
            </div>

            <h2 className="text-4xl font-serif text-orange-900 mb-6 leading-none">
              Devbhumi <span className="opacity-30 italic">Map</span>
            </h2>
            
            {/* Category Pills - Hidden Scrollbar */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-orange-900 text-white shadow-lg shadow-orange-900/20' : 'bg-orange-50 text-orange-900/60 hover:bg-orange-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredLocations.map((m) => {
                const Icon = getIcon(m.category);
                return (
                  <motion.div 
                    key={m.id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleLocationClick(m.id)}
                    className="group p-4 rounded-3xl cursor-pointer transition-all border bg-orange-50/50 border-transparent hover:bg-white hover:border-orange-900/10 hover:shadow-lg hover:shadow-orange-900/5"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img src={m.img} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt={m.name} />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white bg-orange-900 text-white">
                          <Icon className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-serif text-sm leading-tight text-orange-900">{m.name}</h4>
                        <span className="text-[10px] flex items-center gap-1 mt-1 font-bold uppercase tracking-tighter text-orange-900/40">
                          <MapPin className="w-3 h-3" /> {m.loc}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Image Map Container */}
        <div className="flex-grow relative bg-[#fdfaf6] overflow-hidden p-4">
          <div className="w-full h-full relative rounded-4xl overflow-hidden shadow-inner bg-orange-50/30 border border-orange-900/5">
            {/* The Map Image */}
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <img 
                src={mapImageHimachal} 
                className="w-full h-full object-contain" 
                alt="Himachal Treasures Map" 
              />
            </div>

            {/* Interactive Markers */}
            {filteredLocations.map((m) => {
              const Icon = getIcon(m.category);
              return (
                <motion.div
                  key={m.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute z-20 cursor-pointer"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  onClick={() => handleLocationClick(m.id)}
                >
                  <div className="relative group">
                    <div className="p-2 rounded-full shadow-lg transition-colors bg-white text-orange-900 group-hover:bg-orange-900 group-hover:text-white border border-orange-900/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-orange-900 shadow-sm border border-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Map Overlay Info */}
            <div className="absolute top-6 left-6 z-10">
               <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-orange-900/5 shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-3 h-3 text-orange-900" />
                    <span className="text-[10px] font-bold text-orange-900 uppercase tracking-widest">Himachal Pradesh</span>
                  </div>
                  <p className="text-[9px] text-orange-900/60 uppercase tracking-tighter">Sacred Geography of Devbhumi</p>
               </div>
            </div>
          </div>

          {/* Proximity Alert */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm"
          >
            <div className="bg-white p-5 rounded-4xl shadow-2xl border border-orange-900/5 flex items-center gap-5">
               <div className="w-12 h-12 bg-orange-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/10">
                  <Radio className="w-5 h-5 text-white animate-pulse" />
               </div>
               <div>
                  <span className="text-[10px] font-bold text-orange-900/40 uppercase tracking-widest">Live Explorer</span>
                  <h4 className="text-sm font-serif text-orange-900 leading-tight">Himachal Map Active</h4>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapNavigation;




