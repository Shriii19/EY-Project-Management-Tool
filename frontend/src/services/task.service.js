import api from './api';

/**
 * Task Service
 * Handles all task-related API calls
 */

// Get all tasks for the current user
export const getTasks = async () => {
  try {
    const response = await api.get('/api/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Get a single task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/api/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};

// Helper function: Filter tasks by project ID (client-side filtering)
export const getTasksByProjectId = async (projectId) => {
  try {
    const response = await getTasks();
    if (response.success && response.tasks) {
      // Filter tasks by projectId if your backend supports it
      // Otherwise, return all tasks
      return {
        ...response,
        tasks: projectId 
          ? response.tasks.filter(task => task.projectId === projectId)
          : response.tasks
      };
    }
    return response;
  } catch (error) {
    console.error('Error fetching tasks by project:', error);
    throw error;
  }
};

// Helper function: Get task statistics
export const getTaskStats = async () => {
  try {
    const response = await getTasks();
    if (response.success && response.tasks) {
      const tasks = response.tasks;
      return {
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        highPriority: tasks.filter(t => t.priority === 'High').length,
        mediumPriority: tasks.filter(t => t.priority === 'Medium').length,
        lowPriority: tasks.filter(t => t.priority === 'Low').length,
      };
    }
    return {
      total: 0,
      active: 0,
      completed: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
    };
  } catch (error) {
    console.error('Error calculating task stats:', error);
    throw error;
  }
};

// Helper function: Group tasks by status for Kanban board
export const getTasksByStatus = async () => {
  try {
    const response = await getTasks();
    if (response.success && response.tasks) {
      const tasks = response.tasks;
      return {
        backlog: tasks.filter(t => t.status === 'backlog'),
        todo: tasks.filter(t => t.status === 'todo' || !t.status),
        inProgress: tasks.filter(t => t.status === 'inProgress'),
        review: tasks.filter(t => t.status === 'review'),
        done: tasks.filter(t => t.completed || t.status === 'done'),
      };
    }
    return {
      backlog: [],
      todo: [],
      inProgress: [],
      review: [],
      done: [],
    };
  } catch (error) {
    console.error('Error grouping tasks by status:', error);
    throw error;
  }
};

export default {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProjectId,
  getTaskStats,
  getTasksByStatus,
};
