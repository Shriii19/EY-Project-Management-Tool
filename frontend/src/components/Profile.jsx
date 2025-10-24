import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { personalFields } from '../assets/dummy'
import { ChevronLeft, Save, UserCircle, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' })
  const navigate = useNavigate()

  useEffect(() => {
    setProfile({ name: 'Guest User', email: 'guest@taskflow.app' });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault()
    toast.success('Profile updated successfully!');
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 text-white relative overflow-hidden'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <ToastContainer position='top-center' autoClose={3000} theme="dark" />
      
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5, scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-bold text-purple-400 hover:text-purple-300 transition-all duration-300 mb-8 p-3 rounded-xl hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 glass"
        >
          <ChevronLeft className='w-5 h-5 mr-2' />
          Back To Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-12"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl border-4 border-purple-400/30 relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            />
            <span className="relative z-10">{profile.name ? profile.name[0].toUpperCase() : 'U'}</span>
          </motion.div>
          <div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Account Settings</h2>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='text-gray-300 text-lg flex items-center gap-2'
            >
              <Sparkles className='w-5 h-5 text-purple-400' />
              Manage your profile and security
            </motion.p>
          </div>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          {/* Personal Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-3xl p-8 shadow-2xl border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
                >
                  <UserCircle className='w-7 h-7 text-purple-400' />
                </motion.div>
                <div>
                  <h2 className='text-2xl font-black text-white'>Personal Information</h2>
                  <p className='text-gray-400 text-sm'>Update your personal details</p>
                </div>
              </div>

              <form onSubmit={saveProfile} className='space-y-6'>
                {personalFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <label className='block text-sm font-bold text-gray-300 mb-3'>
                      {field.placeholder}
                    </label>
                    <div className="glass p-4 rounded-xl border border-purple-500/30 focus-within:border-purple-400/60 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <field.icon className='text-purple-400 w-5 h-5 group-focus-within:scale-110 transition-transform' />
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={profile[field.name]}
                          onChange={(e) => setProfile({ ...profile, [field.name]: e.target.value })}
                          className='w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-semibold'
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black shadow-2xl transition-all duration-300 border border-purple-500/30 hover:shadow-purple-500/50"
                >
                  <Save className='w-5 h-5' /> Save Changes
                </motion.button>
              </form>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Profile
