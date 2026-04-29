-- ─────────────────────────────────────────────────────────────────────────────
-- KapeX Portal — Holdings schema
-- Paste into: app.supabase.com > your project > SQL Editor > New query
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists holdings (
  id            uuid primary key default gen_random_uuid(),
  name          text    not null,
  asset_class   text    not null,  -- groups the donut chart
  sector        text    not null,  -- groups the bar chart
  allocation_pct numeric(5,2) not null,
  vintage_year  integer,
  status        text    not null default 'Active'
                check (status in ('Active','Realized','Pending')),
  notes         text,
  created_at    timestamptz not null default now()
);

-- Row-level security: only authenticated Supabase sessions can read.
-- (Clerk handles the portal gate; this is a backstop.)
alter table holdings enable row level security;

create policy "Authenticated users can read holdings"
  on holdings for select
  using (true);   -- tighten this once you add Supabase Auth integration

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed data — replace with your real holdings or adjust percentages as needed.
-- Allocations are illustrative; they should sum to 100.
-- ─────────────────────────────────────────────────────────────────────────────

insert into holdings (name, asset_class, sector, allocation_pct, vintage_year, status) values
  ('Industrial Park Portfolio',    'Real Estate',    'Industrial',         28.5, 2019, 'Active'),
  ('Mixed-Use Development Fund',   'Real Estate',    'Real Estate',        12.0, 2021, 'Active'),
  ('Growth Equity Fund III',       'Private Equity', 'Technology',         18.5, 2020, 'Active'),
  ('Healthcare Buyout Fund',       'Private Equity', 'Healthcare',         11.0, 2022, 'Active'),
  ('Fintech Ventures',             'Venture Capital','Financial Services',  8.5, 2021, 'Active'),
  ('Deep Tech Fund I',             'Venture Capital','Technology',          6.5, 2023, 'Active'),
  ('Investment Grade Credit',      'Fixed Income',   'Diversified',        10.0, 2022, 'Active'),
  ('Cash & Equivalents',           'Liquid',         'Cash',                5.0, null, 'Active');
