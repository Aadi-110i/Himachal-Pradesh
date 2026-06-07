import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Clock, Music, Heart, Shuffle, Repeat, ChevronRight } from 'lucide-react';

// Assets
import templeInteriorImg from '../assets/temple_interior.png';
import monasteryExteriorImg from '../assets/monastery_exterior.png';

const chants = [
  {
    id: 1,
    title: 'Om Mani Padme Hum',
    artist: 'Rumtek Monastery Monks',
    category: 'Morning Prayers',
    duration: '12:34',
    durationSec: 754,
    description: 'The most widely used mantra in Tibetan Buddhism, invoking the blessings of Chenrezig, the embodiment of compassion.',
    img: templeInteriorImg,
  },
  {
    id: 2,
    title: 'Heart Sutra Chanting',
    artist: 'Senior Lama Dorje',
    category: 'Morning Prayers',
    duration: '8:21',
    durationSec: 501,
    description: 'A concise recitation of the Prajnaparamita Heart Sutra, capturing the essence of Buddhist wisdom on emptiness.',
  },
  {
    id: 3,
    title: 'Vajra Guru Mantra',
    artist: 'Kagyu Assembly',
    category: 'Festival Hymns',
    duration: '15:47',
    durationSec: 947,
    description: 'The mantra of Guru Padmasambhava, chanted during Losar and other major festival celebrations.',
  },
  {
    id: 4,
    title: 'Green Tara Prayer',
    artist: 'Monastery Choir',
    category: 'Festival Hymns',
    duration: '6:55',
    durationSec: 415,
    description: 'A devotional prayer to Green Tara, the female Buddha of compassionate activity and protection.',
  },
  {
    id: 5,
    title: 'Mahakala Puja',
    artist: 'Ritual Masters',
    category: 'Monastic Rites',
    duration: '22:10',
    durationSec: 1330,
    description: 'The fierce protector deity invocation performed at dusk, accompanied by drums and long horns.',
  },
  {
    id: 6,
    title: 'Morning Dedication Prayer',
    artist: 'Abbot Rinpoche',
    category: 'Morning Prayers',
    duration: '4:30',
    durationSec: 270,
    description: 'The opening prayer of each day, dedicating all activities to the benefit of all sentient beings.',
  },
  {
    id: 7,
    title: 'Tsok Offering Chant',
    artist: 'Rumtek Sangha',
    category: 'Monastic Rites',
    duration: '18:05',
    durationSec: 1085,
    description: 'The communal feast offering ritual, performed on auspicious days of the lunar calendar.',
  },
  {
    id: 8,
    title: 'Live Dharma Teaching',
    artist: 'H.H. Karmapa',
    category: 'Live Events',
    duration: '45:00',
    durationSec: 2700,
    description: 'A live recorded teaching session on the nature of mind and meditation practice.',
    img: monasteryExteriorImg,
  },
];

const categories = ['All', 'Morning Prayers', 'Festival Hymns', 'Monastic Rites', 'Live Events'];

const ChantingLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState({});
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const progressInterval = useRef(null);

  const filteredChants = activeCategory === 'All'
    ? chants
    : chants.filter(c => c.category === activeCategory);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const list = filteredChants.length > 0 ? filteredChants : chants;
    const idx = list.findIndex(c => c.id === currentTrack.id);
    const nextIdx = isShuffle ? Math.floor(Math.random() * list.length) : (idx + 1) % list.length;
    setCurrentTrack(list[nextIdx]);
    setProgress(0);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const list = filteredChants.length > 0 ? filteredChants : chants;
    const idx = list.findIndex(c => c.id === currentTrack.id);
    const prevIdx = idx === 0 ? list.length - 1 : idx - 1;
    setCurrentTrack(list[prevIdx]);
    setProgress(0);
  };

  // Simulate progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (isRepeat) return 0;
            nextTrack();
            return 0;
          }
          return prev + (100 / currentTrack.durationSec);
        });
      }, 1000);
    }
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, currentTrack, isRepeat]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = currentTrack ? formatTime((progress / 100) * currentTrack.durationSec) : '0:00';

  return (
    <MainLayout>
      <div className="px-4 md:px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-maroon/40 mb-3"
          >
            <Music className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Sacred Sounds</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-maroon mb-3">Chanting Library</h1>
          <p className="text-sm text-maroon/50 max-w-lg">
            Immerse yourself in centuries-old sacred chants performed by the monks of Rumtek Monastery. 
            Each recording preserves the living tradition of Tibetan Buddhist liturgy.
          </p>
        </div>

        {/* Featured / Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl group cursor-pointer"
          onClick={() => playTrack(chants[0])}
        >
          <div className="absolute inset-0">
            <img src={templeInteriorImg} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" alt="Temple Interior" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-brown/90 via-deep-brown/70 to-transparent" />
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 min-h-[280px]">
            <div>
              <span className="text-[10px] font-bold text-dusty-pink/80 uppercase tracking-widest mb-3 block">✦ Featured Chant</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Om Mani Padme Hum</h2>
              <p className="text-white/50 text-sm max-w-md leading-relaxed">
                The most sacred mantra of compassion, chanted in the ancient melodic tradition of the Kagyu lineage. Start your day with serenity.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-16 h-16 bg-dusty-pink text-deep-brown rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </button>
              <div className="text-white/40 text-xs font-bold">12:34</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-maroon text-white shadow-lg shadow-maroon/20'
                  : 'bg-cream-dark text-maroon/60 hover:bg-maroon/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chants List */}
        <div className="space-y-3 mb-32">
          {filteredChants.map((chant, i) => {
            const isActive = currentTrack?.id === chant.id;
            return (
              <motion.div
                key={chant.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => playTrack(chant)}
                className={`flex items-center gap-5 p-4 md:p-5 rounded-3xl cursor-pointer transition-all group border ${
                  isActive
                    ? 'bg-maroon/5 border-maroon/10 shadow-md'
                    : 'bg-white border-maroon/5 hover:bg-cream-dark hover:shadow-sm'
                }`}
              >
                {/* Track number / Play icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive ? 'bg-maroon text-white' : 'bg-cream-dark text-maroon/40 group-hover:bg-maroon group-hover:text-white'
                }`}>
                  {isActive && isPlaying ? (
                    <div className="flex items-end gap-[3px] h-5">
                      <motion.div animate={{ height: ['40%', '100%', '60%'] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[3px] bg-white rounded-full" />
                      <motion.div animate={{ height: ['100%', '40%', '80%'] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-[3px] bg-white rounded-full" />
                      <motion.div animate={{ height: ['60%', '80%', '40%'] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-[3px] bg-white rounded-full" />
                    </div>
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h3 className={`font-serif text-sm md:text-base leading-tight mb-0.5 ${isActive ? 'text-maroon font-bold' : 'text-maroon'}`}>
                    {chant.title}
                  </h3>
                  <p className="text-[11px] text-maroon/40 font-medium truncate">{chant.artist}</p>
                </div>

                {/* Category badge */}
                <span className="hidden md:inline-block px-3 py-1 rounded-full bg-cream-dark text-[9px] font-bold text-maroon/40 uppercase tracking-widest flex-shrink-0">
                  {chant.category}
                </span>

                {/* Like button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsLiked(prev => ({ ...prev, [chant.id]: !prev[chant.id] })); }}
                  className={`flex-shrink-0 transition-colors ${isLiked[chant.id] ? 'text-red-400' : 'text-maroon/20 hover:text-maroon/40'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked[chant.id] ? 'fill-current' : ''}`} />
                </button>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-maroon/30 flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{chant.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Player Bar */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-[60px] left-0 right-0 z-40 px-3"
          >
            <div className="max-w-3xl mx-auto bg-deep-brown text-white rounded-[2rem] p-4 md:p-5 shadow-2xl border border-white/5 backdrop-blur-xl">
              {/* Progress bar */}
              <div className="mb-4 px-1">
                <div
                  className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width) * 100;
                    setProgress(Math.max(0, Math.min(100, pct)));
                  }}
                >
                  <div
                    className="h-full bg-dusty-pink rounded-full transition-all relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                  </div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-white/30 font-medium">{currentTime}</span>
                  <span className="text-[10px] text-white/30 font-medium">{currentTrack.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Track info */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold truncate">{currentTrack.title}</h4>
                  <p className="text-[10px] text-dusty-pink font-medium truncate">{currentTrack.artist}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`hidden md:block p-2 rounded-full transition-colors ${isShuffle ? 'text-dusty-pink' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors p-1">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-dusty-pink text-deep-brown rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                  </button>
                  <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors p-1">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={`hidden md:block p-2 rounded-full transition-colors ${isRepeat ? 'text-dusty-pink' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume */}
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                    className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-dusty-pink [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default ChantingLibrary;
