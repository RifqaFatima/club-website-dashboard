import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Users, BarChart3, AlertCircle, Clock, Check, Edit2, Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useAuth } from '../../context/AuthContext';

const ProjectTimeline = () => {
  const { currentUser } = useAuth();
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const projects = [
    {
      id: 'proj-1',
      name: 'Club Website & Dashboard',
      description: 'Redesign and develop the new club website with integrated member dashboard',
      leaderId: 'user-1',
      leader: 'Sarah Chen',
      team: ['Sarah Chen', 'Mike Johnson', 'Lisa Wang'],
      priority: 'HIGH',
      progress: 0,
      tasks: [
        {
          id: 'task-1',
          title: 'Design Homepage Layout',
          description: 'Create mockups and wireframes for the new homepage',
          status: 'Completed',
          priority: 'HIGH',
          startDate: '2026-01-05',
          dueDate: '2026-01-15',
          completedDate: '2026-01-14',
          assignedTo: ['Sarah Chen'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/1'
        },
        {
          id: 'task-2',
          title: 'Set Up Frontend Environment',
          description: 'Initialize Vite project with React and Tailwind CSS',
          status: 'Completed',
          priority: 'HIGH',
          startDate: '2026-01-08',
          dueDate: '2026-01-18',
          completedDate: '2026-01-16',
          assignedTo: ['Mike Johnson'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/2'
        },
        {
          id: 'task-3',
          title: 'Develop Navigation Component',
          description: 'Build responsive navbar with mobile menu',
          status: 'In-Progress',
          priority: 'MEDIUM',
          startDate: '2026-01-16',
          dueDate: '2026-02-05',
          completedDate: null,
          assignedTo: ['Lisa Wang'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/3'
        }
      ]
    },
    {
      id: 'proj-2',
      name: 'Mobile App',
      description: 'Develop a mobile application for iOS and Android platforms',
      leaderId: 'user-2',
      leader: 'Alex Kumar',
      team: ['Alex Kumar', 'Jordan Smith', 'Emma Davis'],
      priority: 'HIGH',
      progress: 0,
      tasks: [
        {
          id: 'task-4',
          title: 'Project Setup & Architecture',
          description: 'Initialize React Native project with necessary dependencies',
          status: 'Completed',
          priority: 'HIGH',
          startDate: '2026-01-06',
          dueDate: '2026-01-16',
          completedDate: '2026-01-15',
          assignedTo: ['Alex Kumar'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/4'
        },
        {
          id: 'task-5',
          title: 'Authentication Flow',
          description: 'Implement login and registration screens',
          status: 'In-Progress',
          priority: 'HIGH',
          startDate: '2026-01-15',
          dueDate: '2026-02-10',
          completedDate: null,
          assignedTo: ['Jordan Smith'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/5'
        },
        {
          id: 'task-6',
          title: 'UI Components Library',
          description: 'Design and build reusable UI components',
          status: 'Delayed',
          priority: 'MEDIUM',
          startDate: '2026-01-20',
          dueDate: '2026-02-15',
          completedDate: null,
          assignedTo: ['Emma Davis'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/6'
        }
      ]
    },
    {
      id: 'proj-3',
      name: 'Events Platform',
      description: 'Build a comprehensive platform for event management and booking',
      leaderId: 'user-3',
      leader: 'Priya Patel',
      team: ['Priya Patel', 'David Lee', 'Sophie Turner'],
      priority: 'MEDIUM',
      progress: 0,
      tasks: [
        {
          id: 'task-7',
          title: 'Database Schema Design',
          description: 'Design and implement Firestore collections for events',
          status: 'Completed',
          priority: 'HIGH',
          startDate: '2026-01-10',
          dueDate: '2026-01-20',
          completedDate: '2026-01-19',
          assignedTo: ['Priya Patel'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/7'
        },
        {
          id: 'task-8',
          title: 'Event Listing Page',
          description: 'Create page to display all upcoming events with filters',
          status: 'In-Progress',
          priority: 'HIGH',
          startDate: '2026-01-20',
          dueDate: '2026-02-12',
          completedDate: null,
          assignedTo: ['David Lee'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/8'
        },
        {
          id: 'task-9',
          title: 'Booking System',
          description: 'Implement event booking and ticket generation',
          status: 'Not Started',
          priority: 'MEDIUM',
          startDate: '2026-02-05',
          dueDate: '2026-03-05',
          completedDate: null,
          assignedTo: ['Sophie Turner'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/9'
        }
      ]
    },
    {
      id: 'proj-4',
      name: 'Member Directory',
      description: 'Create an organized directory of all club members with profiles',
      leaderId: 'user-4',
      leader: 'James Wilson',
      team: ['James Wilson', 'Natalie Brown', 'Christopher Lee'],
      priority: 'LOW',
      progress: 0,
      tasks: [
        {
          id: 'task-10',
          title: 'Member Profile Structure',
          description: 'Design member profile pages with all necessary information',
          status: 'Completed',
          priority: 'MEDIUM',
          startDate: '2026-01-12',
          dueDate: '2026-01-25',
          completedDate: '2026-01-24',
          assignedTo: ['James Wilson'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/10'
        },
        {
          id: 'task-11',
          title: 'Directory Search & Filter',
          description: 'Implement search and filtering functionality',
          status: 'In-Progress',
          priority: 'MEDIUM',
          startDate: '2026-01-25',
          dueDate: '2026-02-20',
          completedDate: null,
          assignedTo: ['Natalie Brown'],
          github: 'https://github.com/RifqaFatima/club-website-dashboard/issues/11'
        }
      ]
    }
  ];

  const getProjectWithCalculatedProgress = (project) => {
    const tasks = project.tasks || [];
    if (tasks.length === 0) return { ...project, progress: 0 };
    const completedCount = tasks.filter(t => t.status === 'Completed').length;
    const progress = Math.round((completedCount / tasks.length) * 100);
    return { ...project, progress };
  };

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleAddTask = (projectId) => {
    setSelectedProject(projectId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (projectId, task) => {
    setSelectedProject(projectId);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    console.log('Task saved:', taskData);
    setIsModalOpen(false);
    // Task saving logic would go here
  };

  const handleDeleteTask = (projectId, taskId) => {
    console.log('Delete task:', taskId);
    // Task deletion logic would go here
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Timeline</h2>
        <p className="text-gray-600">Track all club projects and their tasks</p>
      </div>

      <div className="space-y-4">
        {projects.map(project => {
          const projectWithProgress = getProjectWithCalculatedProgress(project);
          const isExpanded = expandedProjects[project.id];
          const isLeader = currentUser?.uid === project.leaderId;

          return (
            <div key={project.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow">
              {/* Project Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                        {isLeader && (
                          <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                            YOU'RE LEADER
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      
                      {/* Project Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{project.leader}</span>
                          {project.team.length > 1 && <span className="text-gray-500">+{project.team.length - 1}</span>}
                        </div>
                        <div>
                          <span className={`font-semibold ${
                            project.priority === 'HIGH' ? 'text-red-600' :
                            project.priority === 'MEDIUM' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            {project.priority} Priority
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-gray-900">{projectWithProgress.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
                            style={{ width: `${projectWithProgress.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Task Count */}
                      <div className="text-sm text-gray-600">
                        {project.tasks.filter(t => t.status === 'Completed').length} of {project.tasks.length} tasks completed
                      </div>
                    </div>
                  </div>

                  {/* Manage Button */}
                  {isLeader && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddTask(project.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      Manage
                    </button>
                  )}
                </div>
              </div>

              {/* Project Tasks */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="space-y-3">
                    {project.tasks.map(task => {
                      let taskStatus = task.status;
                      const now = new Date('2026-01-31');
                      const dueDate = new Date(task.dueDate);
                      
                      if (dueDate < now && task.status !== 'Completed') {
                        taskStatus = 'Overdue';
                      }

                      return (
                        <TaskCard
                          key={task.id}
                          task={{ ...task, status: taskStatus }}
                          isLeader={isLeader}
                          onEdit={() => handleEditTask(project.id, task)}
                          onDelete={() => handleDeleteTask(project.id, task.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          projectId={selectedProject}
          initial={editingTask}
        />
      )}
    </div>
  );
};

export default ProjectTimeline;
