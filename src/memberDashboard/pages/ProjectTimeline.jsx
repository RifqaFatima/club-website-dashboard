import { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const INITIAL_PROJECTS = [
  {
    id: 'p1',
    name: 'PROJECT 1: Club Website & Dashboard',
    leaderId: 'leader1',
    leaderName: 'Rifqa',
    description: 'Revamp public site, unify dashboard and design system',
    team: ['Rifqa', 'Sabiqeddin', 'Fatima', 'Faraz', 'Asna'],
    tasks: [
      {
        id: 't1',
        title: 'Phase 1: Backend Setup',
        description: 'Set up Firebase, create Firestore collections, implement authentication, write data fetching functions.',
        date: '2025-01-15',
        completedDate: '2025-01-14',
        status: 'Completed',
        priority: 'High',
        assignedTo: ['Rifqa', 'Sabiqeddin'],
        github: ''
      },
      {
        id: 't2',
        title: 'Phase 2: Frontend Integration',
        description: 'Integrate public pages and connect dashboard to backend.',
        date: '2025-02-01',
        completedDate: '',
        status: 'In-Progress',
        priority: 'High',
        assignedTo: ['Faraz'],
        github: ''
      }
    ]
  },
  {
    id: 'p2',
    name: 'PROJECT 2: Events Platform',
    leaderId: 'leader2',
    leaderName: 'Aisha',
    description: 'Build events creation & RSVP flow',
    team: ['Aisha', 'Omar', 'Yusuf'],
    tasks: [
      { id: 't3', title: 'Event Schema', description: 'Design event data model', date: '2026-01-20', status: 'Completed', priority: 'Medium', assignedTo: ['Aisha'], github: '' },
      { id: 't4', title: 'RSVP UI', description: 'Create RSVP workflow', date: '2026-02-20', status: 'In-Progress', priority: 'Medium', assignedTo: ['Omar'], github: 'https://github.com/org/events' }
    ]
  },
  {
    id: 'p3',
    name: 'PROJECT 3: Member Directory',
    leaderId: 'leader1',
    leaderName: 'Rifqa',
    description: 'Add rich member profiles and filtering',
    team: ['Rifqa', 'Fatima'],
    tasks: [
      { id: 't5', title: 'Profile Schema', description: 'Create profile and avatar flow', date: '2025-12-15', status: 'Completed', priority: 'Low', assignedTo: ['Fatima'], github: '' },
      { id: 't6', title: 'Search & Filters', description: 'Implement search and filters', date: '2026-01-30', status: 'Delayed', priority: 'High', assignedTo: ['Faraz'], github: '' }
    ]
  },
  {
    id: 'p4',
    name: 'PROJECT 4: Open Source Projects',
    leaderId: 'leader3',
    leaderName: 'Hassan',
    description: 'Support external contributions & showcase repos',
    team: ['Hassan', 'Zara'],
    tasks: [
      { id: 't7', title: 'Repo Templates', description: 'Create repository templates for new projects', date: '2026-02-01', status: 'Completed', priority: 'Low', assignedTo: ['Hassan'], github: 'https://github.com/org/templates' },
      { id: 't8', title: 'Contribution Guide', description: 'Write a clear contribution guide', date: '2026-02-12', status: 'Delayed', priority: 'Medium', assignedTo: ['Zara'], github: '' }
    ]
  }
];

const ProjectTimeline = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  function updateProject(updated) {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900 to-black">
      
      {/* Refined Heading Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl shadow-yellow-500/5 group">
            <BarChart2 className="text-yellow-500 group-hover:scale-110 transition-transform duration-300" size={32} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white italic uppercase">
              Project <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Timeline</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gray-700"></span>
              <p className="text-gray-400 text-sm font-medium tracking-[0.2em] uppercase">
                Tracking Progress
              </p>
              <span className="h-px w-8 bg-gray-700"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {projects.map((project) => (
            /* Hover Wrapper Integrated Here */
            <div 
              key={project.id} 
              className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(234,179,8,0.2)]"
            >
              <ProjectCard 
                project={project} 
                onUpdate={updateProject} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;