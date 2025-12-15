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
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Dashboard</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">
              Your Tasks
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl">
            Manage and organize your work efficiently
          </p>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="text-sm text-slate-400">Total Tasks</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.completed}</span>
            </div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.total - stats.completed}</span>
            </div>
            <div className="text-sm text-slate-400">Pending</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{completionRate}%</span>
            </div>
            <div className="text-sm text-slate-400">Completion</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Progress</h3>
              <p className="text-sm text-slate-400">{stats.completed} of {stats.total} tasks completed</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{completionRate}%</div>
            </div>
          </div>
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Priority Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-red-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Flame className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.highPriority}</div>
                <div className="text-sm text-slate-400">High Priority</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Target className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.mediumPriority}</div>
                <div className="text-sm text-slate-400">Medium Priority</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Star className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.lowPriority}</div>
                <div className="text-sm text-slate-400">Low Priority</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/50 border border-slate-800 rounded-lg p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Filter className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Filter Tasks</h3>
                <p className="text-sm text-slate-400">View by category</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filter === opt
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 rounded-lg border border-slate-800">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Tasks Found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                {filter === "all"
                  ? "Your task list is empty."
                  : `No tasks match the "${filter}" filter.`
                }
              </p>
            </div>
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
