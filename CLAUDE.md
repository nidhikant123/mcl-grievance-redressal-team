# CLAUDE.md - read this first, in every session

## About us
- We are a team of 4-5 people from Mahanadi Coalfields Limited (MCL) at an
  IIM Sambalpur MDP. We are NOT programmers.
- Explain everything in plain English, in short sentences. If you must use a
  technical word, explain it in one line.
- We build ONE small web tool in phases. Only one Claude session works at a
  time. The Progress Log at the end of this file is our handover logbook.

## What we are building
- A tool with at most 3 pages: index.html (entry page), dashboard.html
  (dashboard) and at most one more page.
- Every record has location, urgency (Low / Medium / High) and status
  (Open / In progress / Resolved), plus the columns in "Our tool" below.
- All data is MADE UP. Never add real names, phone numbers, employee IDs or
  real MCL figures.

## Technical rules
1. Plain HTML, CSS and JavaScript only. Pages stay in the top folder; SQL
   files go in the database folder. No frameworks, no npm, no package.json,
   no build step.
2. Vercel publishes the site from the main branch. Use relative links only,
   e.g. href="dashboard.html".
3. Load Supabase from the jsDelivr CDN, then our settings, in this order:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script src="config.js"></script>
   Then create the client like this (do not call the variable "supabase"):
     const db = window.supabase.createClient(window.SUPABASE_URL,
                                              window.SUPABASE_PUBLISHABLE_KEY);
4. The Project URL and the publishable key live only in config.js. Never use
   or ask for a secret key, a service_role key or the database password.
5. For charts, load Chart.js from the jsDelivr CDN.
6. No login or sign-up. Anyone with the link can use the tool.
7. You may not be able to reach our database. Do NOT try to test the database
   connection. Write the code; we test it on the live website.
8. If anything fails, show a friendly message on the page that also includes
   the actual error text, so we can pass it on.
9. Every page must work well on a mobile phone: large buttons, readable text,
   no sideways scrolling. Use the same header and menu on every page.
10. Never delete config.js or CLAUDE.md.

## Database rules
- Our Data Keeper runs all SQL by pasting it into the Supabase SQL Editor.
  You cannot run SQL yourself.
- Give SQL as ONE block that runs in one go. Also save it in the database
  folder: 01-setup.sql, then 02-..., 03-... for later changes.
- One table. It must have: id uuid primary key default gen_random_uuid()
  and created_at timestamptz not null default now().
- Enable Row Level Security. Add policies that let the roles anon and
  authenticated SELECT, INSERT and UPDATE. No delete.
- Always include: grant select, insert, update on the table to anon,
  authenticated; (new Supabase projects need it, or the website gets
  "permission denied").
- Never drop a table or delete rows.
- Avoid changing the table after Phase 1. If a change is really needed, give
  one small block and explain it in one sentence.

## How to work with us
- Make one change at a time. Do not change parts that already work unless we
  ask.
- After each change, reply in 3 short bullets: what you changed and what we
  should test on the live website.
- Commit and push your work at every stopping point.

## Takeover and handover
- At the START of every session: read the Progress Log below and summarize it
  in 3 bullets (what exists, what works, what is next).
- At a "save point": add a new entry at the end of the Progress Log (phase,
  builder, what was built, what works, known problems, next step). Then
  commit and push.

## Our tool (filled in during Phase 1)
- Team: MCL Land & Revenue Department, Kaniha Area (IIM Sambalpur MDP team)
- Tool name: MCL Land & Revenue Management & Grievance Redressal System (MCL-LRMS)
- Problem: Acquired land (compensation and R&R done) is hard to locate and
  demarcate on the ground because old maps and records are unclear. This delays
  physical possession and the disposal of land grievances.
- Who records / who decides: Citizens register grievances; field officers record
  GPS verification; Land & Revenue / Grievance officers decide. The tool only
  supports decisions - it never decides ownership, title or possession.
- Table name and columns: lrms_records (one table, see database/01-setup.sql).
  record_type = 'Grievance' or 'Plot update'; location (village), urgency,
  status, khata_no, plot_no, plot_id, ref_no, stage, applicant fields,
  category, description, assigned_to, public_remarks, internal_notes, disposal,
  plot_status, details (GPS, points, photos, AI fields), history (audit trail).
