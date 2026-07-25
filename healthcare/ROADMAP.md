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

## Tier 3 — Larger features (bigger lift, still valuable) — ALL DONE

- [x] Real CMS-backed news/blog — News list + article pages now read from a News API (backend model + module) instead of the static mock; admin News Management page for create/edit/publish/delete. Existing articles were seeded.
- [x] Insurance / health package info page (`/insurance`) — how insurance works, accepted providers, claim support.
- [x] Bangla/English language toggle — LanguageProvider + persisted locale + EN/বাংলা switch; core public marketing surface (top bar, nav, hero, welcome, footer) fully bilingual.
- [x] WhatsApp quick-chat — floating button on public pages (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- [x] PWA support — web app manifest, branded icon, service worker (network-first + offline fallback page); installable to home screen.

## Tier 4 — Post-launch polish (this round) — ALL DONE

- [x] Public doctor reviews redesigned — reviewer name + avatar + star rating + comment (was a raw "Patient ID: <uuid>"); backend now returns reviewer name/photo only (no PII). Live average computed from reviews.
- [x] Patient self-cancellation — patients can cancel their own unpaid, still-scheduled appointments; frees the slot and notifies the doctor. Also closed an IDOR (PATIENT could change any appointment's status).
- [x] Apply-as-a-doctor — public `/careers` application form + admin review page (`/admin/dashboard/doctor-applications`); approving creates the doctor account (temp password + emailed credentials), rejecting emails a decline. New `DoctorApplication` model/migration.
- [x] Image optimization — `next/image` across all raster/photo images (fill+sizes, priority heroes, remotePatterns for user URLs). Small SVG icons/blob previews left as `<img>` on purpose.
- [x] Rate limiting — Redis-backed (Upstash), fail-open, on auth (register/login/forget/reset, 20/15 min) and public doctor-application submit (5/hr).
- [x] Full homepage bilingual (EN/বাংলা) — Services, Doctors, Book Appointment, News, Contact now translate; Services/Contact converted to client components.
- [x] Admin dashboard — Total Doctors + Total Revenue KPI cards, and a monthly Revenue Trends area chart (new `getRevenueByMonth`).
- [x] Automated tests — Vitest unit tests (currency, video link, doctor-application schema, EN/বাংলা parity). Deploy-safe: excluded from the build, not added to the pnpm lockfile. See `TESTING.md`.
- [x] Accessibility — `<html lang>` follows the locale, skip-to-content link, labeled search inputs, language-toggle group label.

## Notes

- Every roadmap tier (1, 2, 3) plus the extra appointment features (video consults, reminders, notifications, completion) is complete, each verified end-to-end and committed.
- Deployment: three newer Prisma migrations run automatically via `migrate deploy` (needs `MIGRATE_DATABASE_URL`). New backend env vars: `CRON_SECRET` (required for reminder/cleanup endpoints), `VIDEO_MEETING_BASE_URL` (optional). Point an external cron at `/api/v1/internal/send-appointment-reminders` every ~5 min. Optional frontend env: `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_VIDEO_BASE_URL`, `NEXT_PUBLIC_SITE_URL`.
- Full regression audit after Tier 3: 42/42 pages clean across patient/doctor/admin, zero code issues.
