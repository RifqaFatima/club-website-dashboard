import { useState, useEffect } from 'react';
import { getAllMembers } from '../../firebase/firestore';
import MemberCard from '../components/MemberCard';
import { Users, Loader } from 'lucide-react';

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getAllMembers();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members');
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
          <p className="text-gray-300 text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="text-yellow-500 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-white">Team Dashboard</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Explore skills and learning goals of all {members.length} members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;