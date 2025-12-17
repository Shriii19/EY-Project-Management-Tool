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
            className='fixed top-0 left-0 right-0 z-50 glass-dark shadow-2xl border-b border-purple-500/20'
            style={{
                boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.2), 0 2px 8px 0 rgba(236, 72, 153, 0.1)'
            }}
        >
            <div className='flex items-center justify-between px-6 py-3.5 w-full mx-auto'>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center gap-3 cursor-pointer group'
                    onClick={() => navigate('/')}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className='relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 shadow-lg'
                        style={{
                            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)'
                        }}
                    >
                        <LayoutDashboard className='w-6 h-6 text-white' />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className='absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-30 blur-md'
                        />
                    </motion.div>

                    <div className="flex flex-col">
                        <span className='text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight'>
                            ProTasker
                        </span>
                        <span className='text-xs text-purple-300/80 font-semibold flex items-center gap-1'>
                            <Zap className='w-3 h-3' />
                            Dashboard
                        </span>
                    </div>
                </motion.div>

                {/* Right Side */}
                <div className='flex items-center gap-3'>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='p-2.5 text-gray-400 hover:text-purple-400 transition-all duration-200 hover:bg-purple-500/10 rounded-xl border border-transparent hover:border-purple-500/30'
                        onClick={() => navigate('/profile')}
                    >
                        <Settings className='w-5 h-5' />
                    </motion.button>

                    {/* User Dropdown */}
                    <div ref={menuref} className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={handleMenuToggle}
                            className='flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer glass border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300'
                        >
                            <div className="relative">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className='w-10 h-10 rounded-full shadow-lg border-2 border-purple-400/50' />
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold shadow-lg">
                                        {user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900'
                                />
                            </div>

                            <div className="text-left hidden md:block">
                                <p className='text-sm font-bold text-white'>{user.name}</p>
                                <p className='text-xs text-gray-400 font-medium'>{user.email}</p>
                            </div>

                            <motion.div
                                animate={{ rotate: menuOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className='w-4 h-4 text-purple-400' />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute top-16 right-0 w-56 glass-dark rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden'
                                >
                                    <li className='p-2'>
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() => {
                                                setMenuOpen(false)
                                                navigate('/profile')
                                            }}
                                            className='w-full px-4 py-3 text-left hover:bg-purple-500/10 rounded-xl text-sm text-gray-200 transition-colors flex items-center gap-3 group'
                                        >
                                            <Settings className='w-4 h-4 text-purple-400 group-hover:text-purple-300' />
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