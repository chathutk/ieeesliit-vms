# IEEE Student Branch of SLIIT — Volunteer Management System

A full-stack web app for logging volunteer work, ex-com positions, and event participation — with auto-generated service letters.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML + CSS + JS (no framework) |
| Styling | Vanilla CSS with Apple HIG design tokens |
| Backend / DB | Firebase Firestore (Spark Free Tier) |
| Auth | Firebase Authentication (Google OAuth) |
| PDF Generation | Client-Side In-Browser (`pdf-lib`) — **100% Free Tier compatible** |
| Hosting | Firebase Hosting |
| Dev Server | Vite |

## Quick Start

### 1. Configure Firebase

Edit `src/js/firebase-config.js` and replace the placeholder values with your Firebase project config:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};
```

### 2. Install & Run

```bash
npm install
npm run dev
```

The dev server opens at `http://localhost:5173/login.html`.

### 3. Seed Development Data

```bash
# Place your Firebase service account key at scripts/serviceAccountKey.json
node scripts/seed.js
```

This creates 3 chapters, 15 users, 8 events, 30 engagements.

### 4. Deploy

```bash
# Install Firebase CLI
npm install -g firebase-tools
firebase login

# Initialize your project
# Initialize your project (select Hosting, Firestore, Storage)
firebase init

# Deploy to Firebase Hosting & Firestore (Free Tier)
npm run deploy
# or: firebase deploy --only hosting,firestore
```

> **Note on Free Tier (Spark Plan):**
> Service letters are generated directly inside the browser using `pdf-lib` and downloaded instantly. No Cloud Functions or Blaze paid plan required!

---

## Pages & Roles

| URL | Role | Description |
|---|---|---|
| `/login.html` | All | Google OAuth sign-in |
| `/index.html` | Volunteer | Dashboard: stats, timeline, event browser |
| `/excom.html` | Ex-Com + Admin | Event management, member roster |
| `/admin.html` | Admin only | Chapters, bulk CSV import, analytics, service letters |

---

## Data Model

```
users/{uid}          → name, email, role, chapterCode, totalHours, activeOCCount
chapters/{code}      → name, adminIds, excomCredential
events/{id}          → title, dates, capacity, slotsFilled, status, tags
engagements/{id}     → userId, eventId, role, verifiedHours, status, rating
serviceLetters/{id}  → userId, eventIds, pdfUrl, status, requestedAt
```

---

## Design

Apple HIG-inspired design system:
- **Colors:** System Blue `#007AFF`, Indigo `#5856D6`, Success Green `#34C759`
- **Typography:** Apple system font stack, 8-step type scale (11px – 34px)
- **Motion:** 300ms `cubic-bezier(0.25, 0.1, 0.25, 1)` iOS-feel transitions
- **Radius:** 8px (buttons) → 12px (cards) → 20px (modals)

---

## Development Notes

- Uncomment the emulator lines in `firebase-config.js` when running `firebase emulators:start`
- The `src/js/utils.js` module exports `showToast`, `openModal`, `closeModal`, CSV parser, and more
- All Firestore security rules are in `firestore.rules` — role hierarchy: `volunteer < excom < admin`
