import { query } from '../config/db.js';

export async function getProjects(_req, res, next) {
  try {
    const result = await query(
      `SELECT p.*, 
          COALESCE(ROUND(AVG(CASE WHEN t.status = 'Completed' THEN 100 ELSE 0 END), 2), p.progress) AS computed_progress
       FROM projects p
       LEFT JOIN tasks t ON t.project_id = p.id
       GROUP BY p.id
       ORDER BY p.deadline ASC`
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const { name, description, deadline, status = 'Active', progress = 0 } = req.body;
    const result = await query(
      'INSERT INTO projects (name, description, deadline, status, progress) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, deadline, status, progress]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, deadline, status, progress } = req.body;
    const result = await query(
      `UPDATE projects
       SET name = $1, description = $2, deadline = $3, status = $4, progress = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, description, deadline, status, progress, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM projects WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
