import React from 'react';
import { ListTodo, Filter, Plus, Search } from 'lucide-react';

const Tasks = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-purple-400" />
              All Tasks
            </h1>
            <p className="text-slate-400 mt-2">Manage and track all your tasks</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Tasks Coming Soon */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <ListTodo className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Tasks View Coming Soon</h3>
          <p className="text-slate-400">This page will display all tasks from all projects in one unified view.</p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
