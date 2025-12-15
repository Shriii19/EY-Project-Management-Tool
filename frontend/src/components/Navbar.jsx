import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LayoutDashboard, Settings, Zap } from 'lucide-react'

const Navbar = ({ user = {} }) => {
    const menuref = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuref.current && !menuref.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleMenuToggle = () => setMenuOpen((prev) => !prev)

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className='fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-800'
        >
            <div className='flex items-center justify-between px-6 py-4 w-full mx-auto max-w-7xl'>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center gap-3 cursor-pointer group'
                    onClick={() => navigate('/')}
                >
                    <motion.div
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.3 }}
                        className='relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg'
                    >
                        <LayoutDashboard className='w-6 h-6 text-white' />
                    </motion.div>

                    <div className="flex flex-col">
                        <span className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight'>
                            ProTasker
                        </span>
                        <span className='text-xs text-slate-400 font-medium flex items-center gap-1'>
                            <Zap className='w-3 h-3' />
                            Task Management
                        </span>
                    </div>
                </motion.div>

                {/* Right Side */}
                <div className='flex items-center gap-3'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='p-2.5 text-slate-400 hover:text-cyan-400 transition-all duration-200 hover:bg-slate-800 rounded-lg'
                        onClick={() => navigate('/profile')}
                    >
                        <Settings className='w-5 h-5' />
                    </motion.button>

                    {/* User Dropdown */}
                    <div ref={menuref} className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={handleMenuToggle}
                            className='flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-200'
                        >
                            <div className="relative">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className='w-9 h-9 rounded-lg shadow-md border border-slate-700' />
                                ) : (
                                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm">
                                        {user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <div className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900' />
                            </div>

                            <div className="text-left hidden md:block">
                                <p className='text-sm font-semibold text-white'>{user.name}</p>
                                <p className='text-xs text-slate-400'>{user.email}</p>
                            </div>

                            <motion.div
                                animate={{ rotate: menuOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className='w-4 h-4 text-slate-400' />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute top-14 right-0 w-52 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden'
                                >
                                    <li className='p-1.5'>
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            onClick={() => {
                                                setMenuOpen(false)
                                                navigate('/profile')
                                            }}
                                            className='w-full px-3.5 py-2.5 text-left hover:bg-slate-700 rounded-md text-sm text-slate-200 transition-colors flex items-center gap-3 group'
                                        >
                                            <Settings className='w-4 h-4 text-cyan-400' />
                                            <span className='font-medium'>Profile Settings</span>
                                        </motion.button>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}

export default Navbar