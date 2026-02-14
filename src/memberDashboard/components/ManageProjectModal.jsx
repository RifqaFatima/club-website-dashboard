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



import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, PlusCircle, Trash2, Loader, Edit2, Save, XCircle, AlertTriangle, CheckCircle, UserPlus, CheckSquare, Square, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { addTask, updateTask, deleteTask } from '../../firebase/projects';

const STATUSES = ['In-Progress', 'Completed', 'Delayed'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function ManageProjectModal({ project, onClose, onSave }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, title: '', message: '', onConfirm: null });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [form, setForm] = useState({ 
    title: '', description: '', date: '', completedDate: '', 
    status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' 
  });
  
  const { currentUser } = useAuth();
  const authUid = currentUser?.uid;

  // SCROLL LOCK
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const triggerConfirm = (title, message, action) => {
    setConfirmDialog({ show: true, title, message, onConfirm: action });
  };

  // --- LOGIC: TOGGLE STATUS WITH TIMESTAMP ---
  const toggleTaskStatus = async (task) => {
    const isNowCompleted = task.status !== 'Completed';
    // Format: "Feb 15, 2026"
    const today = new Date().toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });

    const updatedTask = {
      ...task,
      status: isNowCompleted ? 'Completed' : 'In-Progress',
      completedDate: isNowCompleted ? today : '' 
    };

    setSaving(true);
    try {
      await updateTask(project.id, task.id, updatedTask, authUid);
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
      showToast(isNowCompleted ? 'Mission Completed!' : 'Task Restored');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  async function saveForm() {
    if (!form.title || !form.date) {
      showToast('Title and Deadline are required!', 'error');
      return;
    }
    setSaving(true);
    try {
      // 1. Ensure we have a valid Date object or null
      const deadlineDate = form.date ? new Date(form.date + 'T12:00:00') : null;

      // 2. Build the object carefully - use empty strings instead of undefined
      const taskData = {
        title: form.title?.trim() || '',
        description: form.description?.trim() || '',
        status: form.status || 'In-Progress',
        priority: form.priority || 'Medium',
        date: form.date || '', // The string version for the UI
        deadline: deadlineDate, // The Date version for Firebase
        completedDate: form.completedDate || '',
        assignedTo: typeof form.assignedTo === 'string' 
          ? form.assignedTo.split(',').map(s => s.trim()).filter(Boolean) 
          : (form.assignedTo || []),
        github: form.github?.trim() || ''
      };

      // 3. Final safety check: remove any undefined keys just in case
      Object.keys(taskData).forEach(key => 
        taskData[key] === undefined && delete taskData[key]
      );

      if (editing) {
        await updateTask(project.id, editing, taskData, authUid);
        setTasks(prev => prev.map(t => t.id === editing ? { ...t, ...taskData, id: editing } : t));
        showToast('Task Updated');
      } else {
        const docRef = await addTask(project.id, taskData, authUid);
        setTasks(prev => [...prev, { id: docRef.id, ...taskData }]);
        showToast('Task Created');
      }
      
      setShowForm(false);
      setEditing(null);
    } catch (e) { 
      console.error("Firebase Error:", e);
      showToast(e.message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }
  

  const handleDeleteTask = (taskId, taskTitle) => {
    triggerConfirm('Delete Task?', `Are you sure you want to remove "${taskTitle}"?`, async () => {
      setSaving(true);
      try {
        await deleteTask(project.id, taskId, authUid);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        showToast('Task Purged');
      } catch (e) { showToast(e.message, 'error'); }
      finally { setSaving(false); setConfirmDialog({ show: false }); }
    });
  };

  const modalLayout = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center isolate overflow-hidden">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh] overflow-hidden m-4">
        
        {/* Header */}
        <div className="p-8 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Mission <span className="text-yellow-500">Control</span>
          </h3>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {!showForm && (
            <button onClick={() => { setEditing(null); setShowForm(true); setForm({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' }); }} className="w-full py-5 mb-8 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] flex items-center justify-center gap-3">
              <PlusCircle size={20} /> Deploy New Task
            </button>
          )}

          {showForm && (
            <div className="bg-white/5 p-8 rounded-3xl border border-yellow-500/20 mb-10 animate-in fade-in slide-in-from-top-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Task Name</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-2 p-4 bg-black/40 border border-white/10 rounded-xl text-white focus:border-yellow-500 outline-none transition-all" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Assign To</label>
                  <div className="relative mt-2">
                    <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input value={form.assignedTo} onChange={e => setForm({...form, assignedTo: e.target.value})} className="w-full p-4 pl-12 bg-black/40 border border-white/10 rounded-xl text-white focus:border-yellow-500 outline-none" placeholder="Rifqa, Sabiq..." />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Deadline</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full mt-2 p-4 bg-black/40 border border-white/10 rounded-xl text-white" />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Priority</label>
                  <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="w-full mt-2 p-4 bg-black/40 border border-white/10 rounded-xl text-white">
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={saveForm} disabled={saving} className="flex-1 py-4 bg-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-yellow-400">
                  {saving ? 'Transmitting...' : (editing ? 'Update Task' : 'Confirm Deployment')}
                </button>
                <button onClick={() => setShowForm(false)} className="px-8 py-4 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-white/10">Cancel</button>
              </div>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className={`group flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${task.status === 'Completed' ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/5 hover:border-yellow-500/30'}`}>
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className={`transition-colors shrink-0 ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-600 hover:text-yellow-500'}`}
                  >
                    {task.status === 'Completed' ? <CheckSquare size={28} /> : <Square size={28} />}
                  </button>
                  
                  <div className="min-w-0">
                    <h4 className={`text-lg font-bold text-white transition-all ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 italic flex items-center gap-1">
                         <Calendar size={10} /> Deadline: {task.date}
                      </span>
                      {task.assignedTo?.length > 0 && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 italic">👤 {Array.isArray(task.assignedTo) ? task.assignedTo.join(', ') : task.assignedTo}</span>
                      )}
                      {/* --- THE COMPLETED DATE UI --- */}
                      {task.status === 'Completed' && task.completedDate && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-500 italic bg-green-500/10 px-2 py-0.5 rounded">
                          ✓ Finished: {task.completedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing(task.id); setForm({...task, assignedTo: Array.isArray(task.assignedTo) ? task.assignedTo.join(', ') : task.assignedTo}); setShowForm(true); }} className="p-2 text-gray-500 hover:text-white transition-all"><Edit2 size={18}/></button>
                  <button onClick={() => handleDeleteTask(task.id, task.title)} className="p-2 text-gray-500 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white/5 border-t border-white/10 flex justify-end shrink-0">
          <button onClick={() => { onSave({...project, tasks}); onClose(); }} className="px-12 py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all">
            Update Dashboard
          </button>
        </div>
      </div>
      
      {/* CONFIRM DIALOG */}
      {confirmDialog.show && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative bg-gray-900 border border-white/20 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <AlertTriangle size={40} className="text-red-500 mx-auto mb-4" />
            <h4 className="text-xl font-black text-white uppercase italic mb-2">{confirmDialog.title}</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDialog({show: false})} className="flex-1 py-3 bg-white/5 text-white font-bold rounded-xl uppercase tracking-widest text-[10px]">Back</button>
              <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl uppercase tracking-widest text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10001] px-6 py-3 bg-gray-900 border border-yellow-500/30 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          {toast.type === 'success' ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>}
          <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{toast.message}</span>
        </div>
      )}
    </div>
  );

  return createPortal(modalLayout, document.body);
}