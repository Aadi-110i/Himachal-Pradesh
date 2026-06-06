import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Bookmark, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Manuscripts", "Historical Documents", "Cultural Artifacts", "Photographs", "Murals"];

  const trendingItems = [
    { title: "Ancient Buddhist Texts", desc: "Collection of rare scriptures", img: "/assets/1.jpeg" },
    { title: "Ceremonial Mask", desc: "Traditional mask used in rituals", img: "/assets/2.jpeg" },
    { title: "Royal Decree of Sikkim", desc: "Historical document from 18th century", img: "/assets/3.jpeg" },
  ];

  const featuredItems = [
    { type: "Manuscript", title: "Ancient Buddhist Texts", desc: "Collection of rare scriptures dating back to the 14th century, recovered from the old library.", img: "/assets/1.jpeg" },
    { type: "Document", title: "Royal Decree of Sikkim", desc: "Original seal and decree granting land to the monastery, written in Classical Tibetan.", img: "/assets/2.jpeg" },
    { type: "Artifact", title: "Ceremonial Mask", desc: "Finely carved wooden mask used in the Cham dance festivals, featuring traditional pigments.", img: "/assets/3.jpeg" },
  ];

  return (
    <MainLayout>
      <div className="px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-10 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-maroon/40" />
          </div>
          <input 
            type="text" 
            placeholder="Search archives" 
            className="w-full bg-[#F5EFE9] border-none rounded-full py-4 pl-14 pr-6 text-sm focus:ring-1 focus:ring-maroon/20 placeholder:text-maroon/30 shadow-sm"
          />
        </div>

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
            <button className="text-maroon/60 text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {trendingItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-64 group cursor-pointer"
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

        {/* Featured Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-maroon mb-8">Featured Items</h2>
          <div className="space-y-6">
            {featuredItems.map((item, i) => (
              <motion.div 
                key={i}
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
                  <button className="bg-[#F5EFE9] text-maroon px-6 py-2 rounded-full text-sm font-bold hover:bg-maroon hover:text-white transition-all">
                    View
                  </button>
                </div>
                <div className="w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden shadow-inner">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Immersive Dark Section (Optional/Preview for Audio/Prayers) */}
        <section className="mt-16 -mx-6 px-6 py-12 bg-deep-brown text-white rounded-t-[3rem]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-dusty-pink">Chanting Library</h2>
            <button className="text-dusty-pink/60 text-sm font-medium">Explore All</button>
          </div>
          <div className="bg-white/5 rounded-4xl p-8 border border-white/5 backdrop-blur-sm relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <span className="text-xs font-bold text-dusty-pink/60 uppercase tracking-widest mb-4 block">Immersive Experience</span>
              <h3 className="text-3xl font-serif mb-4">Start your day with serenity</h3>
              <p className="text-sm text-white/60 max-w-xs mb-8">Uplifting chants to set a positive tone for the day, performed by the monastery elders.</p>
              <button className="bg-dusty-pink text-deep-brown px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform">
                Listen Now <Clock className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 grayscale group-hover:grayscale-0 transition-all">
               <img src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover" alt="Temple" />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
