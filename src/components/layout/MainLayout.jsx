import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Box, LogIn, Menu, X, Landmark, Globe, Archive, Calendar, MoreHorizontal, Users, Compass, Plane, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import AudioGuide from '../ui/AudioGuide';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useGame();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Tours', path: '/ar', icon: Compass },
    { name: 'Travel', path: '/booking', icon: Plane },
    { name: 'Discovery', path: '/globe', icon: Sparkles },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Heritage Home';
      case '/map': return 'Heritage Map';
      case '/ar': return '360° Tours';
      case '/booking': return 'Plan Journey';
      case '/globe': return 'Divine Discovery';
      case '/archives': return 'Archives';
      case '/calendar': return 'Community';
      default: return 'Himachal Treasures';
    }
  };

  return (
    <div className="min-h-screen bg-cream text-gray-900 font-sans">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-maroon/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-maroon/5 rounded-full transition-colors text-maroon"
          >
            <X className="w-5 h-5 rotate-45" /> {/* Simple back-like arrow representation as seen in screenshot */}
          </button>

          <h1 className="text-xl font-serif font-bold text-maroon tracking-tight">
            {getPageTitle()}
          </h1>

          <button 
            className="p-2 hover:bg-maroon/5 rounded-full transition-colors text-maroon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-24 max-w-7xl mx-auto min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation (Mobile/Standard) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-maroon/5 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
                  isActive ? 'text-maroon font-bold' : 'text-gray-400'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              <span className="text-[10px] uppercase tracking-tighter">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="w-1 h-1 bg-maroon rounded-full absolute -bottom-1"
                />
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Global Audio Guide */}
      <AudioGuide />
    </div>
  );
};

export default MainLayout;
