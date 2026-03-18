# Project Intelligence Dashboard

Production-ready full-stack dashboard for project delivery intelligence.

## Stack
- Frontend: React + Vite + Tailwind + Zustand + Recharts
- Backend: Node.js + Express + JWT auth
- Database: PostgreSQL

## Structure
- `frontend/` web application
- `backend/` API server
- `database/schema.sql` schema definitions

## Local setup

### 1) Database
Create PostgreSQL database and run schema:

```bash
createdb project_intelligence
psql -d project_intelligence -f database/schema.sql
```

### 2) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

API runs at `http://localhost:4000`.

### 3) Frontend
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Key features implemented
- Project CRUD with progress and status tracking
- Team role assignment + workload endpoint
- Weekly planner endpoint for 7-day planning / kanban lane mapping
- Task CRUD with priority, dependencies, status and filter/search support
- Analytics endpoints (status summaries + productivity + project health/risk)
- Deadline notifications endpoint
- JWT auth (register/login)
- Responsive dashboard UI with sidebar, kanban board, charts, and dark/light mode

## Sample credentials (after seed)
- `alice@pid.com` / `password123` (Admin)
- `mark@pid.com` / `password123` (Member)
