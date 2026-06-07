import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Bookmark, Clock, Star, Music, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import buddhistTextsImg from '../assets/buddhist_texts.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';
import royalDecreeImg from '../assets/royal_decree.png';
import templeInteriorImg from '../assets/temple_interior.png';

const dharmaQuotes = [
  { text: "Peace comes from within. Do not seek it without.", source: "Siddhartha Gautama" },
  { text: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go.", source: "Buddhist Proverb" },
  { text: "The mind is everything. What you think, you become.", source: "The Buddha" },
  { text: "Every morning we are born again. What we do today matters most.", source: "Buddhist Teaching" },
  { text: "Thousands of candles can be lit from a single candle. Happiness never decreases by being shared.", source: "Dhammapada" },
  { text: "You yourself must strive. The Buddhas only point the way.", source: "Dhammapada, Verse 276" },
  { text: "Holding on to anger is like grasping a hot coal — you are the one who gets burned.", source: "Buddhist Wisdom" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dailyQuote, setDailyQuote] = useState(dharmaQuotes[0]);

  useEffect(() => {
    // Pick a "daily" quote based on the day of the year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setDailyQuote(dharmaQuotes[dayOfYear % dharmaQuotes.length]);
  }, []);

  const categories = ["All", "Manuscripts", "Historical Documents", "Cultural Artifacts", "Photographs", "Murals"];

  const trendingItems = [
    { id: "ancient-buddhist-texts", title: "Ancient Buddhist Texts", desc: "Collection of rare scriptures", img: buddhistTextsImg },
    { id: "ceremonial-mask", title: "Ceremonial Mask", desc: "Traditional mask used in rituals", img: ceremonialMaskImg },
    { id: "royal-decree-sikkim", title: "Royal Decree of Sikkim", desc: "Historical document from 18th century", img: royalDecreeImg },
  ];

  const featuredItems = [
    { id: "ancient-buddhist-texts", type: "Manuscript", title: "Ancient Buddhist Texts", desc: "Collection of rare scriptures dating back to the 14th century, recovered from the old library.", img: buddhistTextsImg },
    { id: "royal-decree-sikkim", type: "Document", title: "Royal Decree of Sikkim", desc: "Original seal and decree granting land to the monastery, written in Classical Tibetan.", img: royalDecreeImg },
    { id: "ceremonial-mask", type: "Artifact", title: "Ceremonial Mask", desc: "Finely carved wooden mask used in the Cham dance festivals, featuring traditional pigments.", img: ceremonialMaskImg },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/archives');
    }
  };

  return (
    <MainLayout>
      <div className="px-6 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-10 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-maroon/40" />
          </div>
          <input 
            type="text" 
            placeholder="Search archives" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5EFE9] border-none rounded-full py-4 pl-14 pr-6 text-sm focus:ring-1 focus:ring-maroon/20 placeholder:text-maroon/30 shadow-sm"
          />
        </form>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-maroon text-white shadow-lg shadow-maroon/20' 
                  : 'bg-[#F5EFE9] text-maroon/70 hover:bg-maroon/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending Archives */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-maroon">Trending Archives</h2>
            <button 
              onClick={() => navigate('/archives')}
              className="text-maroon/60 text-sm font-medium flex items-center gap-1 hover:text-maroon transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {trendingItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-64 group cursor-pointer"
                onClick={() => navigate(`/archives/${item.id}`)}
              >
                <div className="relative aspect-[4/5] rounded-4xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-500">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif text-lg text-maroon mb-1">{item.title}</h3>
                <p className="text-xs text-maroon/50 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Daily Dharma Widget */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-5xl p-8 md:p-10 shadow-sm border border-maroon/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
              <Sparkles className="w-48 h-48 text-maroon" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 bg-maroon rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-[0.3em]">Daily Dharma</span>
              </div>
              <blockquote className="text-2xl md:text-3xl font-serif text-maroon leading-snug mb-6 max-w-2xl italic">
                "{dailyQuote.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-maroon/20" />
                <span className="text-xs text-maroon/50 font-medium">{dailyQuote.source}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-maroon mb-8">Featured Items</h2>
          <div className="space-y-6">
            {featuredItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-5xl p-6 shadow-sm border border-maroon/5 flex items-center gap-6 group hover:shadow-md transition-all"
              >
                <div className="flex-grow">
                  <span className="text-[10px] uppercase tracking-widest text-maroon/40 font-bold mb-2 block">{item.type}</span>
                  <h3 className="text-xl font-serif text-maroon mb-2">{item.title}</h3>
                  <p className="text-sm text-maroon/60 leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <button 
                    onClick={() => navigate(`/archives/${item.id}`)}
                    className="bg-[#F5EFE9] text-maroon px-6 py-2 rounded-full text-sm font-bold hover:bg-maroon hover:text-white transition-all"
                  >
                    View
                  </button>
                </div>
                <div 
                  className="w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden shadow-inner cursor-pointer"
                  onClick={() => navigate(`/archives/${item.id}`)}
                >
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Chanting Library Section */}
        <section className="mt-16 -mx-6 px-6 py-12 bg-deep-brown text-white rounded-t-[3rem]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-dusty-pink">Chanting Library</h2>
            <button 
              onClick={() => navigate('/chanting')}
              className="text-dusty-pink/60 text-sm font-medium hover:text-dusty-pink transition-colors flex items-center gap-1"
            >
              Explore All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div 
            className="bg-white/5 rounded-4xl p-8 border border-white/5 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
            onClick={() => navigate('/chanting')}
          >
            <div className="relative z-10">
              <span className="text-xs font-bold text-dusty-pink/60 uppercase tracking-widest mb-4 block">Immersive Experience</span>
              <h3 className="text-3xl font-serif mb-4">Start your day with serenity</h3>
              <p className="text-sm text-white/60 max-w-xs mb-8">Uplifting chants to set a positive tone for the day, performed by the monastery elders.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('/chanting'); }}
                className="bg-dusty-pink text-deep-brown px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <Music className="w-4 h-4" /> Listen Now
              </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-700">
               <img src={templeInteriorImg} className="h-full w-full object-cover" alt="Temple" />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
