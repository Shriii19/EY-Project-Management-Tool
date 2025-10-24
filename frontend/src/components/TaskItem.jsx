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

  const getPriorityGradient = (priority) => {
    const pri = priority?.toLowerCase()
    if (pri === 'high') return 'from-red-500/20 to-red-600/10 border-red-500/40'
    if (pri === 'medium') return 'from-orange-500/20 to-orange-600/10 border-orange-500/40'
    return 'from-green-500/20 to-green-600/10 border-green-500/40'
  }

  const getPriorityBadge = (priority) => {
    const pri = priority?.toLowerCase()
    if (pri === 'high') return 'bg-red-500/20 text-red-300 border-red-500/40'
    if (pri === 'medium') return 'bg-orange-500/20 text-orange-300 border-orange-500/40'
    return 'bg-green-500/20 text-green-300 border-green-500/40'
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.01, y: -2 }}
        className={`group glass-dark p-6 rounded-2xl border-l-4 transition-all duration-300 shadow-lg hover:shadow-2xl ${isCompleted ? 'border-green-500/50' : getPriorityGradient(task.priority)} border border-purple-500/20 hover:border-purple-400/40 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex items-start gap-4 relative z-10">
          {showCompleteCheckbox && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleComplete}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isCompleted
                  ? 'text-green-400 bg-green-500/20 border-2 border-green-500/40 shadow-lg shadow-green-500/20'
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10 border-2 border-gray-600 hover:border-green-500/40'
              }`}
            >
              <CheckCircle2
                className={`w-6 h-6 transition-all duration-300 ${isCompleted ? 'fill-green-400' : ''}`}
              />
            </motion.button>
          )}

          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <motion.h3
                  className={`text-lg font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'text-gray-400 line-through'
                      : 'text-white group-hover:text-purple-300'
                  }`}
                >
                  {task.title}
                </motion.h3>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 border ${getPriorityBadge(task.priority)}`}
                >
                  {task.priority}
                </motion.span>
              </div>

              <div className='relative'>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className='p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300'
                >
                  <MoreVertical className='w-5 h-5' />
                </motion.button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className='absolute right-0 top-12 w-48 glass-dark border border-purple-500/30 rounded-xl shadow-2xl z-20 overflow-hidden'
                    >
                      <motion.button
                        whileHover={{ x: 5, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                        onClick={() => {
                          setShowMenu(false)
                          setShowEditModal(true)
                        }}
                        className='w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all duration-300 text-gray-300 hover:text-white'
                      >
                        <div className='p-1.5 rounded-lg bg-purple-500/20'>
                          <Edit2 className='w-4 h-4 text-purple-400' />
                        </div>
                        <span className='font-medium'>Edit Task</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={() => {
                          setShowMenu(false)
                          handleDelete()
                        }}
                        className='w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all duration-300 text-gray-300 hover:text-red-400 border-t border-purple-500/20'
                      >
                        <div className='p-1.5 rounded-lg bg-red-500/20'>
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-gray-300 mb-4 leading-relaxed text-sm'
              >
                {task.description}
              </motion.p>
            )}

            <div className='flex items-center justify-between text-sm'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  task.dueDate && isToday(new Date(task.dueDate))
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-gray-700/30 text-gray-400 border border-gray-600/30'
                }`}
              >
                <Calendar className='w-4 h-4' />
                <span className='font-semibold'>
                  {task.dueDate
                    ? (isToday(new Date(task.dueDate)) ? 'Due Today' : `Due ${format(new Date(task.dueDate), 'MMM dd')}`)
                    : 'No due date'
                  }
                </span>
              </motion.div>

              <div className='flex items-center gap-2 text-gray-500'>
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
