import bcrypt from 'bcryptjs';
import { pool, query } from '../config/db.js';

async function seed() {
  const password = await bcrypt.hash('password123', 10);

  await query(`INSERT INTO users (name, email, password_hash, role) VALUES
    ('Alice Admin', 'alice@pid.com', $1, 'Admin'),
    ('Mark Member', 'mark@pid.com', $1, 'Member')
    ON CONFLICT (email) DO NOTHING`, [password]);

  await query(`INSERT INTO projects (name, description, deadline, status, progress) VALUES
    ('IoT Sensor Rollout', 'Deploy factory sensors', CURRENT_DATE + INTERVAL '21 day', 'Active', 45),
    ('Client Portal Revamp', 'Redesign enterprise portal', CURRENT_DATE + INTERVAL '35 day', 'Planning', 20)
    ON CONFLICT DO NOTHING`);

  await query(`INSERT INTO tasks (title, description, project_id, assignee_id, status, priority, deadline) VALUES
    ('Design API contracts', 'Finalize API specs', 1, 1, 'In Progress', 'High', CURRENT_DATE + INTERVAL '4 day'),
    ('Build role dashboard', 'Implement role-aware widgets', 2, 2, 'Not Started', 'Medium', CURRENT_DATE + INTERVAL '6 day')
    ON CONFLICT DO NOTHING`);

  await query(`INSERT INTO weekly_plans (task_id, assignee_id, plan_date, lane) VALUES
    (1, 1, CURRENT_DATE + INTERVAL '1 day', 'In Progress'),
    (2, 2, CURRENT_DATE + INTERVAL '2 day', 'Backlog')
    ON CONFLICT DO NOTHING`);

  console.log('Seed completed');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
