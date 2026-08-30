-- Sample sports
INSERT INTO sports (name, slug, description, icon) VALUES
  ('Soccer',     'soccer',     'The world''s most popular sport.',          '⚽'),
  ('Basketball', 'basketball', 'Fast-paced court sport.',                   '🏀'),
  ('Baseball',   'baseball',   'America''s pastime.',                       '⚾'),
  ('Tennis',     'tennis',     'Individual and doubles racket sport.',      '🎾'),
  ('Swimming',   'swimming',   'Competitive pool and open-water swimming.', '🏊')
ON CONFLICT (slug) DO NOTHING;

-- Sample leagues
INSERT INTO leagues (name, slug, description, sport_id, city, state, website)
SELECT 'Downtown Soccer League', 'downtown-soccer-league', 'Recreational adult soccer league.', id, 'Austin', 'TX', 'https://example.com'
FROM sports WHERE slug = 'soccer'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO leagues (name, slug, description, sport_id, city, state)
SELECT 'Metro Basketball Association', 'metro-basketball-association', 'Competitive 5-on-5 league for adults.', id, 'Austin', 'TX'
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

-- Sample venues
INSERT INTO venues (name, slug, description, address, city, state, zip, phone, sport_id, image_url)
SELECT 'Riverside Soccer Complex', 'riverside-soccer-complex',
  'Six full-size turf pitches with floodlights.',
  '1200 Riverside Dr', 'Austin', 'TX', '78701', '(512) 555-0101',
  id, NULL
FROM sports WHERE slug = 'soccer'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, zip, phone, sport_id)
SELECT 'East Austin Recreation Center', 'east-austin-rec-center',
  'Indoor gymnasium with two full basketball courts.',
  '3000 E 12th St', 'Austin', 'TX', '78702', '(512) 555-0202',
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, zip, sport_id)
SELECT 'Barton Springs Tennis Club', 'barton-springs-tennis-club',
  'Eight hard courts open year-round.',
  '2201 Barton Springs Rd', 'Austin', 'TX', '78746',
  id
FROM sports WHERE slug = 'tennis'
ON CONFLICT (slug) DO NOTHING;

-- Sample teams
INSERT INTO teams (name, slug, description, city, state, sport_id, league_id, website)
SELECT 'Austin FC Amateurs', 'austin-fc-amateurs',
  'Casual Sunday league team welcoming all skill levels.',
  'Austin', 'TX', s.id, l.id, 'https://example.com'
FROM sports s, leagues l
WHERE s.slug = 'soccer' AND l.slug = 'downtown-soccer-league'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (name, slug, description, city, state, sport_id, league_id)
SELECT 'Capitol City Ballers', 'capitol-city-ballers',
  'Competitive squad with open tryouts every spring.',
  'Austin', 'TX', s.id, l.id
FROM sports s, leagues l
WHERE s.slug = 'basketball' AND l.slug = 'metro-basketball-association'
ON CONFLICT (slug) DO NOTHING;
