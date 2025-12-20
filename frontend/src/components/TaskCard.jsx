import { Calendar, AlertCircle, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityDotColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 mb-3 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all group ${
        isDragging ? 'shadow-2xl shadow-blue-500/20 scale-105' : ''
      }`}
      onClick={() => onClick && onClick(task)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-2 mb-3 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
        <div className={`w-1 h-1 rounded-full ${getPriorityDotColor(task.priority)}`}></div>
      </div>

      {/* Task Title */}
      <h4 className="text-white font-semibold mb-2 line-clamp-2">{task.title}</h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Priority Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        {/* Due Date */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.dueDate}</span>
        </div>

        {/* Assignee Avatar */}
        {task.assignee && (
          <div
            className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white border border-white/20"
            title={task.assignee.name}
          >
            {task.assignee.avatar}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
