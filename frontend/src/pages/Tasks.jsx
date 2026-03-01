import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTodo, Filter, Plus, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTasks, normalizeStatus } from '../services/task.service';
import Loading from '../components/Loading';

const PRIORITY_FILTER_OPTIONS = ['All', 'High', 'Medium', 'Low'];

const Tasks = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTasks();
        if (response.success && response.tasks) {
          setTasks(response.tasks);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  }), [tasks, searchQuery, priorityFilter]);

  const handleNewTask = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/tasks', message: 'Please login to create a task' } });
      return;
    }
    // TODO: Open task creation modal
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':   return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':    return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:       return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <ListTodo className="w-8 h-8 text-purple-400" aria-hidden="true" />
              All Tasks
            </h1>
            <p className="text-slate-400">Manage and track all your tasks</p>
          </div>
          <button
            onClick={handleNewTask}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20"
            aria-label="Create new task"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Search tasks"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" aria-hidden="true" />
            {PRIORITY_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setPriorityFilter(opt)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  priorityFilter === opt
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
            <ListTodo className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery || priorityFilter !== 'All' ? 'No tasks match your filters' : 'No tasks yet'}
            </h3>
            <p className="text-slate-400">
              {searchQuery || priorityFilter !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first task to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id || task.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-semibold line-clamp-2 leading-snug">
                    {task.title || 'Untitled Task'}
                  </h3>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                {task.description && (
                  <p className="text-slate-400 text-sm line-clamp-2 mb-3">{task.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1">
                    {task.completed
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      : <Clock className="w-3.5 h-3.5" />}
                    <span className={task.completed ? 'text-green-400' : ''}>
                      {normalizeStatus(task).replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  {task.dueDate && (
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

