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
import PanoramaView from './pages/PanoramaView';
import ArchiveDetail from './pages/ArchiveDetail';
import ChantingLibrary from './pages/ChantingLibrary';

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
        <Route path="/panorama/:id" element={<PanoramaView />} />
        <Route path="/archives" element={<DigitalArchives />} />
        <Route path="/archives/:id" element={<ArchiveDetail />} />
        <Route path="/calendar" element={<CulturalCalendar />} />
        <Route path="/chanting" element={<ChantingLibrary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
