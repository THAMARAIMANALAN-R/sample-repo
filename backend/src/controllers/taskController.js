import { query } from '../config/db.js';

export async function getTasks(req, res, next) {
  try {
    const { status, search } = req.query;
    const clauses = [];
    const values = [];

    if (status) {
      values.push(status);
      clauses.push(`t.status = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      clauses.push(`(t.title ILIKE $${values.length} OR t.description ILIKE $${values.length})`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

    const result = await query(
      `SELECT t.*, p.name AS project_name, u.name AS assignee_name
       FROM tasks t
       LEFT JOIN projects p ON p.id = t.project_id
       LEFT JOIN users u ON u.id = t.assignee_id
       ${where}
       ORDER BY t.deadline ASC`,
      values
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, project_id, assignee_id, status = 'Not Started', priority = 'Medium', deadline, dependency_task_id } = req.body;
    const result = await query(
      `INSERT INTO tasks (title, description, project_id, assignee_id, status, priority, deadline, dependency_task_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, project_id, assignee_id, status, priority, deadline, dependency_task_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, project_id, assignee_id, status, priority, deadline, dependency_task_id } = req.body;
    const result = await query(
      `UPDATE tasks
       SET title = $1, description = $2, project_id = $3, assignee_id = $4, status = $5,
           priority = $6, deadline = $7, dependency_task_id = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [title, description, project_id, assignee_id, status, priority, deadline, dependency_task_id, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
