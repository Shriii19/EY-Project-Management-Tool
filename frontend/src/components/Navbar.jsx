import React, { useState,useRef, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { ChevronDown, Compass,Settings, LogOut } from 'lucide-react';


const Navbar = ({user={},onLogout}) => {
    const menuref=useRef(null)
    const [menuOpen, setMenuOpen]=useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(menuref.current && !menuref.current.contains(event.target)){
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=>document.removeEventListener("mousedown",handleClickOutside)
    },[])

    const handleMenuToggle = ()=>setMenuOpen((prev)=>!prev)
    const handleLogout = () =>{
        setMenuOpen(false)
        onLogout();
    }
  return (
    <header className='sticky top-0 z-50 glass-dark backdrop-blur-xl shadow-lg border-b border-blue-500/20'>

        <div className='flex items-center justify-between px-6 py-4 w-full mx-auto'>
            {/*Logo*/}
            <div className='flex items-center gap-3 cursor-pointer group'
            onClick={()=>navigate('/')}>
                {/* LOGO */}
                <div className='relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 shadow-xl group-hover:shadow-cyan-400/50 group-hover:scale-110 transition-all duration-300 animate-float'>
                    <Compass className='w-7 h-7 text-white drop-shadow-lg'/>
                    <div className='absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse'/>
                </div>

                {/* Brand Name */}
                <div className="flex flex-col">
                    <span className='text-2xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent tracking-tight'>
                        TaskVault
                    </span>
                    <span className='text-xs text-gray-400 font-medium tracking-wide'>
                        Project Management
                    </span>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-4'>
            <button className='btn-hover p-3 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:bg-blue-500/10 rounded-xl border border-transparent hover:border-blue-500/30' onClick={()=>navigate('/profile')}>
                <Settings className='w-5 h-5'/>
            </button>
            
            {/* User Dropdown Meny */}
            <div ref={menuref} className='relative'>
                <button onClick={handleMenuToggle} className='flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors duration-300 border border-transparent hover:border-blue-500'>
                    <div className="relative">
                        {user.avatar ? (
                            <img src={user.avatar} alt="Avatar" className='w-9 h-9 rounded-full shadow-sm' />
                        ): (
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-600 text-white font-semibold shadow-md ">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse'/>
                    </div>

                    <div className="text-left hidden md:block">
                        <p className='text-sm font-medium text-gray-200'>{user.name}</p>
                        <p className='text-xs text-gray-400 font-normal '>{user.email}</p>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-green-500 transition-transform duration-300 ${menuOpen ? 'rotate-180':""}`}/>
                </button>

                {menuOpen &&(
                    <ul className='absolute top-14 right-0 w-56 bg-gray-800 rounded-2xl shadow-xl border border-blue-500 c-50 overflow-hidden animate-fadeIn'>
                        <li className='p-2'>
                            <button onClick={()=> {
                                setMenuOpen(false)
                                navigate('/profile')
                            }}
                            className='w-full px-4 py-2.5 text-left hover:bg-gray-700 rounded-xl text-sm text-gray-200 transition-colors flex items-center gap-2 group' role='menuitem'>
                                <Settings className='w-4 h-4 text-gray-200'/>Profile Setting
                            </button>
                        </li>

                        <li className='p-2'>
                            {/* FIX APPLIED HERE: Ensure 'className' prop is a single string */}
                            <button onClick={handleLogout} className='flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:bg-gray-700 text-red-600' role='menuitem' >
                                <LogOut className='w-4 h-4'/>Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar