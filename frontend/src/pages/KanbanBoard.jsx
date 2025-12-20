import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MoreVertical } from 'lucide-react';
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

// Dummy tasks data
const initialTasks = [
  {
    id: '1',
    title: 'Design system architecture',
    description: 'Create comprehensive system architecture diagram for the platform',
    priority: 'High',
    dueDate: '2024-02-15',
    assignee: { name: 'Michael Chen', avatar: 'MC' },
    status: 'backlog',
  },
  {
    id: '2',
    title: 'Setup development environment',
    description: 'Configure dev environment with all necessary tools and dependencies',
    priority: 'High',
    dueDate: '2024-02-10',
    assignee: { name: 'Sarah Johnson', avatar: 'SJ' },
    status: 'done',
  },
  {
    id: '3',
    title: 'Create user authentication flow',
    description: 'Implement JWT-based authentication with OAuth integration',
    priority: 'High',
    dueDate: '2024-02-20',
    assignee: { name: 'Emily Davis', avatar: 'ED' },
    status: 'inProgress',
  },
  {
    id: '4',
    title: 'Database schema design',
    description: 'Design and document database schema for all entities',
    priority: 'Medium',
    dueDate: '2024-02-18',
    assignee: { name: 'James Wilson', avatar: 'JW' },
    status: 'todo',
  },
  {
    id: '5',
    title: 'API endpoint documentation',
    description: 'Document all REST API endpoints with examples',
    priority: 'Medium',
    dueDate: '2024-02-25',
    assignee: { name: 'Anna Martinez', avatar: 'AM' },
    status: 'review',
  },
  {
    id: '6',
    title: 'Unit tests for auth module',
    description: 'Write comprehensive unit tests for authentication module',
    priority: 'High',
    dueDate: '2024-02-22',
    assignee: { name: 'Michael Chen', avatar: 'MC' },
    status: 'inProgress',
  },
  {
    id: '7',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'Medium',
    dueDate: '2024-03-01',
    assignee: { name: 'Sarah Johnson', avatar: 'SJ' },
    status: 'todo',
  },
  {
    id: '8',
    title: 'Performance optimization',
    description: 'Optimize database queries and implement caching strategy',
    priority: 'Low',
    dueDate: '2024-03-10',
    assignee: { name: 'Emily Davis', avatar: 'ED' },
    status: 'backlog',
  },
  {
    id: '9',
    title: 'Security audit',
    description: 'Conduct comprehensive security audit and fix vulnerabilities',
    priority: 'High',
    dueDate: '2024-02-28',
    assignee: { name: 'James Wilson', avatar: 'JW' },
    status: 'review',
  },
  {
    id: '10',
    title: 'User feedback analysis',
    description: 'Analyze user feedback and create improvement roadmap',
    priority: 'Low',
    dueDate: '2024-03-05',
    assignee: { name: 'Anna Martinez', avatar: 'AM' },
    status: 'todo',
  },
];

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
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Dummy project name (would come from API)
  const projectName = 'EY Digital Transformation';

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

  const handleDragEnd = (event) => {
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
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === activeId) {
            return { ...task, status: overColumn.id };
          }
          return task;
        });
      });
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

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // TODO: Open task details modal
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <button
              onClick={() => navigate('/projects')}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/projects/${projectId}`)}
              className="hover:text-white transition-colors"
            >
              {projectName}
            </button>
            <span>/</span>
            <span className="text-white">Tasks</span>
          </div>

          {/* Page Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/projects/${projectId}`)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Project Tasks</h1>
                <p className="text-gray-400 mt-1">Manage tasks using Kanban workflow</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30"
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
                  {/* Column Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}></div>
                        <h3 className="font-semibold text-lg">{column.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                          {columnTasks.length}
                        </span>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
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

                    {/* Empty State */}
                    {columnTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
                          <Plus className="w-8 h-8" />
                        </div>
                        <p className="text-sm">No tasks</p>
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
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAddTask={handleAddTask}
        columns={columns}
      />
    </div>
  );
};

export default KanbanBoard;
