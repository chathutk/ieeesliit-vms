# Project Brief & Product Requirements Document (PRD)
## IEEE SLIIT Engagement Tracking & Service Letter Verification Platform

---

### 1. Executive Summary & Vision

#### 1.1 Overview
The **IEEE SLIIT Engagement Tracking Platform** is an end-to-end, multi-portal web ecosystem engineered for the **IEEE Student Branch of SLIIT** (Sri Lanka Section, Region 10; SBC Geocode: `STB08431`). The platform digitizes, manages, and audits volunteer hours, organizing committee (OC) appointments, governance tenures, awards, and event management across 12 branch entities (Central SB Ex-Com, 5 Subcommittees, 6 Society Chapters, and 1 Affinity Group). It culminates in automated, verifiable service endorsements and cryptographically signed PDF service letters for academic and professional applications.

#### 1.2 Core Problem Statement
* **Fragmented Volunteer Ledgers**: Historically, student contributions and event hours were recorded across disparate spreadsheets, leading to lost volunteer records and unverified hour claims.
* **Manual Service Letter Bottleneck**: Issuing official IEEE service letters required manual cross-referencing by Branch Counselors and Ex-Com officers, creating turnaround delays of weeks.
* **Lack of Central Governance & Auditing**: Cross-chapter oversight (Computer Society, RAS, WIE, IAS, PES, ComSoc, etc.) lacked centralized analytics, duplicate commitment detection, and SLA monitoring.

#### 1.3 Key Objectives & Success Metrics
* **100% Digital Hour Verification**: Every volunteer hour logged must be verified by designated OC Leads and Branch Counselors.
* **Turnaround SLA**: Reduce service letter generation and endorsement approval time from ~2 weeks to **24–48 hours**.
* **Zero Discrepancy**: Provide a single source of truth for all 12 student branch entities and over 500+ active student members.
* **Automated PDF Issuance**: Instant rendering of official letters with SHA-256 cryptographic verification hashes and dynamic QR codes.

---

### 2. Stakeholders & User Roles

| Role | Access Level | Primary Objectives | Typical Workflows |
|---|---|---|---|
| **Student Volunteer** | Volunteer Portal (`/`, `profile.html`, `events.html`, `awards.html`, `request-letter.html`) | Track personal service hours, monitor OC commitments (max 2), view event status, browse awards, request verifiable letters. | Profile management, event registration, tracking AGM award eligibility, submitting service letter requests. |
| **Ex-Com Officer** | Ex-Com Portal (`excom.html`, `events-mgmt.html`) | Manage chapter-level event rosters, log volunteer attendance, verify completed hours, enforce capacity limits. | Event lifecycle management (Create → Active → Close/Lock Hours), engagement rating, member attendance auditing. |
| **Branch Counselor / Admin** | Admin Console (`admin.html`, `chapters.html`, `roster.html`, `trackers.html`) | Global governance, signing off on service letters, managing branch subcommittees and chapter charters, bulk CSV sync. | One-click service letter sign-off, chapter passkey administration, branch vTools sync, global export. |

---

### 3. Information Architecture & Screen Inventory

#### 3.1 Volunteer Portal (`Executive Slate / Azure Theme`)
1. **Volunteer Dashboard (`index.html`)**:
   - High-level metric highlights (Total Verified Hours, Active OC Commitments [Cap: 2], Events Participated).
   - Chronological activity timeline with real-time status badges.
   - Quick action triggers: *Browse Open Events*, *Request Service Letter*.
2. **Member Profile (`profile.html` / `SCREEN_66`)**:
   - Member metadata header: Name, IEEE Member #, Faculty, Branch Counselor endorsement marker.
   - 4-metric governance summary: Service Record (hours), Governance Tenures, Engagements, SLIIT Premier Tier Standing.
   - Active Governance Roles & Accreditations (vTools Certified, RAS Hardware Pin, SLIIT Honor Roll).
   - Categorized volunteer engagement cards with photographic event proof logs and official OU recommendations.
3. **All Events Directory (`events.html` / `SCREEN_62`)**:
   - Filterable catalog: *Ongoing*, *Upcoming*, and *Past Events*.
   - Filter chips by Chapter/Affinity Group (CS, RAS, WIE, IAS, PES, ComSoc).
   - Detailed event cards with verified hour badges, venue/format tags, and OC capacity meters.
4. **Service Letter Request & Verification Ledger (`request-letter.html` / `SCREEN_41` / `SCREEN_46`)**:
   - Step 1: Scope selection (*Comprehensive Cumulative*, *Specific Academic Year*, *Chapter/Event Only*).
   - Step 2: Interactive checklist of verified engagements and tenures with cumulative hour calculator.
   - Step 3: Letter Purpose dropdown (e.g., Master’s Application, Scholarship, Visa) and custom institutional note.
   - Sidebar audit ledger showing previous dispatched certificates, Ed25519 digital signature status, and QR verification preview.
5. **Awards & Recognition (`awards.html` / `SCREEN_51`)**:
   - Personal nomination & AGM readiness card (*Shortlisted Top 5%*).
   - Annual Student Branch Awards Showcase (Volunteer of the Year, OC Member of the Year, Outstanding Leader, Emerging Volunteer).
   - Monthly Honor Roll (*Volunteers of the Month*) with formal citations and downloadable commendation certificates.

#### 3.2 Ex-Com & Chapter Operations Portal (`excom.html`)
1. **Event Operations Management**:
   - Form for event provisioning: Title, Chapter Code, capacity ceiling, volunteer roles, and date ranges.
   - Event closing workflow: Locks volunteer hours, transitions status to "Closed", batch-updates member records.
2. **Attendance & Engagement Review**:
   - Individual member hour verification and 1–5 performance rating matrix.

#### 3.3 Admin Console (`admin.html`)
1. **Admin Master Console (`SCREEN_72`)**:
   - Global KPIs: Total Volunteer Hours (12,450+ hrs), Branch Events (48 organized), Roster Membership (520 active), Verification Queue (14 pending).
   - Service letter verification queue with one-click counselor approval and PDF preview.
2. **Chapters & Affinity Groups Directory (`chapters.html` / `SCREEN_3`)**:
   - Central SBC Geocode: `R10-SL-SLIIT • Chartered / Est. 2018`.
   - Cards covering all 12 entities:
     * *Central Governing Body*: IEEE SLIIT SB Ex-Com.
     * *Subcommittees*: Web & Dev, Logistics & Operations, Editorial & Media, Finance & Membership.
     * *Chapters & Affinity*: Computer Society (CS), Robotics & Automation (RAS), Women in Engineering (WIE), Industry Applications (IAS), Power & Energy (PES), Communications Society (ComSoc).
   - vTools sync status, passkey credentials, and officer rosters.
3. **Events & Activity Trackers Ledger (`trackers.html` / `SCREEN_7`)**:
   - Full operations log with society logos, status trackers, and hours audited.
4. **Student Member Roster Directory (`roster.html` / `SCREEN_5`)**:
   - Searchable volunteer directory with chapter affiliations, active OC status, and lifetime logged hours.

---

### 4. Technical Architecture & Data Model

#### 4.1 Technology Stack
* **Frontend**: Semantic HTML5, CSS3 Custom Properties (Design Tokens), Vanilla JavaScript (Modular ES6), Vite build pipeline.
* **Design Language**: Apple Human Interface Guidelines (HIG) with **Executive Azure** color palette:
  - Deep Midnight Navy: `#001D39` / `#0A4174` (Sidebars & Primary Accent)
  - Slate Blue Tints: `#49769F`, `#6EA2B3`, `#7BBDE8`, `#BDD8E9`
  - System Background: `#F8F9FF` (Light Container: `#FFFFFF`, High-contrast borders: `rgba(60,60,67,0.12)`)
  - Typography: Manrope / SF Pro / Inter system typography stack.
* **Authentication**: Firebase Authentication (Google OAuth restricted to institutional/student domains).
* **Database**: Firebase Cloud Firestore (NoSQL, reactive real-time listeners).
* **Serverless Backend**: Firebase Cloud Functions (Node.js 20).
* **Document Generation**: `pdf-lib` for programmatic, letterhead-compliant PDF composition.
* **Hosting**: Firebase Hosting with SSL & custom domain support.

