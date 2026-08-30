-- Sports categories
CREATE TABLE IF NOT EXISTS sports (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  icon        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leagues (defined before teams so teams can reference it)
CREATE TABLE IF NOT EXISTS leagues (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  sport_id    UUID REFERENCES sports(id) ON DELETE SET NULL,
  city        TEXT,
  state       TEXT,
  website     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Venues
CREATE TABLE IF NOT EXISTS venues (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  address     TEXT,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  zip         TEXT,
  lat         DECIMAL(9, 6),
  lng         DECIMAL(9, 6),
  phone       TEXT,
  website     TEXT,
  sport_id    UUID REFERENCES sports(id) ON DELETE SET NULL,
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Teams
CREATE TABLE IF NOT EXISTS teams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  city          TEXT NOT NULL,
  state         TEXT NOT NULL,
  sport_id      UUID REFERENCES sports(id) ON DELETE SET NULL,
  league_id     UUID REFERENCES leagues(id) ON DELETE SET NULL,
  image_url     TEXT,
  website       TEXT,
  contact_email TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for slug lookups and foreign key joins
CREATE INDEX IF NOT EXISTS idx_sports_slug       ON sports(slug);
CREATE INDEX IF NOT EXISTS idx_leagues_slug      ON leagues(slug);
CREATE INDEX IF NOT EXISTS idx_leagues_sport_id  ON leagues(sport_id);
CREATE INDEX IF NOT EXISTS idx_venues_slug       ON venues(slug);
CREATE INDEX IF NOT EXISTS idx_venues_sport_id   ON venues(sport_id);
CREATE INDEX IF NOT EXISTS idx_teams_slug        ON teams(slug);
CREATE INDEX IF NOT EXISTS idx_teams_sport_id    ON teams(sport_id);
CREATE INDEX IF NOT EXISTS idx_teams_league_id   ON teams(league_id);

-- Row Level Security
ALTER TABLE sports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues  ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams   ENABLE ROW LEVEL SECURITY;

-- Public read-only policies
CREATE POLICY "public_read_sports"   ON sports   FOR SELECT USING (true);
CREATE POLICY "public_read_leagues"  ON leagues   FOR SELECT USING (true);
CREATE POLICY "public_read_venues"   ON venues    FOR SELECT USING (true);
CREATE POLICY "public_read_teams"    ON teams     FOR SELECT USING (true);
