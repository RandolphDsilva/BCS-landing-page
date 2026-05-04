# Bombay Catholic Sabha — Sponsors & Well-Wishers

## Original problem statement
Build a modern, responsive React landing-page section for the BCS website
using Supabase as the backend. Section: Sponsors & Well-Wishers. Each card
shows contact details and deep-links to the sponsor's page in the Sabha Day
2026 souvenir PDF via PDF.js (`#page=<n>`). Premium, warm, community-focused
aesthetic — no generic SaaS gradients. 4/2/1 responsive grid.

## Personas
- **Visitor / well-wisher** — discovers supporters, clicks to call / WhatsApp / email / visit website, or opens the original souvenir page.
- **Sabha committee / content editor** — maintains sponsor rows in Supabase (via dashboard today; future CMS).
- **Sponsor** — sees themselves represented on the site with a link to their souvenir page.

## Architecture
- **Frontend**: React 18 (CRA), React Router v6, Tailwind CSS, Lucide icons, `@supabase/supabase-js` v2. Fonts: Fraunces (heading) + Manrope (body).
- **Backend**: minimal FastAPI (`/api/health`) — required only by supervisor. Data flows **directly** from the browser to Supabase.
- **Database**: Supabase (Postgres) — single `public.sponsors` table with RLS enabled; anonymous users can read only rows where `status = 'publish'`.
- **PDF viewer**: Mozilla PDF.js 4.7.76 bundled at `/pdfjs/web/viewer.html`. The `validateFileURL` check is patched to allow cross-origin PDFs served from Supabase Storage.

## Core requirements (static)
- Featured grid on `/` — 8 cards, `status='publish' AND is_featured=true`, sort `sort_order ASC`.
- Full directory on `/sponsors` with search and tag filter chips.
- Action buttons: Call (`tel:`), WhatsApp (`https://wa.me/<digits>`), Email (`mailto:`), Website (new tab), View in Souvenir (`/pdfjs/web/viewer.html?file=<encoded>#page=<n>`).
- Souvenir page button renders only when both `pdf_url` and `pdf_page` are set; page badge renders whenever `pdf_page` is set.
- Graceful empty states; equal-height cards; 2–3 line clamp on details; accessible link labels.

## Implemented so far (2026-01-04)
- React app scaffolded from scratch in `/app/frontend` (CRA + Tailwind + Router + Supabase client + Lucide).
- Minimal FastAPI stub at `/app/backend/server.py`.
- Supabase schema + seed in `/app/supabase/` (`schema.sql`, `seed.sql`, `all_in_one.sql`). 8 hand-curated featured rows + 53 OCR-cleaned directory rows = 61 total.
- PDF.js bundled and patched at `/app/frontend/public/pdfjs/`.
- Components: `Navbar`, `Hero`, `SponsorsSection`, `SponsorCard`, `SponsorActions`, `FilterChips`, `Footer`. Pages: `Home` (`/`), `SponsorsDirectory` (`/sponsors`).
- End-to-end tested (iteration_1.json): 16/16 acceptance criteria pass.
- Polish fixes applied post-test:
  - `cleanPhone()` now strips leading trunk 0 on 11-digit Indian landlines (e.g. `02224146320` → `912224146320`).
  - Filtered empty state on home now shows tag-aware copy.

## Prioritised backlog
### P1
- Admin CMS view to add / edit / feature sponsors (currently edited via Supabase dashboard).
- Supabase Storage bucket `logos/` + per-row `logo_url` upload flow so the monogram fallback is replaced by real logos for sponsors who upload them.
- Lazy-load PDF.js bundle only when a sponsor card is clicked (reduce initial asset weight).

### P2
- Individual sponsor detail page `/sponsors/:slug` with SEO-friendly meta tags.
- Sitemap + OG images for the homepage and directory.
- Shareable per-sponsor short link that opens the souvenir PDF to the right page.
- Optional type-based filter in the directory (`Religious/Parish`, `Education`, etc.).

### P3
- Multilingual support (English / Marathi).
- Sponsor "claim your listing" flow (request edit via email).

## Next tasks (when the user is ready)
1. Upload real logos and run `UPDATE public.sponsors SET logo_url = '…' WHERE slug = '…';`
2. Correct any OCR-derived names/descriptions that look off after review.
3. Decide on the CMS strategy (Supabase dashboard vs. a lightweight admin route).
