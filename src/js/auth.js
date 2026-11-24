// ============================================================
// IEEE SLIIT VMS — Authentication Module
// Google OAuth + Role Resolution + Auth Guard
// ============================================================

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase-config.js';
import { showToast } from './utils.js';

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({ prompt: 'select_account' });

// ── Current user state ────────────────────────────────────────
export let currentUser = null;
export let currentUserProfile = null;

const authListeners = [];

// ── Sign In with Google ───────────────────────────────────────
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user   = result.user;

    // Ensure user document exists in Firestore
    await ensureUserDocument(user);
    return user;
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      console.error('Sign-in error:', err);
      showToast('Sign-in failed. Please try again.', 'error');
    }
    throw err;
  }
}

// ── Sign Out ──────────────────────────────────────────────────
export async function signOut() {
  try {
    sessionStorage.removeItem('vms_demo_user');
    await firebaseSignOut(auth);
    currentUser        = null;
    currentUserProfile = null;
    window.location.href = '/login.html';
  } catch (err) {
    sessionStorage.removeItem('vms_demo_user');
    currentUser        = null;
    currentUserProfile = null;
    window.location.href = '/login.html';
  }
}

// ── Ensure user document in Firestore ────────────────────────
async function ensureUserDocument(user) {
  try {
    const ref  = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // First-time login — create a default volunteer profile
      await setDoc(ref, {
        name:          user.displayName || 'Unknown Volunteer',
        email:         user.email,
        role:          'volunteer',
        chapterCode:   'STBD4028', // default chapter
        activeOCCount: 0,
        totalHours:    0,
        profilePicUrl: user.photoURL || '',
        createdAt:     serverTimestamp(),
      });
    }
  } catch (err) {
    console.warn('Could not create or check user document in Firestore (permission or rules):', err);
    // Don't throw — allow authentication to succeed with fallback profile
  }
}

// ── Fetch user profile from Firestore ────────────────────────
export async function fetchUserProfile(uid) {
  try {
    const ref  = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {
    console.warn('Could not fetch user document from Firestore:', err);
  }

  // Fallback profile if Firestore document does not exist yet or rules block read
  if (currentUser) {
    // Check if localStorage has a dev override role
    const storedRole = localStorage.getItem('vms_user_role') || 'volunteer';
    return {
      id: currentUser.uid,
      name: currentUser.displayName || 'IEEE Volunteer',
      email: currentUser.email || '',
      role: storedRole,
      chapterCode: 'STBD4028',
      activeOCCount: 0,
      totalHours: 0,
      profilePicUrl: currentUser.photoURL || '',
    };
  }
  return null;
}

// ── Auth State Listener ───────────────────────────────────────
export function onAuthChange(callback) {
  authListeners.push(callback);
}

// Main Firebase auth observer
onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    currentUserProfile = await fetchUserProfile(user.uid);
  } else {
    currentUserProfile = null;
  }

  authListeners.forEach(cb => cb(user, currentUserProfile));
});

// ── Demo / Quick Access Login ────────────────────────────────
export function loginAsDemo(role = 'volunteer') {
  const demoProfiles = {
    volunteer: {
      id: 'demo-volunteer-001',
      name: 'Kavindu Perera',
      email: 'it21045920@my.sliit.lk',
      role: 'volunteer',
      chapterCode: 'CS',
      chapterAffiliations: ['CS', 'RAS'],
      activeOCCount: 1,
      totalHours: 48.5,
      totalVerifiedHours: 48.5,
      standing: 'Premier Tier',
      profilePicUrl: '',
    },
    excom: {
      id: 'demo-excom-001',
      name: 'Senuka Wijesinghe',
      email: 'excom.cs@sliit.lk',
      role: 'excom',
      chapterCode: 'CS',
      chapterAffiliations: ['CS'],
      activeOCCount: 2,
      totalHours: 120.0,
      totalVerifiedHours: 120.0,
      standing: 'Premier Tier',
      profilePicUrl: '',
    },
    admin: {
      id: 'demo-admin-001',
      name: 'Dr. Pradeep Abeygunawardhana',
      email: 'counselor@sliit.lk',
      role: 'admin',
      chapterCode: 'SB',
      chapterAffiliations: ['SB'],
      activeOCCount: 0,
      totalHours: 350.0,
      totalVerifiedHours: 350.0,
      standing: 'Premier Tier',
      profilePicUrl: '',
    }
  };

  const selected = demoProfiles[role] || demoProfiles.volunteer;
  sessionStorage.setItem('vms_demo_user', JSON.stringify(selected));
  currentUser = { uid: selected.id, displayName: selected.name, email: selected.email, photoURL: selected.profilePicUrl };
  currentUserProfile = selected;
  redirectByRole(selected.role);
}

// ── Auth Guard ────────────────────────────────────────────────
/**
 * Call at the top of each page to require authentication.
 * Returns a promise that resolves with { user, profile } or
 * redirects to /login.html if unauthenticated.
 *
 * @param {'volunteer'|'excom'|'admin'} [requiredRole]
 */
export function requireAuth(requiredRole = null) {
  return new Promise((resolve, reject) => {
    // Check for demo session first
    const demoUserStr = sessionStorage.getItem('vms_demo_user');
    if (demoUserStr) {
      try {
        const profile = JSON.parse(demoUserStr);
        const user = { uid: profile.id, displayName: profile.name, email: profile.email, photoURL: profile.profilePicUrl };
        currentUser = user;
        currentUserProfile = profile;

        if (requiredRole) {
          const roleHierarchy = { volunteer: 0, excom: 1, admin: 2 };
          const userLevel     = roleHierarchy[profile?.role] ?? 0;
          const reqLevel      = roleHierarchy[requiredRole]  ?? 0;

          if (userLevel < reqLevel) {
            showToast('Access denied — insufficient permissions.', 'error');
            redirectByRole(profile?.role);
            return;
          }
        }

        resolve({ user, profile });
        return;
      } catch (err) {
        sessionStorage.removeItem('vms_demo_user');
      }
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();

      if (!user) {
        window.location.href = '/login.html';
        return;
      }

      const profile = await fetchUserProfile(user.uid);
      currentUserProfile = profile;

      if (requiredRole) {
        const roleHierarchy = { volunteer: 0, excom: 1, admin: 2 };
        const userLevel     = roleHierarchy[profile?.role] ?? 0;
        const reqLevel      = roleHierarchy[requiredRole]  ?? 0;

        if (userLevel < reqLevel) {
          showToast('Access denied — insufficient permissions.', 'error');
          // Redirect to appropriate page
          redirectByRole(profile?.role);
          return;
        }
      }

      resolve({ user, profile });
    });
  });
}

// ── Redirect by Role ──────────────────────────────────────────
export function redirectByRole(role) {
  switch (role) {
    case 'admin':   window.location.href = '/admin.html';  break;
    case 'excom':   window.location.href = '/excom.html';  break;
    default:        window.location.href = '/index.html';  break;
  }
}
