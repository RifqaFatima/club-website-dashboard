import React from 'react';
import { AlertCircle, Clock, Check, Edit2, Trash2, ExternalLink } from 'lucide-react';

const StatusIcon = ({ status }) => {
  const iconProps = { className: 'w-4 h-4' };
  
  switch (status) {
    case 'Completed':
      return <Check {...iconProps} className={`${iconProps.className} text-green-600`} />;
    case 'In-Progress':
      return <Clock {...iconProps} className={`${iconProps.className} text-blue-600`} />;
    case 'Delayed':
      return <AlertCircle {...iconProps} className={`${iconProps.className} text-yellow-600`} />;
    case 'Overdue':
      return <AlertCircle {...iconProps} className={`${iconProps.className} text-red-600`} />;
    default:
      return <Clock {...iconProps} className={`${iconProps.className} text-gray-600`} />;
  }
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Completed': 'bg-green-100 text-green-800 border-green-300',
    'In-Progress': 'bg-blue-100 text-blue-800 border-blue-300',
    'Delayed': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Overdue': 'bg-red-100 text-red-800 border-red-300 animate-pulse',
    'Not Started': 'bg-gray-100 text-gray-800 border-gray-300'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles['Not Started']}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const priorityStyles = {
    'HIGH': 'bg-red-100 text-red-800',
    'MEDIUM': 'bg-yellow-100 text-yellow-800',
    'LOW': 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${priorityStyles[priority] || priorityStyles['MEDIUM']}`}>
      {priority}
    </span>
  );
};

const TaskCard = ({ task, isLeader, onEdit, onDelete }) => {
  return (
    <div className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Task Status Icon */}
        <div className="mt-1 flex-shrink-0">
          <StatusIcon status={task.status} />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-base font-semibold text-gray-900 truncate">{task.title}</h4>
            <StatusBadge status={task.status} />
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          )}

          {/* Task Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
            {/* Priority Badge */}
            <PriorityBadge priority={task.priority} />

            {/* Start Date */}
            {task.startDate && (
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Start:</span>
                <span className="font-medium text-gray-700">
                  {new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}

            {/* Deadline */}
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${task.status === 'Overdue' ? 'text-red-600' : ''}`}>
                <span className={task.status === 'Overdue' ? 'text-red-500 font-medium' : 'text-gray-500'}>Deadline:</span>
                <span className={`font-medium ${task.status === 'Overdue' ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                  {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}

            {/* Completion Date */}
            {task.completedDate && task.status === 'Completed' && (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-green-500">Completed:</span>
                <span className="font-medium text-green-700">
                  {new Date(task.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>

          {/* Assigned To */}
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="text-xs text-gray-600 mb-3">
              <span className="text-gray-500">Assigned:</span> {task.assignedTo.join(', ')}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isLeader ? (
            <>
              <button
                onClick={onEdit}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {task.github && (
                <a
                  href={task.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          ) : (
            <>
              <span className="text-xs font-medium text-gray-500">🔒 View only</span>
              {task.github && (
                <a
                  href={task.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
