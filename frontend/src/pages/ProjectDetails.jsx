import { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Archive, 
  Plus, 
  Calendar, 
  User, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  FileText,
  Activity,
  Mail,
  MoreVertical
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy project data
const dummyProject = {
  id: 1,
  name: "EY Digital Transformation",
  status: "Active",
  description: "Implementation of comprehensive digital transformation strategy across all departments",
  progress: 67,
  startDate: "2024-01-15",
  endDate: "2024-06-30",
  priority: "High",
  owner: {
    name: "Sarah Johnson",
    avatar: "SJ",
    role: "Project Manager"
  },
  team: [
    { id: 1, name: "Sarah Johnson", avatar: "SJ", role: "Admin", email: "sarah.j@ey.com" },
    { id: 2, name: "Michael Chen", avatar: "MC", role: "Member", email: "michael.c@ey.com" },
    { id: 3, name: "Emily Davis", avatar: "ED", role: "Member", email: "emily.d@ey.com" },
    { id: 4, name: "James Wilson", avatar: "JW", role: "Admin", email: "james.w@ey.com" },
    { id: 5, name: "Anna Martinez", avatar: "AM", role: "Member", email: "anna.m@ey.com" }
  ],
  stats: {
    totalTasks: 24,
    completedTasks: 16,
    pendingTasks: 8,
    overdueTasks: 2
  },
  tasks: [
    { id: 1, title: "Design system architecture", status: "Completed", priority: "High", assignee: "MC", dueDate: "2024-02-10" },
    { id: 2, title: "Implement authentication", status: "In Progress", priority: "High", assignee: "ED", dueDate: "2024-02-20" },
    { id: 3, title: "Create user dashboard", status: "In Progress", priority: "Medium", assignee: "JW", dueDate: "2024-02-25" },
    { id: 4, title: "API integration testing", status: "Pending", priority: "High", assignee: "AM", dueDate: "2024-03-01" },
    { id: 5, title: "Database optimization", status: "Pending", priority: "Low", assignee: "MC", dueDate: "2024-03-05" }
  ],
  activities: [
    { id: 1, user: "Sarah Johnson", action: "updated task status", target: "Design system architecture", time: "2 hours ago", type: "update" },
    { id: 2, user: "Michael Chen", action: "completed", target: "Frontend scaffolding", time: "5 hours ago", type: "complete" },
    { id: 3, user: "Emily Davis", action: "commented on", target: "Authentication flow", time: "1 day ago", type: "comment" },
    { id: 4, user: "James Wilson", action: "added new member", target: "Anna Martinez", time: "2 days ago", type: "member" },
    { id: 5, user: "Sarah Johnson", action: "created task", target: "API integration testing", time: "3 days ago", type: "create" }
  ]
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const project = dummyProject;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'On Hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'update':
        return <Edit className="w-4 h-4" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4" />;
      case 'comment':
        return <FileText className="w-4 h-4" />;
      case 'member':
        return <Users className="w-4 h-4" />;
      case 'create':
        return <Plus className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </button>

        {/* Page Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-400 text-lg mb-4">{project.description}</p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-4 h-4 ${getPriorityColor(project.priority)}`} />
                  <span className="text-gray-300">Priority: <span className={getPriorityColor(project.priority)}>{project.priority}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Owner: {project.owner.name}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all flex items-center gap-2 border border-white/10">
                <Edit className="w-4 h-4" />
                Edit Project
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all flex items-center gap-2 border border-white/10">
                <Archive className="w-4 h-4" />
                Archive
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Project Progress</span>
              <span className="text-sm font-semibold text-blue-400">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Team Avatars */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-gray-400">Team:</span>
            <div className="flex -space-x-2">
              {project.team.slice(0, 5).map((member, index) => (
                <div 
                  key={member.id}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-semibold border-2 border-gray-800 hover:scale-110 transition-transform cursor-pointer"
                  title={member.name}
                >
                  {member.avatar}
                </div>
              ))}
              {project.team.length > 5 && (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold border-2 border-gray-800">
                  +{project.team.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {['overview', 'tasks', 'team', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats.totalTasks}</h3>
                  <p className="text-gray-400 text-sm">Total Tasks</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats.completedTasks}</h3>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats.pendingTasks}</h3>
                  <p className="text-gray-400 text-sm">Pending</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats.overdueTasks}</h3>
                  <p className="text-gray-400 text-sm">Overdue</p>
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Timeline Preview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-400">Jan 2024</div>
                    <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    <span className="text-sm text-green-400">100%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-400">Feb 2024</div>
                    <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    </div>
                    <span className="text-sm text-blue-400">80%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-400">Mar 2024</div>
                    <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="w-2/5 h-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                    </div>
                    <span className="text-sm text-yellow-400">40%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-400">Apr 2024</div>
                    <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="w-1/5 h-full bg-gradient-to-r from-red-500 to-red-600"></div>
                    </div>
                    <span className="text-sm text-red-400">20%</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {project.activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300">
                          <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                          <span className="text-blue-400">{activity.target}</span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Tasks Overview</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                  <button 
                    onClick={() => navigate(`/projects/${projectId}/tasks`)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all border border-white/10"
                  >
                    View Kanban Board
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {project.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-400' :
                          task.status === 'In Progress' ? 'bg-blue-400' : 'bg-gray-400'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{task.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {task.dueDate}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                              task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-semibold">
                          {task.assignee}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Team Members</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Invite Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.team.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{member.name}</h4>
                          <p className="text-sm text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.role === 'Admin' 
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {member.role}
                        </span>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6">Activity Feed</h3>
              <div className="space-y-4">
                {project.activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      {index < project.activities.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                        <p className="text-white mb-1">
                          <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                          <span className="text-blue-400">{activity.target}</span>
                        </p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
