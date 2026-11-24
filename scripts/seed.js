// ============================================================
// IEEE SLIIT VMS — Seed Script
// Populates Firestore with realistic mock data for dev/testing
//
// Usage:
//   1. Export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json
//   2. node scripts/seed.js
// ============================================================

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load service account — place your serviceAccountKey.json in scripts/
const serviceAccount = JSON.parse(
  readFileSync(resolve(__dirname, 'serviceAccountKey.json'), 'utf-8')
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ── Helpers ───────────────────────────────────────────────────
const ts = (date) => Timestamp.fromDate(new Date(date));
const now = () => Timestamp.now();

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// ── Seed Data ─────────────────────────────────────────────────

// 3 Chapters
const chapters = [
  { id: 'STBD4028', name: 'IEEE SLIIT Student Branch', adminIds: [], excomCredential: 'STBD4028' },
  { id: 'STBD5001', name: 'IEEE Colombo Section',       adminIds: [], excomCredential: 'STBD5001' },
  { id: 'STBD6002', name: 'IEEE Sri Lanka Section',     adminIds: [], excomCredential: 'STBD6002' },
];

// 15 Users (mix of roles)
const users = [
  { id: 'user-admin-001', name: 'Ashan Perera',       email: 'ashan@sliit.lk',    role: 'admin',     chapterCode: 'STBD4028', totalHours: 120, activeOCCount: 0 },
  { id: 'user-excom-001', name: 'Nimesha Jayawardena', email: 'nimesha@sliit.lk',  role: 'excom',     chapterCode: 'STBD4028', totalHours: 85,  activeOCCount: 1 },
  { id: 'user-excom-002', name: 'Dilshan Silva',       email: 'dilshan@sliit.lk',  role: 'excom',     chapterCode: 'STBD4028', totalHours: 72,  activeOCCount: 0 },
  { id: 'user-vol-001',   name: 'Kavindu Rathnayake',  email: 'kavindu@sliit.lk',  role: 'volunteer', chapterCode: 'STBD4028', totalHours: 48,  activeOCCount: 1 },
  { id: 'user-vol-002',   name: 'Senuri Fernando',     email: 'senuri@sliit.lk',   role: 'volunteer', chapterCode: 'STBD4028', totalHours: 36,  activeOCCount: 0 },
  { id: 'user-vol-003',   name: 'Tharindu Bandara',    email: 'tharindu@sliit.lk', role: 'volunteer', chapterCode: 'STBD4028', totalHours: 24,  activeOCCount: 2 },
  { id: 'user-vol-004',   name: 'Malisha Wickramasinghe',email:'malisha@sliit.lk', role: 'volunteer', chapterCode: 'STBD4028', totalHours: 18,  activeOCCount: 0 },
  { id: 'user-vol-005',   name: 'Chamitha Gunawardena',email: 'chamitha@sliit.lk', role: 'volunteer', chapterCode: 'STBD4028', totalHours: 60,  activeOCCount: 1 },
  { id: 'user-vol-006',   name: 'Ruwini Amarasinghe',  email: 'ruwini@sliit.lk',   role: 'volunteer', chapterCode: 'STBD4028', totalHours: 44,  activeOCCount: 0 },
  { id: 'user-vol-007',   name: 'Janith Mendis',       email: 'janith@sliit.lk',   role: 'volunteer', chapterCode: 'STBD5001', totalHours: 30,  activeOCCount: 1 },
  { id: 'user-vol-008',   name: 'Supuni Senanayake',   email: 'supuni@sliit.lk',   role: 'volunteer', chapterCode: 'STBD5001', totalHours: 12,  activeOCCount: 0 },
  { id: 'user-vol-009',   name: 'Pasan Weerasinghe',   email: 'pasan@sliit.lk',    role: 'volunteer', chapterCode: 'STBD5001', totalHours: 8,   activeOCCount: 0 },
  { id: 'user-vol-010',   name: 'Hasini Dissanayake',  email: 'hasini@sliit.lk',   role: 'volunteer', chapterCode: 'STBD4028', totalHours: 52,  activeOCCount: 0 },
  { id: 'user-vol-011',   name: 'Kaveesha Gunathilaka',email: 'kaveesha@sliit.lk', role: 'volunteer', chapterCode: 'STBD6002', totalHours: 20,  activeOCCount: 0 },
  { id: 'user-vol-012',   name: 'Nadun Lakmal',        email: 'nadun@sliit.lk',    role: 'volunteer', chapterCode: 'STBD4028', totalHours: 16,  activeOCCount: 0 },
];

// 8 Events
const events = [
  {
    id: 'event-001',
    title: 'IEEE Day 2024 — Volunteer Drive',
    description: 'Annual IEEE Day volunteer drive supporting local schools with STEM workshops.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-04-08'),
    endDate:   ts('2024-04-08'),
    capacity: 25, slotsFilled: 18, status: 'closed',
    tags: ['outreach', 'stem', 'education'],
    createdBy: 'user-excom-001', closedAt: ts('2024-04-09'),
  },
  {
    id: 'event-002',
    title: 'TechFest 2024 — Event Organizing Committee',
    description: 'Inter-faculty technology festival. OC members needed for logistics and stage management.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-06-15'),
    endDate:   ts('2024-06-17'),
    capacity: 30, slotsFilled: 22, status: 'closed',
    tags: ['organizing', 'event', 'techfest'],
    createdBy: 'user-excom-001', closedAt: ts('2024-06-18'),
  },
  {
    id: 'event-003',
    title: 'Workshop: AI for Beginners',
    description: 'Half-day workshop introducing machine learning concepts to 1st-year students.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-07-20'),
    endDate:   ts('2024-07-20'),
    capacity: 20, slotsFilled: 15, status: 'closed',
    tags: ['workshop', 'ai', 'education'],
    createdBy: 'user-excom-002', closedAt: ts('2024-07-21'),
  },
  {
    id: 'event-004',
    title: 'IEEE YESIST12 — Delegate Coordination',
    description: 'Supporting delegate arrivals and scheduling for the YESIST12 innovation contest.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-09-05'),
    endDate:   ts('2024-09-07'),
    capacity: 40, slotsFilled: 35, status: 'closed',
    tags: ['conference', 'delegate', 'international'],
    createdBy: 'user-excom-001', closedAt: ts('2024-09-08'),
  },
  {
    id: 'event-005',
    title: 'Hack SLIIT 2024 — Volunteer Support',
    description: '24-hour hackathon volunteer support for participant management and catering.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-10-18'),
    endDate:   ts('2024-10-19'),
    capacity: 20, slotsFilled: 12, status: 'open',
    tags: ['hackathon', 'volunteer'],
    createdBy: 'user-excom-001', closedAt: null,
  },
  {
    id: 'event-006',
    title: 'Robotics Workshop Series — Session 3',
    description: 'Hands-on ROS and Arduino session. Experienced volunteers for demo stations needed.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-11-02'),
    endDate:   ts('2024-11-02'),
    capacity: 15, slotsFilled: 6, status: 'open',
    tags: ['robotics', 'workshop', 'stem'],
    createdBy: 'user-excom-002', closedAt: null,
  },
  {
    id: 'event-007',
    title: 'Women in Engineering Symposium',
    description: 'Annual symposium celebrating women in engineering. Volunteer coordinators needed.',
    chapterCode: 'STBD5001',
    startDate: ts('2024-11-15'),
    endDate:   ts('2024-11-15'),
    capacity: 25, slotsFilled: 10, status: 'open',
    tags: ['wie', 'symposium', 'diversity'],
    createdBy: 'user-excom-001', closedAt: null,
  },
  {
    id: 'event-008',
    title: 'Year-End Gala & Awards 2024',
    description: 'Annual chapter gala. Volunteers for setup, photography, and guest management.',
    chapterCode: 'STBD4028',
    startDate: ts('2024-12-10'),
    endDate:   ts('2024-12-10'),
    capacity: 30, slotsFilled: 5, status: 'open',
    tags: ['gala', 'awards', 'chapter'],
    createdBy: 'user-excom-001', closedAt: null,
  },
];

