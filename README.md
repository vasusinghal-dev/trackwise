# Trackwise

**Job tracking, without chaos.**

Trackwise is a productivity-focused job application tracking SaaS built for serious job seekers who want clarity, structure, and follow-through — not spreadsheets, sticky notes, or half-baked trackers.

It models **real hiring workflows**, not just CRUD screens.

---

## 🎯 What Trackwise Solves

Most job trackers fail because they treat applications as static rows.

In reality, a job search is:

- multi-stage
- time-sensitive
- action-driven

Trackwise is designed to answer one core question:

> **“What should I do next?”**

Everything else is secondary.

---

## 🧠 Dashboard Philosophy (V1)

The dashboard has **one job**:

### 👉 Tell the user what needs attention _right now_

No charts.
No trends.
No vanity metrics.

---

### ✅ What the Dashboard Shows

#### 1️⃣ Today / Upcoming (Top Priority)

Actionable items that require attention:

- Interview
- Follow-up
- Deadline

Minimal context only:

- Company
- Role
- What
- When (Today / Tomorrow / Date)

If the user knows what to do next, the dashboard succeeds.

---

#### 2️⃣ Active Pipeline Snapshot

A lightweight overview of where applications stand:

- Applied
- Interviewing
- Offer

Each column shows:

- Count
- Top 3 applications

This is **not** the full pipeline — it’s a preview.

---

#### 3️⃣ Needs Attention (Optional but Powerful)

Surfaces applications that are going stale:

- Company
- Role
- Last activity (X days ago)
- CTA: _Follow up_

This section makes the app feel **useful**, not decorative.

---

### 🚫 What’s Intentionally Missing (for now)

- Charts & analytics
- Monthly stats
- Trends
- Exports
- Filters
- Drag & drop

Those come later — when they’re actually earned.

---

## ✨ Core Features

### 🔐 Authentication & Security

- Email & password authentication
- Google & GitHub OAuth
- Email verification flow
- Password reset via secure email links
- Session-based authentication using **Better Auth**
- Protected routes with server-side enforcement

---

### 📋 Application Management

- Track job applications with:
  - Company
  - Role
  - Location
  - Salary range (min / max / currency)
  - Source (LinkedIn, referral, recruiter, etc.)

- Draft vs submitted applications
- Status-based workflow:
  - Applied → Interviewing → Offer → Accepted / Rejected / Ghosted

---

### 🕒 Activity Timeline

- Full chronological history per application
- Tracks:
  - Submissions
  - Status changes
  - Interviews
  - Follow-ups

- Uses real timestamps (`occurredAt`)
- Timeline-driven UX instead of derived fields

---

### 📅 Interviews

- Multiple interview rounds per application
- Supports:
  - Phone
  - Video
  - Onsite
  - Panel
  - Assessment

- Stores:
  - Notes
  - Feedback
  - Outcome
  - Ratings

- Timezone-safe scheduling

---

### ⏰ Reminders & Follow-ups

- Follow-ups, prep tasks, decision reminders
- Due dates with completion tracking
- Dashboard-friendly queries:
  - Upcoming
  - Overdue
  - Active

---

### 📄 Document Management

- Attach resumes, cover letters, assignments, and portfolios
- Versioned documents
- Per-application document history
- Cloud-hosted storage

---

## 🧪 Validation & Data Integrity

Trackwise enforces **strict validation at every layer**.

- Centralized **Zod** schemas
- Shared between client forms and server actions
- HTML-form-safe preprocessing
- Cross-field validation (e.g. salary min ≤ max)
- Enum-safe parsing aligned with Prisma
- Server-side validation before **every** database write

**Nothing reaches the database without being validated.**

This eliminates silent data corruption and edge-case bugs.

---

## ⚙️ Server Actions & Routing Model

Trackwise uses **Next.js Server Actions** for all mutations.

- Form submissions handled via server actions
- Validation and normalization on the server
- Auth enforced server-side
- Redirects handled at the server boundary

Benefits:

