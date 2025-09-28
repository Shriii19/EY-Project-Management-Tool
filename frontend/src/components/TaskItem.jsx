import React, { useEffect, useState } from 'react'
import { MENU_OPTIONS, TI_CLASSES, getPriorityBadgeColor, getPriorityColor } from '../assets/dummy'
import { Calendar, CheckCircle2, Clock, MoreVertical } from 'lucide-react'
import axios from 'axios'
import { format, isToday } from 'date-fns'
import TaskModal from './TaskModal'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskItem = ({ task, onRefresh, showCompleteCheckbox, onLogout = true }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [isCompleted, setIsCompleted] = useState(
    [true, 1, 'yes'].includes(
      typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
    )
  )

  const [showEditModal, setShowEditModal] = useState(false)
  const [subtasks, setSubtasks] = useState(task.subtasks || [])

  useEffect(() => {
    setIsCompleted(
      [true, 1, 'yes'].includes(
        typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
      )
    )
  }, [task.completed])

  const getAuthHeaders = () => {
    // Authentication removed - no token needed
    return {}
  }

  const borderColor = isCompleted ? "border-green-500" : getPriorityColor(task.priority).split(" ")[0]

  const progress = subtasks.length ? (subtasks.filter(st => st.completed).length / subtasks.length) * 100 : 0

  const handleAction = (action) => {
    setShowMenu(false)
    if (action === 'edit') setShowEditModal(true)
    if (action === 'delete') handleDelete()
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/${task._id}/gp`, { headers: getAuthHeaders() })
      onRefresh?.()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleSave = async (updatedTask) => {
    try {
      const payload = (({ title, description, priority, dueDate, completed }) => ({ title, description, priority, dueDate, completed }))(updatedTask)
      await axios.put(`${API_BASE}/${task._id}/gp`, payload, { headers: getAuthHeaders() })
      setShowEditModal(false)
      onRefresh?.()
    } catch (err) {
      console.error('Save failed:', err)
    }
  }

  const handleComplete = async () => {
    const newStatus = isCompleted ? 'No' : 'Yes'
    try {
      await axios.put(`${API_BASE}/${task._id}/gp`, { completed: newStatus }, { headers: getAuthHeaders() })
      setIsCompleted(!isCompleted)
      onRefresh?.()
    } catch (err) {
      console.error('Complete toggle failed:', err)
    }
  }

  return (
    <>
      <div className={`group glass-dark p-6 rounded-2xl border-l-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-slideUp ${borderColor} border border-blue-500/20 hover:border-blue-400/40`}>
        <div className="flex items-start gap-4">
          {showCompleteCheckbox && (
            <button
              onClick={handleComplete}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                isCompleted 
                  ? 'text-green-400 bg-green-500/10 border border-green-500/30' 
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10 border border-gray-600'
              }`}
            >
              <CheckCircle2
                className={`w-6 h-6 transition-all duration-300 ${isCompleted ? 'fill-green-500 text-green-500' : ''}`}
              />
            </button>
          )}

          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <h3 className={`text-lg font-bold transition-all duration-300 ${
                  isCompleted 
                    ? 'text-gray-400 line-through' 
                    : 'text-white group-hover:text-blue-300'
                }`}>
                  {task.title}
                </h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                  task.priority?.toLowerCase() === 'high' 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : task.priority?.toLowerCase() === 'medium'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                  {task.priority}
                </span>
              </div>
              
              <div className='relative'>
                <button onClick={() => setShowMenu(!showMenu)} className='p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300'>
                  <MoreVertical className='w-5 h-5' />
                </button>

                {showMenu && (
                  <div className='absolute right-0 top-12 w-48 glass-dark border border-blue-500/30 rounded-xl shadow-2xl z-10 overflow-hidden animate-fadeIn'>
                    {MENU_OPTIONS.map(opt => (
                      <button
                        key={opt.action}
                        onClick={() => handleAction(opt.action)}
                        className='w-full px-4 py-3 text-left text-sm hover:bg-blue-500/10 flex items-center gap-3 transition-all duration-300 text-gray-300 hover:text-white'
                      >
                        <div className={`p-1.5 rounded-lg ${
                          opt.action === 'delete' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {opt.icon}
                        </div>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className='text-gray-300 mb-4 leading-relaxed'>{task.description}</p>
            )}
            
            <div className='flex items-center justify-between text-sm'>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                task.dueDate && isToday(new Date(task.dueDate)) 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'bg-gray-700/30 text-gray-400 border border-gray-600/30'
              }`}>
                <Calendar className='w-4 h-4' />
                <span className='font-medium'>
                  {task.dueDate 
                    ? (isToday(new Date(task.dueDate)) ? 'Due Today' : `Due ${format(new Date(task.dueDate), 'MMM dd')}`)
                    : 'No due date'
                  }
                </span>
              </div>

              <div className='flex items-center gap-2 text-gray-500'>
                <Clock className='w-4 h-4' />
                <span>
                  {task.createdAt ? format(new Date(task.createdAt), 'MMM dd') : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
