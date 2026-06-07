import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Float, Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Sparkles, ArrowRight, X, Landmark, MapPin, Compass, Loader2 } from 'lucide-react';
import { getRandomLocation } from '../data/locations';
import mapTexture from '../assets/map2.png';

function GlobeModel({ isSpinning, texture }) {
  const globeRef = useRef();
  const rotationSpeed = useRef(0.005);

  useFrame((state, delta) => {
    if (isSpinning) {
      rotationSpeed.current = Math.min(rotationSpeed.current + 0.01, 0.15);
    } else {
      rotationSpeed.current = Math.max(rotationSpeed.current - 0.005, 0.005);
    }
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <group ref={globeRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          metalness={0.4} 
          roughness={0.7}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
    </group>
  );
}

const DiscoveryGlobe = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  
  // Use local state for texture to prevent Suspense hang if image fails
  const [texture, setTexture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      mapTexture,
      (tex) => setTexture(tex),
      undefined,
      (err) => {
        console.error("Texture failed to load", err);
        setError("Failed to load map texture. Please refresh.");
      }
    );
  }, []);

  const handleSpin = () => {
    if (isSpinning || !texture) return;
    setIsSpinning(true);
    setShowReveal(false);
    
    setTimeout(() => {
      setIsSpinning(false);
      const loc = getRandomLocation();
      setSelectedLoc(loc);
      setTimeout(() => setShowReveal(true), 1000);
    }, 2500);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px-56px)] bg-[#0a0a0b] relative overflow-hidden flex flex-col items-center justify-center">
        
        {/* Header Text */}
        <div className="absolute top-12 left-0 right-0 z-10 text-center pointer-events-none">
           <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-orange-300 mb-2"
           >
              <Compass className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Divine Oracle</span>
           </motion.div>
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Spin for a <span className="italic opacity-40">Destination.</span></h2>
           <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Touch the globe to invoke random fate</p>
        </div>

        {/* 3D Scene / Loading State */}
        <div className="w-full h-full cursor-pointer relative" onClick={handleSpin}>
          {!texture && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
               <Loader2 className="w-8 h-8 text-orange-300 animate-spin" />
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Awakening the Oracle...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 p-10 text-center">
               <p className="text-sm text-red-400 font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            
            <Suspense fallback={null}>
              {texture && (
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                  <GlobeModel isSpinning={isSpinning} texture={texture} />
                </Float>
              )}
              <Environment preset="night" />
            </Suspense>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={!isSpinning && texture} 
              autoRotateSpeed={0.5} 
            />
          </Canvas>
        </div>

        {/* Reveal UI Overlay */}
        <AnimatePresence>
          {showReveal && selectedLoc && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
              >
                {/* Left: Image/Preview */}
                <div className="w-full md:w-5/12 h-64 md:h-auto relative">
                   <img src={selectedLoc.img} className="w-full h-full object-cover" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-2 mb-2 text-orange-300">
                         <MapPin className="w-4 h-4" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">{selectedLoc.loc}</span>
                      </div>
                      <h3 className="text-3xl font-serif leading-tight">{selectedLoc.name}</h3>
                   </div>
                </div>

                {/* Right: Info */}
                <div className="flex-grow p-10 md:p-16 flex flex-col justify-between">
                   <button 
                    onClick={() => setShowReveal(false)}
                    className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                     <X className="w-5 h-5 text-gray-400" />
                   </button>

                   <div>
                      <div className="flex items-center gap-3 text-maroon mb-6">
                         <Landmark className="w-5 h-5" />
                         <span className="text-xs font-bold uppercase tracking-widest">{selectedLoc.category} Context</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-8">
                         {selectedLoc.history}
                      </p>

                      <div className="space-y-4 mb-10">
                         <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Sacred Traditions</h4>
                         <div className="grid grid-cols-2 gap-4">
                            {selectedLoc.traditions.map((t, i) => (
                               <div key={i} className="flex items-center gap-2 text-[11px] text-maroon font-bold uppercase tracking-tighter">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                  {t}
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => navigate(`/panorama/${selectedLoc.id}`)}
                        className="flex-grow bg-maroon text-white py-5 rounded-full font-bold text-sm shadow-xl shadow-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                      >
                         Enter 360° Sanctuary
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={handleSpin}
                        className="px-10 py-5 border-2 border-orange-50 rounded-full text-xs font-bold text-maroon/60 hover:bg-orange-50 transition-all uppercase tracking-widest"
                      >
                         Spin Again
                      </button>
                   </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Spin Prompt */}
        {!showReveal && texture && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-12 z-10 pointer-events-none"
          >
             <div className="flex flex-col items-center gap-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 text-white/60">
                   <Sparkles className="w-4 h-4 text-orange-300" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Click Globe to Spin</span>
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default DiscoveryGlobe;

