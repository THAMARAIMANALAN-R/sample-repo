import { query } from '../config/db.js';

export async function getTeamWorkload(_req, res, next) {
  try {
    const result = await query(
      `SELECT u.id, u.name, u.role,
          COUNT(t.id) FILTER (WHERE t.status != 'Completed') AS active_tasks,
          COUNT(t.id) AS total_tasks
       FROM users u
       LEFT JOIN tasks t ON t.assignee_id = u.id
       GROUP BY u.id
       ORDER BY u.name`
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function assignMemberToProject(req, res, next) {
  try {
    const { user_id, project_id } = req.body;
    const result = await query(
      `INSERT INTO project_members (user_id, project_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, project_id) DO NOTHING
       RETURNING *`,
      [user_id, project_id]
    );

    res.status(201).json(result.rows[0] || { message: 'Already assigned' });
  } catch (error) {
    next(error);
  }
}
