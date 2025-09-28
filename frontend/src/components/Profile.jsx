import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {
  personalFields,
  securityFields
} from '../assets/dummy'
import {
  ChevronLeft,
  LogOut,
  Save,
  Shield,
  UserCircle,
  Lock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:4000'

const Profile = ({ setCurrentUser, onLogout }) => {
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const navigate = useNavigate()

  useEffect(() => {
    // Authentication disabled - using dummy data
    setProfile({ name: 'Anonymous User', email: 'anonymous@example.com' });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault()
    // Profile saving disabled - authentication removed
    toast.info('Profile saving has been disabled');
  }

  const changePassword = async (e) => {
    e.preventDefault()
    // Password change disabled - authentication removed
    toast.info('Password change has been disabled');
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white'>
      <ToastContainer position='top-center' autoClose={3000} theme="dark" />
      <div className="max-w-6xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="btn-hover inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-all duration-300 mb-8 p-3 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
        >
          <ChevronLeft className='w-5 h-5 mr-2' />
          Back To Dashboard
        </button>

        <div className="flex items-center gap-6 mb-12 animate-fadeIn">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl border-4 border-blue-400/30 animate-float">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-4xl font-black text-white mb-2">Account Settings</h2>
            <p className='text-gray-300 text-lg'>Manage your profile and security preferences</p>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Personal Information */}
          <section className="glass-dark rounded-3xl p-8 shadow-2xl border border-blue-500/20 animate-slideUp">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                <UserCircle className='w-6 h-6 text-blue-400' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-white'>Personal Information</h2>
                <p className='text-gray-400 text-sm'>Update your personal details</p>
              </div>
            </div>

            <form onSubmit={saveProfile} className='space-y-6'>
              {personalFields.map(({ name, type, placeholder, icon: Icon }) => (
                <div key={name}>
                  <label className='block text-sm font-semibold text-gray-300 mb-3'>
                    {placeholder}
                  </label>
                  <div className="glass p-4 rounded-xl border border-blue-500/30 focus-within:border-blue-400/60 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Icon className='text-blue-400 w-5 h-5' />
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={profile[name]}
                        onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
                        className='w-full bg-transparent text-white placeholder-gray-500 focus:outline-none'
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-hover w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl transition-all duration-300 border border-blue-500/30">
                <Save className='w-5 h-5' /> Save Changes
              </button>
            </form>
          </section>

          {/* Security Section */}
          <section className="glass-dark rounded-3xl p-8 shadow-2xl border border-blue-500/20 animate-slideUp">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-400/30">
                <Shield className='w-6 h-6 text-red-400' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-white'>Security Settings</h2>
                <p className='text-gray-400 text-sm'>Protect your account</p>
              </div>
            </div>

            <form onSubmit={changePassword} className='space-y-6'>
              {securityFields.map(({ name, placeholder }) => (
                <div key={name}>
                  <label className='block text-sm font-semibold text-gray-300 mb-3'>
                    {placeholder}
                  </label>
                  <div className="glass p-4 rounded-xl border border-blue-500/30 focus-within:border-blue-400/60 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Lock className='text-blue-400 w-5 h-5' />
                      <input
                        type="password"
                        placeholder={placeholder}
                        value={passwords[name]}
                        onChange={(e) => setPasswords({ ...passwords, [name]: e.target.value })}
                        className='w-full bg-transparent text-white placeholder-gray-500 focus:outline-none'
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-hover w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl transition-all duration-300 border border-blue-500/30">
                <Shield className='w-5 h-5' /> Change Password
              </button>

              <div className="mt-10 pt-8 border-t border-red-500/30">
                <div className="glass p-6 rounded-2xl border border-red-500/30 bg-red-500/5">
                  <h3 className='text-red-400 font-bold mb-4 flex items-center gap-3 text-lg'>
                    <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/30">
                      <LogOut className='w-5 h-5' />
                    </div>
                    Danger Zone
                  </h3>
                  <p className='text-gray-300 text-sm mb-6'>This action will sign you out of your account.</p>
                  <button
                    className="btn-hover py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg border border-red-500/30"
                    onClick={onLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
