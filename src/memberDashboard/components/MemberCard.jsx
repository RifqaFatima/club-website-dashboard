import { useState } from 'react'; // Add useState
import { Award, Target, Pencil, ShieldAlert, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Adjusted path to reach your context
import EditProfileModal from './EditProfileModal';

const MemberCard = ({ member, onEditClick }) => {
  const { currentUser } = useAuth();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ownership check
  const isOwner = currentUser?.uid === member.authUid;
  const warningCount = member.warnings || 0;

  return (
    <>
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300 relative group shadow-lg">
      
      {/* EDIT BUTTON */}
      {isOwner && (
        <button 
          className="absolute top-4 right-4 p-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-full transition-all duration-300 border border-yellow-500/20 z-50"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation(); // Stop the click from bubbling to the card
            onEditClick();
          }}
        >
          <Pencil size={14} strokeWidth={3} />
        </button>
      )}
      {/* Name & Role */}
      <div className="mb-4 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white mb-1">{member.name}</h2>
        <p className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">{member.role}</p>
      </div>

      {/* 3-DOT WARNING SYSTEM */}
      <div className="mb-6 flex items-center justify-between bg-black/20 p-2 rounded-lg border border-white/5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert size={12} className="text-gray-500 mr-1" />
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                dot <= warningCount ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Standings</span>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <Award className="text-yellow-500 mr-2" size={18} />
          <h3 className="text-sm font-semibold text-gray-300">Current Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-700/50 text-gray-300 rounded-full px-3 py-1 text-xs border border-gray-600">
              {skill}
            </span>
          )) || <span className="text-gray-500 text-xs italic">No skills listed</span>}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Target className="text-yellow-500 mr-2" size={18} />
          <h3 className="text-sm font-semibold text-gray-300">Learning Goals</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.wantToLearn?.map((skill, index) => (
            <span key={index} className="bg-yellow-500 text-gray-900 rounded-full px-3 py-1 text-xs font-semibold">
              {skill}
            </span>
          )) || <span className="text-gray-500 text-xs italic">No goals set</span>}
        </div>
      </div>

      {/* APPRECIATIONS */}
      <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={14} />
          <span className="text-xs font-bold text-gray-300">{member.appreciations || 0}</span>
          <span className="text-[10px] text-gray-500 uppercase ml-1">Kudos</span>
        </div>
      </div>
    </div>
    

    </>
  );
};

export default MemberCard;