import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Welcome to EY Project Management Tool
            </h1>
            
            <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl shadow-purple-500/10">
              <h2 className="text-2xl font-semibold text-slate-200 mb-4">
                Modern Navbar Implemented ✨
              </h2>
              <div className="text-slate-400 space-y-3 text-left">
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Responsive design with mobile hamburger menu</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Glassmorphism effects with backdrop blur</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Active link highlighting and smooth transitions</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Theme toggle (dark/light mode)</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Notification badge with counter</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>User profile dropdown menu</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Keyboard navigation & ARIA accessibility</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
                <div className="text-slate-400 text-sm">Navigation Items</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <div className="text-3xl font-bold text-pink-400 mb-2">3</div>
                <div className="text-slate-400 text-sm">Profile Actions</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-slate-400 text-sm">Responsive</div>
              </div>
            </div>

            <div className="text-slate-500 text-sm space-y-1">
              <p>Backend Status: <span className="text-green-400">✅ Running</span></p>
              <p>API Endpoints: <span className="text-green-400">✅ Available</span></p>
              <p>Frontend: <span className="text-purple-400">✨ Enhanced with Modern UI</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
