import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from '../assets/dummy'
import { NavLink } from 'react-router-dom';
import { Lightbulb, Menu, Sparkles, X, TrendingUp } from 'lucide-react'

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
    <div className='space-y-2'>
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
              "group flex items-center px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden",
              isActive
                ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 text-purple-300 font-bold shadow-xl"
                : "hover:bg-purple-500/10 text-gray-300 hover:text-purple-300 border border-transparent hover:border-purple-500/30",
              isMobile ? "justify-start" : "lg:justify-start justify-center"
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`transition-all duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'} relative z-10`}
                >
                  {icon}
                </motion.span>
                <span className={`${isMobile ? "block" : "hidden lg:block"} text-sm font-semibold ml-3 transition-all duration-300 relative z-10`}>
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
        className="hidden md:flex flex-col fixed m-5 mt-20 h-auto w-auto lg:w-64 glass-dark rounded-3xl shadow-2xl border border-purple-500/20 z-20 transition-all duration-300 backdrop-blur-xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="p-6 border-b border-purple-500/20 lg:block hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center text-white font-black shadow-2xl border-2 border-purple-400/30"
              >
                {initial}
              </motion.div>
              <div>
                <h2 className='text-xl font-black text-white'>Hey, {username}!</h2>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='text-sm text-purple-300 font-semibold flex items-center gap-2'
                >
                  <Sparkles className='w-4 h-4' />
                  Let's crush it!
                </motion.p>
              </div>
            </motion.div>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-5 rounded-2xl border border-purple-400/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <TrendingUp className='w-4 h-4 text-purple-400' />
                    Productivity
                  </h3>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                    className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-black shadow-lg"
                  >
                    {productivity}%
                  </motion.span>
                </div>
                <div className="relative">
                  <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${productivity}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-lg relative"
                    >
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {renderMenuItems()}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-6 lg:block hidden"
            >
              <div className="glass p-6 rounded-2xl border border-yellow-400/30 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
                <div className='flex items-start gap-4 relative z-10'>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30"
                  >
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-2 flex items-center gap-2">
                      💡 Pro Tip
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      Break tasks into smaller chunks for maximum productivity!
                    </p>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="https://shrinivasmudabe.me/"
                      target='_blank'
                      className='inline-flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors font-semibold'
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed md:hidden top-24 left-5 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
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
              className="fixed top-0 left-0 w-80 h-full glass-dark border-r border-purple-500/30 shadow-2xl z-50 p-6 flex flex-col space-y-6 md:hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-4">
                <h2 className='text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Menu</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  className="text-gray-300 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3 glass p-4 rounded-xl border border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black shadow-lg">
                  {initial}
                </div>
                <div>
                  <h2 className='text-lg font-black text-white'>Hey, {username}</h2>
                  <p className='text-sm text-purple-300 font-semibold flex items-center gap-1'>
                    <Sparkles className='w-3 h-4' /> Let's go!
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
