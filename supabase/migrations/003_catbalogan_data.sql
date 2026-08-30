-- Replace generic seed data with Catbalogan City, Samar data
DELETE FROM teams  WHERE city = 'Austin';
DELETE FROM venues WHERE city = 'Austin';
DELETE FROM leagues WHERE city = 'Austin';

-- Remove generic sports and replace with Philippines-popular sports
DELETE FROM sports WHERE slug IN ('soccer','basketball','baseball','tennis','swimming');

INSERT INTO sports (name, slug, description, icon) VALUES
  ('Basketball',   'basketball',    'The most popular sport in the Philippines.',                  '🏀'),
  ('Volleyball',   'volleyball',    'Popular in schools, communities, and beaches.',               '🏐'),
  ('Boxing',       'boxing',        'Philippines is world-renowned for boxing champions.',         '🥊'),
  ('Football',     'football',      'Growing fast across Samar and Eastern Visayas.',              '⚽'),
  ('Badminton',    'badminton',     'Fast-paced racket sport played in gyms and courts.',          '🏸'),
  ('Sepak Takraw', 'sepak-takraw',  'Traditional Southeast Asian kick volleyball.',                '🦵'),
  ('Swimming',     'swimming',      'Pool and open-water competitive swimming.',                   '🏊'),
  ('Arnis',        'arnis',         'Philippine national sport and martial art.',                  '⚔️'),
  ('Billiards',    'billiards',     'Widely played in every barangay in Catbalogan.',              '🎱')
ON CONFLICT (slug) DO NOTHING;

-- Leagues in Catbalogan City
INSERT INTO leagues (name, slug, description, sport_id, city, state, website)
SELECT
  'Catbalogan City Basketball League',
  'catbalogan-city-basketball-league',
  'Annual inter-barangay and corporate basketball tournament organized by the City Sports Office.',
  id, 'Catbalogan City', 'Samar', NULL
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO leagues (name, slug, description, sport_id, city, state)
SELECT
  'Samar Volleyball Federation League',
  'samar-volleyball-federation-league',
  'Provincial volleyball league open to clubs and school teams across Samar.',
  id, 'Catbalogan City', 'Samar'
FROM sports WHERE slug = 'volleyball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO leagues (name, slug, description, sport_id, city, state)
SELECT
  'Inter-Barangay Basketball Tournament',
  'inter-barangay-basketball-tournament',
  'Fiesta season basketball tournament featuring teams from all 57 barangays of Catbalogan.',
  id, 'Catbalogan City', 'Samar'
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO leagues (name, slug, description, sport_id, city, state)
SELECT
  'Eastern Visayas Football League',
  'eastern-visayas-football-league',
  'Regional football league covering Samar, Leyte, and surrounding provinces.',
  id, 'Catbalogan City', 'Samar'
FROM sports WHERE slug = 'football'
ON CONFLICT (slug) DO NOTHING;

-- Venues in Catbalogan City
INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Catbalogan City Gymnasium',
  'catbalogan-city-gymnasium',
  'The main multi-purpose indoor gymnasium of Catbalogan City, used for basketball, volleyball, and major city sports events.',
  'City Hall Compound, Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Samar State University Gymnasium',
  'samar-state-university-gymnasium',
  'Indoor gymnasium of Samar State University (SSU), hosting SCUAA games, college basketball, and volleyball matches.',
  'Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Samar National School Sports Complex',
  'samar-national-school-sports-complex',
  'Sports facilities of Samar National School, featuring an outdoor court and covered gym used for interschool events.',
  'Samar National School, Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Camp Lukban Sports Area',
  'camp-lukban-sports-area',
  'Sports facilities inside Camp General Vicente Lukban used for military and community athletic events.',
  'Barangay Maulong, Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Imelda Park Basketball Court',
  'imelda-park-basketball-court',
  'Outdoor basketball court at Imelda Park, one of the most popular recreational areas in central Catbalogan.',
  'Imelda Park, Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Saint Mary''s College Sports Center',
  'saint-marys-college-sports-center',
  'Indoor sports venue of Saint Mary''s College of Catbalogan used for volleyball, badminton, and basketball.',
  'Saint Mary''s College, Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'volleyball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, sport_id)
SELECT
  'Catbalogan Boxing Training Center',
  'catbalogan-boxing-training-center',
  'Dedicated boxing gym producing competitive boxers for regional and national competitions.',
  'Catbalogan City', 'Catbalogan City', 'Samar', NULL,
  id
FROM sports WHERE slug = 'boxing'
ON CONFLICT (slug) DO NOTHING;

-- Teams in Catbalogan City
INSERT INTO teams (name, slug, description, city, state, sport_id, league_id, website)
SELECT
  'Catbalogan Warriors',
  'catbalogan-warriors',
  'Premier basketball team of Catbalogan City competing in the Catbalogan City Basketball League.',
  'Catbalogan City', 'Samar', s.id, l.id, NULL
FROM sports s, leagues l
WHERE s.slug = 'basketball' AND l.slug = 'catbalogan-city-basketball-league'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (name, slug, description, city, state, sport_id, league_id)
SELECT
  'Samar Stormtroopers',
  'samar-stormtroopers',
  'Competitive basketball squad named after the 8th Infantry Division, representing Catbalogan in regional play.',
  'Catbalogan City', 'Samar', s.id, l.id
FROM sports s, leagues l
WHERE s.slug = 'basketball' AND l.slug = 'catbalogan-city-basketball-league'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (name, slug, description, city, state, sport_id, league_id)
SELECT
  'SSU Volleyball Spikers',
  'ssu-volleyball-spikers',
  'Samar State University volleyball team competing in SCUAA and the Samar Volleyball Federation League.',
  'Catbalogan City', 'Samar', s.id, l.id
FROM sports s, leagues l
WHERE s.slug = 'volleyball' AND l.slug = 'samar-volleyball-federation-league'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (name, slug, description, city, state, sport_id, league_id)
SELECT
  'Catbalogan FC',
  'catbalogan-fc',
  'Catbalogan City''s primary football club, competing in the Eastern Visayas Football League.',
  'Catbalogan City', 'Samar', s.id, l.id
FROM sports s, leagues l
WHERE s.slug = 'football' AND l.slug = 'eastern-visayas-football-league'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (name, slug, description, city, state, sport_id)
SELECT
  'Samar Boxing Club',
  'samar-boxing-club',
  'Grassroots boxing development club training youth and amateur boxers in Catbalogan City.',
  'Catbalogan City', 'Samar', id
FROM sports WHERE slug = 'boxing'
ON CONFLICT (slug) DO NOTHING;
