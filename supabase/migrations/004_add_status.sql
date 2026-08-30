-- Add status to all listing tables
ALTER TABLE sports  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE venues  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE teams   ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE leagues ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';

-- Index for fast filtering by status
CREATE INDEX IF NOT EXISTS idx_venues_status  ON venues(status);
CREATE INDEX IF NOT EXISTS idx_teams_status   ON teams(status);
CREATE INDEX IF NOT EXISTS idx_leagues_status ON leagues(status);
