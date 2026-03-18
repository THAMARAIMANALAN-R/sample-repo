const links = ['Overview', 'Projects', 'Team', 'Weekly Planner', 'Tasks', 'Analytics', 'Activity Log'];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 rounded-xl p-4 shadow">
      <h1 className="text-xl font-bold mb-4">PID</h1>
      <nav className="space-y-2">
        {links.map((item) => (
          <button key={item} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
