-- Bombay Catholic Sabha — Sponsors schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL → New query).
-- Idempotent: safe to re-run.

create extension if not exists "pgcrypto";

create table if not exists public.sponsors (
  id              uuid primary key default gen_random_uuid(),
  display_name    text not null,
  slug            text unique,
  tag             text,              -- Best Compliments | Best Wishes | Commercial Ad
  type            text,              -- Education | Finance/Retail | ...
  contact_person  text,
  business_name   text,
  phone_1         text,
  phone_2         text,
  email           text,
  website         text,
  address         text,
  short_details   text,
  notes           text,
  pdf_page        integer,
  pdf_url         text,
  logo_url        text,
  is_featured     boolean not null default false,
  sort_order      integer not null default 1000,
  status          text not null default 'publish',   -- 'publish' | 'draft' | 'archived'
  created_at      timestamptz not null default now()
);

create index if not exists sponsors_status_featured_idx
  on public.sponsors (status, is_featured, sort_order);

create index if not exists sponsors_tag_idx on public.sponsors (tag);
create index if not exists sponsors_type_idx on public.sponsors (type);

-- Row Level Security
alter table public.sponsors enable row level security;

-- Public readers can see only published rows
drop policy if exists "sponsors_public_read" on public.sponsors;
create policy "sponsors_public_read"
  on public.sponsors
  for select
  to anon, authenticated
  using (status = 'publish');
