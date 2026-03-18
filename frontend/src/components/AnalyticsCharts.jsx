import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AnalyticsCharts({ tasks }) {
  const byStatus = ['Not Started', 'In Progress', 'Completed'].map((status) => ({
    name: status,
    count: tasks.filter((task) => task.status === status).length
  }));

  const productivity = [
    { week: 'W1', points: 8 },
    { week: 'W2', points: 12 },
    { week: 'W3', points: 10 },
    { week: 'W4', points: 14 }
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 h-72">
        <h4 className="font-semibold mb-2">Task Status</h4>
        <ResponsiveContainer>
          <BarChart data={byStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 h-72">
        <h4 className="font-semibold mb-2">Team Productivity</h4>
        <ResponsiveContainer>
          <LineChart data={productivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="points" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 h-72">
        <h4 className="font-semibold mb-2">Completion Ratio</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={byStatus} dataKey="count" nameKey="name" outerRadius={90} fill="#8B5CF6" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
