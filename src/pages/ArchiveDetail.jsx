import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Download, Share2, Bookmark, ZoomIn, ZoomOut, X, Sparkles, Calendar, MapPin, Tag, FileText, Eye } from 'lucide-react';

// Assets
import buddhistTextsImg from '../assets/buddhist_texts.png';
import ceremonialMaskImg from '../assets/ceremonial_mask.png';
import royalDecreeImg from '../assets/royal_decree.png';
import templeInteriorImg from '../assets/temple_interior.png';
import monasteryExteriorImg from '../assets/monastery_exterior.png';

const archiveData = {
  'ancient-buddhist-texts': {
    id: 'ancient-buddhist-texts',
    title: 'Ancient Buddhist Texts',
    type: 'Manuscript',
    date: '14th Century',
    origin: 'Rumtek Monastery Library',
    catalogId: 'SK-ARC-1002',
    img: buddhistTextsImg,
    desc: 'Collection of rare scriptures dating back to the 14th century, recovered from the old library.',
    longDesc: 'This extraordinary collection of Tibetan Buddhist scriptures represents one of the most significant manuscript discoveries in the eastern Himalayas. Written in classical Tibetan script using traditional lampblack ink on handmade mulberry bark paper, these texts preserve teachings from the Kagyu lineage that were thought to be lost for centuries. The collection includes commentaries on the Prajnaparamita (Perfection of Wisdom) sutras, meditation manuals from the Mahamudra tradition, and biographical accounts of early Kagyu masters. Each folio features intricate marginal illustrations painted with mineral pigments—lapis lazuli blue, cinnabar red, and gold leaf—depicting protective deities and auspicious symbols. The manuscripts were discovered during the 2019 conservation project in a sealed chamber beneath the old library, wrapped in silk brocade and preserved in carved wooden boxes.',
    dimensions: '38 × 12 cm per folio',
    material: 'Mulberry bark paper, lampblack ink, mineral pigments',
    condition: 'Good — Minor foxing, some folios restored',
    language: 'Classical Tibetan',
    relatedItems: ['royal-decree-sikkim', 'ceremonial-mask'],
  },
  'royal-decree-sikkim': {
    id: 'royal-decree-sikkim',
    title: 'Royal Decree of Sikkim',
    type: 'Document',
    date: '18th Century (c. 1750)',
    origin: 'Tsuklakhang Palace Archives',
    catalogId: 'SK-ARC-2003',
    img: royalDecreeImg,
    desc: 'Original seal and decree granting land to the monastery, written in Classical Tibetan.',
    longDesc: 'This royal decree (known as "Bka\'-shog" in Tibetan) was issued by the Chogyal of Sikkim in approximately 1750 CE, formally granting extensive land holdings to the Rumtek Monastery for its sustenance and religious activities. The decree is written in formal Classical Tibetan administrative script on specially prepared cotton rag paper, dyed with saffron to denote its royal status. The document bears the personal seal of the Chogyal in vermillion cinnabar paste, along with the seals of three senior court officials who witnessed the grant. The decree outlines the precise boundaries of the land grant, the tax exemptions accorded to the monastery, and the responsibilities of the monastic community in return—including performing annual protective rituals for the kingdom. This document is invaluable for understanding the historical relationship between the Sikkimese monarchy and Buddhist monastic institutions.',
    dimensions: '62 × 42 cm (unrolled)',
    material: 'Saffron-dyed cotton rag paper, vermillion seal',
    condition: 'Fair — Some edge deterioration, seal intact',
    language: 'Classical Tibetan (Administrative script)',
    relatedItems: ['ancient-buddhist-texts', 'ceremonial-mask'],
  },
  'ceremonial-mask': {
    id: 'ceremonial-mask',
    title: 'Ceremonial Mask',
    type: 'Artifact',
    date: '19th Century',
    origin: 'Rumtek Monastery Dance Hall',
    catalogId: 'SK-ARC-3001',
    img: ceremonialMaskImg,
    desc: 'Finely carved wooden mask used in the Cham dance festivals, featuring traditional pigments.',
    longDesc: 'This magnificent ceremonial mask represents Mahakala, one of the eight dharmapalas (protector deities) in Tibetan Buddhist iconography. Carved from a single piece of seasoned juniper wood by master craftsmen of the Barmiok clan—hereditary mask-makers who served the monastery for generations—this mask exemplifies the highest achievements of Sikkimese sacred art. The face is painted with traditional mineral pigments: vermillion cinnabar for the fierce red complexion, orpiment yellow for the crown flames, malachite green for the serpentine ornaments, and azurite blue for the wrathful hair. The mask features three bulging eyes symbolizing omniscience, a crown of five skulls representing the five wisdoms, and a garland of severed heads carved in relief around the chin. It was worn during the annual Cham dance performed during the Losar (New Year) festival, where monks in elaborate brocade costumes enacted the cosmic drama of good vanquishing evil.',
    dimensions: '45 × 35 × 25 cm',
    material: 'Juniper wood, mineral pigments, yak hair, copper wire',
    condition: 'Excellent — Recently conserved, original pigments preserved',
    language: 'N/A',
    relatedItems: ['ancient-buddhist-texts', 'royal-decree-sikkim'],
  },
};

// Map IDs to images for related items
const itemImages = {
  'ancient-buddhist-texts': buddhistTextsImg,
  'royal-decree-sikkim': royalDecreeImg,
  'ceremonial-mask': ceremonialMaskImg,
};

