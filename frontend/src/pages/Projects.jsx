import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, FolderKanban } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { deleteProject, getProjects } from '../services/project.service';
import { useAuth } from '../context/useAuth';

const Projects = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Refs for click-outside detection
  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  
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

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showStatusDropdown || showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown, showSortDropdown]);

  // Filter and sort projects with improved logic
  const filteredProjects = useMemo(() => projects
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
    }), [projects, searchQuery, statusFilter, sortBy]);

  const handleViewProject = useCallback((projectId) => {
    navigate(`/projects/${projectId}`);
  }, [navigate]);

  const handleEditProject = useCallback((projectId) => {
    navigate(`/projects/${projectId}`);
  }, [navigate]);

  const handleArchiveProject = useCallback(async (projectId) => {
    try {
      setError(null);
      const response = await deleteProject(projectId);

      if (!response?.success) {
        throw new Error(response?.message || 'Archive request failed');
      }

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error('Error archiving project:', err);
      setError('Failed to archive project');
    }
  }, []);

  const handleNewProject = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/projects', message: 'Please login to create a project' } });
      return;
    }
    setShowNewProjectModal(true);
  }, [isAuthenticated, navigate]);

  const handleProjectCreated = useCallback(async () => {
    // Refresh projects list after creating a new project
    try {
      const response = await getProjects();
      if (response.success && response.projects) {
        setProjects(response.projects);
      }
    } catch (err) {
      console.error('Error refreshing projects:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ──────────────────────────────────────── */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2.5 bg-purple-500/20 rounded-xl">
                  <FolderKanban className="w-7 h-7 text-purple-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold gradient-text-animated">Projects</h1>
              </div>
              <p className="text-slate-400 text-sm sm:text-base ml-[3.25rem]">
                Manage and track all your projects
                {filteredProjects.length > 0 && (
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleNewProject}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* ── Search & Filters ────────────────────────────────── */}
          <div className="flex flex-col md:flex-row gap-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search projects by name or description…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/40 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                aria-label="Search projects by name or description"
              />
            </div>

            {/* Status Filter */}
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border border-slate-700/40 rounded-xl text-slate-200 hover:bg-slate-700/60 hover:border-purple-500/40 transition-all min-w-[148px] justify-between text-sm"
                aria-expanded={showStatusDropdown}
                aria-haspopup="true"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-purple-400" />
                  <span>{statusFilter}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showStatusDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-20">
                  {['All', 'Active', 'Completed', 'On Hold'].map((status, i, arr) => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setShowStatusDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        statusFilter === status
                          ? 'bg-purple-600/80 text-white font-medium'
                          : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                      } ${i === 0 ? 'rounded-t-xl' : ''} ${i === arr.length - 1 ? 'rounded-b-xl' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border border-slate-700/40 rounded-xl text-slate-200 hover:bg-slate-700/60 hover:border-purple-500/40 transition-all min-w-[168px] justify-between text-sm"
                aria-expanded={showSortDropdown}
                aria-haspopup="true"
              >
                <span>Sort: {sortBy === 'lastUpdated' ? 'Last Updated' : sortBy === 'progress' ? 'Progress' : 'Name'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-20">
                  {[
                    { value: 'lastUpdated', label: 'Last Updated' },
                    { value: 'progress',    label: 'Progress'     },
                    { value: 'name',        label: 'Name'         },
                  ].map((option, i, arr) => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-purple-600/80 text-white font-medium'
                          : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                      } ${i === 0 ? 'rounded-t-xl' : ''} ${i === arr.length - 1 ? 'rounded-b-xl' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Projects Grid ────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-slate-800 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded-lg w-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-slate-800 rounded-lg ml-3"></div>
                </div>
                <div className="h-5 bg-slate-800 rounded-full w-20 mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-2 bg-slate-800 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="w-8 h-8 bg-slate-800 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-3 bg-slate-800 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
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
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-16 flex flex-col items-center text-center gradient-border-top">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                <FolderKanban className="w-12 h-12 text-purple-400/60" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500/50 rounded-full animate-ping" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchQuery || statusFilter !== 'All' ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : 'Kick off your work by creating your first project and start collaborating'}
            </p>
            {!searchQuery && statusFilter === 'All' && (
              <button
                onClick={handleNewProject}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-95"
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
