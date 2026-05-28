# InvoicePro

B2B invoice automation MVP for SMB accounting teams. It includes Clerk authentication, invoice upload with simulated OCR extraction, cash flow forecasting, simulated AI anomaly detection, QuickBooks/Xero demo OAuth connections, and tiered pricing.

## Stack

- `frontend/`: Next.js 14 App Router, TypeScript, Tailwind CSS, Clerk, Supabase client
- `backend/`: FastAPI API, SQLAlchemy models, PostgreSQL-ready database layer
- `docker-compose.yml`: PostgreSQL plus backend service

## Features

- Landing page with InvoicePro value props and pricing: Free Trial, Pro $49/mo, Enterprise custom
- Protected dashboard with cash flow forecast, invoice usage, anomaly cards, and recent invoices
- Invoice upload page with simulated OCR preview and extracted line items
- Integrations page with simulated QuickBooks and Xero OAuth connection flow
- Settings/profile page using Clerk profile components
- Backend auth routes: `/auth/register`, `/auth/login`, `/auth/me`
- Backend API routes: invoices CRUD, forecast, anomalies, integrations, analytics

## Local setup

### Frontend

```bash
cd frontend
npm install
cp ../.env.example .env.local
npm run dev
```

Set real Clerk keys in `.env.local` for hosted auth.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend defaults to local SQLite when `DATABASE_URL` is absent. Use Docker for PostgreSQL.

### PostgreSQL + backend with Docker

```bash
docker compose up --build
```

API docs run at `http://localhost:8000/docs`.

## Environment

Copy `.env.example` and replace placeholder values before deployment.

## Vercel deployment

Deploy `frontend/` as the Vercel project root. Set:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- Supabase variables if using Supabase-backed features

Deploy backend to any ASGI-compatible host and point `NEXT_PUBLIC_API_URL` at it.
