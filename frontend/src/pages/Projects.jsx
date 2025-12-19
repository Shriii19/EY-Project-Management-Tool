import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

// Dummy Project Data
const dummyProjects = [
  {
    id: 1,
    name: 'EY Digital Platform',
    description: 'Building a comprehensive digital platform for client engagement and service delivery',
    status: 'Active',
    progress: 75,
    tasksCompleted: 18,
    totalTasks: 24,
    teamMembers: [
      { name: 'John Doe', initials: 'JD' },
      { name: 'Jane Smith', initials: 'JS' },
      { name: 'Mike Johnson', initials: 'MJ' },
      { name: 'Sarah Williams', initials: 'SW' },
      { name: 'Tom Brown', initials: 'TB' },
    ],
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'Tax Automation System',
    description: 'Automated tax calculation and reporting system for enterprise clients',
    status: 'Active',
    progress: 60,
    tasksCompleted: 12,
    totalTasks: 20,
    teamMembers: [
      { name: 'Alice Cooper', initials: 'AC' },
      { name: 'Bob Martin', initials: 'BM' },
      { name: 'Carol White', initials: 'CW' },
    ],
    lastUpdated: '5 hours ago',
  },
  {
    id: 3,
    name: 'Audit Management Tool',
    description: 'Comprehensive audit management and tracking system with real-time reporting',
    status: 'Completed',
    progress: 100,
    tasksCompleted: 32,
    totalTasks: 32,
    teamMembers: [
      { name: 'David Lee', initials: 'DL' },
      { name: 'Emma Davis', initials: 'ED' },
      { name: 'Frank Miller', initials: 'FM' },
      { name: 'Grace Taylor', initials: 'GT' },
    ],
    lastUpdated: '1 day ago',
  },
  {
    id: 4,
    name: 'Client Portal Redesign',
    description: 'Modern redesign of client-facing portal with enhanced UX and accessibility',
    status: 'On Hold',
    progress: 40,
    tasksCompleted: 8,
    totalTasks: 20,
    teamMembers: [
      { name: 'Henry Wilson', initials: 'HW' },
      { name: 'Ivy Anderson', initials: 'IA' },
    ],
    lastUpdated: '3 days ago',
  },
  {
    id: 5,
    name: 'Financial Analytics Dashboard',
    description: 'Real-time financial analytics and reporting dashboard for executives',
    status: 'Active',
    progress: 85,
    tasksCompleted: 25,
    totalTasks: 28,
    teamMembers: [
      { name: 'Jack Thomas', initials: 'JT' },
      { name: 'Kate Martinez', initials: 'KM' },
      { name: 'Leo Garcia', initials: 'LG' },
      { name: 'Mia Robinson', initials: 'MR' },
    ],
    lastUpdated: '1 hour ago',
  },
  {
    id: 6,
    name: 'Risk Assessment Platform',
    description: 'AI-powered risk assessment and mitigation platform for enterprise clients',
    status: 'Active',
    progress: 55,
    tasksCompleted: 11,
    totalTasks: 20,
    teamMembers: [
      { name: 'Noah Clark', initials: 'NC' },
      { name: 'Olivia Lewis', initials: 'OL' },
      { name: 'Peter Walker', initials: 'PW' },
    ],
    lastUpdated: '4 hours ago',
  },
  {
    id: 7,
    name: 'Compliance Tracking System',
    description: 'Automated compliance tracking and reporting system with regulatory updates',
    status: 'Completed',
    progress: 100,
    tasksCompleted: 15,
    totalTasks: 15,
    teamMembers: [
      { name: 'Quinn Hall', initials: 'QH' },
      { name: 'Rachel Young', initials: 'RY' },
    ],
    lastUpdated: '5 days ago',
  },
  {
    id: 8,
    name: 'Mobile App Development',
    description: 'Native mobile application for field auditors with offline capabilities',
    status: 'Active',
    progress: 30,
    tasksCompleted: 6,
    totalTasks: 20,
    teamMembers: [
      { name: 'Sam King', initials: 'SK' },
      { name: 'Tina Wright', initials: 'TW' },
      { name: 'Uma Scott', initials: 'US' },
      { name: 'Victor Green', initials: 'VG' },
    ],
    lastUpdated: '6 hours ago',
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter and sort projects
  const filteredProjects = dummyProjects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        // Simple string comparison for demo purposes
        return a.lastUpdated.localeCompare(b.lastUpdated);
      }
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId);
    // TODO: Implement edit functionality
  };

  const handleArchiveProject = (projectId) => {
    console.log('Archive project:', projectId);
    // TODO: Implement archive functionality
  };

  const handleNewProject = () => {
    setShowNewProjectModal(true);
    console.log('Open new project modal');
    // TODO: Implement modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
              <p className="text-gray-400">Manage and track all your projects</p>
            </div>
            <button
              onClick={handleNewProject}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white hover:bg-gray-700/50 transition-all min-w-[160px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span>{statusFilter}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                  {['All', 'Active', 'Completed', 'On Hold'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        statusFilter === status
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      } ${status === 'All' ? 'rounded-t-lg' : ''} ${
                        status === 'On Hold' ? 'rounded-b-lg' : ''
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white hover:bg-gray-700/50 transition-all min-w-[180px] justify-between"
              >
                <span className="text-sm">
                  Sort: {sortBy === 'lastUpdated' ? 'Last Updated' : sortBy === 'progress' ? 'Progress' : 'Name'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                  {[
                    { value: 'lastUpdated', label: 'Last Updated' },
                    { value: 'progress', label: 'Progress' },
                    { value: 'name', label: 'Name' },
                  ].map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${
                        index === 2 ? 'rounded-b-lg' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
                onEdit={handleEditProject}
                onArchive={handleArchiveProject}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}

        {/* New Project Modal Placeholder */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-4">New Project</h2>
              <p className="text-gray-400 mb-6">
                Project creation form will be implemented with backend integration.
              </p>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
