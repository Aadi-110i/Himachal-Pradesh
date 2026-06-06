import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ARViewer from './pages/ARViewer';
import MapNavigation from './pages/MapNavigation';
import DigitalArchives from './pages/DigitalArchives';
import CulturalCalendar from './pages/CulturalCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ar" element={<ARViewer />} />
        <Route path="/map" element={<MapNavigation />} />
        <Route path="/archives" element={<DigitalArchives />} />
        <Route path="/calendar" element={<CulturalCalendar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
