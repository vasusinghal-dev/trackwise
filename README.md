# Trackwise

Trackwise helps you track job applications, interviews, and deadlines in one place — so nothing falls through the cracks.

A comprehensive job application tracking SaaS focused on clarity, reliability, and real hiring workflows.

---

## ✨ Features

### Core Features

- **User Authentication** — Email/password with email verification, GitHub & Google OAuth
- **Application Management** — Track job applications with detailed company info, salary ranges, and application sources
- **Multi-Stage Pipeline** — Applications move through statuses from applied to accepted, with support for custom interview stages
- **Interview Tracking** — Schedule, record outcomes, and notes for phone, video, onsite, assessment, panel, and coffee chat interviews
- **Reminders & Follow-ups** — Set task-based reminders (email follow-ups, interview prep, thank you emails, etc.)
- **Activity Timeline** — Complete event history for each application with timestamps and activity types
- **Document Management** — Store resumes, cover letters, portfolios, assignments, and certifications per application
- **Dashboard** — Overview with upcoming interviews/reminders, applications needing attention, and pipeline analytics
- **Application Filtering** — Filter by status, priority, source, work mode, and application date
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16** (App Router with SSR)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** + PostCSS
- **GSAP 3** (animations)
- **Lucide Icons & HeroIcons**
- **Sonner** (toast notifications)

### Backend & Data

- **PostgreSQL** (production database)
- **Prisma 7** (ORM with optimized indexes for queries)
- **Better Auth 1.4** (authentication with email verification & social providers)
- **Postmark** (transactional emails)
- **Cloudinary** (image hosting)

### Security

- **Arcjet** (rate limiting & bot protection)
- **Zod** (schema validation)

---

## 🗄️ Database Schema

The application uses a comprehensive Prisma schema with the following core models:

- **User** — Profile with email, auth sessions, and all related data
- **Application** — Job applications with 12 status stages, priority levels, salary info, and recruiter contacts
- **Interview** — Interview records with multiple rounds, types, outcomes, and ratings
- **Activity** — Timeline events (submissions, follow-ups, status updates, etc.)
- **Reminder** — Task-based reminders with completion tracking
- **ApplicationDocument** — Attached files (resumes, cover letters, portfolios)
- **Session & Account** — Better Auth management for multi-provider authentication

Key features:

- Composite indexes for efficient dashboard queries
- Cascade deletes to maintain data integrity
- Status update tracking separate from application timestamps
- Support for multiple interview rounds per application

---

## 🎯 Application Statuses

- **DRAFT** — Application in progress
- **APPLIED** — Submitted
- **SCREENING** — Initial phone/video screen
- **INTERVIEWING** — In interview process
- **TECHNICAL** — Technical assessment round
- **FINAL_ROUND** — Final interviews
- **OFFER** — Offer received
- **NEGOTIATING** — Negotiating terms
- **ACCEPTED** — Accepted offer
- **REJECTED** — Rejected
- **WITHDRAWN** — Withdrew application
- **GHOSTED** — No response after follow-ups

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env.local`:

```
DATABASE_URL=postgresql://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
POSTMARK_API_TOKEN=...
CLOUDINARY_CLOUD_NAME=...
ARCJET_KEY=...
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages & logic
│   ├── (landing)/           # Landing page
│   ├── (protected)/         # Protected routes (requires auth)
│   │   ├── (dashboard)/     # Main dashboard
│   │   └── (onboarding)/    # First-time user flow
│   └── api/auth/            # Better Auth endpoints
├── components/
│   ├── applications/        # Application CRUD & display
│   ├── dashboard/           # Dashboard sections & layout
│   ├── auth-page/           # Authentication UI
│   ├── onboarding/          # Onboarding screens
│   └── shared-ui/           # Reusable components
├── lib/
│   ├── auth/                # Better Auth config
│   ├── actions/             # Server actions (Prisma queries)
│   ├── config/              # UI configuration for enums
│   ├── validations/         # Zod schemas
│   └── utils/               # Helper functions
└── prisma/
    ├── schema.prisma        # Database schema
    └── migrations/          # Database migrations
```

---

## 🎨 Key Components

- **DashboardNavbar & DashboardSidebar** — Main navigation
- **ApplicationsTable & ApplicationCard** — Application display & management
- **NewApplicationForm** — Create/edit applications with full details
- **ApplicationsFilters** — Search and filter applications
- **NeedsAttention** — Shows stale applications needing follow-up
- **UpcomingSection** — Shows interviews and reminders due soon
- **PipelineSnapshot** — Visual overview of application pipeline

---

## 🔐 Authentication Flow

1. User signs up with email or social provider (GitHub/Google)
2. Email verification required before account access
3. Session stored in PostgreSQL via Better Auth
4. Protected routes check session validity
5. Password reset via email link

---

## 📊 Development Status

Currently implemented:
✅ Full authentication (email + OAuth) <br>
✅ Application CRUD operations <br>
✅ Interview tracking <br>
✅ Activity timeline <br>
✅ Reminders system <br>
✅ Dashboard with analytics <br>
✅ Responsive UI

Coming next:

- [ ] Advanced analytics & reporting
- [ ] Bulk operations on applications
- [ ] Export to CSV/PDF
- [ ] Email notifications
- [ ] Calendar view
- [ ] Smart suggestions based on application data

---

## 📝 License

Private project.
