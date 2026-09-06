create extension if not exists pgcrypto;

create table if not exists categories (
  id text primary key,
  title text not null,
  icon text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id text not null references categories(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  tags text[] not null default '{}',
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value text
);

alter table categories enable row level security;
alter table menu_items enable row level security;
alter table site_settings enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read available menu items" on menu_items for select using (is_available = true);
create policy "Authenticated manage categories" on categories for all to authenticated using (true) with check (true);
create policy "Authenticated manage menu items" on menu_items for all to authenticated using (true) with check (true);
create policy "Public read settings" on site_settings for select using (true);
create policy "Authenticated manage settings" on site_settings for all to authenticated using (true) with check (true);

insert into site_settings (key, value) values
  ('whatsapp_number', '+994552165262'),
  ('wifi_password', 'Kenan2026!'),
  ('working_hours', '09:00 - 23:00')
on conflict (key) do nothing;
