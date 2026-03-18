import { query } from '../config/db.js';

export async function getNotifications(_req, res, next) {
  try {
    const result = await query(
      `SELECT id, title, deadline, status,
          CASE
            WHEN deadline < CURRENT_DATE AND status != 'Completed' THEN 'Overdue task warning'
            WHEN deadline BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '2 day' THEN 'Deadline approaching'
            ELSE NULL
          END AS alert
       FROM tasks`
    );

    res.json(result.rows.filter((item) => item.alert));
  } catch (error) {
    next(error);
  }
}
