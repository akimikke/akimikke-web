-- sql/001_init.sql
BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  service_key text NOT NULL,
  code text NOT NULL,

  name text NOT NULL,
  email text,
  phone_number text,

  vacant text,
  vacant_detail text,
  vacant_updated_at timestamptz,

  prefecture text,
  region text,
  address text,

  summary text,
  transit text,
  cost text,
  appeal text,

  official_site_url text,

  images jsonb,
  attributes jsonb,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE(service_key, code)
);

-- 検索用インデックス
CREATE INDEX IF NOT EXISTS idx_facilities_service ON facilities(service_key);
CREATE INDEX IF NOT EXISTS idx_facilities_pref ON facilities(prefecture);
CREATE INDEX IF NOT EXISTS idx_facilities_updated ON facilities(updated_at DESC);

-- updated_at 自動更新
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_facilities_updated_at ON facilities;
CREATE TRIGGER trg_facilities_updated_at
BEFORE UPDATE ON facilities
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;