#### 4.2 Database Schema (Firestore Collections)

```text
users/{ieeeMemberId}
  ├── name: string
  ├── email: string (unique)
  ├── role: "volunteer" | "excom" | "admin"
  ├── chapterAffiliations: string[] // e.g. ["CS", "RAS"]
  ├── activeOCCount: number // Constrained: max 2
  ├── totalVerifiedHours: number
  ├── standing: "Premier Tier" | "Active Tier" | "Probation"
  ├── profilePicUrl: string
  └── createdAt: timestamp

entities/{entityCode} // 12 Entities (SB, DEV, LOG, CS, WIE, etc.)
  ├── name: string
  ├── type: "excom" | "subcommittee" | "chapter" | "affinity"
  ├── charterCode: string
  ├── counselor: { name: string, email: string }
  ├── chair: { name: string, ieeeId: string }
  ├── passkey: string (hashed)
  ├── activeMembersCount: number
  └── vToolsSyncStatus: boolean

events/{eventId}
  ├── title: string
  ├── entityCode: string
  ├── startDate: timestamp
  ├── endDate: timestamp
  ├── capacity: number
  ├── slotsFilled: number
  ├── status: "upcoming" | "in_progress" | "completed" | "closed"
  ├── tags: string[]
  ├── photos: string[]
  └── closedAt: timestamp | null

engagements/{engagementId}
  ├── userId: string
  ├── eventId: string
  ├── entityCode: string
  ├── role: "Lead" | "Technical" | "Logistics" | "Delegate" | "Volunteer"
  ├── loggedHours: number
  ├── verified: boolean
  ├── verifiedBy: string // Counselor or Ex-Com user ID
  ├── impactStatement: string
  ├── officialRecommendation: string
  └── status: "active" | "completed"

serviceLetters/{letterId}
  ├── userId: string
  ├── scope: "cumulative" | "academic_year" | "chapter_specific"
  ├── engagementIds: string[]
  ├── totalHours: number
  ├── purpose: string
  ├── addresseeNote: string
  ├── status: "pending" | "approved" | "rejected"
  ├── verificationHash: string // SHA-256
  ├── pdfUrl: string
  ├── counselorSignatureId: string
  ├── requestedAt: timestamp
  └── approvedAt: timestamp | null
```

---

### 5. Functional Requirements & Business Rules

#### 5.1 Volunteer Capacity Safeguard (The "Max 2 OC" Rule)
* To protect student academic performance, the platform enforces a strict threshold:
  $$\text{activeOCCount} \le 2$$
* If a volunteer attempts to enroll in a 3rd active Organizing Committee, the registration is blocked with a prompt requiring completion or sign-off of an ongoing commitment.

#### 5.2 Service Letter Request & Verification Pipeline
1. **Eligibility Check**: Member must have $\ge 1$ verified engagement.
2. **User Configuration**: Member selects specific scopes and checks/unchecks individual verified events.
3. **Automated Tally**: The UI dynamically updates the total verified hours counter.
4. **Counselor Queue Notification**: A Cloud Function dispatches an alert to the Branch Counselor upon submission.
5. **Cryptographic Sealing**: Upon counselor digital sign-off, a unique SHA-256 hash is stamped on the certificate, and an automated PDF with dynamic QR verification is generated via `pdf-lib`.

---

### 6. Implementation Roadmap & Milestones

* **Phase 1: Foundation & Auth (Week 1)**: Firebase project initialization, Google OAuth authentication guard, Firestore database security rules.
* **Phase 2: Volunteer Experience (Week 2)**: Deployment of Volunteer Dashboard, Profile, All Events directory, and Awards showcase with responsive desktop/mobile optimization.
* **Phase 3: Ex-Com & Event Lifecycle (Week 3)**: Event creation, capacity monitoring, OC registration caps, and hour-verification batch operations.
* **Phase 4: Admin Console & Directory (Week 4)**: 12-entity governance directory, student member roster, operations ledger, and bulk CSV ingestion.
* **Phase 5: Cloud Function PDF Engine & QA (Week 5)**: PDF generation service with `pdf-lib`, cryptographic verification endpoints, user acceptance testing (UAT) with SLIIT branch officers, and production rollout.