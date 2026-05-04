# Supabase Setup — Sponsors & Well-Wishers

This folder contains everything you need to get the landing page wired to
your Supabase project.

Project URL used by the frontend (already configured in
`/app/frontend/.env`):

```
REACT_APP_SUPABASE_URL=https://ksqdzsgjwixyugddkcfu.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_hZlwzANz7wjaDt4LpwLKog_EwTt_WRy
```

## 1. Create the `sponsors` table

Open **Supabase Dashboard → SQL Editor → New query**, paste the contents of
[`schema.sql`](./schema.sql), and run. This creates:

- `public.sponsors` with every column the frontend expects
- Indexes for the common filters (`status + is_featured + sort_order`, `tag`, `type`)
- **Row Level Security** enabled
- A `select` policy for `anon` + `authenticated` that only exposes rows
  with `status = 'publish'`

It is safe to re-run.

## 2. Seed the data

Open a new SQL query, paste [`seed.sql`](./seed.sql) and run. This loads:

- **8 curated featured sponsors** (shown on the homepage `SponsorsSection`)
- **50+ directory entries** (shown on `/sponsors`)

All rows are published (`status = 'publish'`). Featured entries use
`is_featured = true` and small `sort_order` values (10, 20, 30, ...).

Re-running the seed wipes and reinserts, so it is always idempotent.

## 3. Upload the souvenir PDF (optional but recommended)

The **“View in Souvenir”** button is only rendered when a row has **both**
`pdf_url` **and** `pdf_page` set. To enable it:

1. In Supabase Dashboard → **Storage** → create a **public** bucket called
   `souvenir`.
2. Upload the souvenir PDF (e.g. `sabha-2026.pdf`).
3. Click the file → copy the public URL. It will look like:

   `https://ksqdzsgjwixyugddkcfu.supabase.co/storage/v1/object/public/souvenir/sabha-2026.pdf`

4. Back in SQL Editor, run (with the real URL):

   ```sql
   UPDATE public.sponsors
     SET pdf_url = 'https://ksqdzsgjwixyugddkcfu.supabase.co/storage/v1/object/public/souvenir/sabha-2026.pdf'
     WHERE pdf_page IS NOT NULL;
   ```

The frontend already builds the deep-link as
`/pdfjs/web/viewer.html?file=<pdf_url>#page=<pdf_page>`, which jumps straight
to the sponsor’s souvenir page in PDF.js.

## 4. Verify RLS works

From a terminal (the anon key is public, this is expected):

```bash
curl "https://ksqdzsgjwixyugddkcfu.supabase.co/rest/v1/sponsors?select=display_name,tag,pdf_page&is_featured=eq.true&limit=3" \
  -H "apikey: sb_publishable_hZlwzANz7wjaDt4LpwLKog_EwTt_WRy"
```

You should see only **published** sponsor rows. Draft/archived rows should
be invisible.
