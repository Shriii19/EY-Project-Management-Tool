import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { getProjects } from '../services/project.service';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Projects state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProjects();
        if (response.success && response.projects) {
          setProjects(response.projects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and sort projects with improved logic
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        // Sort by most recent first
        return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
      }
      if (sortBy === 'progress') {
        // Sort by highest progress first
        return (b.progress || 0) - (a.progress || 0);
      }
      if (sortBy === 'name') {
        // Sort alphabetically A-Z
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditProject = (projectId) => {
    // TODO: Implement edit functionality
  };

  const handleArchiveProject = (projectId) => {
    // TODO: Implement archive functionality
  };

  const handleNewProject = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/projects', message: 'Please login to create a project' } });
      return;
    }
    setShowNewProjectModal(true);
  };

  const handleProjectCreated = async (newProject) => {
    // Refresh projects list after creating a new project
    try {
      const response = await getProjects();
      if (response.success && response.projects) {
        setProjects(response.projects);
      }
    } catch (err) {
      console.error('Error refreshing projects:', err);
    }
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
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
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
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery || statusFilter !== 'All' 
                ? 'No projects found' 
                : 'No projects yet'}
            </h3>
            <p className="text-sm mb-4">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first project'}
            </p>
            {!searchQuery && statusFilter === 'All' && (
              <button
                onClick={handleNewProject}
                className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Project
              </button>
            )}
          </div>
        )}

        {/* New Project Modal */}
        <CreateProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      </div>
    </div>
  );
};

export default Projects;
