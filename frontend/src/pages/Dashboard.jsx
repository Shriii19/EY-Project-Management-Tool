import React, { useState, useMemo, useCallback } from 'react'
import { EMPTY_STATE, FILTER_LABELS, FILTER_OPTIONS, FILTER_WRAPPER, HEADER, ICON_WRAPPER, LABEL_CLASS, SELECT_CLASSES, STAT_CARD, STATS, STATS_GRID, TAB_ACTIVE, TAB_BASE, TAB_INACTIVE, TABS_WRAPPER, VALUE_CLASS, WRAPPER } from '../assets/dummy'
import { HomeIcon, Filter, Calendar } from 'lucide-react' // Plus removed - creation disabled
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

  
  //FILTER TASKS
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
        return true; // 'all' or any other case, return all tasks
    }
  }), [tasks, filter]);

  //Saving Tasks - only editing allowed now
  const handleTaskSave = useCallback(async (taskData) => {
    try {
      if (taskData.id) {
        // Authentication removed - make request without token
        await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData);
        refreshTasks();
        setShowModal(false);
        setSelectTask(null);
      }
    } catch (error) {
      console.log("Error saving task : ", error)
    }
  }, [refreshTasks]);

  return (
    <div className="min-h-screen px-6 py-8 text-white animate-fadeIn">
      {/* Header */}
      <div className={HEADER}>
        <div className="min-w-0">
          <h1 className='text-3xl md:text-4xl font-black text-white flex items-center gap-3 mb-2'>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
              <HomeIcon className='w-8 h-8 text-blue-400 drop-shadow-lg' />
            </div>
            <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'>Task Overview</span>
          </h1>
          <p className='text-gray-300 ml-14 text-lg font-medium'>Manage Your Tasks with Excellence</p>
        </div>
        {/* Add New Task button removed */}
      </div>

      {/* STATS */}
      <div className={`${STATS_GRID} mb-8`}>
        {STATS.map(({ key, label, icon: Icon, iconColor, borderColor = "border-red-600", valueKey, textColor, gradient }) => (
          <div key={key} className={`group glass-dark p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-opacity-60 animate-slideUp ${borderColor} hover:shadow-xl`}>
            <div className='flex items-center gap-4'>
              <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${iconColor}`}>
                <Icon className='w-6 h-6' />
              </div>

              <div className="min-w-0">
                <p className={`text-3xl font-black mb-1 ${
                  gradient ?
                    "bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent" : textColor
                }`}>
                  {stats[valueKey]}
                </p>
                <p className="text-gray-300 text-sm font-medium">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contents  */}
      <div className="space-y-8">
        {/* FILTER */}
        <div className="glass-dark p-6 rounded-2xl border border-blue-500/20 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Filter className='w-6 h-6 text-blue-400' />
              </div>
              <div>
                <h2 className='text-xl font-bold text-white'>
                  {FILTER_LABELS[filter]}
                </h2>
                <p className='text-sm text-gray-400'>Filter your tasks by category</p>
              </div>
            </div>
            
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-slate-800/50 border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 text-white md:hidden">
              {FILTER_OPTIONS.map(opt => <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>)}
            </select>

            <div className="hidden md:flex space-x-2 bg-slate-800/30 p-2 rounded-xl border border-blue-500/20">
              {FILTER_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setFilter(opt)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === opt 
                    ? 'bg-blue-600 text-white shadow-lg border border-blue-400' 
                    : 'text-gray-300 hover:text-blue-300 hover:bg-blue-500/10'
                }`}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="space-y-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center glass-dark p-12 rounded-2xl border border-blue-500/20 animate-fadeIn">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center animate-float">
                  <Calendar className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <h3 className='text-2xl font-bold mb-3 text-white'>
                No Tasks Found
              </h3>
              <p className='text-gray-300 mb-6 max-w-md mx-auto'>
                {filter === "all" ? "No tasks available. Start by creating your first task!" : `No tasks match the "${filter}" filter. Try adjusting your filter criteria.`}
              </p>
              {/* Add New Task button removed */}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task, index) => (
                <div key={task._id || task.id} className="animate-slideUp" style={{animationDelay: `${index * 50}ms`}}>
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

        {/* ADD Task Desktop section removed */}
      </div>

      {/* MODAL - only for editing */}
      <TaskModal isOpen={showModal && !!selectedTasks}
        onClose={() => {
          setShowModal(false);
          setSelectTask(null);
        }}
        taskToEdit={selectedTasks}
        onSave={handleTaskSave} />

    </div>
  )
}

export default Dashboard
