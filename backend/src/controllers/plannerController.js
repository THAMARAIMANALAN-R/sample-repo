import { query } from '../config/db.js';

export async function getWeeklyPlans(_req, res, next) {
  try {
    const result = await query(
      `SELECT wp.*, t.title AS task_title, u.name AS assignee_name
       FROM weekly_plans wp
       LEFT JOIN tasks t ON t.id = wp.task_id
       LEFT JOIN users u ON u.id = wp.assignee_id
       ORDER BY wp.plan_date ASC`
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function createWeeklyPlan(req, res, next) {
  try {
    const { task_id, assignee_id, plan_date, lane = 'Backlog' } = req.body;
    const result = await query(
      'INSERT INTO weekly_plans (task_id, assignee_id, plan_date, lane) VALUES ($1, $2, $3, $4) RETURNING *',
      [task_id, assignee_id, plan_date, lane]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
