import React, { useMemo, useState } from 'react'
import {layoutClasses, SORT_OPTIONS} from '../assets/dummy'
import { Clock, Filter, ListChecks } from 'lucide-react' // Plus removed - creation disabled
import {useOutletContext} from 'react-router-dom'
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
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent flex items-center gap-2'>
            <ListChecks className='text-green-500'/>Pending Tasks
          </h1>
          <p className='text-sm text-gray-500 mt-1 ml-7 '>
            {sortedPendingTasks.length} task{sortedPendingTasks !== 1 && 's'}  Needing Your Attention
          </p>
        </div>
          <div className={layoutClasses.sortBox}>
            <div className='flex items-center gap-2 text-gray-700 font-medium'>
              <Filter className='w-4 h-4 text-blue-500'/>
              <span className='text-sm'>Sort By :</span>

            </div>
            <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)} className={layoutClasses.select}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>

            <div className={layoutClasses.tabWrapper}>
              {SORT_OPTIONS.map(opt=>(
                <button key={opt.id} onClick={()=>setSortBy(opt.id)}
                className={layoutClasses.tabButton(sortBy===opt.id)}
                >
                  {opt.icon}{opt.label}

                </button>
              ))}

            </div>
          </div>
      </div>

      {/* Add Task section removed */}
      <div className='space-y-4'>
              {sortedPendingTasks.length === 0 ? (
                <div className={layoutClasses.emptyState}>
                  <div className='min-w-xs mx-auto py-6'>
                    <div className={layoutClasses.emptyIconBg}>
                      <Clock className='w-8 h-8 text-blue-500'/>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-500 mb-2'>All Caught Up</h3>
                    <p className='text-sm text-gray-500 mb-4'>
                      No pending tasks - Great Work
                    </p>
                    {/* Create New Task button removed */}
                  </div>
                </div>
              ):(
                sortedPendingTasks.map(task=>(
                  <TaskItem key={task._id || task.id} task={task}
                  showCompleteCheckbox                   onEdit={()=>{setSelectedTask(task); } }
                  onRefresh={refreshTasks}
                  />
                 ) )
              )}
      </div>
              <TaskModal isOpen={!!selectedTask}
              onClose={()=>{setSelectedTask(null);refreshTasks();}}
              taskToEdit={selectedTask}/>
    </div>
  )
}

export default PendingPage
