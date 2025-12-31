import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Edit2,
  Save,
  X,
  Camera,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  Activity
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    totalProjects: 12,
    completedProjects: 8,
    activeTasks: 24,
    completedTasks: 156,
    hoursLogged: 320,
    efficiency: 92
  });

  const [profile, setProfile] = useState({
    name: 'Guest User',
    email: 'guest@taskflow.app',
    phone: '+1 (555) 123-4567',
    role: 'Project Manager',
    department: 'Engineering',
    location: 'New York, USA',
    joinDate: 'January 2024',
    bio: 'Experienced project manager with a passion for delivering high-quality solutions.',
    avatar: null
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  useEffect(() => {
    // In a real app, fetch profile data from API
    // For now, using mock data
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, make API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile({ ...editedProfile });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Profile Header with gradient */}
              <div className="h-32 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 relative">
                {isEditing && (
                  <button className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-all">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              {/* Avatar */}
              <div className="relative px-6 -mt-16 mb-4">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden">
                    {(isEditing ? editedProfile.avatar : profile.avatar) ? (
                      <img
                        src={isEditing ? editedProfile.avatar : profile.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-400">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 p-2 bg-yellow-500 hover:bg-yellow-400 rounded-full cursor-pointer transition-all shadow-lg">
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-6">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                    <p className="text-yellow-400 font-medium mb-4">{profile.role}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-300">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{profile.department}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">Joined {profile.joinDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleEdit}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full text-2xl font-bold text-white bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="text"
                      value={editedProfile.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full text-yellow-400 font-medium bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    
                    <div className="space-y-3 mb-6">
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={Briefcase}
                  label="Total Projects"
                  value={userStats.totalProjects}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Completed Projects"
                  value={userStats.completedProjects}
                  color="bg-gradient-to-br from-green-500 to-green-600"
                />
                <StatCard
                  icon={Activity}
                  label="Active Tasks"
                  value={userStats.activeTasks}
                  color="bg-gradient-to-br from-yellow-500 to-yellow-600"
                />
                <StatCard
                  icon={FileText}
                  label="Completed Tasks"
                  value={userStats.completedTasks}
                  color="bg-gradient-to-br from-purple-500 to-purple-600"
                />
                <StatCard
                  icon={Clock}
                  label="Hours Logged"
                  value={userStats.hoursLogged}
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Efficiency"
                  value={`${userStats.efficiency}%`}
                  color="bg-gradient-to-br from-pink-500 to-pink-600"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">About</h3>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {!isEditing ? (
                <p className="text-slate-300 leading-relaxed">{profile.bio}</p>
              ) : (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Completed task', detail: 'Update API documentation', time: '2 hours ago', color: 'bg-green-500' },
                  { action: 'Created project', detail: 'Mobile App Redesign', time: '5 hours ago', color: 'bg-blue-500' },
                  { action: 'Commented on', detail: 'Backend Integration task', time: '1 day ago', color: 'bg-purple-500' },
                  { action: 'Updated milestone', detail: 'Q1 Release Planning', time: '2 days ago', color: 'bg-yellow-500' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full ${activity.color} mt-2`} />
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-slate-400 text-sm">{activity.detail}</p>
                      <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Project Management', 'Agile', 'Scrum', 'Leadership', 'Strategic Planning', 'Team Building', 'Risk Management', 'Stakeholder Management'].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:border-yellow-500/50 hover:text-yellow-400 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
