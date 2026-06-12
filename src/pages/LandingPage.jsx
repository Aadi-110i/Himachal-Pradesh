import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Map as MapIcon, Box, Search, Heart, Globe, Sparkles, Home, Users, Plane, ShieldCheck, Quote, ShoppingBag, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useGame } from '../context/GameContext';

// Assets
import monasteryExteriorImg from '../assets/monastery_exterior.png';
import templeInteriorImg from '../assets/temple_interior.png';
import buddhistTextsImg from '../assets/buddhist_texts.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useGame();

  const featuredDestinations = [
    { title: "Key Monastery", loc: "Spiti Valley", img: monasteryExteriorImg },
    { title: "Sacred Manuscripts", loc: "Rumtek Archives", img: buddhistTextsImg },
    { title: "Cham Dance Masks", loc: "Ritual Arts", img: ceremonialMaskImg },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans text-gray-900 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-maroon tracking-tight">Himachal<span className="italic opacity-60">Treasures</span></h1>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-maroon/60">
          <button onClick={() => navigate('/map')} className="hover:text-maroon transition-colors">Explorer</button>
          <button onClick={() => navigate('/booking')} className="hover:text-maroon transition-colors">Travel</button>
          <button onClick={() => navigate('/archives')} className="hover:text-maroon transition-colors">Archives</button>
          <button onClick={() => navigate('/globe')} className="hover:text-maroon transition-colors">Discover</button>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="hidden md:block text-xs font-bold text-maroon uppercase tracking-widest mr-2">
                Welcome, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={logout}
                className="hidden md:block text-xs font-bold text-maroon/60 hover:text-maroon transition-colors uppercase tracking-widest"
              >
                Log Out
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-maroon text-white px-8 py-3 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-maroon/20"
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:block text-xs font-bold text-maroon hover:text-maroon-dark transition-colors uppercase tracking-widest"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-white text-maroon border border-maroon/10 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-cream-dark transition-all"
              >
                Sign Up
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-maroon text-white px-8 py-3 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-maroon/20"
              >
                Begin Journey
              </button>
            </>
          )}
        </div>
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

      {/* Preservation Impact - Visual Storytelling */}
      <section className="bg-white py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                   <motion.div 
                    initial={{ y: 40 }}
                    whileInView={{ y: 0 }}
                    className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
                   >
                      <img src={templeInteriorImg} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                   <motion.div 
                    initial={{ y: -40 }}
                    whileInView={{ y: 0 }}
                    className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl mt-12"
                   >
                      <img src={monasteryExteriorImg} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cream rounded-full border border-maroon/5 flex items-center justify-center p-8 text-center shadow-xl">
                   <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest leading-tight">Digital Preservation Active</span>
                </div>
             </div>
             
             <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-[0.4em] mb-6 block">Our Mission</span>
                <h2 className="text-5xl font-serif text-maroon mb-8 leading-tight">
                  Protecting the Soul <br />
                  <span className="italic opacity-40">of the Mountains.</span>
                </h2>
                <div className="space-y-8">
                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-lg font-serif text-maroon mb-1">Cultural Integrity</h4>
                         <p className="text-sm text-maroon/50 leading-relaxed">We work directly with monastery custodians to ensure every digital capture respects the sanctity of the space.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                         <Globe className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-lg font-serif text-maroon mb-1">Global Access</h4>
                         <p className="text-sm text-maroon/50 leading-relaxed">Providing high-fidelity access to students and researchers worldwide who cannot physically reach these remote altitudes.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Marketplace Preview - Sacred Crafts */}
      <section className="bg-cream py-32 px-8">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                 <h2 className="text-5xl font-serif text-maroon mb-4">Sacred <span className="italic opacity-30">Artifacts</span></h2>
                 <p className="text-maroon/40 text-sm max-w-md">Own a piece of the heritage. Every purchase supports local Himachali artisans and monastery restoration.</p>
              </div>
              <button className="bg-white text-maroon border border-maroon/10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-maroon hover:text-white transition-all flex items-center gap-3">
                 View Full Shop <ChevronRight className="w-4 h-4" />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { name: "Hand-painted Thangka", cat: "Ritual Art", price: "₹12,000", img: buddhistTextsImg },
                { name: "Singing Bowl", cat: "Meditation", price: "₹3,500", img: ceremonialMaskImg },
                { name: "Prayer Flags", cat: "Ritual", price: "₹450", img: monasteryExteriorImg },
                { name: "Monastery Incense", cat: "Fragrance", price: "₹850", img: templeInteriorImg },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -8 }} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-maroon/5 border border-maroon/5 group cursor-pointer">
                   <div className="aspect-square rounded-3xl overflow-hidden mb-6 bg-cream">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                   </div>
                   <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest mb-1 block">{item.cat}</span>
                   <h4 className="text-lg font-serif text-maroon mb-2">{item.name}</h4>
                   <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-bold text-maroon/60">{item.price}</span>
                      <button className="p-2 rounded-full bg-cream text-maroon group-hover:bg-maroon group-hover:text-white transition-colors">
                         <ShoppingBag className="w-4 h-4" />
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials - Voices of Devbhumi */}
      <section className="bg-white py-32 px-8 border-y border-maroon/5">
         <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-maroon/10 mx-auto mb-10" />
            <div className="relative">
               <h3 className="text-3xl font-serif text-maroon italic leading-relaxed mb-12">
                 "Watching the sunrise over Key Monastery through the 360° portal felt like standing on the edge of the world. A truly spiritual experience that bridged the gap between my living room and the Himalayas."
               </h3>
               <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream overflow-hidden border border-maroon/10">
                     <img src="https://i.pravatar.cc/100?u=aadi" alt="" />
                  </div>
                  <div className="text-left">
                     <p className="text-sm font-bold text-maroon uppercase tracking-widest">Sarah Jenkins</p>
                     <p className="text-xs text-maroon/40 uppercase tracking-tighter">Cultural Researcher • London</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-8 relative overflow-hidden bg-cream">
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-maroon/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[50%] h-full bg-gradient-to-l from-maroon/20 to-transparent blur-3xl" />
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-maroon rounded-[4rem] p-20 shadow-[0_40px_100px_-20px_rgba(107,76,76,0.5)] text-white"
            >
               <h2 className="text-5xl font-serif mb-8 leading-tight">Start Your Sacred <br /> <span className="italic opacity-50">Pilgrimage Today.</span></h2>
               <p className="text-white/60 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                  Join thousands of explorers preserving and experiencing the heritage of Himachal Pradesh. Uncover history, find peace, and support local communities.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-maroon px-12 py-5 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
                  >
                    Launch Explorer
                  </button>
                  <button 
                    onClick={() => navigate('/booking')}
                    className="bg-maroon-dark text-white border border-white/10 px-12 py-5 rounded-full font-bold hover:bg-white hover:text-maroon transition-all text-sm uppercase tracking-widest"
                  >
                    Plan Visit
                  </button>
               </div>
            </motion.div>
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
              <button onClick={() => navigate('/booking')} className="text-xs text-maroon/60 hover:text-maroon text-left">Plan Journey</button>
              <button onClick={() => navigate('/ar')} className="text-xs text-maroon/60 hover:text-maroon text-left">360° Sanctum</button>
              <button onClick={() => navigate('/chanting')} className="text-xs text-maroon/60 hover:text-maroon text-left">Chanting Library</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-maroon">Connect</span>
              <button onClick={() => navigate('/calendar')} className="text-xs text-maroon/60 hover:text-maroon text-left">Community</button>
              <button onClick={() => navigate('/archives')} className="text-xs text-maroon/60 hover:text-maroon text-left">Archives</button>
              <button onClick={() => navigate('/dashboard')} className="text-xs text-maroon/60 hover:text-maroon text-left">Dashboard</button>
              <button onClick={() => navigate('/feedback')} className="text-xs text-maroon/60 hover:text-maroon text-left">Feedback</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-maroon/5 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {[
            { name: 'Home', path: '/', icon: Home },
            { name: 'Map', path: '/map', icon: MapIcon },
            { name: 'Tours', path: '/ar', icon: Compass },
            { name: 'Travel', path: '/booking', icon: Plane },
            { name: 'Community', path: '/calendar', icon: Users },
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
