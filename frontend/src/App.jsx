import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
