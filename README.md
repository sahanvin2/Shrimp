# Shrimp

Shrimp is a full-stack social video platform monorepo:

- Frontend: Next.js 14 App Router (`client`)
- Backend: Express + Prisma (`server`)
- Database: PostgreSQL
- Cache/Infra-ready: Redis, Elasticsearch, Docker setup

This README is a complete run guide for local development.

## Project Structure

```text
shrimp/
  client/   Next.js frontend
  server/   Express API + Prisma
  package.json (workspace root)
```

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL running and reachable
- Optional: Docker Desktop

## Environment Setup

### 1) Server env

Create `server/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/yobunny
REDIS_URL=redis://redis:6379
ELASTICSEARCH_URL=http://elastic:9200
JWT_SECRET=change-in-prod
JWT_REFRESH_SECRET=change-in-prod
B2_ENDPOINT=https://s3.us-east-005.backblazeb2.com
B2_ACCESS_KEY_ID=YOUR_B2_ACCESS_KEY_ID
B2_SECRET_ACCESS_KEY=YOUR_B2_SECRET_ACCESS_KEY
B2_BUCKET=movia-prod
B2_REGION=us-east-005
B2_PUBLIC_BASE=https://curevia-encyclopedia-assests.b-cdn.net/
CLIENT_URL=http://localhost:3000
PORT=4000
NODE_ENV=development
FFMPEG_PATH=/usr/bin/ffmpeg
```

### 2) Client env

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## Install Dependencies

From repo root:

```bash
npm install
```

## Prisma Setup

From repo root:

```bash
npm run prisma:generate --workspace server
npm run db:migrate
```

Optional seed:

```bash
npm run db:seed
```

Notes:

- `db:migrate` is configured to load `server/.env`.
- If your existing DB schema is older than this project schema, API fallback logic still keeps public endpoints alive while you migrate.

## Run The Project

### Run frontend + backend together

From repo root:

```bash
npm run dev
```

This starts:

- API on `http://localhost:4000`
- Web on `http://localhost:3000`

### Run backend only

```bash
npm run dev --workspace server
```

Health check:

```bash
curl http://localhost:4000/health
```

### Run frontend only

```bash
npm run dev --workspace client
```

Open `http://localhost:3000`.

## Build

From repo root:

```bash
npm run build
```

## Useful Commands

```bash
npm run lint
npm run docker:up
```

## Common Issues

### 1) `@prisma/client did not initialize yet`

Fix:

```bash
npm run prisma:generate --workspace server
```

If Windows file lock error appears (`EPERM rename query_engine...`), close running Node processes first:

```powershell
taskkill /F /IM node.exe
```

Then run Prisma generate again.

### 2) `EADDRINUSE: address already in use :::4000`

Another process is using port 4000. Stop existing Node processes and restart:

```powershell
taskkill /F /IM node.exe
```

### 3) `DATABASE_URL not found`

Ensure `server/.env` exists and contains `DATABASE_URL`.

### 4) Dev terminal exits with code 1

For long-running commands (`npm run dev`), non-zero terminal notifications can happen when process is interrupted or pre-kill commands fail. Check actual logs:

- If you see `Shrimp API running on port 4000`, backend is up.
- If you see `Next.js ... Ready`, frontend is up.

## API Quick Check

After starting backend:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/feed/trending
```

Both should return HTTP 200.

## Environment Variables Reference

Server variables:

- `DATABASE_URL`
- `REDIS_URL`
- `ELASTICSEARCH_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `B2_ENDPOINT`
- `B2_ACCESS_KEY_ID`
- `B2_SECRET_ACCESS_KEY`
- `B2_BUCKET`
- `B2_REGION`
- `B2_PUBLIC_BASE`
- `CLIENT_URL`
- `PORT`
- `NODE_ENV`
- `FFMPEG_PATH`

Client variables:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SOCKET_URL`

## License

MIT