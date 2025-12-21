import React from 'react';
import { BarChart3, TrendingUp, Activity, PieChart } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            Analytics & Insights
          </h1>
          <p className="text-slate-400 mt-2">Track your project metrics and team performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">87%</h3>
            <p className="text-slate-400 text-sm">Completion Rate</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">24</h3>
            <p className="text-slate-400 text-sm">Active Projects</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-semibold">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">156</h3>
            <p className="text-slate-400 text-sm">Tasks Completed</p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
          <p className="text-slate-400">Detailed charts, reports, and insights will be available here.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
