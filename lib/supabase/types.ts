export interface Sport {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  status: string;
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
  facebook_url: string | null;
  sport_id: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
}

export interface VenueWithSport extends Venue {
  sports: Pick<Sport, "id" | "name" | "slug"> | null;
}
