import { Award, Target } from 'lucide-react';

const MemberCard = ({ member }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
      {/* Name & Role */}
      <div className="mb-4 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white mb-1">{member.name}</h2>
        <p className="text-yellow-500 text-sm font-semibold">{member.role}</p>
      </div>

      {/* Acquired Skills */}
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <Award className="text-yellow-500 mr-2" size={18} />
          <h3 className="text-sm font-semibold text-gray-300">Current Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.skills && member.skills.length > 0 ? (
            member.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-xs border border-gray-600"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs italic">No skills listed yet</span>
          )}
        </div>
      </div>

      {/* Skills to Learn */}
      <div>
        <div className="flex items-center mb-3">
          <Target className="text-yellow-500 mr-2" size={18} />
          <h3 className="text-sm font-semibold text-gray-300">Learning Goals</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.wantToLearn && member.wantToLearn.length > 0 ? (
            member.wantToLearn.map((skill, index) => (
              <span
                key={index}
                className="bg-yellow-500 text-gray-900 rounded-full px-3 py-1 text-xs font-semibold"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs italic">No learning goals yet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;