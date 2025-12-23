import { useState, useEffect } from 'react';
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

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for project data - ready for API integration
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  // Empty state or loading can be handled here
  useEffect(() => {
    // TODO: Fetch project details from API
    // setLoading(true);
    // fetchProjectDetails(projectId).then(data => {
    //   setProject(data);
    //   setLoading(false);
    // });
  }, [projectId]);

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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">Loading project details...</div>
          </div>
        ) : !project ? (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-16 h-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Project not found</h3>
            <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
            >
              Back to Projects
            </button>
          </div>
        ) : (
          <>
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
                    {project.startDate && project.endDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{project.startDate} - {project.endDate}</span>
                      </div>
                    )}
                    {project.priority && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className={`w-4 h-4 ${getPriorityColor(project.priority)}`} />
                        <span className="text-gray-300">Priority: <span className={getPriorityColor(project.priority)}>{project.priority}</span></span>
                      </div>
                    )}
                    {project.owner && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Owner: {project.owner.name}</span>
                      </div>
                    )}
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
              {project.progress !== undefined && (
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
              )}

              {/* Team Avatars */}
              {project.team && project.team.length > 0 && (
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm text-gray-400">Team:</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 5).map((member) => (
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
              )}
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
                  <h3 className="text-2xl font-bold mb-1">{project.stats?.totalTasks || 0}</h3>
                  <p className="text-gray-400 text-sm">Total Tasks</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats?.completedTasks || 0}</h3>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats?.pendingTasks || 0}</h3>
                  <p className="text-gray-400 text-sm">Pending</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.stats?.overdueTasks || 0}</h3>
                  <p className="text-gray-400 text-sm">Overdue</p>
                </div>
              </div>

              {/* Timeline Preview - Placeholder for now */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Timeline Preview
                </h3>
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">Timeline data will be available soon</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {project.activities && project.activities.length > 0 ? (
                    project.activities.slice(0, 5).map((activity) => (
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
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <Activity className="w-10 h-10 mb-2 opacity-50" />
                      <p className="text-sm">No recent activity</p>
                    </div>
                  )}
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

              {project.tasks && project.tasks.length > 0 ? (
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
                              {task.dueDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {task.dueDate}
                                </span>
                              )}
                              {task.priority && (
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                  task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {task.assignee && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-semibold">
                              {task.assignee}
                            </div>
                          )}
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
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mb-4 opacity-50" />
                  <h4 className="text-lg font-semibold mb-2">No tasks yet</h4>
                  <p className="text-sm mb-4">Create your first task to get started</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Task
                  </button>
                </div>
              )}
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

              {project.team && project.team.length > 0 ? (
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
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mb-4 opacity-50" />
                  <h4 className="text-lg font-semibold mb-2">No team members yet</h4>
                  <p className="text-sm mb-4">Invite team members to collaborate</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Invite Member
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6">Activity Feed</h3>
              {project.activities && project.activities.length > 0 ? (
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
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Activity className="w-16 h-16 mb-4 opacity-50" />
                  <h4 className="text-lg font-semibold mb-2">No activity yet</h4>
                  <p className="text-sm">Project activity will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
