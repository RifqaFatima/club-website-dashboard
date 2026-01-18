import MemberCard from "../components/MemberCard";

const MemberDashboard = () => {
  const members = [
  {
    name: "Fatima Amir",
    role: "Frontend Developer",
    acquiredSkills: ["React", "Tailwind CSS", "JavaScript"],
    learningSkills: ["Next.js", "TypeScript"],
  },
  {
    name: "Ayaan Khan",
    role: "Backend Developer",
    acquiredSkills: ["Node.js", "Express", "MongoDB"],
    learningSkills: ["Redis", "System Design"],
  },
  {
    name: "Sara Ali",
    role: "UI/UX Designer",
    acquiredSkills: ["Figma", "Wireframing", "Prototyping"],
    learningSkills: ["Design Systems", "UX Research"],
  },
  {
    name: "Rohan Mehta",
    role: "Full Stack Developer",
    acquiredSkills: ["React", "Node.js", "SQL"],
    learningSkills: ["Docker", "AWS"],
  },
  {
    name: "Neha Sharma",
    role: "Frontend Developer",
    acquiredSkills: ["HTML", "CSS", "JavaScript"],
    learningSkills: ["React", "Tailwind CSS"],
  },
  {
    name: "Arjun Verma",
    role: "Backend Developer",
    acquiredSkills: ["Python", "Django", "PostgreSQL"],
    learningSkills: ["FastAPI", "Docker"],
  },
  {
    name: "Zara Sheikh",
    role: "Content & Design",
    acquiredSkills: ["Canva", "Content Writing", "Branding"],
    learningSkills: ["UI Design", "Figma"],
  },
  {
    name: "Kabir Malhotra",
    role: "Tech Lead",
    acquiredSkills: ["System Design", "React", "Node.js"],
    learningSkills: ["Scalability", "Microservices"],
  },
];


  return (
    <div
      className="min-h-screen px-8 py-10"
      style={{
        backgroundColor: "#545454",
        fontFamily: "'Anantason Expanded', sans-serif",
      }}
    >
      <h1 className="mb-10 text-center text-3xl text-white">
        Team Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MemberDashboard;
