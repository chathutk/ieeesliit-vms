// ============================================================
// IEEE SLIIT VMS — Firebase Configuration
// ============================================================
// ⚠️  Replace the placeholder values below with your actual
//     Firebase project configuration from:
//     Firebase Console → Project Settings → Your Apps → SDK setup
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAOo1rrKrAhLwmk7n4DtLO0c-66FZytDQI",
  authDomain: "ieee-sliit-portal.firebaseapp.com",
  projectId: "ieee-sliit-portal",
  storageBucket: "ieee-sliit-portal.firebasestorage.app",
  messagingSenderId: "695131030280",
  appId: "1:695131030280:web:f0bc1b4e10840bb4c522bd",
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const auth      = getAuth(app);
const functions = getFunctions(app, 'us-central1');
const storage   = getStorage(app);

// ── Local Emulator Suite ─────────────────────────────────────
// Uncomment when running `firebase emulators:start`
//
// if (import.meta.env.DEV) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFunctionsEmulator(functions, 'localhost', 5001);
// }

export { app, db, auth, functions, storage };
