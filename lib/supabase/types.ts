// TypeScript types for your Supabase database schemas
// Update these types to match your actual database schema

export interface Profile {
  id: string;
  slug: string;
  name: string;
  avatar_url?: string;
  about?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  has_epipen: boolean;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface Allergen {
  id: string;
  user_id: string;
  name: string;
  emoji_code: string;
  severity: 'severe' | 'moderate' | 'mild';
  notes?: string;
  created_at: string;
}

export interface InfoCard {
  id: string;
  user_id: string;
  title: string;
  icon_name: string;
  description: string;
  content?: string;
  order: number;
  is_expanded: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserWebProfile {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  about_me?: string;
  privacy_type: string;
  profile_password?: string;
  display_emergency_contact: boolean;
  display_epipen: boolean;
  is_deleted: boolean;
}

export interface UserWebProfileUrl {
  id: string;
  created_at: string;
  user_web_profile_id: string;
  slug: string;
  user_id: string;
}

export interface UserWebProfileSelectedCard {
  id: string;
  created_at: string;
  user_web_profiles_id: string;
  selected_card_id: string;
  selected_subitems: any; // JSONB type
  user_id: string;
  is_deleted: boolean;
}

// Example database structure:
// You can adjust these based on your actual Supabase schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      allergens: {
        Row: Allergen;
        Insert: Omit<Allergen, 'id' | 'created_at'>;
        Update: Partial<Omit<Allergen, 'id' | 'created_at'>>;
      };
      info_cards: {
        Row: InfoCard;
        Insert: Omit<InfoCard, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<InfoCard, 'id' | 'created_at'>>;
      };
    };
  };
  web_profiles: {
    Tables: {
      user_web_profiles: {
        Row: UserWebProfile;
        Insert: Omit<UserWebProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserWebProfile, 'id' | 'created_at'>>;
      };
      user_web_profile_urls: {
        Row: UserWebProfileUrl;
        Insert: Omit<UserWebProfileUrl, 'id' | 'created_at'>;
        Update: Partial<Omit<UserWebProfileUrl, 'id' | 'created_at'>>;
      };
    };
  };
}