- No client-side trust assumptions
- Smaller API surface
- Predictable data flow
- Easier long-term maintenance

This is a **server-first architecture**, by design.

---

## 🧭 Navigation & UX Decisions

- Context-aware sidebar navigation
- Route-aware active states
- Clear separation between draft and submitted flows
- Optimistic feedback with toast notifications
- Graceful handling of redirects and validation errors

UX mirrors real job-search behavior — not generic dashboards.

---

## 🧠 Design Philosophy

Trackwise is built like a production SaaS:

- Explicit over implicit
- Server-first logic
- Type safety across layers
- No silent failures
- UX driven by real workflows

Nothing here is accidental.

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16** — App Router, SSR, Server Actions
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** + PostCSS
- **GSAP 3** — micro-interactions
- **Lucide Icons & HeroIcons**
- **Sonner** — toast notifications

### Backend & Data

- **PostgreSQL** — primary relational datastore
- **Prisma 7** — type-safe ORM with optimized indexes
- **Better Auth 1.4** — session-based authentication
- **Postmark** — transactional email delivery
- **Cloudinary** — document & asset storage

### Security

- **Arcjet** — rate limiting & bot protection
- **Zod** — schema validation

---

## 🗄 Database Design (High Level)

Trackwise uses a **normalized relational schema** designed around real hiring workflows.

### Core Models

- **User** — account and ownership
- **Application** — job applications with lifecycle state
- **Interview** — multi-round interview records
- **Activity** — immutable event timeline
- **Reminder** — task-based follow-ups
- **ApplicationDocument** — resumes, cover letters, assets
- **Session / Account** — authentication primitives

### Design Highlights

- UTC-based timestamps
- No redundant derived fields
- Composite indexes for dashboard queries
- Cascade deletes for referential integrity
- Status changes tracked via activities, not timestamps

---

## 🎯 Application Status Model

Applications move through a **finite, explicit lifecycle**:

- **DRAFT** — Application in progress
- **APPLIED** — Submitted
- **SCREENING** — Initial screening
- **INTERVIEWING** — Active interviews
- **TECHNICAL** — Technical assessment
- **FINAL_ROUND** — Final interviews
- **OFFER** — Offer received
- **NEGOTIATING** — Offer negotiation
- **ACCEPTED** — Accepted
- **REJECTED** — Rejected
- **WITHDRAWN** — Withdrawn
- **GHOSTED** — No response after follow-ups

Statuses are enum-safe and validated at the schema level.

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js **18+**
- PostgreSQL

### Setup

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=postgresql://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
POSTMARK_API_TOKEN=...
CLOUDINARY_CLOUD_NAME=...
ARCJET_KEY=...
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```txt
src/
├── app/
│   ├── (auth)/              # Authentication flows
│   ├── (landing)/           # Marketing pages
│   ├── (protected)/         # Auth-required routes
│   │   ├── (dashboard)/     # Main dashboard
│   │   └── (onboarding)/    # First-time setup
│   └── api/auth/            # Better Auth endpoints
├── components/
│   ├── applications/        # Application views & forms
│   ├── dashboard/           # Dashboard sections
│   ├── auth-page/           # Auth UI
│   ├── onboarding/          # Onboarding flow
│   └── shared-ui/           # Reusable components
├── lib/
│   ├── auth/                # Auth config
│   ├── actions/             # Server actions
│   ├── config/              # Enum & UI config
│   ├── validations/         # Zod schemas
│   └── utils/               # Helpers
└── prisma/
    ├── schema.prisma        # Database schema
    └── migrations/          # Migrations
```

---

## 📌 Project Status

**Active development**

Planned next:

- Advanced analytics
- Bulk operations
- Calendar view
- Export (CSV / PDF)
- Smart suggestions based on activity patterns

---

## 🎯 Why Trackwise Exists

Job applications are not a list — they’re a process.

Trackwise exists to:

- Preserve context
- Surface the next action
- Prevent missed follow-ups
- Act as a single source of truth during a job search

Built for people who take their careers seriously.

---

## 📝 License

Private project.
