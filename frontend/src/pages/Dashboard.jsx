import React from 'react';
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Users,
  Plus,
  UserPlus,
  FileText,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  // Dummy user data
  const user = {
    name: 'John Doe',
    role: 'Project Manager'
  };

  // Dashboard statistics
  const stats = [
    {
      id: 1,
      title: 'Total Projects',
      count: 12,
      icon: FolderKanban,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      hoverShadow: 'hover:shadow-purple-500/20'
    },
    {
      id: 2,
      title: 'Active Tasks',
      count: 48,
      icon: ListTodo,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverShadow: 'hover:shadow-blue-500/20'
    },
    {
      id: 3,
      title: 'Completed Tasks',
      count: 127,
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      hoverShadow: 'hover:shadow-green-500/20'
    },
    {
      id: 4,
      title: 'Team Members',
      count: 8,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      hoverShadow: 'hover:shadow-pink-500/20'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'completed task',
      taskName: 'Design new landing page',
      status: 'completed',
      time: '2 hours ago',
      avatar: 'SJ'
    },
    {
      id: 2,
      user: 'Michael Chen',
      action: 'created project',
      taskName: 'Mobile App Redesign',
      status: 'in-progress',
      time: '4 hours ago',
      avatar: 'MC'
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      action: 'assigned task',
      taskName: 'Update API documentation',
      status: 'pending',
      time: '5 hours ago',
      avatar: 'ER'
    },
    {
      id: 4,
      user: 'David Kim',
      action: 'completed task',
      taskName: 'Fix login authentication bug',
      status: 'completed',
      time: '1 day ago',
      avatar: 'DK'
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      action: 'commented on',
      taskName: 'Database optimization task',
      status: 'in-progress',
      time: '1 day ago',
      avatar: 'LA'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: 'Create New Project',
      description: 'Start a new project with your team',
      icon: FolderKanban,
      color: 'from-purple-500 to-pink-500',
      action: () => console.log('Create project')
    },
    {
      id: 2,
      title: 'Add Task',
      description: 'Create a new task for your project',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      action: () => console.log('Add task')
    },
    {
      id: 3,
      title: 'Invite Team Member',
      description: 'Add new members to your team',
      icon: UserPlus,
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Invite member')
    }
  ];

  // Get status badge styling
  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    
    const labels = {
      completed: 'Completed',
      pending: 'Pending',
      'in-progress': 'In Progress'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Welcome back, <span className="text-purple-400 font-semibold">{user.name}</span>! 
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${stat.hoverShadow} cursor-pointer group`}
                role="button"
                tabIndex={0}
                aria-label={`${stat.title}: ${stat.count}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-4xl font-bold text-white">{stat.count}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity Section */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              </div>
              <button 
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                aria-label="View all activities"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/50 hover:border-slate-600/50"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-white text-sm">
                    {activity.avatar}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-white">{activity.user}</span>
                        {' '}<span className="text-slate-400">{activity.action}</span>
                        {' '}<span className="text-purple-400">"{activity.taskName}"</span>
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center mt-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            </div>

            <div className="space-y-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action.action();
                      }
                    }}
                    className="w-full group relative overflow-hidden p-4 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    aria-label={action.title}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-purple-500/20 rounded-lg">
                  <Activity className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-300">Pro Tip</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Use keyboard shortcuts to navigate faster. Press <kbd className="px-2 py-1 bg-slate-800 rounded text-purple-400">Ctrl+N</kbd> for new project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-sm mb-1">Projects On Track</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-3xl font-bold text-white">10/12</span>
                <span className="text-green-400 text-sm">(83%)</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-sm mb-1">Tasks This Week</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-3xl font-bold text-white">32</span>
                <span className="text-blue-400 text-sm">(+8 new)</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-sm mb-1">Team Productivity</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-3xl font-bold text-white">94%</span>
                <span className="text-purple-400 text-sm">(Excellent)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
