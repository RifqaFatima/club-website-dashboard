import { useState } from 'react';
import { X, PlusCircle, Trash } from 'lucide-react';

const STATUSES = ['In-Progress', 'Completed', 'Delayed'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function ManageProjectModal({ project, onClose, onSave }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });

  function startAdd() {
    setEditing(null);
    setForm({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });
  }

  function startEdit(task) {
    setEditing(task.id);
    setForm({ title: task.title, description: task.description || '', date: task.date, completedDate: task.completedDate || '', status: task.status, priority: task.priority || 'Medium', assignedTo: (task.assignedTo || []).join(', '), github: task.github || '' });
  }

  function saveForm() {
    if (!form.title || !form.date) return;
    const payload = {
      ...form,
      assignedTo: form.assignedTo.split(',').map((s) => s.trim()).filter(Boolean)
    };

    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing ? { ...t, ...payload } : t)));
    } else {
      const id = `t${Date.now()}`;
      setTasks((prev) => [...prev, { id, ...payload }]);
    }

    setEditing(null);
    setForm({ title: '', description: '', date: '', completedDate: '', status: 'In-Progress', priority: 'Medium', assignedTo: '', github: '' });
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function saveProject() {
    onSave({ ...project, tasks });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div role="dialog" aria-modal="true" aria-labelledby="manage-project-title" className="bg-gray-900 w-full max-w-3xl rounded-lg shadow-xl border border-gray-700 overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <h3 id="manage-project-title" className="text-lg font-semibold text-white">Manage: {project.name}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="p-1 rounded hover:bg-gray-800 text-gray-300">
            <X />
          </button>
        </div>

        <div className="p-4 space-y-4">          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300 font-medium">Tasks</div>
              <button onClick={startAdd} className="flex items-center gap-2 text-sm px-2 py-1 bg-green-600 rounded text-white">
                <PlusCircle /> Add Task
              </button>
            </div>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700">
                  <div>
                    <div className="text-white font-medium">{t.title}</div>
                    <div className="text-xs text-gray-400">{t.date} • {t.status} • {t.priority}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(t)} className="px-2 py-1 text-sm bg-blue-600 rounded text-white">Edit</button>
                    <button onClick={() => deleteTask(t.id)} className="px-2 py-1 text-sm bg-red-600 rounded text-white"><Trash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800 p-3 rounded border border-gray-700">
            <div className="grid grid-cols-1 gap-2">
              <input value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} placeholder="Task title" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
              <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} placeholder="Short description (optional)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" rows={2} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} type="date" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
                <input value={form.completedDate} onChange={(e) => setForm((s) => ({ ...s, completedDate: e.target.value }))} type="date" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))} className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={form.priority} onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))} className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm">
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <input value={form.assignedTo} onChange={(e) => setForm((s) => ({ ...s, assignedTo: e.target.value }))} placeholder="Assigned to (comma separated)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />

              <input value={form.github} onChange={(e) => setForm((s) => ({ ...s, github: e.target.value }))} placeholder="GitHub URL (optional)" className="p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />

              <div className="flex items-center justify-end gap-2 mt-3">
                <button onClick={saveForm} className="px-3 py-1 bg-yellow-500 rounded text-black">Save Task</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1 bg-gray-700 rounded text-white">Cancel</button>
            <button onClick={saveProject} className="px-3 py-1 bg-indigo-600 rounded text-white">Save Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}
