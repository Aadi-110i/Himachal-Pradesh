import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, ExternalLink, Info, Filter, Archive, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import buddhistTextsImg from '../assets/buddhist_texts.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';
import royalDecreeImg from '../assets/royal_decree.png';
import templeInteriorImg from '../assets/temple_interior.png';
import monasteryExteriorImg from '../assets/monastery_exterior.png';

const DigitalArchives = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const archiveItems = [
    { id: 'ancient-buddhist-texts', title: "Ancient Buddhist Texts (Kanjur)", type: "Manuscript", date: "14th Century", img: buddhistTextsImg, desc: "A rare collection of Tibetan Buddhist scriptures detailing the lineage of the Karmapas." },
    { id: 'ceremonial-mask', title: "Ceremonial Mask", type: "Artifact", date: "19th Century", img: ceremonialMaskImg, desc: "Used in the annual Cham dance rituals during the Losar festival." },
    { id: 'royal-decree-sikkim', title: "Royal Decree of Sikkim", type: "Document", date: "1750", img: royalDecreeImg, desc: "Official seal and decree granting land to the monastery." },
    { id: 4, title: "Monastery Prayer Hall", type: "Mural", date: "1960s (Restored)", img: templeInteriorImg, desc: "Detailed mural depicting the life of Buddha found in the main assembly hall." },
    { id: 5, title: "Mountain Monastery", type: "Photograph", date: "2024", img: monasteryExteriorImg, desc: "Aerial photography documenting the monastery's position in the sacred landscape." },
    { id: 6, title: "Golden Stupa Blueprint", type: "Document", date: "1962", img: royalDecreeImg, desc: "Architectural drawings used for the construction of the Golden Stupa at Rumtek." },
  ];

  const filterTags = ['All', 'Manuscripts', 'Artifacts', 'Documents', 'Murals', 'Photographs'];

  const filteredItems = archiveItems.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.type.toLowerCase().includes(activeFilter.toLowerCase().slice(0, -1));
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleItemClick = (item) => {
    if (typeof item.id === 'string') {
      navigate(`/archives/${item.id}`);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-maroon mb-4"
            >
              <Archive className="w-6 h-6" />
              <span className="font-bold uppercase tracking-[0.3em] text-sm">Digital Repository</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-serif text-maroon">Sacred <span className="text-maroon/20 italic font-normal">Archives</span></h1>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-all" />
                <input 
                  type="text" 
                  placeholder="Search manuscripts, murals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-96 bg-cream-dark border border-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-maroon focus:outline-none focus:border-maroon/20 transition-all"
                />
             </div>
             <div className="flex gap-2 flex-wrap">
                {filterTags.map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeFilter === tag 
                        ? 'bg-maroon text-white shadow-lg shadow-maroon/20'
                        : 'bg-cream-dark text-maroon/60 hover:bg-maroon/5 border border-maroon/5'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleItemClick(item)}
              className="group relative bg-white border border-maroon/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-maroon/20 hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold text-dusty-pink uppercase tracking-widest mb-2 block">{item.type} • {item.date}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <div className="w-10 h-10 bg-white text-maroon rounded-full flex items-center justify-center shadow-lg">
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
                className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white border border-maroon/10 w-full max-w-6xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              >
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                  <img src={selectedItem.img} className="w-full h-full object-cover" alt={selectedItem.title} />
                </div>
                
                <div className="w-full md:w-1/2 p-12 flex flex-col bg-white">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-8 right-8 text-maroon/40 hover:text-maroon transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-maroon/5 text-maroon text-[10px] font-bold uppercase tracking-widest mb-6 border border-maroon/10">Verified Artifact</span>
                    <h2 className="text-4xl font-serif text-maroon mb-4">{selectedItem.title}</h2>
                    <div className="flex gap-8 border-y border-maroon/5 py-6 mb-8">
                      <div>
                        <p className="text-[10px] text-maroon/40 uppercase font-bold mb-1">Origin Date</p>
                        <p className="font-bold text-maroon">{selectedItem.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-maroon/40 uppercase font-bold mb-1">Catalog ID</p>
                        <p className="font-bold text-maroon">SK-ARC-{selectedItem.id}002</p>
                      </div>
                    </div>
                    <p className="text-maroon/60 leading-relaxed italic">
                      {selectedItem.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <button className="bg-maroon text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20">
                      <Download className="w-5 h-5" /> Download HD Scan
                    </button>
                    <button className="bg-cream-dark border border-maroon/5 text-maroon px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-maroon/5 transition-all">
                      <Info className="w-5 h-5 text-maroon" /> AI Insights
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
