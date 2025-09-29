import React, { useState, useMemo, useCallback } from 'react'
import { EMPTY_STATE, FILTER_LABELS, FILTER_OPTIONS, FILTER_WRAPPER, HEADER, ICON_WRAPPER, LABEL_CLASS, SELECT_CLASSES, STAT_CARD, STATS, STATS_GRID, TAB_ACTIVE, TAB_BASE, TAB_INACTIVE, TABS_WRAPPER, VALUE_CLASS, WRAPPER } from '../assets/dummy'
import { HomeIcon, Filter, Calendar, Flame, Sparkles, Target, CheckCircle2, Clock, TrendingUp, Zap, Star, Award } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import TaskItem from '../components/TaskItem'
import axios from 'axios'
import TaskModal from '../components/TaskModal'

const API_BASE = 'http://localhost:4000/api/tasks'

const Dashboard = () => {
  const { tasks, refreshTasks } = useOutletContext()
  const [showModal, setShowModal] = useState(false)
  const [selectedTasks, setSelectTask] = useState(null)
  const [filter, setFilter] = useState('all')

  const stats = useMemo(() => ({
    total: tasks.length,
    lowPriority: tasks.filter(t => t.priority?.toLowerCase() === 'low').length,
    mediumPriority: tasks.filter(t => t.priority?.toLowerCase() === 'medium').length,
    highPriority: tasks.filter(t => t.priority?.toLowerCase() === 'high').length,
    completed: tasks.filter(t => t.completed === true || t.completed === 1 || (
      typeof t.completed === 'string' && t.completed.toLowerCase() === 'yes'
    )).length
  }), [tasks]);

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const dueDate = new Date(task.DueDate);
    const today = new Date();
    const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
    switch (filter) {
      case 'today':
        return dueDate.toDateString() === today.toDateString();
      case 'week':
        return dueDate >= today && dueDate <= nextWeek;
      case "high":
      case "medium":
      case "low":
        return task.priority?.toLowerCase() === filter;
      default:
        return true;
    }
  }), [tasks, filter]);

  const handleTaskSave = useCallback(async (taskData) => {
    try {
      if (taskData.id) {
        await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData);
        refreshTasks();
        setShowModal(false);
        setSelectTask(null);
      }
    } catch (error) {
      console.log("Error saving task : ", error)
    }
  }, [refreshTasks]);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Welcome to Your Productivity Hub</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 animate-slideUp">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tasks
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeIn" style={{animationDelay: '0.3s'}}>
              Transform your productivity with our elegant task management system.
              Stay organized, focused, and achieve more with style.
            </p>

            {/* Quick Stats Hero */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slideUp" style={{animationDelay: '0.5s'}}>
              <div className="group">
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{stats.total}</div>
                    <div className="text-sm text-purple-300 font-medium">Total Tasks</div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{stats.completed}</div>
                    <div className="text-sm text-green-300 font-medium">Completed</div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{stats.total - stats.completed}</div>
                    <div className="text-sm text-orange-300 font-medium">Pending</div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{completionRate}%</div>
                    <div className="text-sm text-blue-300 font-medium">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="max-w-4xl mx-auto mb-16 animate-slideUp" style={{animationDelay: '0.7s'}}>
            <div className="relative p-8 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    Your Progress
                  </h3>
                  <p className="text-gray-400">Track your productivity journey</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{completionRate}%</div>
                  <div className="text-sm text-gray-400">Completion Rate</div>
                </div>
              </div>

              <div className="relative">
                <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-lg relative"
                    style={{ width: `${completionRate}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{stats.completed} completed</span>
                  <span>{stats.total - stats.completed} remaining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slideUp" style={{animationDelay: '0.9s'}}>
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30">
                  <Flame className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stats.highPriority}</div>
                  <div className="text-sm text-red-300 font-medium">High Priority</div>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-orange-500/20 border border-orange-500/30">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stats.mediumPriority}</div>
                  <div className="text-sm text-orange-300 font-medium">Medium Priority</div>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-green-500/20 border border-green-500/30">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stats.lowPriority}</div>
                  <div className="text-sm text-green-300 font-medium">Low Priority</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter Section */}
          <div className="mb-8 animate-slideUp" style={{animationDelay: '1.1s'}}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <Filter className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Filter Tasks</h3>
                  <p className="text-gray-400 text-sm">Focus on what matters most</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {FILTER_OPTIONS.map((opt, index) => (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === opt
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/50'
                        : 'bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50'
                    }`}
                    style={{animationDelay: `${1.3 + index * 0.1}s`}}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="animate-slideUp" style={{animationDelay: '1.5s'}}>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center animate-float">
                    <Calendar className="w-16 h-16 text-slate-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No Tasks Found</h3>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                  {filter === "all"
                    ? "Your task list is empty. Time to create something amazing!"
                    : `No tasks match the "${filter}" filter. Try a different category.`
                  }
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task._id || task.id}
                    className="animate-slideUp hover:scale-[1.02] transition-transform duration-300"
                    style={{animationDelay: `${1.7 + index * 0.1}s`}}
                  >
                    <TaskItem
                      task={task}
                      onRefresh={refreshTasks}
                      showCompleteCheckbox
                      onEdit={() => {
                        setSelectTask(task);
                        setShowModal(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showModal && !!selectedTasks}
        onClose={() => {
          setShowModal(false);
          setSelectTask(null);
        }}
        taskToEdit={selectedTasks}
        onSave={handleTaskSave}
      />
    </div>
  )
}

export default Dashboard
