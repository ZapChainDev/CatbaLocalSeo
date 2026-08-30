-- Update existing venues with facebook_url and richer descriptions
UPDATE venues SET
  facebook_url = 'https://www.facebook.com/CatbaloganCityGymnasium',
  description  = 'The main multi-purpose indoor gym of Catbalogan City. Home of city-wide basketball tournaments, volleyball championships, and major sports events. Open daily for community use.'
WHERE slug = 'catbalogan-city-gymnasium';

UPDATE venues SET
  facebook_url = 'https://www.facebook.com/SSUCatbalogan',
  description  = 'Official gym of Samar State University. Hosts SCUAA competitions, college basketball, and intramurals. Open to SSU students and community partners.'
WHERE slug = 'samar-state-university-gymnasium';

UPDATE venues SET
  facebook_url = 'https://www.facebook.com/CatbaloganBoxingGym',
  phone        = '+63 55 123 4567',
  description  = 'Dedicated boxing gym producing competitive amateur and professional boxers for regional and national competitions. Training sessions available for all skill levels.'
WHERE slug = 'catbalogan-boxing-training-center';

UPDATE venues SET
  facebook_url = 'https://www.facebook.com/ImelDaParkCatbalogan',
  description  = 'Popular outdoor basketball court at Imelda Park in central Catbalogan. Free to use, open from early morning. Frequently hosts barangay pickup games and community tournaments.'
WHERE slug = 'imelda-park-basketball-court';

UPDATE venues SET
  facebook_url = 'https://www.facebook.com/SaintMarysCatbalogan',
  description  = 'Indoor sports center of Saint Mary''s College of Catbalogan offering volleyball, badminton, and basketball facilities. Hosts inter-school events and private bookings.'
WHERE slug = 'saint-marys-college-sports-center';

-- Add new sports business listings
INSERT INTO venues (name, slug, description, address, city, state, phone, website, facebook_url, sport_id, status)
SELECT
  'FitZone Catbalogan Gym',
  'fitzone-catbalogan-gym',
  'Modern fitness gym and strength training facility in downtown Catbalogan. Equipped with free weights, machines, cardio equipment, and a dedicated functional training area. Day pass and monthly memberships available.',
  'Brgy. 6, Catbalogan City',
  'Catbalogan City', 'Samar',
  '+63 917 123 4567',
  NULL,
  'https://www.facebook.com/FitZoneCatbalogan',
  id,
  'published'
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, website, facebook_url, sport_id, status)
SELECT
  'Smash Point Badminton Center',
  'smash-point-badminton-center',
  'Dedicated badminton court facility with 4 synthetic courts, proper lighting, and equipment rental. Accepts walk-ins and court reservations. Open 6 AM – 10 PM daily.',
  'Brgy. Canlapwas, Catbalogan City',
  'Catbalogan City', 'Samar',
  '+63 906 987 6543',
  NULL,
  'https://www.facebook.com/SmashPointCatbalogan',
  id,
  'published'
FROM sports WHERE slug = 'badminton'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, website, facebook_url, sport_id, status)
SELECT
  'Catbalogan Swim Academy',
  'catbalogan-swim-academy',
  'Swimming pool and coaching facility offering learn-to-swim programs, competitive training, and lap swimming sessions. Classes available for kids and adults. Pool length: 25 meters.',
  'Brgy. Mercedes, Catbalogan City',
  'Catbalogan City', 'Samar',
  '+63 928 555 7890',
  NULL,
  'https://www.facebook.com/CatbaloganSwimAcademy',
  id,
  'published'
FROM sports WHERE slug = 'swimming'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, website, facebook_url, sport_id, status)
SELECT
  'Warriors Basketball Court',
  'warriors-basketball-court',
  'Privately-owned covered basketball court available for rental. Ideal for team training, league games, and events. Capacity 200 spectators. Includes locker rooms and snack bar.',
  'Brgy. Maulong, Catbalogan City',
  'Catbalogan City', 'Samar',
  '+63 912 345 6789',
  NULL,
  'https://www.facebook.com/WarriorsCourtCatbalogan',
  id,
  'published'
FROM sports WHERE slug = 'basketball'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO venues (name, slug, description, address, city, state, phone, website, facebook_url, sport_id, status)
SELECT
  'Samar Arnis Training Center',
  'samar-arnis-training-center',
  'Official training facility for Arnis — the Philippine national sport and martial art. Offers beginner to advanced classes, belt certification, and competitive sparring. All ages welcome.',
  'Catbalogan City', 'Catbalogan City', 'Samar',
  '+63 935 678 9012',
  NULL,
  'https://www.facebook.com/SamarArnisCenter',
  id,
  'published'
FROM sports WHERE slug = 'arnis'
ON CONFLICT (slug) DO NOTHING;
