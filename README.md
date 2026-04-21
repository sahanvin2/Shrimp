# Shrimp

Shrimp is a social short-video platform with SEO-first public pages, a TikTok-style feed, Pinterest-style discovery, and an Express REST API backend. The repository is structured as a monorepo with a Next.js App Router frontend and a standalone server for API, SEO, media, and analytics endpoints.

## Features

- SSR public pages for videos, creators, trending, discover, search, and legal pages.
- Auth-required app routes for feed, upload, studio, notifications, liked, saved, history, and settings.
- Express REST API with route groups for auth, users, videos, feed, search, discovery, notifications, history, studio, events, SEO, and admin.
- Prisma schema for PostgreSQL with users, videos, hashtags, follows, likes, saves, comments, watch history, events, notifications, refresh tokens, and reports.
- SEO utilities including JSON-LD, sitemap, robots, canonical metadata, and RSS/oEmbed endpoints.
- Docker-based local development with PostgreSQL, Redis, Elasticsearch, server, client, and nginx.

## SEO Architecture

Public pages are server-rendered so search engines receive indexable HTML, canonical tags, and structured data on first response. Video pages and creator pages emit page-specific metadata and JSON-LD. The sitemap includes static routes plus dynamic video, creator, and hashtag URLs, and the robots rules block private app routes.

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- FFmpeg for media processing

## Quick Start

1. Copy the environment files:

   ```bash
   copy server\.env.example server\.env
   copy client\.env.local.example client\.env.local
   ```

   On macOS/Linux use:

   ```bash
   cp server/.env.example server/.env
   cp client/.env.local.example client/.env.local
   ```

2. Start infrastructure:

   ```bash
   npm run docker:up
   ```

3. Install dependencies in each workspace if needed.

4. Run Prisma migration and seed data:

   ```bash
   npm run prisma:generate --workspace server
   npm run db:migrate
   npm run db:seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

## Architecture Overview

```text
                    +----------------------+
                    |    Next.js Client    |
                    |  SSR public pages    |
                    |  CSR app routes      |
                    +----------+-----------+
                               |
                               | HTTP / REST
                               v
                    +----------+-----------+
                    |   Express Server     |
                    | auth, feed, SEO, API |
                    +----+-----------+-----+
                         |           |
                         |           |
                         v           v
                    +--------+   +--------+
                    | Postgres|   | Redis  |
                    +--------+   +--------+
                         |
                         v
                    +-----------+
                    | Elasticsearch |
                    +-----------+
```

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users/:username`
- `GET /api/videos/:videoId`
- `GET /api/feed/foryou`
- `GET /api/search?q=&type=`
- `GET /api/notifications`
- `GET /api/me/history`
- `GET /api/studio/analytics/overview`
- `POST /api/events/batch`
- `GET /sitemap.xml`
- `GET /rss.xml`
- `GET /oembed?url=`

## Environment Variables

Server:

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

Client:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SOCKET_URL`

## SEO Checklist

- Sitemap exists at `/sitemap.xml`.
- Robots rules are generated from Next.js route metadata.
- Public pages include canonical URLs.
- Video and creator pages use JSON-LD.
- Search pages noindex empty queries.
- Core Web Vitals are supported through fixed media aspect ratios and SSR pages.

## Contributing

1. Keep changes focused and minimal.
2. Preserve the monorepo structure.
3. Use SSR for public pages and noindex for private routes.
4. Add validation and error handling to async code.

## License

MIT