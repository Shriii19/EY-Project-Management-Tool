import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Dashboard Page */}
      <Dashboard />
    </div>
  );
};

export default App;
