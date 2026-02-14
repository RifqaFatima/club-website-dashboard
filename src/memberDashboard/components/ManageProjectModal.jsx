// import { useState } from 'react';
// import { X, PlusCircle, Trash } from 'lucide-react';

// const STATUSES = ['In-Progress', 'Completed', 'Delayed'];
// const PRIORITIES = ['Low', 'Medium', 'High'];

// export default function ManageProjectModal({ project, onClose, onSave }) {
//   const [tasks, setTasks] = useState(project.tasks || []);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });

//   function startAdd() {
//     setEditing(null);
//     setForm({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });
//   }

//   function startEdit(task) {
//     setEditing(task.id);
//     setForm({ title: task.title, description: task.description || '', date: task.date, completedDate: task.completedDate || '', status: task.status, priority: task.priority || 'Medium', assignedTo: (task.assignedTo || []).join(', '), github: task.github || '' });
//   }

//   function saveForm() {
//     if (!form.title || !form.date) return;
//     const payload = {
//       ...form,
//       assignedTo: form.assignedTo.split(',').map((s) => s.trim()).filter(Boolean)
//     };

//     if (editing) {
//       setTasks((prev) => prev.map((t) => (t.id === editing ? { ...t, ...payload } : t)));
//     } else {
//       const id = `t${Date.now()}`;
//       setTasks((prev) => [...prev, { id, ...payload }]);
//     }

//     setEditing(null);
//     setForm({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });
//   }

//   function deleteTask(id) {
//     setTasks((prev) => prev.filter((t) => t.id !== id));
//   }

//   function saveProject() {
//     onSave({ ...project, tasks });
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//       <div role="dialog" aria-modal="true" aria-labelledby="manage-project-title" className="bg-gray-900 w-full max-w-3xl rounded-lg shadow-xl border border-gray-700 overflow-hidden">
//         <div className="p-4 flex items-center justify-between border-b border-gray-800">
//           <h3 id="manage-project-title" className="text-lg font-semibold text-white">Manage: {project.name}</h3>
//           <button onClick={onClose} aria-label="Close dialog" className="p-1 rounded hover:bg-gray-800 text-gray-300">
//             <X />
//           </button>
//         </div>

//         <div className="p-4 space-y-4">          <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-300 font-medium">Tasks</div>
//               <button onClick={startAdd} className="flex items-center gap-2 text-sm px-2 py-1 bg-green-600 rounded text-white">
//                 <PlusCircle /> Add Task
//               </button>
//             </div>
//             <div className="space-y-2">
//               {tasks.map((t) => (
//                 <div key={t.id} className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700">
//                   <div>
//                     <div className="text-white font-medium">{t.title}</div>
//                     <div className="text-xs text-gray-400">{t.date} • {t.status} • {t.priority}</div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => startEdit(t)} className="px-2 py-1 text-sm bg-blue-600 rounded text-white">Edit</button>
//                     <button onClick={() => deleteTask(t.id)} className="px-2 py-1 text-sm bg-red-600 rounded text-white"><Trash /></button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Form */}
//           <div className="bg-gray-800 p-3 rounded border border-gray-700">
//             <div className="grid grid-cols-1 gap-2">
//               <input value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} placeholder="Task title" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
//               <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} placeholder="Short description (optional)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" rows={2} />

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <input value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} type="date" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
//                 <input value={form.completedDate} onChange={(e) => setForm((s) => ({ ...s, completedDate: e.target.value }))} type="date" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))} className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm">
//                   {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//                 <select value={form.priority} onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))} className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm">
//                   {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>

//               <input value={form.assignedTo} onChange={(e) => setForm((s) => ({ ...s, assignedTo: e.target.value }))} placeholder="Assigned to (comma separated)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />

//               <input value={form.github} onChange={(e) => setForm((s) => ({ ...s, github: e.target.value }))} placeholder="GitHub URL (optional)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />

//               <div className="flex items-center justify-end gap-2 mt-3">
//                 <button onClick={saveForm} className="px-3 py-1 bg-yellow-500 rounded text-black">Save Task</button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-end gap-2">
//             <button onClick={onClose} className="px-3 py-1 bg-gray-700 rounded text-white">Cancel</button>
//             <button onClick={saveProject} className="px-3 py-1 bg-indigo-600 rounded text-white">Save Project</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { X, PlusCircle, Trash, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { addTask, updateTask, deleteTask } from '../../firebase/projects';