const itemTitles = {
  'ancient-buddhist-texts': 'Ancient Buddhist Texts',
  'royal-decree-sikkim': 'Royal Decree of Sikkim',
  'ceremonial-mask': 'Ceremonial Mask',
};

const ArchiveDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const item = archiveData[id];

  if (!item) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <h2 className="text-3xl font-serif text-maroon">Archive Not Found</h2>
          <p className="text-maroon/60">The requested archive item could not be found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-maroon text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            Back to Dashboard
          </button>
        </div>
      </MainLayout>
    );
  }

  const insights = [
    `This ${item.type.toLowerCase()} is one of the most significant examples of its kind in the eastern Himalayan region.`,
    `The craftsmanship suggests it was created during a period of great artistic flourishing at the monastery.`,
    `Similar items have been found in only three other monasteries across the Tibetan cultural sphere.`,
    `Conservation analysis reveals that the materials used were locally sourced, indicating a self-sufficient artistic tradition.`,
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-maroon/60 hover:text-maroon mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl cursor-zoom-in group bg-cream-dark"
              onClick={() => setIsZoomed(true)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                <ZoomIn className="w-5 h-5 text-maroon" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = item.img;
                  link.download = `${item.id}-hd-scan.png`;
                  link.click();
                }}
                className="flex-1 bg-maroon text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20"
              >
                <Download className="w-5 h-5" /> Download HD Scan
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
                  isBookmarked
                    ? 'bg-maroon text-white border-maroon'
                    : 'bg-white text-maroon border-maroon/10 hover:bg-cream-dark'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="w-14 h-14 bg-white text-maroon border border-maroon/10 rounded-2xl flex items-center justify-center hover:bg-cream-dark transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-maroon/5 text-maroon text-[10px] font-bold uppercase tracking-widest border border-maroon/10">
                Verified {item.type}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-maroon mb-4 leading-tight">{item.title}</h1>

            <p className="text-maroon/60 leading-relaxed mb-8 italic">{item.desc}</p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-3xl p-5 border border-maroon/5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-maroon/40" />
                  <span className="text-[10px] text-maroon/40 uppercase font-bold tracking-widest">Period</span>
                </div>
                <p className="font-serif text-maroon text-sm">{item.date}</p>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-maroon/5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-maroon/40" />
                  <span className="text-[10px] text-maroon/40 uppercase font-bold tracking-widest">Origin</span>
                </div>
                <p className="font-serif text-maroon text-sm">{item.origin}</p>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-maroon/5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-maroon/40" />
                  <span className="text-[10px] text-maroon/40 uppercase font-bold tracking-widest">Catalog ID</span>
                </div>
                <p className="font-serif text-maroon text-sm">{item.catalogId}</p>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-maroon/5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-maroon/40" />
                  <span className="text-[10px] text-maroon/40 uppercase font-bold tracking-widest">Material</span>
                </div>
                <p className="font-serif text-maroon text-sm line-clamp-1">{item.material}</p>
              </div>
            </div>

            {/* Full Description */}
            <div className="bg-white rounded-[2rem] p-8 border border-maroon/5 shadow-sm mb-8">
              <h3 className="text-xs font-bold text-maroon/30 uppercase tracking-widest mb-4">Historical Context</h3>
              <p className="text-sm text-maroon/70 leading-relaxed">{item.longDesc}</p>
            </div>

            {/* Physical Details */}
            <div className="bg-cream-dark rounded-[2rem] p-8 border border-maroon/5 mb-8">
              <h3 className="text-xs font-bold text-maroon/30 uppercase tracking-widest mb-4">Conservation Record</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-maroon/50 font-bold">Dimensions</span>
                  <span className="text-sm text-maroon font-serif">{item.dimensions}</span>
                </div>
                <div className="w-full h-px bg-maroon/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-maroon/50 font-bold">Condition</span>
                  <span className="text-sm text-maroon font-serif">{item.condition}</span>
                </div>
                <div className="w-full h-px bg-maroon/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-maroon/50 font-bold">Language</span>
                  <span className="text-sm text-maroon font-serif">{item.language}</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="bg-white text-maroon border border-maroon/10 py-4 px-8 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-maroon hover:text-white transition-all w-full mb-6"
            >
              <Sparkles className="w-5 h-5" /> {showInsights ? 'Hide' : 'Show'} AI Insights
            </button>

            <AnimatePresence>
              {showInsights && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-maroon/5 rounded-[2rem] p-8 border border-maroon/10 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-maroon" />
                      <h3 className="text-xs font-bold text-maroon uppercase tracking-widest">AI Analysis</h3>
                    </div>
                    <ul className="space-y-3">
                      {insights.map((insight, i) => (
                        <li key={i} className="text-sm text-maroon/70 leading-relaxed flex gap-3">
                          <span className="text-maroon/30 font-bold text-xs mt-0.5">0{i + 1}</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Related Items */}
            <div>
              <h3 className="text-xs font-bold text-maroon/30 uppercase tracking-widest mb-4">Related Archives</h3>
              <div className="flex gap-4">
                {item.relatedItems.map((relId) => (
                  <motion.div
                    key={relId}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/archives/${relId}`)}
                    className="flex-1 bg-white rounded-3xl p-4 border border-maroon/5 cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                      <img
                        src={itemImages[relId]}
                        alt={itemTitles[relId]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-sm text-maroon leading-tight">{itemTitles[relId]}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-8"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={item.img}
              alt={item.title}
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default ArchiveDetail;
