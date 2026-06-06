import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Radio, X, Maximize2, Info, Mountain, Tent, Landmark, Camera, Compass } from 'lucide-react';
import PanoramaViewer from '../components/3d/PanoramaViewer';

// Assets
import mapImage from '../../assets/map.png';
import rumtekImg from '../../assets/1.jpeg';
import thumb1 from '../../assets/2.jpeg';
import thumb2 from '../../assets/3.jpeg';

const MapNavigation = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMaximized, setIsMaximized] = useState(false);
  
  const locations = [
    { 
      id: "rumtek",
      name: "Rumtek Monastery", 
      x: 62, // Percentage from left
      y: 45, // Percentage from top
      loc: "Sikkim", 
      category: "Monastery", 
      img: rumtekImg,
      panorama: rumtekImg,
      description: "One of the most significant and largest monasteries in Sikkim, belonging to the Kagyu sect of Buddhism."
    },
    { 
      id: "key",
      name: "Key Monastery", 
      x: 35,
      y: 30,
      loc: "Spiti Valley", 
      category: "Monastery", 
      img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=400",
      panorama: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000" 
    },
    { 
      id: "hadimba",
      name: "Hadimba Devi Temple", 
      x: 42,
      y: 55,
      loc: "Manali", 
      category: "Temple", 
      img: thumb1,
      panorama: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=2000"
    },
    { 
      id: "rohtang",
      name: "Rohtang Pass", 
      x: 48,
      y: 42,
      loc: "Manali", 
      category: "Nature", 
      img: thumb2,
      panorama: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=2000"
    }
  ];

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

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px-56px)] flex bg-[#fdfaf6] overflow-hidden relative">
        {/* Left Sidebar / List */}
        <motion.div 
          animate={{ width: selectedMonastery ? '320px' : '400px' }}
          className="hidden md:flex flex-col border-r border-orange-900/5 bg-white z-10 shadow-xl overflow-y-auto custom-scrollbar"
        >
          <div className="p-8">
            <div className="flex items-center gap-3 text-orange-900 mb-4">
               <Compass className="w-5 h-5" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-sans">Monastery Explorer</span>
            </div>
            <h2 className="text-4xl font-serif text-orange-900 mb-6 leading-none">Heritage <span className="opacity-30 italic">Map</span></h2>
            
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 -mx-2 px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-orange-900 text-white' : 'bg-orange-50 text-orange-900/60'
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
                    onClick={() => setSelectedMonastery(m)}
                    className={`group p-4 rounded-3xl cursor-pointer transition-all border ${
                      selectedMonastery?.id === m.id 
                        ? 'bg-orange-900 text-white border-orange-900' 
                        : 'bg-orange-50/50 border-transparent hover:bg-white hover:border-orange-900/10'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img src={m.img} className="w-16 h-16 rounded-2xl object-cover" alt={m.name} />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${selectedMonastery?.id === m.id ? 'bg-white text-orange-900' : 'bg-orange-900 text-white'}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className={`font-serif text-sm leading-tight ${selectedMonastery?.id === m.id ? 'text-white' : 'text-orange-900'}`}>{m.name}</h4>
                        <span className={`text-[10px] flex items-center gap-1 mt-1 font-bold uppercase tracking-tighter ${selectedMonastery?.id === m.id ? 'text-white/60' : 'text-orange-900/40'}`}>
                          <MapPin className="w-3 h-3" /> {m.loc}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Custom Image Map Container */}
        <div className="flex-grow relative bg-[#fdfaf6] overflow-hidden p-4">
          <div className="w-full h-full relative rounded-4xl overflow-hidden shadow-inner bg-orange-50/30 border border-orange-900/5">
            {/* The Map Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={mapImage} 
                className="w-full h-full object-contain opacity-80" 
                alt="Heritage Map" 
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
                  onClick={() => setSelectedMonastery(m)}
                >
                  <div className={`relative group`}>
                    <div className={`p-2 rounded-full shadow-lg transition-colors ${
                      selectedMonastery?.id === m.id ? 'bg-orange-900 text-white' : 'bg-white text-orange-900'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Pulsing effect for selected */}
                    {selectedMonastery?.id === m.id && (
                      <div className="absolute inset-0 rounded-full bg-orange-900 animate-ping opacity-20" />
                    )}

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
                    <span className="text-[10px] font-bold text-orange-900 uppercase tracking-widest">Interactive Territory</span>
                  </div>
                  <p className="text-[9px] text-orange-900/60 uppercase tracking-tighter">Explore the sacred geography</p>
               </div>
            </div>
          </div>

          {/* Proximity Alert */}
          {!selectedMonastery && (
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
                    <h4 className="text-sm font-serif text-orange-900 leading-tight">Interactive Map Active</h4>
                 </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Split Screen 360 Viewer */}
        <AnimatePresence>
          {selectedMonastery && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute inset-y-0 right-0 z-30 bg-white shadow-2xl border-l border-orange-900/5 flex flex-col transition-all duration-500 ${
                isMaximized ? 'w-full' : 'w-full md:w-3/5 lg:w-1/2'
              }`}
            >
              <div className="p-6 border-b border-orange-900/5 flex items-center justify-between bg-orange-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-900/10">
                    <img src={selectedMonastery.img} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-serif text-orange-900 text-lg leading-none">{selectedMonastery.name}</h3>
                    <p className="text-[10px] font-bold text-orange-900/40 uppercase tracking-widest mt-1">360° Virtual Experience</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-2 hover:bg-orange-900/5 rounded-full text-orange-900/60 transition-colors"
                   >
                      <Maximize2 className={`w-5 h-5 ${isMaximized ? 'rotate-180' : ''}`} />
                   </button>
                   <button 
                    onClick={() => {
                      setSelectedMonastery(null);
                      setIsMaximized(false);
                    }}
                    className="p-2 bg-orange-900/5 hover:bg-orange-900/10 rounded-full text-orange-900 transition-colors"
                   >
                      <X className="w-5 h-5" />
                   </button>
                </div>
              </div>

              <div className="flex-grow relative bg-gray-100">
                <PanoramaViewer imageUrl={selectedMonastery.panorama} />
                
                {/* Overlay Controls */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                   <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-orange-900/5 max-w-[240px] pointer-events-auto">
                      <div className="flex items-center gap-2 mb-2 text-orange-900">
                        <Info className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{selectedMonastery.category} Details</span>
                      </div>
                      <p className="text-[10px] text-orange-900/70 leading-relaxed italic">
                        {selectedMonastery.description || "Experience the breathtaking geography and spiritual essence of this sacred site."}
                      </p>
                   </div>
                   <button className="bg-orange-900 text-white px-6 py-3 rounded-full text-xs font-bold shadow-xl shadow-orange-900/20 pointer-events-auto hover:scale-105 transition-transform flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Capture Moment
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default MapNavigation;

