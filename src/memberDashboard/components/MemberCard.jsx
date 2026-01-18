const MemberCard = ({ member }) => {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "#323240",
        border: "1px solid #545454",
        fontFamily: "'Anantason Expanded', sans-serif",
      }}
    >
      {/* Name & Role */}
      <div className="mb-4">
        <h2 className="text-lg text-white">{member.name}</h2>
        <p className="text-sm mt-1" style={{ color: "#F1A123" }}>
          {member.role}
        </p>
      </div>

      {/* Acquired Skills */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm text-white">Acquired Skills</h3>
        <div className="flex flex-wrap gap-2">
          {member.acquiredSkills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full px-3 py-1 text-xs text-white"
              style={{ backgroundColor: "#545454" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skills to Learn */}
      <div>
        <h3 className="mb-2 text-sm text-white">
          Skills to Learn
        </h3>
        <div className="flex flex-wrap gap-2">
          {member.learningSkills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: "#F1A123",
                color: "#323240",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
