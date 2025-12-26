import api from './api';

/**
 * Project Service
 * Handles all project-related API calls
 * 
 * Note: The backend doesn't have project endpoints yet.
 * This service provides a structure for when they are added,
 * and includes mock data fallbacks for development.
 */

// Mock project data for development (until backend implements projects)
const mockProjects = [
  {
    id: 'proj_1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    status: 'Active',
    progress: 65,
    startDate: '2025-01-01',
    dueDate: '2025-03-31',
    teamMembers: 5,
    totalTasks: 24,
    completedTasks: 16,
    priority: 'High',
    lastUpdated: '2025-12-25',
  },
  {
    id: 'proj_2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android',
    status: 'Active',
    progress: 40,
    startDate: '2025-02-01',
    dueDate: '2025-06-30',
    teamMembers: 8,
    totalTasks: 45,
    completedTasks: 18,
    priority: 'High',
    lastUpdated: '2025-12-24',
  },
  {
    id: 'proj_3',
    name: 'API Integration',
    description: 'Integrate third-party APIs for enhanced functionality',
    status: 'Active',
    progress: 80,
    startDate: '2025-01-15',
    dueDate: '2025-02-28',
    teamMembers: 3,
    totalTasks: 12,
    completedTasks: 10,
    priority: 'Medium',
    lastUpdated: '2025-12-26',
  },
];

// Get all projects
export const getProjects = async () => {
  try {
    // TODO: Replace with actual API call when backend implements projects
    // const response = await api.get('/api/projects');
    // return response.data;
    
    // For now, return mock data
    return {
      success: true,
      projects: mockProjects,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to mock data on error
    return {
      success: true,
      projects: mockProjects,
    };
  }
};

// Get a single project by ID
export const getProjectById = async (projectId) => {
  try {
    // TODO: Replace with actual API call when backend implements projects
    // const response = await api.get(`/api/projects/${projectId}`);
    // return response.data;
    
    // For now, return mock data
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      return {
        success: true,
        project: {
          ...project,
          tasks: [], // Tasks will come from task service
          recentActivity: [
            {
              id: 1,
              type: 'update',
              user: 'John Doe',
              action: 'updated task status',
              task: 'Design Homepage',
              timestamp: '2 hours ago',
            },
            {
              id: 2,
              type: 'complete',
              user: 'Jane Smith',
              action: 'completed',
              task: 'API Documentation',
              timestamp: '5 hours ago',
            },
          ],
          teamMembers: [
            { id: 1, name: 'John Doe', role: 'Project Lead', avatar: null },
            { id: 2, name: 'Jane Smith', role: 'Developer', avatar: null },
            { id: 3, name: 'Mike Johnson', role: 'Designer', avatar: null },
          ],
        },
      };
    }
    return {
      success: false,
      message: 'Project not found',
    };
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    // TODO: Replace with actual API call when backend implements projects
    // const response = await api.post('/api/projects', projectData);
    // return response.data;
    
    // For now, return success with mock data
    const newProject = {
      id: `proj_${Date.now()}`,
      ...projectData,
      progress: 0,
      teamMembers: 1,
      totalTasks: 0,
      completedTasks: 0,
      lastUpdated: new Date().toISOString(),
    };
    return {
      success: true,
      project: newProject,
      message: 'Project created successfully',
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update a project
export const updateProject = async (projectId, projectData) => {
  try {
    // TODO: Replace with actual API call when backend implements projects
    // const response = await api.put(`/api/projects/${projectId}`, projectData);
    // return response.data;
    
    // For now, return success
    return {
      success: true,
      project: { id: projectId, ...projectData },
      message: 'Project updated successfully',
    };
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

// Delete/Archive a project
export const deleteProject = async (projectId) => {
  try {
    // TODO: Replace with actual API call when backend implements projects
    // const response = await api.delete(`/api/projects/${projectId}`);
    // return response.data;
    
    // For now, return success
    return {
      success: true,
      message: 'Project archived successfully',
    };
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};

// Get project statistics
export const getProjectStats = async () => {
  try {
    const response = await getProjects();
    if (response.success && response.projects) {
      const projects = response.projects;
      return {
        total: projects.length,
        active: projects.filter(p => p.status === 'Active').length,
        completed: projects.filter(p => p.status === 'Completed').length,
        onHold: projects.filter(p => p.status === 'On Hold').length,
      };
    }
    return { total: 0, active: 0, completed: 0, onHold: 0 };
  } catch (error) {
    console.error('Error calculating project stats:', error);
    throw error;
  }
};

export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
};
