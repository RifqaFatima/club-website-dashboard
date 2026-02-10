import { ExternalLink, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

function statusBadgeClass(status, isOverdue) {
  if (isOverdue) return 'bg-red-600 text-white';
  if (status === 'Completed') return 'bg-green-500 text-white';
  if (status === 'In-Progress') return 'bg-yellow-500 text-black';
  if (status === 'Delayed') return 'bg-orange-500 text-white';
  return 'bg-gray-600 text-white';
}

export default function TaskItem({ task }) {
  const today = new Date();
  const taskDate = new Date(task.date + 'T23:59:59');
  const isOverdue = taskDate < today && task.status !== 'Completed';

  const completedOnTime = task.completedDate ? new Date(task.completedDate) <= new Date(task.date + 'T23:59:59') : false;

  return (
    <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
      <div className="flex items-start gap-4">
        <div className="pt-1">
          {task.status === 'Completed' ? (
            <CheckCircle className="text-green-400" />
          ) : task.status === 'Delayed' || isOverdue ? (
            <AlertTriangle className="text-orange-400" />
          ) : (
            <Clock className="text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-white">{task.title}</div>
            {task.priority && (
              <div className="text-xs px-2 py-1 rounded text-sm font-semibold text-red-300 bg-red-900/20 border border-red-700">{task.priority.toUpperCase()}</div>
            )}
          </div>

          {task.description && <div className="text-sm text-gray-300 mt-2">{task.description}</div>}

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-400">
            <div>
              <div className="text-gray-400">Deadline:</div>
              <div className="text-white">{task.date}</div>
            </div>

            <div>
              <div className="text-gray-400">Completed:</div>
              <div className="text-white">{task.completedDate || '—'}</div>
            </div>

            <div>
              <div className="text-gray-400">Status:</div>
              <div className={`font-semibold ${isOverdue ? 'text-red-400' : task.status === 'Completed' ? 'text-green-400' : 'text-blue-300'}`}>
                {task.status === 'Completed' ? (completedOnTime ? 'Completed on time' : 'Completed') : isOverdue ? 'Overdue' : task.status}
              </div>
            </div>

            <div>
              <div className="text-gray-400">Assigned to:</div>
              <div className="text-white">{(task.assignedTo || []).join(', ') || '—'}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {task.github && (
            <a href={task.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <ExternalLink />
            </a>
          )}

          <div className={`${statusBadgeClass(task.status, isOverdue)} px-2 py-1 rounded-full text-xs font-medium`}>{isOverdue ? 'Overdue' : task.status}</div>
        </div>
      </div>
    </div>
  );
}
