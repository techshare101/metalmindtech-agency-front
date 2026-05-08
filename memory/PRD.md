# MetalMindTech — Agency Landing Page (PRD)

## Original Problem Statement
Build a professional, high-end AI Agency landing page for MetalMindTech at www.metalmindtech.com.
Style: Elite, dark theme, sophisticated, results-focused (Hormozi/Bezos frameworks).
Key content: $997 Revenue Extraction Audit · 72-Hour Revenue Recovery Guarantee · Undeniable Outcome promise.
Target audience: CEOs and Founders. Must include navigation link to "The Forge" at ark.metalmindtech.com.

## User-confirmed direction
- Subdomain ark.metalmindtech.com → existing Forge (https://v0-metal-mind-tech.vercel.app/).
- Root must read as "Luxurious Agency" with outcome-driven copy.
- High-end, executive-feeling navigation that visually distinguishes the Forge link.

## Architecture
- Backend: FastAPI + MongoDB (motor). Routes prefixed `/api`. Pydantic v2 models with UUIDs and ISO timestamps. `_id` excluded from all reads.
- Frontend: React 19 + react-router + TailwindCSS + shadcn/ui + sonner toaster.
- Fonts: Cabinet Grotesk (Fontshare) display + IBM Plex Sans/Mono (Google) body/mono.
- Theme: Obsidian (#0A0A0A / #0E0E0E) with molten copper accent (#CC5500). Sharp radii, brushed-steel & grain micro-textures, subtle copper glows. Per `/app/design_guidelines.json`.
- Single-route SPA at `/`. Lead form is a global Dialog opened via `LeadFormProvider` context.

## Personas
- Primary: Founders/CEOs of $5M–$250M companies who have already paid for AI advice that didn't deploy.
- Secondary: PE-backed operators looking for executable AI deployment, not theory.

## Core Requirements (static)
- $997 Revenue Extraction Audit prominently offered with itemized value stack.
- 72-Hour Revenue Recovery Guarantee with risk reversal language.
- Undeniable Outcome positioning throughout copy.
- Forge link in nav, hero, final CTA, footer — all `target=_blank rel=noopener` to https://ark.metalmindtech.com.
- Lead capture (name, email, company, role, revenue band, notes, source) → MongoDB `leads` collection.

## What's been implemented (Day 1 — December 2025)
- Backend `POST /api/leads`, `GET /api/leads`, `GET /api/`, plus original `/api/status` retained.
- Lead Pydantic model with email validation, optional fields, ISO timestamps.
- Frontend sections: Navigation (sticky glass), Hero (dual CTA + proof index card), SocialProof (logo marquee + 4 outcome cards), AuditOffer (itemized value stack, $997 anchor), Framework (4-step Undeniable Outcome Method), Guarantee (72-Hour stamp w/ pillars), Founder Letter (Bezos Day-1 asymmetric layout), FAQ (shadcn Accordion, 6 items), FinalCTA (slot index), Footer (network/engagement columns).
- Lead form dialog (shadcn Dialog) with revenue-band Select, success state, sonner toasts.
- Mobile nav drawer with all CTAs replicated.
- All interactive elements have unique kebab-case `data-testid`.
- Tests: 8 pytest backend tests (100% pass) + frontend e2e via testing_agent_v3 (100% pass).

## Backlog (P0 → P2)

### P0 — high-leverage next moves
- Hook lead form to email/Slack notification (Resend or SendGrid) so founders get a real reply within minutes.
- Add an admin lead-export endpoint guarded by a token + simple `/admin/leads` JWT-protected dashboard view.
- Wire The Forge subdomain (ark.metalmindtech.com) DNS so external links resolve.

### P1 — conversion lift
- "Revenue Leak Diagnostic" — 6-question interactive widget powered by Emergent LLM key (Claude Sonnet) that returns a personalised diagnostic and pushes lead into MongoDB with `source=diagnostic`.
- Calendly / Cal.com inline embed in success state of lead form for instant booking.
- Case study deep-dive pages (`/case-studies/:slug`) for the four hero outcomes.

### P2 — polish
- Replace placeholder logo wordmarks with real client logos (or stylised marks under NDA).
- Add OpenGraph + Twitter card metadata, sitemap.xml, robots.txt.
- Cookie/consent banner for EU traffic.
- Light analytics dashboard reading `leads` collection (revenue band distribution, source mix, weekly cadence).

## Run / verify
- Backend: `sudo supervisorctl restart backend`; smoke `curl $REACT_APP_BACKEND_URL/api/`.
- Frontend: hot-reload (no restart); root URL serves the landing page.
- Tests: `cd /app/backend && python -m pytest tests/ -v`.
