import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FILTER_OPTIONS } from '../assets/dummy'
import { Filter, Calendar, Sparkles, Target, CheckCircle2, Clock, TrendingUp, Flame, Star, Award } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 text-white relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Header Section */}
      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-purple-500/30 mb-6"
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
            }}
          >
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">Dashboard Analytics</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl lg:text-6xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-white text-transparent bg-clip-text">
              Your Workspace
            </span>
          </motion.h1>

          <p className="text-lg text-gray-400 max-w-2xl font-medium">
            Track your productivity with real-time analytics
          </p>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(168, 85, 247, 0.15)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30 group-hover:bg-purple-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)'
              }}>
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-3xl font-black text-white">{stats.total}</span>
            </div>
            <div className="text-sm text-gray-400 font-semibold">Total Projects</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(34, 197, 94, 0.15)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30 group-hover:bg-green-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(34, 197, 94, 0.3)'
              }}>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-3xl font-black text-white">{stats.completed}</span>
            </div>
            <div className="text-sm text-gray-400 font-semibold">Completed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(245, 158, 11, 0.15)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/30 group-hover:bg-amber-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.3)'
              }}>
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-3xl font-black text-white">{stats.total - stats.completed}</span>
            </div>
            <div className="text-sm text-gray-400 font-semibold">In Progress</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(59, 130, 246, 0.15)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(59, 130, 246, 0.3)'
              }}>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-3xl font-black text-white">{completionRate}%</span>
            </div>
            <div className="text-sm text-gray-400 font-semibold">Success Rate</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-8 border border-purple-500/30"
          style={{
            boxShadow: '0 0 32px rgba(168, 85, 247, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Overall Progress
              </h3>
              <p className="text-sm text-gray-400 font-medium">{stats.completed} of {stats.total} tasks completed</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{completionRate}%</div>
            </div>
          </div>
          <div className="h-3.5 bg-gray-800/50 rounded-full overflow-hidden border border-purple-500/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
              }}
            />
          </div>
        </motion.div>

        {/* Priority Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(239, 68, 68, 0.15)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-400/30 group-hover:bg-red-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.3)'
              }}>
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">{stats.highPriority}</div>
                <div className="text-sm text-gray-400 font-semibold">Critical Tasks</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(245, 158, 11, 0.15)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/30 group-hover:bg-amber-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.3)'
              }}>
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">{stats.mediumPriority}</div>
                <div className="text-sm text-gray-400 font-semibold">Medium Priority</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 24px rgba(34, 197, 94, 0.15)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30 group-hover:bg-green-500/30 transition-all" style={{
                boxShadow: '0 0 16px rgba(34, 197, 94, 0.3)'
              }}>
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">{stats.lowPriority}</div>
                <div className="text-sm text-gray-400 font-semibold">Low Priority</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass rounded-2xl p-6 border border-purple-500/30" style={{
            boxShadow: '0 0 24px rgba(168, 85, 247, 0.15)'
          }}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30" style={{
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)'
              }}>
                <Filter className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Smart Filters</h3>
                <p className="text-sm text-gray-400 font-medium">Organize by category or priority</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((opt) => (
                <motion.button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    filter === opt
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white border border-purple-400/50'
                      : 'glass text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-400/40'
                  }`}
                  style={filter === opt ? {
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                  } : {}}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Task List */}
        <div>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 glass rounded-2xl border border-purple-500/20"
              style={{
                boxShadow: '0 0 32px rgba(168, 85, 247, 0.1)'
              }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl glass border border-purple-500/30 flex items-center justify-center" style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
              }}>
                <Calendar className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">No Tasks Found</h3>
              <p className="text-gray-400 max-w-md mx-auto font-medium">
                {filter === "all"
                  ? "Your workspace is clean! Time to add new tasks."
                  : `No tasks match the "${filter}" filter.`
                }
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id || task.id}
                  task={task}
                  onRefresh={refreshTasks}
                  showCompleteCheckbox
                  onEdit={() => {
                    setSelectTask(task);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          )}
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
