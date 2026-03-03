import { useState } from 'react';
import { X, Save, Info } from 'lucide-react';
import { updateMemberProfile } from '../../firebase/firestore';

const EditProfileModal = ({ member, isOpen, onClose, onUpdate }) => {
  const [skills, setSkills] = useState(member.skills?.join(', ') || '');
  const [wantToLearn, setWantToLearn] = useState(member.wantToLearn?.join(', ') || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert comma-separated string back into an array
    const updatedData = {
      skills: skills.split(',').map(s => s.trim()).filter(s => s !== ""),
      wantToLearn: wantToLearn.split(',').map(s => s.trim()).filter(s => s !== "")
    };

    try {
      await updateMemberProfile(member.authUid, updatedData);
      onUpdate(); // Refresh the list in the parent
      onClose();  // Close modal
    } catch (error) {
      console.error("Full Error Object:", error);
      alert(`Update failed: ${error.message}`);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-yellow-500/30 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
          <div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Edit <span className="text-yellow-500">Profile</span></h2>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Identity Management</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Skills Input */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Current Skills</label>
            <textarea 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Tailwind, Python..."
              className="w-full bg-black/40 border border-gray-800 rounded-xl p-3 text-sm text-gray-300 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all min-h-[80px]"
            />
          </div>

          {/* Learning Goals Input */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Learning Goals</label>
            <textarea 
              value={wantToLearn}
              onChange={(e) => setWantToLearn(e.target.value)}
              placeholder="TypeScript, AWS, UI Design..."
              className="w-full bg-black/40 border border-gray-800 rounded-xl p-3 text-sm text-gray-300 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all min-h-[80px]"
            />
          </div>

          <div className="flex items-start gap-3 bg-yellow-500/5 p-3 rounded-lg border border-yellow-500/10">
            <Info size={16} className="text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
              Separate skills with commas. Admin-only fields (Role, Warnings) are locked and cannot be modified here.
            </p>
          </div>

          {/* Actions */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 text-gray-900 font-black uppercase py-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-widest text-xs"
          >
            {loading ? "Syncing..." : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;