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
              "group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative",
              isActive
                ? "glass border border-purple-500/40 text-white font-bold shadow-lg"
                : "hover:bg-purple-500/5 text-gray-400 hover:text-white border border-transparent hover:border-purple-500/20",
              isMobile ? "justify-start" : "lg:justify-start justify-center"
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => isActive ? {
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.05)'
            } : {}}
          >
            {({ isActive }) => (
              <>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`transition-all duration-200 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-300'}`}
                >
                  {icon}
                </motion.span>
                <span className={`${isMobile ? "block" : "hidden lg:block"} text-sm font-semibold ml-3 transition-all duration-200`}>
                  {text}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className='ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hidden lg:block'
                    style={{
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
                    }}
                  />
                )}
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
        className="hidden md:flex flex-col fixed m-5 mt-20 h-auto w-auto lg:w-64 glass-dark rounded-2xl shadow-2xl border border-purple-500/20 z-20 transition-all duration-300 overflow-hidden"
        style={{
          boxShadow: '4px 0 24px rgba(168, 85, 247, 0.15), 0 0 60px rgba(168, 85, 247, 0.05)'
        }}
      >
        <div className="relative z-10">
          <div className="p-5 border-b border-purple-500/20 lg:block hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3.5"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.5)',
                    '0 0 30px rgba(236, 72, 153, 0.5)',
                    '0 0 20px rgba(168, 85, 247, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg"
              >
                {initial}
              </motion.div>
              <div>
                <h2 className='text-base font-bold text-white'>Hey, {username}!</h2>
                <p className='text-sm text-gray-400 flex items-center gap-1.5 font-medium'>
                  <Zap className='w-3.5 h-3.5 text-purple-400' />
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
              className="glass p-4 rounded-xl border border-purple-500/30"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className='w-4 h-4 text-purple-400' />
                  Progress
                </h3>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg font-bold border border-purple-500/40">
                  {productivity}%
                </span>
              </div>
              <div className="relative">
                <div className="h-2.5 bg-gray-800/50 rounded-full overflow-hidden border border-purple-500/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-lg"
                    style={{
                      boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)'
                    }}
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
              <div className="glass p-4 rounded-xl border border-purple-500/30" style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
              }}>
                <div className='flex items-start gap-3'>
                  <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40" style={{
                    boxShadow: '0 0 12px rgba(251, 191, 36, 0.2)'
                  }}>
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">
                      Pro Tip
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-2 font-medium">
                      Break tasks into smaller chunks for maximum productivity!
                    </p>
                    <motion.a
                      whileHover={{ x: 3 }}
                      href="https://shrinivasmudabe.me/"
                      target='_blank'
                      className='inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-bold'
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
            className="fixed md:hidden top-24 left-5 z-50 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white p-3 rounded-xl shadow-xl transition-all duration-200"
            style={{
              boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)'
            }}
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
              className="fixed top-0 left-0 w-80 h-full glass-dark border-r border-purple-500/30 shadow-2xl z-50 p-5 flex flex-col space-y-5 md:hidden overflow-y-auto"
              style={{
                boxShadow: '4px 0 32px rgba(168, 85, 247, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-4">
                <h2 className='text-lg font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent'>Menu</h2>
                <motion.button
                  whileHover={{ rotate: 90, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  className="text-purple-400 hover:text-purple-300 p-2 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3 glass p-3.5 rounded-xl border border-purple-500/30" style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
              }}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg" style={{
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                }}>
                  {initial}
                </div>
                <div>
                  <h2 className='text-base font-bold text-white'>Hey, {username}</h2>
                  <p className='text-sm text-gray-400 flex items-center gap-1 font-medium'>
                    <Zap className='w-3 h-3 text-purple-400' /> Let's go!
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
