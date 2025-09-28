import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Clock, TrendingUp, Zap, Circle, X } from 'lucide-react'
import { Outlet } from 'react-router-dom';
import Axios from 'axios'

const Layout = ({ onLogout, user }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Authentication removed - make request without token
      const { data } = await Axios.get("http://localhost:4000/api/tasks/gp");

      const arr = Array.isArray(data) ? data :
        Array.isArray(data?.tasks) ? data.tasks :
          Array.isArray(data?.data) ? data.data : [];

      setTasks(arr);
    } catch (err) {
      console.log(err);
      setError(err.message || "Could not load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks() }, [fetchTasks]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t =>
      t.completed === true ||
      t.completed === 1 ||
      (typeof t.completed === "string" && t.completed.toLowerCase() === 'yes')
    ).length;

    const totalCount = tasks.length;
    const pendingCount = totalCount - completedTasks;
    const completionPercentage = totalCount ?
      Math.round((completedTasks / totalCount) * 100) : 0;

    return {
      totalCount, completedTasks, pendingCount, completionPercentage
    };
  }, [tasks]);

  const StatCard = ({ title, value, icon }) => (
    <div className='group p-4 rounded-2xl glass-dark shadow-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 animate-slideUp'>
      <div className='flex items-center gap-3'>
        <div className='p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 group-hover:from-blue-500/30 group-hover:to-green-500/30 transition-all duration-300'>
          {icon}
        </div>
        <div className="min-w-0">
          <p className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'>
            {value}
          </p>
          <p className='text-sm text-gray-300 font-medium'>{title}</p>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center'>
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-400 opacity-20" />
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-6 flex items-center justify-center">
      <div className="glass-dark p-8 rounded-2xl border border-red-500/30 max-w-md text-center animate-fadeIn">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
          <X className="w-8 h-8 text-red-400" />
        </div>
        <p className="font-semibold mb-2 text-red-300 text-lg">Error loading tasks</p>
        <p className="text-sm text-gray-300 mb-6">{error}</p>
        <button onClick={fetchTasks} className='btn-hover py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg'>
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar user={user} tasks={tasks} />

      <div className='ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-6 transition-all duration-300'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          <div className="xl:col-span-2 space-y-6">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="glass-dark rounded-2xl p-6 shadow-xl border border-blue-500/20 animate-slideUp">
              <h3 className='text-xl font-bold mb-6 text-white flex items-center gap-3'>
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <TrendingUp className='w-6 h-6 text-blue-400' />
                </div>
                Task Analytics
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <StatCard title='Total Tasks' value={stats.totalCount} icon={<Circle className='w-5 h-5 text-blue-400' />} />
                <StatCard title='Completed' value={stats.completedTasks} icon={<Circle className='w-5 h-5 text-green-400' />} />
                <StatCard title='Pending' value={stats.pendingCount} icon={<Circle className='w-5 h-5 text-orange-400' />} />
                <StatCard title='Success Rate' value={`${stats.completionPercentage}%`} icon={<Zap className='w-5 h-5 text-purple-400' />} />
              </div>

              <div className="glass p-4 rounded-xl border border-blue-400/20">
                <div className="flex items-center justify-between text-gray-300 mb-3">
                  <span className='text-sm font-semibold flex items-center gap-2'>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-green-400" />
                    Progress Overview
                  </span>
                  <span className='text-xs bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30'>
                    {stats.completedTasks}/{stats.totalCount}
                  </span>
                </div>
                <div className='relative pt-2'>
                  <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-500 transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${stats.completionPercentage}%` }} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-2xl p-6 shadow-xl border border-blue-500/20 animate-slideUp">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <Clock className='w-6 h-6 text-purple-400' />
                </div>
                Recent Activity
              </h3>

              <div className="space-y-4">
                {tasks.slice(0, 3).map((task, index) => (
                  <div key={task._id || task.id} className='group flex items-center justify-between p-4 glass rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] animate-fadeIn' style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">{task.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "Recent"}
                      </p>
                    </div>
                    <span className={`px-3 py-1.5 text-xs rounded-full font-medium ml-3 ${
                      task.completed 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {task.completed ? "✓ Done" : "⏳ Pending"}
                    </span>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-8 px-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center animate-float">
                      <Clock className='w-10 h-10 text-blue-400' />
                    </div>
                    <p className='text-sm text-gray-300 font-medium'>No Recent Activity</p>
                    <p className='text-xs text-gray-500 mt-2'>Your tasks will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
