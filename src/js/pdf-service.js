// ============================================================
// IEEE SLIIT VMS — Client-Side PDF Generator
// Generates official service letters directly in browser using pdf-lib
// Compatible with Firebase Spark Free Tier (no Cloud Functions required)
// ============================================================

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase-config.js';

/**
 * Builds the PDF document using pdf-lib in browser
 */
export async function buildServiceLetterPdf({
  letterId = 'LETTER',
  user = { name: 'Volunteer', email: '' },
  engagements = [],
  events = [],
  chapter = { name: 'IEEE SLIIT Student Branch' }
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4: 595 x 842 pt
  const { width, height } = page.getSize();

  const fontBold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontReg    = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const gray  = rgb(0.4, 0.4, 0.4);
  const dark  = rgb(0.11, 0.11, 0.11);
  const blue  = rgb(0, 0.48, 1);
  const light = rgb(0.95, 0.95, 0.97);

  let y = height - 40;

  // ── Header band ────────────────────────────────────────────
  page.drawRectangle({
    x: 0,
    y: height - 90,
    width,
    height: 90,
    color: blue,
  });

  page.drawText('IEEE', {
    x: 40,
    y: height - 55,
    size: 28,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText('Student Branch of SLIIT', {
    x: 110,
    y: height - 55,
    size: 16,
    font: fontReg,
    color: rgb(1, 1, 1),
  });

  page.drawText('Official Volunteer Service Letter', {
    x: 40,
    y: height - 78,
    size: 11,
    font: fontReg,
    color: rgb(0.85, 0.92, 1),
  });

  // Reference Code
  page.drawText(`Ref: VMS-${letterId.slice(0, 8).toUpperCase()}`, {
    x: width - 160,
    y: height - 68,
    size: 9,
    font: fontReg,
    color: rgb(0.85, 0.92, 1),
  });

  y = height - 110;

  // ── Date ───────────────────────────────────────────────────
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  page.drawText(today, { x: 40, y, size: 10, font: fontReg, color: gray });
  y -= 30;

  // ── To / Subject ───────────────────────────────────────────
  page.drawText('TO WHOM IT MAY CONCERN', {
    x: 40,
    y,
    size: 11,
    font: fontBold,
    color: dark,
  });
  y -= 22;

  page.drawText(`Re: Volunteer Service Certification for ${user.name}`, {
    x: 40,
    y,
    size: 10,
    font: fontItalic,
    color: gray,
  });
  y -= 30;

  // ── Body ───────────────────────────────────────────────────
  const chapterName = chapter.name || 'IEEE SLIIT Student Branch';
  const bodyText =
    `This is to certify that ${user.name} (${user.email || 'N/A'}) has been an active ` +
    `volunteer of the IEEE Student Branch of SLIIT — ${chapterName}. ` +
    `The volunteer has contributed their time, leadership, and technical skills to the following IEEE-sanctioned activities:`;

  drawWrappedText(page, bodyText, 40, y, width - 80, 11, fontReg, dark);
  y -= 70;

  // ── Events table ───────────────────────────────────────────
  page.drawRectangle({
    x: 40,
    y: y - 4,
    width: width - 80,
    height: 22,
    color: blue,
  });
  page.drawText('Event Title', { x: 46, y: y + 2, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('Date Range',  { x: 280, y: y + 2, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('Role',        { x: 390, y: y + 2, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('Hours',       { x: 505, y: y + 2, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  y -= 26;

  const eventMap = Object.fromEntries(events.map((e) => [e.id, e]));
  let totalHours = 0;
  let rowIndex = 0;

  for (const eng of engagements) {
    const ev = eventMap[eng.eventId] || {};
    const rowBg = rowIndex % 2 === 0 ? light : rgb(1, 1, 1);
    page.drawRectangle({ x: 40, y: y - 4, width: width - 80, height: 18, color: rowBg });

    const title = (ev.title || 'Event Participation');
    const evTitle = title.length > 36 ? title.slice(0, 35) + '…' : title;
    const dr = formatDateRangeText(ev.startDate, ev.endDate);
    const hrs = eng.verifiedHours || 0;
    totalHours += hrs;

    page.drawText(evTitle,              { x: 46,  y, size: 9, font: fontReg, color: dark });
    page.drawText(dr,                   { x: 280, y, size: 9, font: fontReg, color: dark });
    page.drawText(capitalize(eng.role), { x: 390, y, size: 9, font: fontReg, color: dark });
    page.drawText(`${hrs} hrs`,         { x: 505, y, size: 9, font: fontReg, color: dark });

    y -= 20;
    rowIndex++;

    if (y < 160) break; // Keep within single A4 page
  }

  // Totals row
  page.drawRectangle({
    x: 40,
    y: y - 4,
    width: width - 80,
    height: 20,
    color: blue,
  });
  page.drawText('Total Verified Engagement', { x: 46, y, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText(`${totalHours} hrs`,          { x: 505, y, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  y -= 30;

  // ── Closing ────────────────────────────────────────────────
  y -= 10;
  const firstName = user.name ? user.name.split(' ')[0] : 'the member';
  const closing =
    `We commend ${firstName}'s dedication and commitment to the IEEE mission of advancing ` +
    `technology for humanity. This letter is issued in good faith and may be verified through the ` +
    `IEEE SLIIT Volunteer Management System.`;
  drawWrappedText(page, closing, 40, y, width - 80, 10, fontReg, dark);
  y -= 65;

  // ── Signature block ────────────────────────────────────────
  y -= 10;
  page.drawText('___________________________', { x: 40, y, size: 10, font: fontReg, color: gray });
  page.drawText('___________________________', { x: width / 2, y, size: 10, font: fontReg, color: gray });
  y -= 16;
  page.drawText('Chapter Advisor', { x: 40, y, size: 9, font: fontBold, color: dark });
  page.drawText('Branch Chairperson', { x: width / 2, y, size: 9, font: fontBold, color: dark });
  y -= 12;
  page.drawText('IEEE Student Branch of SLIIT', { x: 40, y, size: 8, font: fontReg, color: gray });
  page.drawText('IEEE Student Branch of SLIIT', { x: width / 2, y, size: 8, font: fontReg, color: gray });

  // ── Footer ─────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width, height: 28, color: light });
  page.drawText('IEEE Student Branch of SLIIT  |  ieee@sliit.lk  |  Generated by VMS Client', {
    x: 40,
    y: 9,
    size: 8,
    font: fontReg,
    color: gray,
  });
  page.drawText(letterId, {
    x: width - 200,
    y: 9,
    size: 7,
    font: fontReg,
    color: rgb(0.7, 0.7, 0.7),
  });

  return await pdfDoc.save();
}

/**
 * Trigger direct download of the PDF in the user's browser
 */
export function downloadPdf(pdfBytes, filename = 'IEEE_Service_Letter.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 20000);
}

/**
 * Attempts to upload generated PDF to Firebase Storage (available on free tier)
 * Returns public/download URL or null if storage fails/rules block.
 */
export async function uploadPdfToStorage(letterId, pdfBytes) {
  try {
    const fileRef = ref(storage, `service-letters/${letterId}.pdf`);
    const blob    = new Blob([pdfBytes], { type: 'application/pdf' });
    await uploadBytes(fileRef, blob, { contentType: 'application/pdf' });
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (err) {
    console.warn('Firebase Storage upload skipped or failed (rules/bucket config):', err);
    return null;
  }
}

// ── Helpers ───────────────────────────────────────────────────
function drawWrappedText(page, text, x, y, maxWidth, size, font, color) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (const word of words) {
    const testLine = line + word + ' ';
    const testWidth = font.widthOfTextAtSize(testLine, size);
    if (testWidth > maxWidth && line.length > 0) {
      page.drawText(line.trim(), { x, y: currentY, size, font, color });
      currentY -= size + 4;
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    page.drawText(line.trim(), { x, y: currentY, size, font, color });
  }
}

function formatDateRangeText(start, end) {
  const fmt = (ts) => {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const s = fmt(start);
  const e = fmt(end);
  if (!s && !e) return '—';
  return s === e || !e ? s : `${s} – ${e}`;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

