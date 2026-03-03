import { useState, useEffect, useCallback } from 'react';
import { getAllMembers } from '../../firebase/firestore';
import MemberCard from '../components/MemberCard';
import { Users, Loader } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Define fetchMembers outside useEffect so it can be reused by the Modal
  const fetchMembers = useCallback(async () => {
    try {
      const data = await getAllMembers();
      setMembers(data);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load roster');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-yellow-500 mx-auto mb-4" size={40} />
          <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs">Syncing Roster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500/5 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20 mb-6">
            <Users className="text-yellow-500" size={40} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
            Member <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Directory</span>
          </h1>
          
          <div className="mt-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-yellow-500/50"></div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              Exclusive Access: {members.length} Active members
            </p>
            <div className="h-[1px] w-8 bg-yellow-500/50"></div>
          </div>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center max-w-md mx-auto">
            <p className="text-red-400 font-bold uppercase tracking-widest text-xs">{error}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {members.map((member) => (
              <div key={member.id} className="hover:translate-y-[-4px] transition-all duration-300">
                <MemberCard 
                  member={member} 
                  onEditClick={() => setEditingMember(member)} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL MOVED TO ROOT OF DASHBOARD */}
      {editingMember && (
        <EditProfileModal
          member={editingMember}
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          onUpdate={fetchMembers} // This triggers the refresh without flickering
        />
      )}
    </div>
  );
};

export default MemberDashboard;