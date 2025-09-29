import React, { useEffect, useState } from 'react'
import { LINK_CLASSES, PRODUCTIVITY_CARD, SIDEBAR_CLASSES, menuItems, TIP_CARD } from '../assets/dummy'
import { NavLink } from 'react-router-dom';
import { Lightbulb, Menu, Sparkles, X } from 'lucide-react'

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
    <div className='space-y-3'>
      {menuItems.map(({ text, path, icon }) => (
        <NavLink
          key={text}
          to={path}
          className={({ isActive }) => [
            "group flex items-center px-4 py-4 rounded-2xl transition-all duration-300",
            isActive 
              ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/40 text-blue-300 font-semibold shadow-lg" 
              : "hover:bg-blue-500/10 text-gray-300 hover:text-blue-300 border border-transparent hover:border-blue-500/30",
            isMobile ? "justify-start" : "lg:justify-start justify-center"
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        >
          <span className="transition-all duration-300 group-hover:scale-110 text-blue-400">
            {icon}
          </span>
          <span className={`${isMobile ? "block" : "hidden lg:block"} text-sm font-medium ml-3 transition-all duration-300`}>
            {text}
          </span>
        </NavLink>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col fixed m-5 mt-16 h-auto w-auto lg:w-64 glass-dark rounded-3xl shadow-2xl border border-blue-500/20 z-20 transition-all duration-300 backdrop-blur-xl">
        <div className="p-6 border-b border-blue-500/20 lg:block hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 flex items-center justify-center text-white font-bold shadow-xl border border-blue-400/30 animate-float">
              {initial}
            </div>
            <div>
              <h2 className='text-xl font-black text-white'>Hey, {username}!</h2>
              <p className='text-sm text-blue-300 font-medium flex items-center gap-2'>
                <Sparkles className='w-4 h-4 animate-pulse' /> 
                Let's be productive!
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto flex-1">
          <div className="glass p-5 rounded-2xl border border-blue-400/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Productivity Score</h3>
              <span className="text-xs bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1.5 rounded-full font-bold shadow-lg">
                {productivity}%
              </span>
            </div>
            <div className="relative">
              <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-500 transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${productivity}%` }} 
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 animate-pulse" />
            </div>
          </div>

          {renderMenuItems()}
          <div className="mt-auto pt-8 lg:block hidden">
            <div className="glass p-6 rounded-2xl border border-blue-400/30">
              <div className='flex items-start gap-4'>
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">💡 Pro Tip</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Break large tasks into smaller, manageable chunks for better productivity!
                  </p>
                  <a href="https://omgunturkar.me/" target='_blank' className='inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium'>
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {!mobileOpen && (
        <button className={SIDEBAR_CLASSES.mobileButton} onClick={() => setMobileOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40">
          <div className={SIDEBAR_CLASSES.mobileDrawerBackdrop} onClick={() => setMobileOpen(false)}>
            <div className={SIDEBAR_CLASSES.mobileDrawer} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className='text-lg font-bold text-[#1FA2FF]'>Menu</h2>
                <button className="text-gray-700 hover:text-[#1FA2FF]" onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-6 ">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] flex items-center justify-center text-white font-bold shadow-md">
                  {initial}
                </div>
                <div>
                  <h2 className='text-lg font-bold mt-16 text-[#2B2B2B]'>Heyy, {username}</h2>
                  <p className='text-sm text-[#1FA2FF] font-medium flex items-center gap-1'>
                    <Sparkles className='w-3 h-4' /> Lets Crush Some Tasks!
                  </p>
                </div>
              </div>
              {renderMenuItems(true)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
