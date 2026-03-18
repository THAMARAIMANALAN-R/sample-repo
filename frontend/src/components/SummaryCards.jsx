export default function SummaryCards({ projects, tasks, notifications }) {
  const completed = tasks.filter((task) => task.status === 'Completed').length;

  const cards = [
    { label: 'Projects', value: projects.length },
    { label: 'Tasks Completed', value: `${completed}/${tasks.length}` },
    { label: 'Avg Progress', value: `${Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length)}%` },
    { label: 'Alerts', value: notifications.length }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow">
          <p className="text-sm text-slate-500">{card.label}</p>
          <h3 className="text-2xl font-semibold">{card.value}</h3>
        </article>
      ))}
    </section>
  );
}
