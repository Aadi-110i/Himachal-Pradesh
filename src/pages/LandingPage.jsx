import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Map as MapIcon, Box, Search, Heart, Globe, Sparkles, Home, Users, MoreHorizontal } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

// Assets
import monasteryExteriorImg from '../assets/monastery_exterior.png';
import templeInteriorImg from '../assets/temple_interior.png';
import buddhistTextsImg from '../assets/buddhist_texts.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredDestinations = [
    { title: "Key Monastery", loc: "Spiti Valley", img: monasteryExteriorImg },
    { title: "Sacred Manuscripts", loc: "Rumtek Archives", img: buddhistTextsImg },
    { title: "Cham Dance Masks", loc: "Ritual Arts", img: ceremonialMaskImg },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans text-gray-900 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-maroon tracking-tight">Himachal<span className="italic opacity-60">Heritage</span></h1>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-maroon/60">
          <button onClick={() => navigate('/map')} className="hover:text-maroon transition-colors">Explorer</button>
          <button onClick={() => navigate('/archives')} className="hover:text-maroon transition-colors">Archives</button>
          <button onClick={() => navigate('/dashboard')} className="hover:text-maroon transition-colors">Discover</button>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-maroon text-white px-8 py-3 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-maroon/20"
        >
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-maroon/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-maroon/40">The Land of Gods</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-maroon leading-[1.1] mb-8">
              Sacred Spaces <br />
              <span className="italic opacity-40 font-normal">in the Clouds.</span>
            </h1>
            <p className="text-lg text-maroon/60 leading-relaxed mb-10 max-w-lg">
              Explore the timeless spiritual architecture of Himachal Pradesh. From the heights of Spiti to the valleys of Kangra, witness heritage preserved through centuries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/map')}
                className="bg-maroon text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-maroon-dark transition-all shadow-xl shadow-maroon/20"
              >
                Explore the Map <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/ar')}
                className="bg-white text-maroon border border-maroon/10 px-10 py-5 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-cream-dark transition-all"
              >
                360° View <Box className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src={monasteryExteriorImg} 
                alt="Himachal Heritage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block">Featured Sanctuary</span>
                <h3 className="text-4xl font-serif mb-2">Key Monastery</h3>
                <p className="text-sm opacity-80 italic">The thousand-year-old fortress of faith.</p>
              </div>
            </div>
            
            {/* Float Badge */}
            <div className="absolute -top-8 -right-8 bg-white p-8 rounded-[3rem] shadow-2xl border border-maroon/5 flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-maroon animate-pulse" />
              <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Live Tours</span>
              <span className="text-2xl font-serif text-maroon">Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif text-maroon mb-6">The Journey Awaits</h2>
            <p className="text-maroon/40 max-w-xl mx-auto text-sm leading-relaxed">
              We've digitized thousands of manuscripts, artifacts, and spaces to bring the Devbhumi experience to your screen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredDestinations.map((dest, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-6 shadow-lg">
                  <img src={dest.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.title} />
                  <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-2xl font-serif text-maroon mb-1">{dest.title}</h4>
                <p className="text-xs font-bold text-maroon/40 uppercase tracking-widest">{dest.loc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Overlay Style */}
      <section className="bg-cream py-32 px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-5xl p-16 shadow-2xl border border-maroon/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Compass className="w-64 h-64 text-maroon" />
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-serif text-maroon mb-8">Ready to explore?</h3>
            <div className="relative max-w-xl mx-auto mb-12">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/30" />
              <input 
                type="text" 
                placeholder="Search for temples, deities, or history..."
                className="w-full bg-cream rounded-full py-5 pl-14 pr-6 text-sm border-none focus:ring-2 focus:ring-maroon/10 placeholder:text-maroon/20 shadow-inner"
                onKeyDown={(e) => { if (e.key === 'Enter') navigate('/archives', { state: { query: e.target.value } }); }}
              />
            </div>
            <div className="flex justify-center gap-12 text-maroon/40">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-serif text-maroon">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Heritage Sites</span>
              </div>
              <div className="w-px h-12 bg-maroon/10" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-serif text-maroon">12k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Archives</span>
              </div>
              <div className="w-px h-12 bg-maroon/10" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-serif text-maroon">4k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">360° Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-white border-t border-maroon/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif text-maroon mb-2">Himachal Heritage</h2>
            <p className="text-sm text-maroon/40">Preserving the soul of Devbhumi Himachal.</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">Explore</span>
              <button onClick={() => navigate('/map')} className="text-xs text-maroon/60 hover:text-maroon text-left">Map Navigation</button>
              <button onClick={() => navigate('/ar')} className="text-xs text-maroon/60 hover:text-maroon text-left">360° Sanctum</button>
              <button onClick={() => navigate('/chanting')} className="text-xs text-maroon/60 hover:text-maroon text-left">Chanting Library</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">Connect</span>
              <button onClick={() => navigate('/calendar')} className="text-xs text-maroon/60 hover:text-maroon text-left">Community</button>
              <button onClick={() => navigate('/archives')} className="text-xs text-maroon/60 hover:text-maroon text-left">Archives</button>
              <button onClick={() => navigate('/dashboard')} className="text-xs text-maroon/60 hover:text-maroon text-left">Dashboard</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-maroon/5 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {[
            { name: 'Home', path: '/dashboard', icon: Home },
            { name: 'Map', path: '/map', icon: MapIcon },
            { name: 'Tours', path: '/ar', icon: Compass },
            { name: 'Community', path: '/calendar', icon: Users },
            { name: 'More', path: '/archives', icon: MoreHorizontal },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 p-2 transition-all duration-300 text-gray-400 hover:text-maroon"
            >
              <item.icon className="w-5 h-5 stroke-[1.5px]" />
              <span className="text-[10px] uppercase tracking-tighter">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default LandingPage;
