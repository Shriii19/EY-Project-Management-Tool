import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Clock, TrendingUp, Zap, Circle, X, Target, Activity, CheckCircle2 } from 'lucide-react'
import { Outlet } from 'react-router-dom';
import axios from 'axios'

const Layout = ({ user }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("http://localhost:4000/api/tasks/gp");
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

  const StatCard = ({ title, value, icon, gradient, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group relative overflow-hidden p-5 rounded-2xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${gradient}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className='relative flex items-center gap-4'>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className='p-3 rounded-xl bg-white/10 backdrop-blur-sm'
        >
          {icon}
        </motion.div>
        <div className="min-w-0 flex-1">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: delay + 0.2 }}
            className='text-3xl font-black text-white mb-1'
          >
            {value}
          </motion.p>
          <p className='text-sm text-gray-200 font-medium'>{title}</p>
        </div>
      </div>
    </motion.div>
  );

  if (loading) return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-t-4 border-b-4 border-purple-500"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-20"
        />
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950 p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-dark p-8 rounded-3xl border border-red-500/30 max-w-md text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
        >
          <X className="w-10 h-10 text-red-400" />
        </motion.div>
        <p className="font-bold mb-3 text-red-300 text-xl">Error Loading Tasks</p>
        <p className="text-sm text-gray-300 mb-8">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchTasks}
          className='py-3 px-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg'
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 text-gray-100">
      <Navbar user={user} />
      <Sidebar user={user} tasks={tasks} />

      <div className='ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-20 p-6 transition-all duration-300'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          <div className="xl:col-span-2 space-y-6">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-dark rounded-3xl p-6 shadow-2xl border border-purple-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className='text-2xl font-black mb-6 text-white flex items-center gap-3'>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <TrendingUp className='w-6 h-6 text-purple-400' />
                  </div>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Task Analytics
                  </span>
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <StatCard
                    title='Total Tasks'
                    value={stats.totalCount}
                    icon={<Target className='w-6 h-6 text-blue-400' />}
                    gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30"
                    delay={0}
                  />
                  <StatCard
                    title='Completed'
                    value={stats.completedTasks}
                    icon={<CheckCircle2 className='w-6 h-6 text-green-400' />}
                    gradient="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30"
                    delay={0.1}
                  />
                  <StatCard
                    title='Pending'
                    value={stats.pendingCount}
                    icon={<Clock className='w-6 h-6 text-orange-400' />}
                    gradient="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30"
                    delay={0.2}
                  />
                  <StatCard
                    title='Success Rate'
                    value={`${stats.completionPercentage}%`}
                    icon={<Zap className='w-6 h-6 text-pink-400' />}
                    gradient="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30"
                    delay={0.3}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass p-5 rounded-2xl border border-purple-400/20"
                >
                  <div className="flex items-center justify-between text-gray-300 mb-4">
                    <span className='text-sm font-bold flex items-center gap-2'>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      />
                      Progress Overview
                    </span>
                    <span className='text-xs bg-purple-600/30 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/30 font-semibold'>
                      {stats.completedTasks}/{stats.totalCount}
                    </span>
                  </div>
                  <div className='relative'>
                    <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.completionPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 shadow-lg relative"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-dark rounded-3xl p-6 shadow-2xl border border-purple-500/20 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-white">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-400/30">
                    <Activity className='w-6 h-6 text-orange-400' />
                  </div>
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Recent Activity
                  </span>
                </h3>

                <div className="space-y-3">
                  <AnimatePresence>
                    {tasks.slice(0, 3).map((task, index) => (
                      <motion.div
                        key={task._id || task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className='group flex items-center justify-between p-4 glass rounded-xl border border-purple-400/20 hover:border-orange-400/40 transition-all duration-300 cursor-pointer'
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">{task.title}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "Recent"}
                          </p>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`px-3 py-1.5 text-xs rounded-full font-semibold ml-3 ${
                            task.completed 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          }`}
                        >
                          {task.completed ? "✨ Done" : "⏳ Pending"}
                        </motion.span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {tasks.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 px-4"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center"
                      >
                        <Clock className='w-12 h-12 text-purple-400' />
                      </motion.div>
                      <p className='text-sm text-gray-300 font-semibold mb-2'>No Recent Activity</p>
                      <p className='text-xs text-gray-500'>Your tasks will appear here</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