const STATUSES = ['In-Progress', 'Completed', 'Delayed'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function ManageProjectModal({ project, onClose, onSave }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    completedDate: '', 
    status: 'In-Progress', 
    priority: 'Medium', 
    assignedTo: '', 
    github: '' 
  });
  
  const { currentUser } = useAuth();
  const authUid = currentUser?.uid;

  function startAdd() {
    setEditing(null);
    setForm({ 
      title: '', 
      description: '', 
      date: '', 
      completedDate: '', 
      status: 'In-Progress', 
      priority: 'Medium', 
      assignedTo: '', 
      github: '' 
    });
  }

  function startEdit(task) {
    setEditing(task.id);
    setForm({ 
      title: task.title, 
      description: task.description || '', 
      date: task.date, 
      completedDate: task.completedDate || '', 
      status: task.status, 
      priority: task.priority || 'Medium', 
      assignedTo: (task.assignedTo || []).join(', '), 
      github: task.github || '' 
    });
  }

  async function saveForm() {
    if (!form.title || !form.date) {
      alert('Title and deadline are required!');
      return;
    }
    
    setSaving(true);
    
    try {
      const taskData = {
        title: form.title,
        description: form.description,
        deadline: new Date(form.date + 'T00:00:00'),
        status: form.status.toLowerCase().replace('-', '-'),
        priority: form.priority,
        assignedTo: form.assignedTo.split(',').map(s => s.trim()).filter(Boolean),
        github: form.github
      };

      if (editing) {
        // Update existing task
        await updateTask(project.id, editing, taskData, authUid);
        
        setTasks(prev => prev.map(t => 
          t.id === editing ? {
            id: editing,
            ...form,
            assignedTo: taskData.assignedTo
          } : t
        ));
      } else {
        // Add new task
        const docRef = await addTask(project.id, taskData, authUid);
        
        const newTask = {
          id: docRef.id,
          title: form.title,
          description: form.description,
          date: form.date,
          completedDate: '',
          status: form.status,
          priority: form.priority,
          assignedTo: taskData.assignedTo,
          github: form.github
        };
        
        setTasks(prev => [...prev, newTask]);
      }

      setEditing(null);
      setForm({ 
        title: '', 
        description: '', 
        date: '', 
        completedDate: '', 
        status: 'In-Progress', 
        priority: 'Medium', 
        assignedTo: '', 
        github: '' 
      });
      
      alert('Task saved successfully!');
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setSaving(true);
    
    try {
      await deleteTask(project.id, taskId, authUid);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  function saveProject() {
    onSave({ ...project, tasks });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-3xl rounded-lg shadow-xl border border-gray-700 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800 flex-shrink-0">
          <h3 className="text-lg font-semibold text-white">Manage: {project.name}</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded hover:bg-gray-800 text-gray-300"
            disabled={saving}
          >
            <X />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          
          {/* Task List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300 font-medium">Tasks ({tasks.length})</div>
              <button 
                onClick={startAdd} 
                className="flex items-center gap-2 text-sm px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white disabled:opacity-50"
                disabled={saving}
              >
                <PlusCircle size={16} /> Add Task
              </button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No tasks yet. Click "Add Task" to create one.</p>
              ) : (
                tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{t.title}</div>
                      <div className="text-xs text-gray-400">
                        {t.date} • {t.status} • {t.priority}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <button 
                        onClick={() => startEdit(t)} 
                        className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
                        disabled={saving}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(t.id)} 
                        className="px-2 py-1 text-sm bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50"
                        disabled={saving}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Task Form */}
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h4 className="text-white font-medium mb-3">
              {editing ? 'Edit Task' : 'Add New Task'}
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              <input 
                value={form.title} 
                onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))} 
                placeholder="Task title *" 
                className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
                disabled={saving}
              />
              
              <textarea 
                value={form.description} 
                onChange={(e) => setForm(s => ({ ...s, description: e.target.value }))} 
                placeholder="Description (optional)" 
                className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" 
                rows={2}
                disabled={saving}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Deadline *</label>
                  <input 
                    value={form.date} 
                    onChange={(e) => setForm(s => ({ ...s, date: e.target.value }))} 
                    type="date" 
                    className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm w-full"
                    disabled={saving}
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Completed Date</label>
                  <input 
                    value={form.completedDate} 
                    onChange={(e) => setForm(s => ({ ...s, completedDate: e.target.value }))} 
                    type="date" 
                    className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm w-full"
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Status</label>
                  <select 
                    value={form.status} 
                    onChange={(e) => setForm(s => ({ ...s, status: e.target.value }))} 
                    className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm w-full"
                    disabled={saving}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Priority</label>
                  <select 
                    value={form.priority} 
                    onChange={(e) => setForm(s => ({ ...s, priority: e.target.value }))} 
                    className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm w-full"
                    disabled={saving}
                  >
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <input 
                value={form.assignedTo} 
                onChange={(e) => setForm(s => ({ ...s, assignedTo: e.target.value }))} 
                placeholder="Assigned to (comma separated names)" 
                className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
                disabled={saving}
              />

              <input 
                value={form.github} 
                onChange={(e) => setForm(s => ({ ...s, github: e.target.value }))} 
                placeholder="GitHub URL (optional)" 
                className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
                disabled={saving}
              />

              <div className="flex items-center justify-end gap-2 mt-2">
                <button 
                  onClick={saveForm} 
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-medium disabled:opacity-50 flex items-center gap-2"
                  disabled={saving}
                >
                  {saving && <Loader className="animate-spin" size={16} />}
                  {editing ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center justify-end gap-2 border-t border-gray-800 flex-shrink-0">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white disabled:opacity-50"
            disabled={saving}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}