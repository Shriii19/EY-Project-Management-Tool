import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MoreVertical, LayoutKanban } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { getTasks, getTasksByProjectId, updateTask, createTask, normalizeStatus, columnToBackendStatus } from '../services/task.service';
import { getProjectById } from '../services/project.service';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

// Column definitions
const columns = [
  { id: 'backlog', title: 'Backlog', color: 'from-gray-500 to-gray-600' },
  { id: 'todo', title: 'To Do', color: 'from-blue-500 to-blue-600' },
  { id: 'inProgress', title: 'In Progress', color: 'from-purple-500 to-purple-600' },
  { id: 'review', title: 'Review', color: 'from-yellow-500 to-yellow-600' },
  { id: 'done', title: 'Done', color: 'from-green-500 to-green-600' },
];

const KanbanBoard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Project name
  const [projectName, setProjectName] = useState('Project Tasks');

  // Fetch tasks and project details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch tasks and project details in parallel
        const [tasksResponse, projectResponse] = await Promise.all([
          projectId ? getTasksByProjectId(projectId) : getTasks(),
          projectId ? getProjectById(projectId) : Promise.resolve({ success: false }),
        ]);

        if (tasksResponse.success) {
          // Map tasks to frontend column IDs, normalizing backend status enum values
          const mappedTasks = tasksResponse.tasks.map(task => ({
            ...task,
            id: task._id || task.id,
            status: normalizeStatus(task),
          }));
          setTasks(mappedTasks);
        }

        if (projectResponse.success && projectResponse.project) {
          setProjectName(projectResponse.project.name);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // Check if over is a column
    const overColumn = columns.find((col) => col.id === overId);

    if (overColumn) {
      // Moving to a different column
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === activeId) {
            return { ...task, status: overColumn.id };
          }
          return task;
        });
      });
    } else if (overTask && activeTask.status !== overTask.status) {
      // Moving to a different column via task
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === activeId) {
            return { ...task, status: overTask.status };
          }
          return task;
        });
      });
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) {
      setActiveId(null);
      return;
    }

    // Check if over is a column
    const overColumn = columns.find((col) => col.id === overId);

    if (overColumn) {
      // Update task status when dropped on column
      const newStatus = overColumn.id;
      
      // Optimistically update UI
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === activeId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
      });

      // Update task on backend
      try {
        await updateTask(activeTask._id || activeTask.id, {
          status: columnToBackendStatus(newStatus),
          completed: newStatus === 'done',
        });
      } catch (err) {
        console.error('Error updating task:', err);
        // Revert on error
        setTasks((tasks) => {
          return tasks.map((task) => {
            if (task.id === activeId) {
              return activeTask;
            }
            return task;
          });
        });
      }
    } else if (overTask) {
      // Reordering within the same column or moving between columns
      if (activeTask.status === overTask.status) {
        setTasks((tasks) => {
          const oldIndex = tasks.findIndex((t) => t.id === activeId);
          const newIndex = tasks.findIndex((t) => t.id === overId);
          return arrayMove(tasks, oldIndex, newIndex);
        });
      }
    }

    setActiveId(null);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleAddTask = async (newTask) => {
    try {
      // Convert frontend column status to backend enum before saving
      const taskData = {
        ...newTask,
        status: columnToBackendStatus(newTask.status || 'todo'),
      };
      const response = await createTask(taskData);
      if (response.success && response.task) {
        const saved = response.task;
        const mapped = {
          ...saved,
          id: saved._id || saved.id,
          status: normalizeStatus(saved),
        };
        setTasks(prev => [...prev, mapped]);
      }
    } catch (err) {
      console.error('Failed to create task:', err);
      // Optimistic fallback so the UI still reflects the new card
      setTasks(prev => [...prev, { ...newTask, id: newTask.id || Date.now().toString() }]);
    }
  };

  const handleTaskClick = (task) => {
    // TODO: Open task details modal
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-8 px-4 sm:px-6">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-8 animate-fade-in-down">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-full px-4 py-2 w-fit">
            <button
              onClick={() => navigate('/projects')}
              className="hover:text-purple-400 transition-colors font-medium"
            >
              Projects
            </button>
            <span className="text-slate-700">/</span>
            <button
              onClick={() => navigate(`/projects/${projectId}`)}
              className="hover:text-purple-400 transition-colors font-medium"
            >
              {projectName}
            </button>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 font-semibold">Tasks</span>
          </div>

          {/* Page Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/projects/${projectId}`)}
                className="p-2.5 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 hover:border-purple-500/40 rounded-xl transition-all duration-200"
                aria-label="Back to project"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/20 rounded-xl">
                  <LayoutKanban className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold gradient-text-animated">Project Tasks</h1>
                  <p className="text-slate-400 text-sm mt-0.5">Manage tasks using Kanban workflow</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login', { state: { from: `/projects/${projectId}/tasks`, message: 'Please login to add a task' } });
                  return;
                }
                setShowAddTaskModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              const taskIds = columnTasks.map((t) => t.id);

              return (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-80"
                  id={column.id}
                >
                  {/* ── Column Header ───────────────────────────── */}
                  <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-3 sticky top-0 z-10 overflow-hidden hover-inset-glow transition-all duration-300">
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${column.color} rounded-t-2xl`} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${column.color} shadow-sm animate-pulse`} />
                        <h3 className="font-bold text-white tracking-wide text-sm uppercase">{column.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${column.color} text-white shadow-sm shadow-purple-500/20`}>
                          {columnTasks.length}
                        </span>
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" aria-label="Column options">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column Tasks */}
                  <div
                    className="min-h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
                    style={{ minHeight: '500px' }}
                  >
                    <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                      {columnTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
                      ))}
                    </SortableContext>

                    {/* ── Empty Column Placeholder ─────────────── */}
                    {columnTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-white/10 rounded-xl text-slate-600 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200 group/empty mt-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${column.color} opacity-20 flex items-center justify-center mb-3 group-hover/empty:opacity-40 transition-opacity duration-200`}>
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-medium text-slate-500 group-hover/empty:text-slate-400 transition-colors">
                          Drop tasks here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} onClick={() => {}} /> : null}
          </DragOverlay>
        </DndContext>
        
        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          onAddTask={handleAddTask}
          columns={columns}
        />
      </div>
      )}
    </div>
  );
};

export default KanbanBoard;
