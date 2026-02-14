// import { useState, useMemo } from 'react';
// import TaskItem from './TaskItem';
// import ManageProjectModal from './ManageProjectModal';
// import { ChevronDown, ChevronUp, Triangle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// export default function ProjectCard({ project, onUpdate }) {
//   const [expanded, setExpanded] = useState(false);
//   const [showManage, setShowManage] = useState(false);
//   const { currentUser, userProfile } = useAuth();
  
//   // Use authUid (currentUser.uid) for permissions & task actions
//   const authUid = currentUser?.uid;
//   // Use profileId only if needed for display/navigation
//   const profileId = userProfile?.id;

//   // compute progress
//   const progress = useMemo(() => {
//     const total = project.tasks.length || 1;
//     const done = project.tasks.filter((t) => t.status === 'Completed').length;
//     return Math.round((done / total) * 100);
//   }, [project.tasks]);

//   function handleSave(updatedProject) {
//     onUpdate(updatedProject);
//     setShowManage(false);
//   }

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
//       <div className="p-4">
//         <div className="flex items-start justify-between">
//           <div>
//             <div className="flex items-center gap-3">
//               <h3 className="text-xl font-semibold text-white">{project.name}</h3>

//               {/* leader badge */}
//               {authUid && authUid === project.leaderId && (
//                 <span className="ml-2 text-xs px-2 py-1 bg-gray-800 border border-yellow-600 text-yellow-400 rounded-full font-semibold">YOU&apos;RE LEADER</span>
//               )}
//             </div>
//             <p className="text-sm text-gray-400 mt-1">Leader: <span className="font-medium text-white">{project.leaderName}</span></p>

//             <div className="mt-3 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-full max-w-xl">
//                   <div className="h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
//                     <div className={`h-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-400`} style={{ width: `${progress}%` }} />
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-400">Progress: <span className="text-white font-semibold">{project.tasks.filter(t=>t.status==='Completed').length}/{project.tasks.length} tasks</span></div>
//               </div>

//               <div className="text-gray-300 font-semibold text-sm">{progress}%</div>
//             </div>

//             <div className="mt-3 flex items-center gap-3">
//               <div className="text-sm text-gray-400 mr-2">Team:</div>
//               {project.team && project.team.map((m) => (
//                 <div key={m} className="text-xs px-2 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300">{m}</div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-2">
//             {authUid && authUid === project.leaderId && (
//               <button
//                 onClick={() => setShowManage(true)}
//                 className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm"
//               >
//                 Manage Project
//               </button>
//             )}

//             <button
//               onClick={() => setExpanded((s) => !s)}
//               className="p-2 bg-gray-700 rounded-md text-gray-200 hover:bg-gray-600"
//               aria-expanded={expanded}
//             >
//               {expanded ? <ChevronUp /> : <Triangle />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {expanded && (
//         <div className="border-t border-gray-700 p-4">
//           <div className="space-y-4">
//             {project.tasks.map((task) => (
//               <TaskItem key={task.id} task={task} project={project} />
//             ))}
//             {project.tasks.length === 0 && <div className="text-gray-400">No tasks added yet.</div>}
//           </div>
//         </div>
//       )}

//       {showManage && (
//         <ManageProjectModal project={project} onClose={() => setShowManage(false)} onSave={handleSave} />
//       )}
//     </div>
//   );
// }


import { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import ManageProjectModal from './ManageProjectModal';
import { ChevronDown, ChevronUp, Users, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProjectCard({ project, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const { currentUser } = useAuth();
  
  const authUid = currentUser?.uid;

  // Handle both string and array leaderIds
  const isLeader = Array.isArray(project.leaderId) 
    ? project.leaderId.includes(authUid)
    : project.leaderId === authUid;

  // 🔍 DEBUG - Remove this after testing
  console.log('=== PROJECT DEBUG ===');
  console.log('Project:', project.name);
  console.log('Current authUid:', authUid);
  console.log('Project leaderId:', project.leaderId);
  console.log('Is array?', Array.isArray(project.leaderId));
  console.log('Am I leader?', isLeader);
  console.log('====================');

  // Compute progress
  const progress = useMemo(() => {
    const total = project.tasks?.length || 1;
    const done = project.tasks?.filter((t) => t.status === 'Completed').length || 0;
    return Math.round((done / total) * 100);
  }, [project.tasks]);

  function handleSave(updatedProject) {
    onUpdate(updatedProject);
    setShowManage(false);
  }

  // Handle leaderName array or string
  const displayLeaderName = Array.isArray(project.leaderName) 
    ? project.leaderName.join(', ') 
    : project.leaderName || 'Unknown';

  const completedTasks = project.tasks?.filter(t => t.status === 'Completed').length || 0;
  const totalTasks = project.tasks?.length || 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden hover:border-yellow-500 transition-all duration-300">
      
      {/* Header Section */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          
          {/* Left Side: Project Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white truncate">{project.name}</h3>

              {/* Leader Badge */}
              {authUid && isLeader && (
                <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500 text-yellow-400 rounded-full text-xs font-bold whitespace-nowrap">
                  YOU'RE LEADER
                </span>
              )}
            </div>

            {/* Leader Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Target size={16} className="text-yellow-500 flex-shrink-0" />
              <span>Leader: <span className="font-medium text-white">{displayLeaderName}</span></span>
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
            )}

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">
                  Progress: <span className="text-white font-semibold">{completedTasks}/{totalTasks} tasks</span>
                </span>
                <span className="text-yellow-500 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Team Members */}
            {project.team && project.team.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Users size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-400">Team:</span>
                {project.team.map((member, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-1 bg-gray-700 border border-gray-600 rounded-full text-gray-300"
                  >
                    {member}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            
            {/* Manage Button (Only for Leader) */}
            {authUid && isLeader && (
              <button
                onClick={() => setShowManage(true)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md text-sm font-bold transition-colors shadow-lg hover:shadow-yellow-500/50 whitespace-nowrap"
              >
                Manage Project
              </button>
            )}

            {/* Expand/Collapse Button */}
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200 transition-colors"
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse tasks" : "Expand tasks"}
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Section (Expandable) */}
      {expanded && (
        <div className="border-t border-gray-700 bg-gray-900/50 p-6">
          <div className="space-y-4">
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <TaskItem key={task.id} task={task} project={project} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No tasks added yet.</p>
                {authUid && isLeader && (
                  <button
                    onClick={() => setShowManage(true)}
                    className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md text-sm font-bold transition-colors"
                  >
                    Add Your First Task
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manage Project Modal */}
      {showManage && (
        <ManageProjectModal 
          project={project} 
          onClose={() => setShowManage(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
}