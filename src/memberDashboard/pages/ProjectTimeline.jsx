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
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gray-800/40 px-4 py-3 rounded-md border border-gray-700 shadow-sm mx-auto">
          <BarChart2 className="text-yellow-400" size={28} />
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Project Timeline</h1>
            <p className="text-gray-400 text-sm mt-1">Track progress across all club projects</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onUpdate={updateProject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
