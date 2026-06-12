import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PanoramaViewer from '../components/3d/PanoramaViewer';
import { X, ChevronLeft, Info, Camera, Share2, Heart, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import DonationModal from '../components/ui/DonationModal';
import PremiumUpgradeModal from '../components/ui/PremiumUpgradeModal';
import { locations } from '../data/locations';

const PanoramaView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium } = useGame();
  const location = locations.find(l => l.id === id);

  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  if (!location) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-maroon mb-4">Location not found</h2>
          <button onClick={() => navigate('/map')} className="text-maroon underline">Back to Map</button>
        </div>
      </div>
    );
  }

  const handleTourClick = () => {
    if (isPremium) {
      alert("Starting your premium guided tour...");
    } else {
      setIsUpgradeOpen(true);
    }
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Map</span>
        </button>

        <div className="text-center">
          <h1 className="text-white font-serif text-xl leading-none">{location.name}</h1>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{location.category} • {location.loc}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsDonationOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-maroon hover:border-maroon transition-all group"
          >
            <Heart className="w-4 h-4 group-hover:fill-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Support Site</span>
          </button>
          <button 
            onClick={() => navigate('/map')}
            className="p-2 bg-maroon text-white rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 360 Viewer */}
      <div className="absolute inset-0">
        <PanoramaViewer imageUrl={location.panorama} />
      </div>

      {/* Bottom Info Overlay */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-10 left-10 right-10 z-50 flex justify-between items-end pointer-events-none"
      >
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-4xl shadow-2xl border border-maroon/10 max-w-sm pointer-events-auto">
          <div className="flex items-center gap-2 mb-3 text-maroon">
            <Info className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Heritage Experience</span>
          </div>
          <p className="text-sm text-maroon/80 leading-relaxed font-sans italic">
            "{location.description}"
          </p>
          <div className="mt-4 pt-4 border-t border-maroon/5 flex gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-maroon/40 font-bold uppercase">Elevation</span>
                <span className="text-xs font-serif text-maroon">4,166m</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] text-maroon/40 font-bold uppercase">Best Visit</span>
                <span className="text-xs font-serif text-maroon">May - Oct</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pointer-events-auto">
          {!isPremium && (
            <div className="bg-orange-900/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3 text-white border border-orange-500/20 shadow-xl mb-1">
               <Star className="w-4 h-4 text-orange-300 fill-orange-300" />
               <span className="text-[9px] font-bold uppercase tracking-widest">Premium Tour Available</span>
            </div>
          )}
          <button className="self-end bg-white text-maroon p-4 rounded-full shadow-2xl hover:bg-maroon hover:text-white transition-all group">
            <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={handleTourClick}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              isPremium 
                ? 'bg-maroon text-white shadow-maroon/30' 
                : 'bg-deep-brown text-orange-300 shadow-black/40 border border-orange-900/30'
            }`}
          >
             {isPremium ? 'Resume Guided Tour' : 'Unlock Guided Tour'}
             {!isPremium && <Lock className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <DonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)} 
        locationName={location.name} 
      />
      <PremiumUpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
      />

      {/* Compass/Mini-map hint */}
      <div className="absolute bottom-10 right-10 z-40 w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center opacity-30 pointer-events-none">
         <div className="w-1 h-12 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

export default PanoramaView;
