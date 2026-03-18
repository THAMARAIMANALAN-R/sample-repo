import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/project_intelligence',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

export const query = (text, params) => pool.query(text, params);
