import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PanoramaViewer from '../components/3d/PanoramaViewer';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Maximize2, Move, Compass, Sparkles, HelpCircle, Trophy, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizModal from '../components/ui/QuizModal';

// Assets
import monasteryExteriorImg from '../assets/monastery_exterior.png';
import monastery360Img from '../assets/monetry360.png';

const ARViewer = () => {
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [hasFoundTreasure, setHasFoundTreasure] = useState(false);
  const [activeView, setActiveView] = useState('interior'); // 'interior' | 'courtyard'

  const monastery360 = monastery360Img;

  const rumtekQuiz = {
    question: "What is the primary lineage associated with the Rumtek Monastery?",
    options: ["Nyingma", "Kagyu", "Gelug", "Sakya"],
    correct: 1,
    badge: { id: 'kagyu_scholar', name: 'Kagyu Scholar', icon: Trophy }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px-56px)] w-full flex flex-col md:flex-row bg-cream overflow-hidden">
        {/* Viewer Section */}
        <div className="flex-grow h-full relative group cursor-all-scroll bg-gray-200">
          <PanoramaViewer imageUrl={monastery360} />

          {/* Overlay UI */}
          <div className="absolute top-6 left-6 z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-md border border-maroon/10 p-5 rounded-4xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-1">
                 <h2 className="text-2xl font-serif text-maroon">
                   {activeView === 'interior' ? 'Rumtek Interior' : 'Monastery Courtyard'}
                 </h2>
                 <div className="bg-maroon/10 px-2 py-0.5 rounded-lg border border-maroon/20 text-[8px] font-bold text-maroon uppercase tracking-widest">
                   {hasFoundTreasure ? 'Relic Found!' : 'Discovery Active'}
                 </div>
              </div>
              <p className="text-maroon/40 text-[10px] font-bold tracking-widest uppercase">360° Virtual Sanctuary</p>
            </motion.div>
          </div>

          {/* View toggle pills */}
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <button 
              onClick={() => setActiveView('interior')}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border transition-all ${
                activeView === 'interior' ? 'bg-maroon text-white border-maroon' : 'bg-white/80 text-maroon/60 border-maroon/10 hover:bg-white'
              }`}
            >
              Interior
            </button>
            <button 
              onClick={() => setActiveView('courtyard')}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border transition-all ${
                activeView === 'courtyard' ? 'bg-maroon text-white border-maroon' : 'bg-white/80 text-maroon/60 border-maroon/10 hover:bg-white'
              }`}
            >
              Courtyard
            </button>
          </div>

          {/* Interaction Hints */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col md:flex-row gap-4 items-center w-full px-6 md:w-auto">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-maroon/5 flex items-center gap-3 text-xs font-medium text-maroon/70 shadow-xl">
              <Move className="w-4 h-4 text-maroon" /> Drag to explore space
            </div>
            {!hasFoundTreasure && (
              <div className="bg-maroon px-6 py-3 rounded-full flex items-center gap-3 text-xs font-bold text-white shadow-xl animate-bounce">
                <HelpCircle className="w-4 h-4" /> Find the sacred relic
              </div>
            )}
            {hasFoundTreasure && (
              <div className="bg-emerald-600 px-6 py-3 rounded-full flex items-center gap-3 text-xs font-bold text-white shadow-xl">
                <Trophy className="w-4 h-4" /> Relic discovered! +100 XP
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-96 h-full border-l border-maroon/5 bg-white p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-maroon/5 rounded-xl flex items-center justify-center">
              <Box className="text-maroon w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif text-maroon">Sanctuary Details</h3>
          </div>

          <div className="space-y-8">
            <section>
              <h4 className="text-[10px] font-bold text-maroon/30 uppercase tracking-widest mb-4">Space Context</h4>
              <p className="text-maroon/70 leading-relaxed text-sm">
                This assembly hall is the heart of the Dharma Chakra Centre. The murals represent the transmission of the Kagyu lineage from India to Tibet, meticulously restored using traditional mineral pigments.
              </p>
            </section>

            <section className="bg-maroon/5 border border-maroon/5 p-6 rounded-4xl">
              <div className="flex items-center gap-3 mb-3">
                 <Sparkles className="w-4 h-4 text-maroon" />
                 <h4 className="text-[10px] font-bold text-maroon uppercase tracking-widest">Heritage Quest</h4>
              </div>
              <p className="text-xs text-maroon/60 leading-relaxed font-medium">
                {hasFoundTreasure 
                  ? 'Congratulations! You found the sacred relic and earned the Kagyu Scholar badge. Continue exploring to discover more hidden artifacts.'
                  : 'Locate hidden spiritual artifacts within this sanctuary to unlock exclusive digital archives and earn heritage badges.'
                }
              </p>
              {hasFoundTreasure && (
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <Trophy className="w-4 h-4" /> Kagyu Scholar Badge Earned
                </div>
              )}
            </section>

            <button 
              onClick={() => setActiveView(activeView === 'interior' ? 'courtyard' : 'interior')}
              className="w-full bg-cream text-maroon py-4 rounded-3xl font-bold text-xs uppercase tracking-widest hover:bg-maroon hover:text-white transition-all shadow-sm"
            >
              Switch to {activeView === 'interior' ? 'Courtyard' : 'Interior'}
            </button>
            
            <div className="pt-8 border-t border-maroon/5">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-maroon/30 uppercase tracking-widest">Nearby Sites</h4>
                  <button 
                    onClick={() => navigate('/map')}
                    className="text-[10px] font-bold text-maroon uppercase hover:text-maroon-dark transition-colors"
                  >
                    View All
                  </button>
               </div>
               <div 
                 className="flex gap-4 cursor-pointer group"
                 onClick={() => navigate('/panorama/key')}
               >
                  <img src={monasteryExteriorImg} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow" alt="Nearby monastery" />
                  <div className="flex flex-col justify-center">
                     <p className="font-serif text-maroon text-sm group-hover:text-maroon-dark transition-colors">Enchey Monastery</p>
                     <p className="text-[10px] text-maroon/40 uppercase font-bold">5.2 km away</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        quiz={rumtekQuiz} 
      />
    </MainLayout>
  );
};

export default ARViewer;
