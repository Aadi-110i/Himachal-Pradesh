import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, ExternalLink, Info, Filter, Archive } from 'lucide-react';

const DigitalArchives = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const archiveItems = [
    { id: 1, title: "Ancient Manuscript (Kanjur)", type: "Manuscript", date: "17th Century", img: "https://images.unsplash.com/photo-1585771724684-2626efdfa3c5?auto=format&fit=crop&q=80&w=600", desc: "A rare collection of Tibetan Buddhist scriptures detailing the lineage of the Karmapas." },
    { id: 2, title: "Rumtek Temple Mural", type: "Mural", date: "1960s (Restored)", img: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=600", desc: "Detailed mural depicting the life of Buddha found in the main assembly hall." },
    { id: 3, title: "Golden Stupa Blueprint", type: "Document", date: "1962", img: "https://images.unsplash.com/photo-1503387762-592be5a52680?auto=format&fit=crop&q=80&w=600", desc: "Architectural drawings used for the construction of the Golden Stupa at Rumtek." },
    { id: 4, title: "Ceremonial Mask", type: "Artifact", date: "19th Century", img: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600", desc: "Used in the annual Cham dance rituals during the Losar festival." },
    { id: 5, title: "Thangka of Amitabha", type: "Art", date: "18th Century", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600", desc: "A traditional Tibetan silk painting with embroidery, used for meditation." },
    { id: 6, title: "Monastery Seal", type: "Artifact", date: "1750", img: "https://images.unsplash.com/photo-1589149098258-3e9102ca93d3?auto=format&fit=crop&q=80&w=600", desc: "Official seal used for administrative documents by the high lamas." },
  ];

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-orange-500 mb-4"
            >
              <Archive className="w-6 h-6" />
              <span className="font-black uppercase tracking-[0.3em] text-sm">Digital Repository</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black">Sacred <span className="text-white/20 italic font-light">Archives</span></h1>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-all" />
                <input 
                  type="text" 
                  placeholder="Search manuscripts, murals..."
                  className="w-full md:w-96 bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                />
             </div>
             <div className="flex gap-2">
                {['All', 'Manuscripts', 'Murals', 'Artifacts'].map(tag => (
                  <button key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">{tag}</button>
                ))}
             </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {archiveItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#111114] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-orange-500/30 transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 block">{item.type} • {item.date}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Item Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-[#1a1a1c] border border-white/10 w-full max-w-6xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              >
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                  <img src={selectedItem.img} className="w-full h-full object-cover" alt={selectedItem.title} />
                </div>
                
                <div className="w-full md:w-1/2 p-12 flex flex-col">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6">Verified Artifact</span>
                    <h2 className="text-4xl font-black mb-4">{selectedItem.title}</h2>
                    <div className="flex gap-8 border-y border-white/5 py-6 mb-8">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black mb-1">Origin Date</p>
                        <p className="font-bold text-white">{selectedItem.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black mb-1">Catalog ID</p>
                        <p className="font-bold text-white">SK-ARC-{selectedItem.id}002</p>
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed italic">
                      {selectedItem.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <button className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-black/20">
                      <Download className="w-5 h-5" /> Download HD Scan
                    </button>
                    <button className="bg-white/5 border border-white/5 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-white/10 transition-all">
                      <Info className="w-5 h-5 text-orange-500" /> AI Insights
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default DigitalArchives;
