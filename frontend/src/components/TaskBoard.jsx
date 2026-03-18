const columns = ['Not Started', 'In Progress', 'Completed'];

export default function TaskBoard({ tasks }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <div key={column} className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
          <h4 className="font-semibold mb-3">{column}</h4>
          <div className="space-y-2">
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <article key={task.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.assignee} · {task.priority}</p>
                </article>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
