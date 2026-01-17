import { useState, useEffect } from 'react';
import { getAllMembers } from './firestore';

function TestBackend() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getAllMembers();
        setMembers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔥 Backend Test - {members.length} Members Loaded</h1>
      <div style={{ display: 'grid', gap: '15px' }}>
        {members.map(member => (
          <div key={member.id} style={{ 
            border: '2px solid #007bff', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: '#f0f8ff'
          }}>
            <h3>{member.name}</h3>
            <p><strong>Role:</strong> {member.role}</p>
            <p><strong>Team:</strong> {member.team}</p>
            <p><strong>Skills:</strong> {member.skills?.join(', ')}</p>
            <p><strong>Wants to learn:</strong> {member.wantToLearn?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestBackend;