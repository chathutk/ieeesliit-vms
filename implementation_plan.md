# IEEE Engagement Tracking Platform – Implementation Plan

## Goal
Build the **IEEE Student Branch of SLIIT Engagement Tracking Platform** from scratch — a web app that logs every student's volunteer work, ex‑com positions, and event participation, and auto‑generates verified service letters.

**Timeline:** ASAP — build MVP first, iterate fast.

---

## Resolved Decisions

| Question | Decision |
|---|---|
| Color palette | **New Apple HIG palette** (see below) |
| PDF generation | **Firebase Cloud Function** with `pdf-lib` |
| Auth provider | **Google OAuth only** |
| Deployment | **Firebase Hosting** now → **custom domain** later (fully supported — just add domain in Firebase console and update DNS) |

---

## 🎨 Apple HIG Color Palette

Inspired by Apple's iOS/macOS system colors and design language:

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#007AFF` | Primary actions, links, active states (Apple System Blue) |
| `--color-primary-hover` | `#0062CC` | Hover/pressed state for primary |
| `--color-indigo` | `#5856D6` | Secondary accents, badges, tags |
| `--color-success` | `#34C759` | Positive status, completion indicators |
| `--color-warning` | `#FF9500` | Caution states, pending items |
| `--color-danger` | `#FF3B30` | Destructive actions, errors |
| `--color-teal` | `#5AC8FA` | Info badges, supplementary accents |
| `--color-pink` | `#FF2D55` | Highlights, notification dots |
| `--bg-primary` | `#F2F2F7` | Page background (Apple System Gray 6) |
| `--bg-surface` | `#FFFFFF` | Cards, modals, elevated surfaces |
| `--bg-surface-secondary` | `#F9F9FB` | Nested cards, table rows |
| `--bg-dark` | `#1C1C1E` | Dark mode background |
| `--bg-dark-surface` | `#2C2C2E` | Dark mode cards |
| `--text-primary` | `#1C1C1E` | Headings, body text |
| `--text-secondary` | `#8E8E93` | Captions, metadata, timestamps |
| `--text-tertiary` | `#AEAEB2` | Placeholders, disabled text |
| `--separator` | `rgba(60, 60, 67, 0.12)` | Dividers, borders |
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.08)` | Card elevation |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.18)` | Modal/popup elevation |
| `--radius-sm` | `8px` | Buttons, inputs |
| `--radius-md` | `12px` | Cards |
| `--radius-lg` | `20px` | Modals, sheets |
| `--font-family` | `system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro', 'Segoe UI', Roboto, sans-serif` | Apple system font stack |

**Typography scale:** 34px (large title), 28px (title 1), 22px (title 2), 20px (title 3), 17px (body), 15px (subhead), 13px (caption 1), 11px (caption 2) — matching Apple's typographic scale.

**Motion:** 300ms cubic‑bezier(0.25, 0.1, 0.25, 1) for transitions, matching iOS spring‑feel animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML + CSS + JS (no framework — fast, portable) |
| **Styling** | Vanilla CSS with CSS custom properties (design tokens above) |
| **Backend / DB** | Firebase Firestore (NoSQL) |
| **Auth** | Firebase Authentication (Google OAuth provider) |
| **PDF Generation** | Firebase Cloud Functions (Node.js) + `pdf-lib` |
| **Hosting** | Firebase Hosting → custom domain later |
| **Dev Tooling** | Vite dev server for local development, Firebase CLI for deployment |

---

## Proposed Changes

### 1. Project Scaffold

#### [NEW] `package.json`
Project metadata, scripts (`dev`, `build`, `deploy`), and dependencies (`firebase`, `vite`).

#### [NEW] `vite.config.js`
Multi‑page Vite config serving `index.html`, `excom.html`, `admin.html`.

#### [NEW] `firebase.json`
Hosting config (public dir, rewrites, headers) + Firestore rules reference.

#### [NEW] `firestore.rules`
Role‑based security rules:
- Volunteers can read own profile + engagements; cannot write events.
- Ex‑Com can read/write events in their chapter; can update engagements.
- Admin can read/write everything.

#### [NEW] `firestore.indexes.json`
Composite indexes for common queries (engagements by userId + status, events by chapterCode + status).

---

### 2. Design System

#### [NEW] `src/css/tokens.css`
All CSS custom properties from the palette table above.

#### [NEW] `src/css/base.css`
Reset, typography scale, body defaults, scrollbar styling, selection color.

#### [NEW] `src/css/components.css`
Reusable component styles: `.card`, `.btn`, `.btn-primary`, `.badge`, `.modal`, `.sidebar`, `.nav-tab`, `.avatar`, `.timeline-item`, `.stat-card`, `.data-table`, `.search-input`, `.toast`.

#### [NEW] `src/css/animations.css`
Keyframes and utility classes: fade‑in, slide‑up, scale‑in, skeleton‑pulse, page‑transition.

---

### 3. Shared JS Modules

#### [NEW] `src/js/firebase-config.js`
Firebase app initialization, Firestore + Auth instances.

#### [NEW] `src/js/auth.js`
Google OAuth sign‑in/sign‑out, session listener, role resolution from `users` collection, auth‑guard redirects.

#### [NEW] `src/js/router.js`
Simple client‑side router: maps role → landing page (volunteer → `/`, excom → `/excom.html`, admin → `/admin.html`).

#### [NEW] `src/js/utils.js`
Date formatters, hour formatters, toast notifications, modal helpers, CSV parser.

---

### 4. Pages

#### [NEW] `index.html` — **Volunteer Dashboard**
- **Header:** IEEE logo, user avatar dropdown (profile, sign out).
- **Stats row:** Three stat cards — Total Verified Hours, Active OCs (of 2), Events Participated.
- **Activity timeline:** Chronological list of engagements with role badge, event name, hours, status pill.
- **Quick actions:** "Browse Open Events" button, "Request Service Letter" button.

#### [NEW] `excom.html` — **Ex‑Com Portal**
- **Sidebar navigation:** Dashboard, Create Event, Manage Events, Members.
- **Active Events tab:** Table with title, dates, capacity bar, slots filled, "Close Event" action.
- **Close Event modal:** Confirm dialog → batch‑write: lock hours, decrement `activeOCCount`, increment `totalHours`, flip event status.
- **Create Event form:** Title, description, dates, capacity, tags.

#### [NEW] `admin.html` — **Admin Console**
- **Chapter management:** View/edit chapters, assign ex‑com officers.
- **Bulk CSV import:** Drag‑and‑drop CSV → preview table → confirm → batch‑write to `users`.
- **Analytics dashboard:** Aggregate hours per chapter, per event type; bar/pie charts (Chart.js or vanilla SVG).
- **Service letter queue:** Pending approvals list, approve/reject buttons, preview PDF.

#### [NEW] `login.html` — **Sign‑In Page**
- Centered card with IEEE logo, "Sign in with Google" button, subtle background gradient.

---

### 5. Firebase Cloud Function – PDF Service Letter

#### [NEW] `functions/package.json`
Dependencies: `firebase-admin`, `firebase-functions`, `pdf-lib`.

#### [NEW] `functions/index.js`
- `generateServiceLetter` — Callable function triggered by admin approval.
- Fetches user profile + verified engagements from Firestore.
- Builds a PDF with `pdf-lib`: IEEE letterhead, student name, list of events with hours, total hours, signature placeholder.
- Uploads PDF to Firebase Storage, writes download URL to `serviceLetters` collection.

---

### 6. Data Seeding

#### [NEW] `scripts/seed.js`
Populates Firestore with mock data for development: 3 chapters, 15 users (mix of roles), 8 events, 30 engagements.

---

## Data Model (Firestore)

```text
users/{IEEE_ID}
 ├─ name: string
 ├─ email: string
 ├─ role: "volunteer" | "excom" | "admin"
 ├─ chapterCode: string
 ├─ activeOCCount: number (max 2)
 ├─ totalHours: number
 ├─ profilePicUrl: string
 └─ createdAt: timestamp

chapters/{chapterCode}
 ├─ name: string
 ├─ adminIds: string[]
 └─ excomCredential: string (e.g. "STBD4028")

events/{eventId}
 ├─ title: string
 ├─ description: string
 ├─ chapterCode: string
 ├─ startDate: timestamp
 ├─ endDate: timestamp
 ├─ capacity: number
 ├─ slotsFilled: number
 ├─ status: "open" | "closed"
 ├─ tags: string[]
 ├─ createdBy: string (excom userId)
 └─ closedAt: timestamp | null

engagements/{engagementId}
 ├─ userId: string
 ├─ eventId: string
 ├─ role: "volunteer" | "organizer" | "speaker" | "delegate"
 ├─ verifiedHours: number
 ├─ impactStatement: string
 ├─ rating: number (1-5, by excom)
 ├─ status: "active" | "completed" | "dropped"
 └─ createdAt: timestamp

serviceLetters/{letterId}
 ├─ userId: string
 ├─ eventIds: string[]
 ├─ pdfUrl: string
 ├─ status: "pending" | "approved" | "rejected"
 ├─ requestedAt: timestamp
 └─ approvedAt: timestamp | null
```

---

## Verification Plan

### Automated
```bash
# Firestore rules unit tests
cd functions && npm test

# Build check — ensures no broken imports
npx vite build
```

### Manual
1. Sign in with Google → verify role‑based redirect.
2. Volunteer: view dashboard, browse events, join event (verify OC cap at 2).
3. Ex‑Com: create event, close event → verify hours locked and capacity freed.
4. Admin: bulk CSV import, approve service letter → verify PDF download.
5. Responsive check on mobile viewport (375px).

---

## Execution Order

| Phase | What | Est. Time |
|---|---|---|
| **1** | Project scaffold + Firebase setup + design tokens CSS | 30 min |
| **2** | Login page + Auth module | 20 min |
| **3** | Volunteer Dashboard (index.html) | 45 min |
| **4** | Ex‑Com Portal (excom.html) | 45 min |
| **5** | Admin Console (admin.html) | 45 min |
| **6** | Cloud Function for PDF generation | 30 min |
| **7** | Firestore rules + seed script | 20 min |
| **8** | Polish, animations, responsive, testing | 30 min |

**Total estimated: ~4–5 hours of execution time.**
