import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as logoutService } from '../services/auth.service';
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  BarChart3,
  Users,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
  FileText,
  Calendar,
  Target,
  Clock,
  HelpCircle,
  Building2
} from 'lucide-react';

const Navbar = () => {
  // Auth context
  const { user, logout } = useAuth();
  
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Refs for click outside detection
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Get current location for active link highlighting
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items configuration
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, path: '/tasks' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'team', label: 'Team', icon: Users, path: '/team' },
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    logoutService();
  };

  // Profile dropdown items with unique IDs
  const profileItems = [
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'my-projects', label: 'My Projects', icon: FolderKanban, path: '/projects', divider: true },
    { id: 'my-tasks', label: 'My Tasks', icon: ListTodo, path: '/tasks' },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock, action: () => {} },
    { id: 'reports', label: 'Reports', icon: FileText, action: () => {} },
    { id: 'milestones', label: 'Milestones', icon: Target, action: () => {} },
    { id: 'calendar', label: 'Calendar', icon: Calendar, action: () => {}, divider: true },
    { id: 'notifications', label: 'Notifications', icon: Bell, action: () => {} },
    { id: 'workspace', label: 'Workspace', icon: Building2, action: () => {} },
    { id: 'help', label: 'Help Center', icon: HelpCircle, action: () => {}, divider: true },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => {} },
    { id: 'logout', label: 'Logout', icon: LogOut, action: handleLogout, danger: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Check if current path matches the nav item path
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/50'
          : 'bg-slate-900/60 backdrop-blur-lg'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link
            to="/"
            className="flex items-center space-x-3 flex-shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label="Go to dashboard"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
              Project Management Tool
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent sm:hidden">
              PMT
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-purple-300'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            
            {user && (
              <>
                {/* Notifications */}
                <button
                  className="relative p-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-purple-400 transition-all duration-200"
                  aria-label="Notifications"
                  onClick={() => setNotificationCount(0)}
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50 animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-purple-400 transition-all duration-200"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              /* Profile Dropdown for authenticated users */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onKeyDown={(e) => handleKeyDown(e, () => setIsProfileOpen(!isProfileOpen))}
                  className="flex items-center space-x-2 p-2 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-all duration-200"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-slate-900/50 border border-slate-700/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {profileItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <React.Fragment key={index}>
                          {item.divider && index > 0 && (
                            <div className="h-px bg-slate-700/50 my-1" />
                          )}
                          <button
                            onClick={() => {
                              if (item.path) {
                                navigate(item.path);
                              } else if (item.action) {
                                item.action();
                              }
                              setIsProfileOpen(false);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, () => {
                              if (item.path) {
                                navigate(item.path);
                              } else if (item.action) {
                                item.action();
                              }
                              setIsProfileOpen(false);
                            })}
                            className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-colors duration-150 ${
                              item.danger
                                ? 'text-red-400 hover:bg-red-500/10'
                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-purple-400'
                            }`}
                            role="menuitem"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Login and Signup buttons for guests */
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-purple-400 transition-all duration-200 font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium text-sm shadow-lg shadow-purple-500/25"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsMobileMenuOpen(!isMobileMenuOpen))}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-all duration-200 flex items-center justify-center"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden py-4 space-y-1 animate-in slide-in-from-top duration-300"
            role="menu"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                  role="menuitem"
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Login/Signup buttons in mobile menu for guests */}
            {!user && (
              <div className="pt-4 mt-4 border-t border-slate-700/50 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg shadow-purple-500/25"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
