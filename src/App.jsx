import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ARViewer from './pages/ARViewer';
import MapNavigation from './pages/MapNavigation';
import DigitalArchives from './pages/DigitalArchives';
import CulturalCalendar from './pages/CulturalCalendar';
import PanoramaView from './pages/PanoramaView';
import ArchiveDetail from './pages/ArchiveDetail';
import ChantingLibrary from './pages/ChantingLibrary';
import TravelBooking from './pages/TravelBooking';
import Feedback from './pages/Feedback';
import DiscoveryGlobe from './pages/DiscoveryGlobe';
import SplashScreen from './components/ui/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on initial load, checking session storage
    const hasSeenSplash = sessionStorage.getItem('ht_splash_seen');
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('ht_splash_seen', 'true');
  };

  return (
    <Router>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} key="splash" />}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ar" element={<ARViewer />} />
        <Route path="/map" element={<MapNavigation />} />
        <Route path="/globe" element={<DiscoveryGlobe />} />
        <Route path="/panorama/:id" element={<PanoramaView />} />
        <Route path="/booking" element={<TravelBooking />} />
        <Route path="/archives" element={<DigitalArchives />} />
        <Route path="/archives/:id" element={<ArchiveDetail />} />
        <Route path="/calendar" element={<CulturalCalendar />} />
        <Route path="/chanting" element={<ChantingLibrary />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
