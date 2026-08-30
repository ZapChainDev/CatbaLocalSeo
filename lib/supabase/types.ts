export interface Sport {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string;
  state: string;
  zip: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  website: string | null;
  sport_id: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city: string;
  state: string;
  sport_id: string | null;
  league_id: string | null;
  image_url: string | null;
  website: string | null;
  contact_email: string | null;
  created_at: string;
}

export interface League {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sport_id: string | null;
  city: string | null;
  state: string | null;
  website: string | null;
  created_at: string;
}

// Joined types returned by relational queries
export interface VenueWithSport extends Venue {
  sports: Pick<Sport, "id" | "name" | "slug"> | null;
}

export interface TeamWithRelations extends Team {
  sports: Pick<Sport, "id" | "name" | "slug"> | null;
  leagues: Pick<League, "id" | "name" | "slug"> | null;
}

export interface LeagueWithSport extends League {
  sports: Pick<Sport, "id" | "name" | "slug"> | null;
}
