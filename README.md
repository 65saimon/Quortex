# Quantrix Intelligence — Full-Stack Enterprise Platform

A mission-critical, enterprise-grade full-stack platform for **Quantrix Intelligence**, a technology firm specializing in **Enterprise SaaS Product Engineering**, **Autonomous Systems & AI Automation**, and **Applied Frontier R&D**.

Built with an obsidian-dark, Palantir / C3 AI / Linear-level aesthetic, featuring a **60fps Three.js orbital particle accelerator hero visual**, dynamic Supabase Postgres backend with Row Level Security (RLS), Supabase Storage image uploading, Prisma ORM, protected `/admin` control plane, rate-limited Zod-validated APIs, and strict security headers.

---

## Architecture & Tech Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS (v4)
- **Visuals & Motion**: Three.js (60fps standalone orbital core canvas) + Lucide Icons + Framer Motion
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Row Level Security, Supabase Storage)
- **ORM**: Prisma ORM (`prisma/schema.prisma`) connected via Postgres connection string
- **Validation**: Zod schema validation on client & API routes
- **Security**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, sliding-window rate limiting
- **Backups**: Supabase automatic backups + GitHub Actions scheduled `pg_dump` fallback

---

## Project Structure

```
Quortex/
├── .env.example                     # Environment blueprint
├── .github/
│   └── workflows/
│       └── db-backup.yml            # Automated daily pg_dump backup workflow
├── supabase/
│   └── schema.sql                   # Tables, RLS policies, storage bucket & seeds
├── prisma/
│   └── schema.prisma                # Prisma ORM schema
├── next.config.ts                   # Enterprise security headers (CSP, HSTS) & remote patterns
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout with fonts & dark theme
│   │   ├── page.tsx                 # Full-stack landing page (Hero, 3 Pillars, Matrix, About, Contact)
│   │   ├── globals.css              # Cyber-matrix background, neon tokens & glassmorphism
│   │   ├── projects/
│   │   │   ├── page.tsx             # Public Projects Index with category filter & search
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Detailed Case Study page with metrics HUD
│   │   ├── admin/
│   │   │   ├── login/page.tsx       # Cyber authentication screen
│   │   │   ├── page.tsx             # Admin Control Plane (Project CRUD & statistics)
│   │   │   └── projects/
│   │   │       ├── new/page.tsx     # Deploy new project
│   │   │       └── [id]/page.tsx    # Edit project specification
│   │   └── api/
│   │       ├── projects/route.ts    # GET & POST (Zod-validated, Supabase/demo persistence)
│   │       ├── projects/[id]/route.ts # PUT & DELETE
│   │       └── contact/route.ts     # Rate-limited, Zod-validated contact submissions
│   ├── components/
│   │   ├── hero/
│   │   │   ├── OrbitalHeroCanvas.tsx # Standalone 60fps Three.js orbital particle accelerator
│   │   │   └── HeroContent.tsx      # High-impact typography, badges & telemetry HUD
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx           # Glassmorphic header with live status ping & drawer
│   │   │   └── Footer.tsx           # Terminal diagnostics, live UTC clock & compliance tags
│   │   ├── services/
│   │   │   └── ServicesSection.tsx  # 3 Strategic Pillars with interactive deep dive
│   │   ├── projects/
│   │   │   ├── ProjectsGallery.tsx  # Dynamic filterable catalog
│   │   │   └── ProjectCard.tsx      # Glassmorphic card with metrics & tech pills
│   │   ├── tech-stack/
│   │   │   └── TechMatrix.tsx       # Interactive technology matrix & benchmark latency
│   │   ├── about/
│   │   │   └── AboutSection.tsx     # Mission manifesto & 3-layer architecture hierarchy
│   │   ├── contact/
│   │   │   └── ContactSection.tsx   # Interactive encrypted submission protocol form
│   │   └── admin/
│   │       ├── ProjectForm.tsx      # Comprehensive project form with tag & metrics editor
│   │       └── ImageUpload.tsx      # Drag-and-drop Supabase Storage uploader
│   └── lib/
│       ├── initial-data.ts          # Pre-seeded enterprise case studies & fallback data
│       ├── validations.ts           # Zod schemas (ProjectSchema, ContactSubmissionSchema)
│       ├── rate-limit.ts            # Sliding-window rate limiting utility
│       ├── prisma.ts                # PrismaClient singleton
│       └── supabase/
│           ├── client.ts            # Browser client with fallback detection
│           ├── server.ts            # Server SSR client with cookies
│           └── admin.ts             # Service role administrative client
```

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL (`https://your-ref.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your project's public anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your project's secret service role key (for server operations)
- `DATABASE_URL`: Connection string from Supabase Settings > Database (Transaction mode pooler)
- `DIRECT_URL`: Direct connection string (Session mode port 5432)

> **Resilient Demo Mode**: If you run the app before configuring Supabase keys, the application will automatically run in **Sandbox Demo Mode** with pre-seeded enterprise data, working navigation, and an instant preview admin session!

### 3. Database & Supabase Setup

1. Open your project on [Supabase.com](https://supabase.com).
2. Go to **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository, paste the entire SQL content, and run it.
   - This creates the `projects`, `services`, and `contact_submissions` tables.
   - Configures **Row Level Security (RLS)**:
     - Public can only `SELECT` published projects and active services.
     - Public can `INSERT` contact submissions.
     - Authenticated users (Admins) have full `INSERT`, `UPDATE`, and `DELETE` access.
   - Creates the `project-images` Storage bucket and sets upload/delete access policies.

4. (Optional) Run Prisma Client generation:
```bash
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Admin Panel (`/admin`)

- **Login Route**: `/admin/login`
- **Dashboard**: `/admin`
  - View all deployments, filter by strategic pillar, view published status.
  - Delete projects with confirmation safety modal.
  - Create new projects via `/admin/projects/new`.
  - Edit existing projects via `/admin/projects/[id]`.
  - Direct file upload to Supabase Storage bucket `project-images` with live preview.

---

## Automated Backups & Disaster Recovery

### Option A: Supabase Automated Backups (Pro Tier)
- Supabase automatically creates daily snapshots and supports 7-day Point-in-Time Recovery (PITR).
- **Restore procedure**:
  1. Open Supabase Dashboard > Database > Backups.
  2. Select the desired restore timestamp.
  3. Click "Restore" to revert to the exact point in time.

### Option B: Scheduled `pg_dump` Fallback (Free Tier / Multi-Cloud Redundancy)
- This repository includes `.github/workflows/db-backup.yml`.
- Add `DATABASE_DIRECT_URL` to your GitHub Repository Secrets (`postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`).
- GitHub Actions will run daily at midnight UTC, execute `pg_dump`, compress the SQL dump with gzip, and store it as a secure GitHub Artifact (retained for 30 days).

---

## Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project on [Vercel](https://vercel.com).
3. In **Environment Variables**, add the variables defined in `.env.example`.
4. Click **Deploy**. Vercel will automatically build and serve the App Router application with edge optimization and HTTPS enabled by default.