// 30 Engagements
const engagements = [
  // event-001 (closed)
  { userId:'user-vol-001', eventId:'event-001', role:'organizer', verifiedHours:8, status:'completed', rating:5, impactStatement:'Coordinated 5 school visits smoothly.', createdAt:ts('2024-04-01') },
  { userId:'user-vol-002', eventId:'event-001', role:'volunteer', verifiedHours:6, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-04-01') },
  { userId:'user-vol-003', eventId:'event-001', role:'volunteer', verifiedHours:6, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-04-02') },
  { userId:'user-vol-010', eventId:'event-001', role:'organizer', verifiedHours:8, status:'completed', rating:5, impactStatement:'Excellent logistics management.', createdAt:ts('2024-04-02') },

  // event-002 (closed)
  { userId:'user-vol-001', eventId:'event-002', role:'organizer', verifiedHours:24, status:'completed', rating:5, impactStatement:'Managed main stage operations.', createdAt:ts('2024-06-01') },
  { userId:'user-vol-004', eventId:'event-002', role:'volunteer', verifiedHours:12, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-06-02') },
  { userId:'user-vol-005', eventId:'event-002', role:'volunteer', verifiedHours:12, status:'completed', rating:3, impactStatement:'', createdAt:ts('2024-06-02') },
  { userId:'user-vol-006', eventId:'event-002', role:'speaker',   verifiedHours:4,  status:'completed', rating:5, impactStatement:'Delivered opening keynote.', createdAt:ts('2024-06-05') },
  { userId:'user-excom-001', eventId:'event-002', role:'organizer', verifiedHours:30, status:'completed', rating:5, impactStatement:'Overall event coordination.', createdAt:ts('2024-06-01') },

  // event-003 (closed)
  { userId:'user-vol-002', eventId:'event-003', role:'organizer', verifiedHours:6, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-07-15') },
  { userId:'user-vol-008', eventId:'event-003', role:'speaker',   verifiedHours:3, status:'completed', rating:5, impactStatement:'Delivered AI intro session.', createdAt:ts('2024-07-15') },
  { userId:'user-vol-010', eventId:'event-003', role:'volunteer', verifiedHours:5, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-07-16') },

  // event-004 (closed)
  { userId:'user-vol-001', eventId:'event-004', role:'delegate',   verifiedHours:16, status:'completed', rating:5, impactStatement:'Represented SLIIT at YESIST12.', createdAt:ts('2024-08-25') },
  { userId:'user-vol-003', eventId:'event-004', role:'organizer',  verifiedHours:20, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-08-25') },
  { userId:'user-vol-006', eventId:'event-004', role:'volunteer',  verifiedHours:14, status:'completed', rating:4, impactStatement:'', createdAt:ts('2024-08-26') },
  { userId:'user-vol-010', eventId:'event-004', role:'organizer',  verifiedHours:20, status:'completed', rating:5, impactStatement:'Led delegate arrival coordination.', createdAt:ts('2024-08-26') },
  { userId:'user-vol-005', eventId:'event-004', role:'volunteer',  verifiedHours:12, status:'completed', rating:3, impactStatement:'', createdAt:ts('2024-08-27') },

  // event-005 (open - active engagements)
  { userId:'user-vol-001', eventId:'event-005', role:'organizer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-01') },
  { userId:'user-vol-004', eventId:'event-005', role:'volunteer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-02') },
  { userId:'user-vol-005', eventId:'event-005', role:'volunteer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-02') },
  { userId:'user-vol-003', eventId:'event-005', role:'organizer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-03') },

  // event-006 (open)
  { userId:'user-vol-002', eventId:'event-006', role:'volunteer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-15') },
  { userId:'user-vol-012', eventId:'event-006', role:'volunteer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-16') },

  // event-007
  { userId:'user-vol-007', eventId:'event-007', role:'organizer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-20') },
  { userId:'user-vol-008', eventId:'event-007', role:'volunteer', verifiedHours:0, status:'active', rating:null, impactStatement:'', createdAt:ts('2024-10-20') },

  // dropped engagements
  { userId:'user-vol-009', eventId:'event-002', role:'volunteer', verifiedHours:0, status:'dropped', rating:null, impactStatement:'', createdAt:ts('2024-06-01') },
  { userId:'user-vol-011', eventId:'event-003', role:'volunteer', verifiedHours:0, status:'dropped', rating:null, impactStatement:'', createdAt:ts('2024-07-15') },
];

