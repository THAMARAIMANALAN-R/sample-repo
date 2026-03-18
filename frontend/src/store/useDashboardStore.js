import { create } from 'zustand';

const demoProjects = [
  { id: 1, name: 'IoT Sensor Rollout', status: 'Active', progress: 45, deadline: '2026-07-01' },
  { id: 2, name: 'Client Portal Revamp', status: 'Planning', progress: 20, deadline: '2026-07-18' }
];

const demoTasks = [
  { id: 1, title: 'Design API contracts', status: 'In Progress', priority: 'High', assignee: 'Alice' },
  { id: 2, title: 'Build role dashboard', status: 'Not Started', priority: 'Medium', assignee: 'Mark' },
  { id: 3, title: 'QA smoke tests', status: 'Completed', priority: 'Low', assignee: 'Alice' }
];

export const useDashboardStore = create((set) => ({
  role: 'Admin',
  darkMode: false,
  projects: demoProjects,
  tasks: demoTasks,
  members: [
    { id: 1, name: 'Alice', role: 'Full Stack' },
    { id: 2, name: 'Mark', role: 'DevOps' }
  ],
  notifications: ['Deadline approaching: IoT Sensor Rollout'],
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode }))
}));
