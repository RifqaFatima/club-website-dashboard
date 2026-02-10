import { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import ManageProjectModal from './ManageProjectModal';
import { ChevronDown, ChevronUp, Triangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProjectCard({ project, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const { currentUser, userProfile } = useAuth();
  
  // Use authUid (currentUser.uid) for permissions & task actions
  const authUid = currentUser?.uid;
  // Use profileId only if needed for display/navigation
  const profileId = userProfile?.id;

  // compute progress
  const progress = useMemo(() => {
    const total = project.tasks.length || 1;
    const done = project.tasks.filter((t) => t.status === 'Completed').length;
    return Math.round((done / total) * 100);
  }, [project.tasks]);

  function handleSave(updatedProject) {
    onUpdate(updatedProject);
    setShowManage(false);
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>

              {/* leader badge */}
              {authUid && authUid === project.leaderId && (
                <span className="ml-2 text-xs px-2 py-1 bg-gray-800 border border-yellow-600 text-yellow-400 rounded-full font-semibold">YOU&apos;RE LEADER</span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">Leader: <span className="font-medium text-white">{project.leaderName}</span></p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-full max-w-xl">
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-400`} style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="text-sm text-gray-400">Progress: <span className="text-white font-semibold">{project.tasks.filter(t=>t.status==='Completed').length}/{project.tasks.length} tasks</span></div>
              </div>

              <div className="text-gray-300 font-semibold text-sm">{progress}%</div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="text-sm text-gray-400 mr-2">Team:</div>
              {project.team && project.team.map((m) => (
                <div key={m} className="text-xs px-2 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300">{m}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {authUid && authUid === project.leaderId && (
              <button
                onClick={() => setShowManage(true)}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm"
              >
                Manage Project
              </button>
            )}

            <button
              onClick={() => setExpanded((s) => !s)}
              className="p-2 bg-gray-700 rounded-md text-gray-200 hover:bg-gray-600"
              aria-expanded={expanded}
            >
              {expanded ? <ChevronUp /> : <Triangle />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-700 p-4">
          <div className="space-y-4">
            {project.tasks.map((task) => (
              <TaskItem key={task.id} task={task} project={project} />
            ))}
            {project.tasks.length === 0 && <div className="text-gray-400">No tasks added yet.</div>}
          </div>
        </div>
      )}

      {showManage && (
        <ManageProjectModal project={project} onClose={() => setShowManage(false)} onSave={handleSave} />
      )}
    </div>
  );
}
