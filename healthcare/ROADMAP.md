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

- [ ] Doctor availability indicator on doctor cards ("Available Today" / next open slot) using existing schedule data
- [ ] Downloadable/printable prescription (PDF) for patients — real practical need, prescriptions currently only viewable on-screen
- [ ] Real notification system — `NotificationDropdown` currently always shows an empty list on purpose (no fake data), but there's no backend Notification model or triggers (appointment confirmed, prescription ready, appointment reminder, etc.)
- [ ] Trust badges — BMDC registration number and "Verified Doctor" badge visible on doctor cards/profile, not just buried in admin data
- [ ] Emergency quick-contact floating button, sitewide (one-tap call), distinct from the header phone number

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
