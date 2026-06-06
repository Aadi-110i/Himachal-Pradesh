import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [language, setLanguage] = useState('English'); // English, Hindi, Tibetan
  const [unlockedLore, setUnlockedLore] = useState([]);

  const addPoints = (amount) => setPoints(prev => prev + amount);
  
  const awardBadge = (badge) => {
    if (!badges.find(b => b.id === badge.id)) {
      setBadges(prev => [...prev, badge]);
      addPoints(50); // Standard badge reward
      return true;
    }
    return false;
  };

  const toggleLanguage = (lang) => setLanguage(lang);

  const value = {
    points,
    badges,
    language,
    unlockedLore,
    addPoints,
    awardBadge,
    toggleLanguage,
    setUnlockedLore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
