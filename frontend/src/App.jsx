import AnalyticsCharts from './components/AnalyticsCharts';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import TaskBoard from './components/TaskBoard';
import { useDashboardStore } from './store/useDashboardStore';

export default function App() {
  const { darkMode, toggleTheme, projects, tasks, members, notifications, role } = useDashboardStore();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <Sidebar />
          <main className="flex-1 space-y-4">
            <header className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow flex flex-wrap justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">Project Intelligence Dashboard</h2>
                <p className="text-sm text-slate-500">Role-based view: {role}</p>
              </div>
              <button onClick={toggleTheme} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
              </button>
            </header>

            <SummaryCards projects={projects} tasks={tasks} notifications={notifications} />

            <section className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
              <h3 className="font-semibold text-lg mb-2">Team & Roles</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {members.map((member) => (
                  <div key={member.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

            <TaskBoard tasks={tasks} />
            <AnalyticsCharts tasks={tasks} />
          </main>
        </div>
      </div>
    </div>
  );
}
