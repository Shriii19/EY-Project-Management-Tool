/**
 * Application Constants
 * Centralized configuration for the EY Project Management Tool
 */

// App Metadata
export const APP_NAME = 'EY Project Manager';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 15000, // 15 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Task Priorities
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Task Statuses
export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
};

// Project Statuses
export const PROJECT_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  ON_HOLD: 'on-hold',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

// Date Formats
export const DATE_FORMAT = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
};

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  MEMBER: 'member',
  VIEWER: 'viewer',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  TASK_COMPLETED: 'task_completed',
  PROJECT_UPDATED: 'project_updated',
  MENTION: 'mention',
  DEADLINE_REMINDER: 'deadline_reminder',
};
