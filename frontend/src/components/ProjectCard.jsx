import { Clock, Users, CheckCircle2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const ProjectCard = ({ project, onView, onEdit, onArchive }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleViewClick = () => {
    onView(project.id);
  };

  // Safely handle missing data
  const progress = project.progress ?? 0;
  const tasksCompleted = project.tasksCompleted ?? 0;
  const totalTasks = project.totalTasks ?? 0;
  const teamMembers = project.teamMembers ?? [];
  const status = project.status ?? 'Unknown';
  const name = project.name ?? 'Untitled Project';
  const description = project.description ?? 'No description available';
  const lastUpdated = project.lastUpdated ?? 'Unknown';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {description}
          </p>
        </div>
        
        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              <button
                onClick={() => {
                  handleViewClick();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg transition-colors"
              >
                View Project
              </button>
              <button
                onClick={() => {
                  onEdit(project.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Edit Project
              </button>
              <button
                onClick={() => {
                  onArchive(project.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg transition-colors"
              >
                Archive Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs font-semibold text-purple-400">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-gray-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm">
            <span className="text-white font-semibold">{tasksCompleted}</span>
            <span className="text-gray-500">/{totalTasks}</span> tasks
          </span>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-semibold text-white"
              title={member.name}
            >
              {member.avatar ? (
                member.avatar.startsWith('http') ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  member.avatar
                )
              ) : (
                member.initials || member.name?.[0] || '?'
              )}
            </div>
          ))}
          {teamMembers.length > 4 && (
            <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-300">
              +{teamMembers.length - 4}
            </div>
          )}
          {teamMembers.length === 0 && (
            <div className="text-xs text-gray-500">No team members</div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{lastUpdated}</span>
        </div>
      </div>

      {/* View Button (Mobile Friendly) */}
      <button
        onClick={handleViewClick}
        className="mt-4 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        View Project
      </button>
    </div>
  );
};

export default ProjectCard;
