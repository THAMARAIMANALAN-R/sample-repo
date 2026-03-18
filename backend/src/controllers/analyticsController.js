import { query } from '../config/db.js';

export async function getDashboardAnalytics(_req, res, next) {
  try {
    const [taskSummary, projectStatus, productivity] = await Promise.all([
      query(`SELECT status, COUNT(*)::int AS count FROM tasks GROUP BY status`),
      query(`SELECT status, COUNT(*)::int AS count FROM projects GROUP BY status`),
      query(`SELECT u.name, COUNT(t.id)::int AS completed
             FROM users u
             LEFT JOIN tasks t ON t.assignee_id = u.id AND t.status = 'Completed'
             GROUP BY u.id
             ORDER BY completed DESC`)
    ]);

    res.json({
      taskSummary: taskSummary.rows,
      projectStatus: projectStatus.rows,
      productivity: productivity.rows
    });
  } catch (error) {
    next(error);
  }
}

export async function getRiskOverview(_req, res, next) {
  try {
    const result = await query(
      `SELECT t.id, t.title, t.deadline, t.status,
          CASE WHEN t.deadline < CURRENT_DATE AND t.status != 'Completed' THEN true ELSE false END AS is_delayed
       FROM tasks t
       ORDER BY t.deadline`
    );

    const delayedCount = result.rows.filter((task) => task.is_delayed).length;
    const completionRate = result.rows.length
      ? (result.rows.filter((task) => task.status === 'Completed').length / result.rows.length) * 100
      : 0;

    const healthScore = Math.max(0, Math.min(100, Math.round(completionRate - delayedCount * 5)));

    res.json({ delayedCount, completionRate, healthScore, tasks: result.rows });
  } catch (error) {
    next(error);
  }
}
