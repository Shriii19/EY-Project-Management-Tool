import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MENU_OPTIONS, getPriorityColor } from '../assets/dummy'
import { Calendar, CheckCircle2, Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { format, isToday } from 'date-fns'
import TaskModal from './TaskModal'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskItem = ({ task, onRefresh, showCompleteCheckbox }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [isCompleted, setIsCompleted] = useState(
    [true, 1, 'yes'].includes(
      typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
    )
  )
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    setIsCompleted(
      [true, 1, 'yes'].includes(
        typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
      )
    )
  }, [task.completed])

  const getPriorityBorder = (priority) => {
    const pri = priority?.toLowerCase()
    if (pri === 'high') return 'border-red-500/50'
    if (pri === 'medium') return 'border-amber-500/50'
    return 'border-green-500/50'
  }

  const getPriorityBadge = (priority) => {
    const pri = priority?.toLowerCase()
    if (pri === 'high') return 'bg-red-500/10 text-red-400 border-red-500/30'
    if (pri === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    return 'bg-green-500/10 text-green-400 border-green-500/30'
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/${task._id}/gp`)
      onRefresh?.()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleSave = async (updatedTask) => {
    try {
      const payload = (({ title, description, priority, dueDate, completed }) => 
        ({ title, description, priority, dueDate, completed }))(updatedTask)
      await axios.put(`${API_BASE}/${task._id}/gp`, payload)
      setShowEditModal(false)
      onRefresh?.()
    } catch (err) {
      console.error('Save failed:', err)
    }
  }

  const handleComplete = async () => {
    const newStatus = isCompleted ? 'No' : 'Yes'
    try {
      await axios.put(`${API_BASE}/${task._id}/gp`, { completed: newStatus })
      setIsCompleted(!isCompleted)
      onRefresh?.()
    } catch (err) {
      console.error('Complete toggle failed:', err)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`group bg-slate-900/50 border-l-4 ${isCompleted ? 'border-green-500/50' : getPriorityBorder(task.priority)} border-r border-t border-b border-slate-800 rounded-lg p-5 hover:border-r-slate-700 hover:border-t-slate-700 hover:border-b-slate-700 transition-all duration-200`}
      >
        <div className="flex items-start gap-4">
          {showCompleteCheckbox && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className={`p-2 rounded-lg transition-all ${
                isCompleted
                  ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                  : 'text-slate-400 hover:text-green-400 hover:bg-green-500/10 border border-slate-700 hover:border-green-500/30'
              }`}
            >
              <CheckCircle2
                className={`w-5 h-5 transition-all ${isCompleted ? 'fill-green-400' : ''}`}
              />
            </motion.button>
          )}

          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <h3
                  className={`text-base font-semibold transition-all ${
                    isCompleted
                      ? 'text-slate-500 line-through'
                      : 'text-white'
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getPriorityBadge(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className='relative'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className='p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all'
                >
                  <MoreVertical className='w-5 h-5' />
                </motion.button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className='absolute right-0 top-10 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden'
                    >
                      <motion.button
                        whileHover={{ x: 3, backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
                        onClick={() => {
                          setShowMenu(false)
                          setShowEditModal(true)
                        }}
                        className='w-full px-3.5 py-2.5 text-left text-sm flex items-center gap-3 transition-all text-slate-300 hover:text-white'
                      >
                        <div className='p-1 rounded bg-cyan-500/20'>
                          <Edit2 className='w-4 h-4 text-cyan-400' />
                        </div>
                        <span className='font-medium'>Edit Task</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ x: 3, backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
                        onClick={() => {
                          setShowMenu(false)
                          handleDelete()
                        }}
                        className='w-full px-3.5 py-2.5 text-left text-sm flex items-center gap-3 transition-all text-slate-300 hover:text-red-400 border-t border-slate-700'
                      >
                        <div className='p-1 rounded bg-red-500/20'>
                          <Trash2 className='w-4 h-4 text-red-400' />
                        </div>
                        <span className='font-medium'>Delete Task</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {task.description && (
              <p className='text-slate-400 mb-3 leading-relaxed text-sm'>
                {task.description}
              </p>
            )}

            <div className='flex items-center justify-between text-sm'>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  task.dueDate && isToday(new Date(task.dueDate))
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <Calendar className='w-4 h-4' />
                <span className='font-medium'>
                  {task.dueDate
                    ? (isToday(new Date(task.dueDate)) ? 'Due Today' : `Due ${format(new Date(task.dueDate), 'MMM dd')}`)
                    : 'No due date'
                  }
                </span>
              </div>

              <div className='flex items-center gap-2 text-slate-500'>
                <Clock className='w-4 h-4' />
                <span className='text-xs font-medium'>
                  {task.createdAt ? format(new Date(task.createdAt), 'MMM dd') : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <TaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        taskToEdit={task}
        onSave={handleSave}
      />
    </>
  )
}

export default TaskItem