// 2 Service Letters
const serviceLetters = [
  {
    id: 'letter-001',
    userId:      'user-vol-001',
    eventIds:    ['event-001', 'event-002', 'event-004'],
    pdfUrl:      '',
    status:      'pending',
    requestedAt: ts('2024-10-10'),
    approvedAt:  null,
  },
  {
    id: 'letter-002',
    userId:      'user-vol-006',
    eventIds:    ['event-002', 'event-004'],
    pdfUrl:      '',
    status:      'approved',
    requestedAt: ts('2024-10-05'),
    approvedAt:  ts('2024-10-07'),
  },
];

// ── Write to Firestore ────────────────────────────────────────
async function seed() {
  console.log('🌱 Starting seed…\n');

  // Chapters
  console.log('📖 Seeding chapters…');
  for (const ch of chapters) {
    await db.collection('chapters').doc(ch.id).set({ name: ch.name, adminIds: ch.adminIds, excomCredential: ch.excomCredential });
    process.stdout.write('.');
  }
  console.log(`\n  ✅ ${chapters.length} chapters written.\n`);

  // Users
  console.log('👥 Seeding users…');
  for (const u of users) {
    const { id, ...data } = u;
    await db.collection('users').doc(id).set({ ...data, profilePicUrl: '', createdAt: now() });
    process.stdout.write('.');
  }
  console.log(`\n  ✅ ${users.length} users written.\n`);
  await delay(500);

  // Events
  console.log('📅 Seeding events…');
  for (const ev of events) {
    const { id, ...data } = ev;
    await db.collection('events').doc(id).set(data);
    process.stdout.write('.');
  }
  console.log(`\n  ✅ ${events.length} events written.\n`);
  await delay(500);

  // Engagements
  console.log('🤝 Seeding engagements…');
  for (const eng of engagements) {
    await db.collection('engagements').add(eng);
    process.stdout.write('.');
  }
  console.log(`\n  ✅ ${engagements.length} engagements written.\n`);
  await delay(500);

  // Service Letters
  console.log('📄 Seeding service letters…');
  for (const l of serviceLetters) {
    const { id, ...data } = l;
    await db.collection('serviceLetters').doc(id).set(data);
    process.stdout.write('.');
  }
  console.log(`\n  ✅ ${serviceLetters.length} service letters written.\n`);

  console.log('🎉 Seed complete!\n');
  console.log('Summary:');
  console.log(`  • Chapters:        ${chapters.length}`);
  console.log(`  • Users:           ${users.length}`);
  console.log(`  • Events:          ${events.length}`);
  console.log(`  • Engagements:     ${engagements.length}`);
  console.log(`  • Service Letters: ${serviceLetters.length}`);

  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
