import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authenticate } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import plannerRoutes from './routes/plannerRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/projects', authenticate, projectRoutes);
app.use('/api/tasks', authenticate, taskRoutes);
app.use('/api/team', authenticate, teamRoutes);
app.use('/api/plans', authenticate, plannerRoutes);
app.use('/api/analytics', authenticate, analyticsRoutes);
app.use('/api/notifications', authenticate, notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
