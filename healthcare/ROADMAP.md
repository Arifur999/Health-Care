# MEDdical — Feature Roadmap

Gap analysis for what a real, trustworthy hospital/medical booking site needs, beyond what's already built. Preserve everything existing — this is additive. Anything new should match the current theme (primary navy `#1f2b6c`, accent blue `#159eec`, secondary `#bfd2f8`, Yeseva One display font, Work Sans body font).

Status: `[ ]` not started · `[~]` in progress · `[x]` done

## Tier 1 — Quick, high-visibility fixes

- [x] Theme the 404 page (`src/app/not-found.tsx`) — currently plain unstyled text, doesn't match the site at all
- [x] Theme the error page (`src/app/error.tsx`) — same issue, default Next.js boilerplate
- [x] Add `sitemap.xml` + `robots.txt` — zero SEO discoverability right now
- [x] Wire up the navbar search icon — it renders but has no click handler, no functionality at all (dead UI element, misleading to users)
- [ ] Add Privacy Policy + Terms of Service pages, linked from the footer — currently don't exist at all; matters more than usual for a site handling health data
- [ ] Add a dark mode toggle — `.dark` CSS variables already exist in globals.css, but there's no UI to switch themes, and `next-themes` is only wired into the toast library
- [x] Add a cookie consent banner — trust/compliance signal, low effort
- [x] Add an FAQ page — standard expectation for medical sites, reduces support load

## Tier 2 — Meaningful UX features

- [x] Doctor availability indicator on doctor cards — done via a lightweight backend availability probe (at most one upcoming open slot per doctor in the list); cards show a green "Available" / muted "No open slots" badge.
- [x] Downloadable/printable prescription (PDF) for patients — done via a browser-print letterhead view (no external PDF dep; "Save as PDF" works from the print dialog).
- [x] Real notification system — done: Notification model + module, unread badge in the bell dropdown, mark-read / mark-all-read, one-minute polling. Triggers fire on appointment booked (both parties), status change, prescription issued, and reminder.
- [x] Trust badges — Verified-doctor check + BMDC registration number now on doctor cards and detail.
- [x] Emergency quick-contact — header number is a tel: link; mobile menu has a prominent emergency call block (mobile had no visible number before); footer phone/email are tel:/mailto: links. (Chose this over a floating button to avoid clutter with the chat widget + cookie banner.)

### New features (post-Tier-2 requests)
- [x] Appointment type — patient chooses **In-person** or **Video call** at booking; type badge on appointment cards; paid video appointments get a working "Join Video Call" link (Jitsi room from videoCallingId; swappable to real Google Meet via Calendar API later — see `lib/videoConsultation.ts`).
- [x] Appointment reminder email ~10 min before (paid, upcoming appointments; `reminderSent` guarantees one-per-appointment). Triggered via `/internal/send-appointment-reminders` (CRON_SECRET-protected) — point an external cron at it every ~5 min.
- [x] Appointment completion — doctor's status dropdown marks an appointment COMPLETED (notifies the patient and unlocks "Write Prescription"). Already present; now also fires a notification.

### Bonus fixes found during Tier 2 / audit
- [x] **Critical:** app-wide broken booking/schedules — frontend read a nonexistent `startDateTime` field; nothing schedule-related worked. Fixed across 20 files + backend constant.
- [x] Dashboard sidebar branding was "PH Healthcare" → fixed to MEDdical.
- [x] Currency inconsistency ($ vs ৳) → standardized on Taka via a shared helper.
- [x] Removed leftover `console.log` in the backend doctors-list service.

## Tier 3 — Larger features (bigger lift, still valuable)

- [ ] Real CMS-backed news/blog (News page currently reads from static `lib/newsData.ts` mock data)
- [ ] Insurance / health package info page
- [ ] Bangla/English language toggle — target audience is Bangladeshi
- [ ] WhatsApp quick-chat integration — very common expectation for South Asian healthcare sites
- [ ] PWA support (installable, works offline for viewing prescriptions/appointments)

## Notes

- Working through this top-to-bottom, committing after each item.
- Nothing in Tier 1 requires backend changes — pure frontend.
- Tier 2's notification system and Tier 3's CMS/insurance pages need new backend models — flagging that scope before starting those specifically.
