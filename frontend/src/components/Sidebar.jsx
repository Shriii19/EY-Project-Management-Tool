import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from '../assets/dummy'
import { NavLink } from 'react-router-dom';
import { Lightbulb, Menu, Zap, X, TrendingUp } from 'lucide-react'

const Sidebar = ({ user, tasks }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const totalTasks = tasks?.length || 0
  const completedTasks = tasks?.filter((t) => t.completed).length || 0
  const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const username = user?.name || 'User'
  const initial = username.charAt(0).toUpperCase()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [mobileOpen])

  const renderMenuItems = (isMobile = false) => (
    <div className='space-y-1.5'>
      {menuItems.map(({ text, path, icon }, index) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NavLink
            to={path}
            className={({ isActive }) => [
              "group flex items-center px-3.5 py-3 rounded-lg transition-all duration-200 relative",
              isActive
                ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold"
                : "hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent",
              isMobile ? "justify-start" : "lg:justify-start justify-center"
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
          >
            {({ isActive }) => (
              <>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`transition-all duration-200 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'}`}
                >
                  {icon}
                </motion.span>
                <span className={`${isMobile ? "block" : "hidden lg:block"} text-sm font-medium ml-3 transition-all duration-200`}>
                  {text}
                </span>
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="hidden md:flex flex-col fixed m-5 mt-20 h-auto w-auto lg:w-64 bg-slate-900/50 rounded-xl shadow-xl border border-slate-800 z-20 transition-all duration-300 backdrop-blur-xl overflow-hidden"
      >
        <div className="relative z-10">
          <div className="p-5 border-b border-slate-800 lg:block hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3.5"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg"
              >
                {initial}
              </motion.div>
              <div>
                <h2 className='text-base font-semibold text-white'>Hey, {username}!</h2>
                <p className='text-sm text-slate-400 flex items-center gap-1.5'>
                  <Zap className='w-3.5 h-3.5 text-cyan-400' />
                  Ready to work
                </p>
              </div>
            </motion.div>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className='w-4 h-4 text-cyan-400' />
                  Progress
                </h3>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-md font-semibold border border-cyan-500/30">
                  {productivity}%
                </span>
              </div>
              <div className="relative">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg"
                  />
                </div>
              </div>
            </motion.div>

            {renderMenuItems()}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-4 lg:block hidden"
            >
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <div className='flex items-start gap-3'>
                  <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">
                      Pro Tip
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      Break tasks into smaller chunks for maximum productivity!
                    </p>
                    <motion.a
                      whileHover={{ x: 3 }}
                      href="https://shrinivasmudabe.me/"
                      target='_blank'
                      className='inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium'
                    >
                      Learn More →
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed md:hidden top-24 left-5 z-50 bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-3 rounded-lg shadow-xl transition-all duration-200"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-80 h-full bg-slate-900 border-r border-slate-800 shadow-2xl z-50 p-5 flex flex-col space-y-5 md:hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className='text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>Menu</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-3.5 rounded-lg border border-slate-700">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {initial}
                </div>
                <div>
                  <h2 className='text-base font-semibold text-white'>Hey, {username}</h2>
                  <p className='text-sm text-slate-400 flex items-center gap-1'>
                    <Zap className='w-3 h-3' /> Let's go!
                  </p>
                </div>
              </div>
              {renderMenuItems(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
