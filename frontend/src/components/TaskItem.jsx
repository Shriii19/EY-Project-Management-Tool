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

  const borderGlow = () => {
    const pri = task.priority?.toLowerCase()
    if (isCompleted) return '0 0 20px rgba(34, 197, 94, 0.2)'
    if (pri === 'high') return '0 0 20px rgba(239, 68, 68, 0.2)'
    if (pri === 'medium') return '0 0 20px rgba(245, 158, 11, 0.2)'
    return '0 0 20px rgba(34, 197, 94, 0.2)'
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ y: -2 }}
        className={`group glass rounded-2xl p-6 border-l-4 ${isCompleted ? 'border-green-500/60' : getPriorityBorder(task.priority)} border-r border-t border-b border-purple-500/20 hover:border-purple-400/40 transition-all duration-300`}
        style={{
          boxShadow: borderGlow()
        }}
      >
        <div className="flex items-start gap-4">
          {showCompleteCheckbox && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleComplete}
              className={`p-2.5 rounded-xl transition-all ${
                isCompleted
                  ? 'text-green-400 bg-green-500/20 border border-green-500/40'
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10 border border-purple-500/20 hover:border-green-500/40'
              }`}
              style={isCompleted ? {
                boxShadow: '0 0 16px rgba(34, 197, 94, 0.3)'
              } : {}}
            >
              <CheckCircle2
                className={`w-5 h-5 transition-all ${isCompleted ? 'fill-green-400' : ''}`}
              />
            </motion.button>
          )}

          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <h3
                  className={`text-base font-bold transition-all ${
                    isCompleted
                      ? 'text-gray-500 line-through'
                      : 'text-white'
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${getPriorityBadge(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className='relative'>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className='p-2.5 text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-all border border-transparent hover:border-purple-500/30'
                >
                  <MoreVertical className='w-5 h-5' />
                </motion.button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className='absolute right-0 top-12 w-48 glass-dark border border-purple-500/30 rounded-2xl shadow-2xl z-20 overflow-hidden'
                      style={{
                        boxShadow: '0 0 32px rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      <motion.button
                        whileHover={{ x: 4, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                        onClick={() => {
                          setShowMenu(false)
                          setShowEditModal(true)
                        }}
                        className='w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all text-gray-300 hover:text-white'
                      >
                        <div className='p-2 rounded-lg bg-purple-500/20 border border-purple-400/30' style={{
                          boxShadow: '0 0 12px rgba(168, 85, 247, 0.3)'
                        }}>
                          <Edit2 className='w-4 h-4 text-purple-400' />
                        </div>
                        <span className='font-bold'>Edit Task</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ x: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={() => {
                          setShowMenu(false)
                          handleDelete()
                        }}
                        className='w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all text-gray-300 hover:text-red-400 border-t border-purple-500/20'
                      >
                        <div className='p-2 rounded-lg bg-red-500/20 border border-red-400/30' style={{
                          boxShadow: '0 0 12px rgba(239, 68, 68, 0.3)'
                        }}>
                          <Trash2 className='w-4 h-4 text-red-400' />
                        </div>
                        <span className='font-bold'>Delete Task</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {task.description && (
              <p className='text-gray-400 mb-4 leading-relaxed text-sm font-medium'>
                {task.description}
              </p>
            )}

            <div className='flex items-center justify-between text-sm'>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  task.dueDate && isToday(new Date(task.dueDate))
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                    : 'glass text-gray-400 border border-purple-500/20'
                }`}
                style={task.dueDate && isToday(new Date(task.dueDate)) ? {
                  boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)'
                } : {}}
              >
                <Calendar className='w-4 h-4' />
                <span className='font-bold'>
                  {task.dueDate
                    ? (isToday(new Date(task.dueDate)) ? 'Due Today' : `Due ${format(new Date(task.dueDate), 'MMM dd')}`)
                    : 'No due date'
                  }
                </span>
              </div>

              <div className='flex items-center gap-2 text-gray-500'>
                <Clock className='w-4 h-4' />
                <span className='text-xs font-bold'>
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
