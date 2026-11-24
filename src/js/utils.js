// ============================================================
// IEEE SLIIT VMS — Utility Helpers
// Date, Hours, Toast, Modal, CSV, DOM helpers
// ============================================================

// ── Date Formatters ───────────────────────────────────────────
const RTF = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatDate(ts, opts = {}) {
  if (!ts) return '—';
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
    ...opts,
  });
}

export function formatDateTime(ts) {
  if (!ts) return '—';
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
    hour:  '2-digit',
    minute:'2-digit',
  });
}

export function formatRelative(ts) {
  if (!ts) return '—';
  const date  = ts?.toDate ? ts.toDate() : new Date(ts);
  const delta = (date - Date.now()) / 1000; // seconds
  const abs   = Math.abs(delta);

  if (abs < 60)        return RTF.format(Math.round(delta), 'second');
  if (abs < 3600)      return RTF.format(Math.round(delta / 60), 'minute');
  if (abs < 86400)     return RTF.format(Math.round(delta / 3600), 'hour');
  if (abs < 604800)    return RTF.format(Math.round(delta / 86400), 'day');
  if (abs < 2592000)   return RTF.format(Math.round(delta / 604800), 'week');
  return formatDate(ts);
}

export function formatDateRange(start, end) {
  if (!start) return '—';
  const s = formatDate(start);
  const e = formatDate(end);
  return s === e ? s : `${s} – ${e}`;
}

// ── Hours Formatter ───────────────────────────────────────────
export function formatHours(hours) {
  if (hours == null) return '—';
  if (hours === 1)   return '1 hr';
  if (hours < 1)     return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h} hrs`;
}

// ── Text Helpers ──────────────────────────────────────────────
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, max = 60) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max - 1) + '…';
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

// ── Role Helpers ──────────────────────────────────────────────
export function roleBadgeClass(role) {
  const map = {
    volunteer:  'badge-blue',
    organizer:  'badge-indigo',
    speaker:    'badge-pink',
    delegate:   'badge-teal',
    excom:      'badge-indigo',
    admin:      'badge-red',
  };
  return map[role] ?? 'badge-gray';
}

export function statusBadgeClass(status) {
  const map = {
    active:    'badge-blue',
    completed: 'badge-green',
    dropped:   'badge-gray',
    pending:   'badge-orange',
    approved:  'badge-green',
    rejected:  'badge-red',
    open:      'badge-green',
    closed:    'badge-gray',
  };
  return map[status] ?? 'badge-gray';
}

// ── Toast Notifications ───────────────────────────────────────
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

const TOAST_ICONS = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
};

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} [title]
 * @param {number} [duration=4000]
 */
export function showToast(message, type = 'info', title = '', duration = 4000) {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] ?? 'ℹ️'}</span>
    <div class="toast-body">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    dismissToast(toast);
  });
}

function dismissToast(toast) {
  toast.classList.add('dismissing');
  setTimeout(() => toast.remove(), 300);
}

// ── Modal Helpers ─────────────────────────────────────────────
export function openModal(backdropId) {
  const el = document.getElementById(backdropId);
  if (el) {
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(backdropId) {
  const el = document.getElementById(backdropId);
  if (el) {
    el.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

export function setupModalClose(backdropId) {
  const backdrop = document.getElementById(backdropId);
  if (!backdrop) return;

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal(backdropId);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
      closeModal(backdropId);
    }
  });

  // Close buttons inside modal
  backdrop.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(backdropId));
  });
}

// ── DOM Helpers ───────────────────────────────────────────────
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function setHTML(selector, html, root = document) {
  const el = root.querySelector(selector);
  if (el) el.innerHTML = html;
}

export function setText(selector, text, root = document) {
  const el = root.querySelector(selector);
  if (el) el.textContent = text;
}

export function show(el) {
  if (typeof el === 'string') el = document.getElementById(el);
  if (el) el.style.display = '';
}

export function hide(el) {
  if (typeof el === 'string') el = document.getElementById(el);
  if (el) el.style.display = 'none';
}

export function setLoading(btn, loading, text = '') {
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.disabled = true;
    if (text) btn.dataset.originalText = btn.textContent;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
    if (btn.dataset.originalText) {
      btn.textContent = btn.dataset.originalText;
    }
  }
}

// ── CSV Parser ────────────────────────────────────────────────
/**
 * Parse CSV text into array of objects using first row as headers.
 */
export function parseCSV(text) {
  const lines   = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^,]+|(?<=,)(?=,))/g) || [];
    const obj    = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] ?? '').trim().replace(/^"|"$/g, '');
    });
    return obj;
  });
}

// ── Number Formatter ──────────────────────────────────────────
export function formatNumber(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en').format(n);
}

// ── Debounce ──────────────────────────────────────────────────
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Generate avatar color from string ────────────────────────
export function avatarColor(str = '') {
  const colors = [
    '#007AFF', '#5856D6', '#FF2D55', '#FF9500',
    '#34C759', '#5AC8FA', '#AF52DE', '#FF3B30',
  ];
  let hash = 0;
  for (const ch of str) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// ── Animate element in ────────────────────────────────────────
export function animateIn(el, cls = 'animate-fadeInUp') {
  if (!el) return;
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}