- Pages: index.html = citizen portal (register + track grievance);
  dashboard.html = officer dashboard; field.html = find plot, GIS map,
  AI document analysis, field verification.
- Other files: style.css, common.js (shared code), demo-data.js (fictional
  plots), docs/ARCHITECTURE.md (full production design), docs/DEMO-SCRIPT.md.

## Progress Log (newest entry at the bottom)
- Phase 0 (starter): placeholder index.html, config.js without settings and
  this CLAUDE.md. Next: Phase 1 - the table and the entry page.
- Phase 1 (builder: Claude, 30 Sep 2026): full demo prototype of MCL-LRMS.
  Built: database/01-setup.sql (one table lrms_records, reference numbers made
  by the database, append-only audit trail, safe track_grievance() and
  submit_representation() functions); citizen portal (register with AI
  category suggestion, track with progress steps, representation after
  disposal, English/Hindi toggle); officer dashboard (demo role sign-in, KPI
  cards, charts, filters, universal search, notifications, assign / field
  verification / documents / notes / response / action taken / dispose with
  confirmation, disposal report, 6 reports as PDF or Excel, audit trail, role
  matrix); field page (Village -> Khata -> Plot search, Leaflet map with
  satellite and layers, measuring, GPS, AI OCR with Tesseract.js, sample
  old-map boundary detection with confidence, discrepancy flags, field
  verification with GPS points -> polygon and geo-stamped photos, status
  change with mandatory remarks).
  Works: the full 19-step demo flow was tested in a browser against a pretend
  database. NOT yet tested against our real Supabase.
  Known problems: officer sign-in is a DEMO role picker (no real security) and
  the table is readable with the public key - fine only because all data is
  fictional. Map boundaries are synthetic. Map-boundary AI for the sample map
  is simulated. Only file names are stored for uploads.
  Next step: Data Keeper runs database/01-setup.sql, fill in config.js, then
  test the live site using docs/DEMO-SCRIPT.md.
- Phase 1b (builder: Claude, 1 Oct 2026): fixed config.js; new classy Home
  page (title + 6 menu tiles; forms open as their own screens); officer area
  LOCKED with real Supabase logins (team asked for this, replacing rule 6
  "no login" for the officer area only). database/02-officer-login.sql: only
  logged-in users can read grievances or change records; citizens register
  via register_grievance(), track and file representations via functions.
  Works: tested in a browser against a pretend database (wrong password
  rejected; officer pages locked after sign-out). Known problems: roles are
  still picked after login (not tied to the account); no OTP yet.
  Next step: Data Keeper runs 02-officer-login.sql; create officer accounts in
  Supabase (Authentication -> Users -> Add user); test on the live site.
- Phase 1c (builder: Claude, 1 Oct 2026): space-industry style look on all
  pages (black, condensed capitals, outlined buttons; full-screen Home hero
  with contour lines). 8 fictional demo villages (Demopur, Sampleguda,
  Testpali, Mockgarh, Dummypada, Pilotnagar, Trialpur, Modelguda - all
  marked DEMO) with 22 fictional plots. Real village names were tried and
  then removed at the team's request. Works: 19-step test
  passes against a pretend database. Known problems: old test records on the
  live database may use old plot ids.
  Next step: merge, then test on the live site.
- Phase 1d (builder: Claude, 1 Oct 2026): demo villages laid out around the
  team's site point 21.079030, 85.041853 (Kaniha Area); the map is locked to
  about 1 km around the villages (no panning away, no zooming out beyond the
  site). Village positions and plots are still FICTIONAL. Next step: merge
  PR 3, run 02-officer-login.sql, create officer accounts, test live.
- Phase 1e (builder: Claude, 1 Oct 2026): at the team's request the real
  Kaniha Area village names are back: Kaniha, Telisingha, Jarada,
  Patharmunda, Gundurinali, Badagunduri, Balrampur, Adaitaprasad. Plots,
  owners, areas and village positions on the map remain FICTIONAL.
- Phase 1f (builder: Claude, 1 Oct 2026): colours changed from black to
  ocean and sky blue on all pages; coal shown as a "black diamond" emblem
  (header logo and large on the Home page, caption "Coal · The Black
  Diamond"). Works: 19-step test passes. Next step: merge, test live.
