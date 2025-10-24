import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SORT_OPTIONS } from '../assets/dummy'
import { Clock, Filter, ListChecks } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import TaskItem from '../components/TaskItem'
import TaskModal from '../components/TaskModal'


const PendingPage = () => {

  const {tasks = [], refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState('newest')

  const [selectedTask,setSelectedTask] = useState(null)



    const sortedPendingTasks = useMemo(()=>{
      const filtered = tasks.filter(
        (t) => !t.completed || (typeof t.completed==='string' && 
          t.completed.toLowerCase() === 'no')
      )
      return filtered.sort((a,b)=>{
        if(sortBy === 'newest') return new Date(b.createdAt)-new Date(a.createdAt);
        if(sortBy==='oldest') return new Date(a.createdAt)-new Date(b.createdAt);
        const order = {high:3 , medium:2 , low:1}
        return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()]
      })

},[tasks,sortBy])
  return (
    <div className="p-6 pt-0 min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className='text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2'>
            <ListChecks className='text-purple-400'/>Pending Tasks
          </h1>
          <p className='text-sm text-gray-400 mt-1 ml-7'>
            {sortedPendingTasks.length} task{sortedPendingTasks.length !== 1 && 's'} needing your attention
          </p>
        </div>
          <div className="flex items-center justify-between glass p-3 rounded-xl shadow-sm border border-purple-100/20 w-full md:w-auto">
            <div className='flex items-center gap-2 text-gray-300 font-medium'>
              <Filter className='w-4 h-4 text-purple-400'/>
              <span className='text-sm'>Sort By:</span>

            </div>
            <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)} className="px-3 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 md:hidden text-sm bg-transparent text-white">
              <option value="newest" className='bg-slate-800'>Newest First</option>
              <option value="oldest" className='bg-slate-800'>Oldest First</option>
              <option value="priority" className='bg-slate-800'>By Priority</option>
            </select>

            <div className="hidden md:flex p-3 space-x-1 glass rounded-lg ml-3">
              {SORT_OPTIONS.map((opt, index) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    sortBy === opt.id
                      ? 'bg-purple-600/30 text-purple-300 shadow-sm border border-purple-500/30'
                      : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
                  }`}
                >
                  {opt.icon}{opt.label}
                </motion.button>
              ))}

            </div>
          </div>
      </motion.div>

      <div className='space-y-4'>
        <AnimatePresence>
          {sortedPendingTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 glass-dark rounded-xl shadow-sm border border-purple-400/20 text-center"
            >
              <div className='min-w-xs mx-auto py-6'>
                <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-8 h-8 text-purple-400'/>
                </div>
                <h3 className='text-lg font-semibold text-gray-300 mb-2'>All Caught Up</h3>
                <p className='text-sm text-gray-400 mb-4'>
                  No pending tasks - Great Work! 🎉
                </p>
              </div>
            </motion.div>
          ) : (
            sortedPendingTasks.map((task, index) => (
              <motion.div
                key={task._id || task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TaskItem
                  task={task}
                  showCompleteCheckbox
                  onEdit={() => { setSelectedTask(task); }}
                  onRefresh={refreshTasks}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <TaskModal isOpen={!!selectedTask}
              onClose={()=>{setSelectedTask(null);refreshTasks();}}
              taskToEdit={selectedTask}/>
    </div>
  )
}

export default PendingPage
