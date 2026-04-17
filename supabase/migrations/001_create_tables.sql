-- Migration: create core tables for biz-license-index
-- Run this in Supabase SQL editor

create table if not exists states (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  abbreviation text not null,
  general_license_required boolean,
  general_license_url text,
  secretary_of_state_url text,
  updated_at timestamp with time zone default now()
);

create table if not exists business_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text,
  description text,
  federal_regulated boolean default false
);

create table if not exists license_pages (
  id uuid primary key default gen_random_uuid(),
  state_id uuid references states(id) on delete cascade,
  business_type_id uuid references business_types(id) on delete cascade,
  slug text not null unique,
  license_required boolean,
  licensing_body text,
  licensing_body_url text,
  requirements_summary text,
  requirements_list jsonb,
  application_fee text,
  renewal_period text,
  renewal_fee text,
  exam_required boolean,
  exam_provider text,
  insurance_required boolean,
  bond_required boolean,
  bond_amount text,
  processing_time text,
  official_source_url text,
  meta_title text,
  meta_description text,
  schema_json text,
  faq_json jsonb,
  status text default 'draft',
  data_verified_at timestamp with time zone,
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index if not exists idx_license_pages_state_id on license_pages(state_id);
create index if not exists idx_license_pages_business_type_id on license_pages(business_type_id);
create index if not exists idx_license_pages_status on license_pages(status);
create index if not exists idx_license_pages_slug on license_pages(slug);
create index if not exists idx_states_slug on states(slug);
create index if not exists idx_business_types_slug on business_types(slug);
