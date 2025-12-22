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

// Allergies schema types
export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export interface UserAllergen {
  id: string;
  created_at: string;
  updated_at: string;
  severity: SeverityLevel;
  user_id: string;
  allergen: string;
  twemoji: string;
}

export interface Symptom {
  id: string;
  created_at: string;
  display_name: string;
  severity: SeverityLevel;
  symptom_key: string;
}

export interface UserReactionProfile {
  id: string;
  created_at: string;
  user_id: string;
  has_reactions: boolean;
  has_anaphylaxis: boolean;
  first_symptom: string | null;
  reaction_speed: string | null;
  updated_at: string | null;
}

export interface UserReactionSymptom {
  id: string;
  created_at: string;
  user_reaction_profile_id: string;
  symptom_id: string | null;
  custom_symptom: string | null;
  is_custom: boolean;
  user_id: string;
  custom_symptom_severity: SeverityLevel | null;
}

// Merged type for user reaction symptoms with symptom details
export interface UserReactionSymptomWithDetails extends UserReactionSymptom {
  symptom?: Symptom | null;
}

export interface SafetyLevel {
  id: string;
  created_at: string;
  name: string;
}

export interface UserSafetyLevel {
  id: string;
  created_at: string;
  updated_at: string;
  safety_level_id: string;
  is_custom: boolean;
  user_id: string;
}

export interface SafetyRule {
  id: string;
  created_at: string;
  safety_level_id: string;
  rule_key: string;
  rule_text: string;
  sort_order: number;
  icon_type: string;
}

export interface UserSafetyRule {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_safety_level_id: string;
  sort_order: number;
  rule_text: string;
  rule_key: string;
  is_deleted: boolean;
  icon_type: string;
}

// Merged type for user safety levels with safety level details
export interface UserSafetyLevelWithDetails extends UserSafetyLevel {
  safety_level?: SafetyLevel | null;
}

// Merged type for user safety rules with safety rule details
export interface UserSafetyRuleWithDetails extends UserSafetyRule {
  safety_rule?: SafetyRule | null;
}

// Epipen schema types
export type EpipenCarryOptions = 'yes-carry' | 'yes-no-yet' | 'no-should-get' | 'no-dont-need';
export type EpipenInstructionType = 'our-instructions' | 'add-my-own';
export type RuleIconType = 'check' | 'cross';

export interface EpipenInstruction {
  id: string;
  created_at: string;
  instruction_key: string;
  instruction_text: string;
  icon_type: RuleIconType;
  sort_order: number;
}

export interface UserEpipenCard {
  id: string;
  created_at: string;
  updated_at: string;
  card_id: string;
  user_id: string;
  carries_epipen: EpipenCarryOptions;
  brand_type: string | null;
  custom_brand: string | null;
  dosage: string | null;
  primary_location: string | null;
  custom_primary_location: string | null;
  primary_photo_url: string | null;
  primary_expiration_date: string | null;
  secondary_location: string | null;
  custom_secondary_location: string | null;
  secondary_photo_url: string | null;
  secondary_expiration_date: string | null;
  reminder_options: any; // JSONB
  instruction_type: EpipenInstructionType;
}

export interface UserEpipenInstruction {
  id: string;
  created_at: string;
  user_id: string;
  instruction_key: string;
  instruction_text: string;
  icon_type: RuleIconType;
  sort_order: number;
  is_deleted: boolean;
}

// Merged type for user epipen instructions with default instruction details
export interface UserEpipenInstructionWithDetails extends UserEpipenInstruction {
  epipen_instruction?: EpipenInstruction | null;
}

// Emergency schema types
export interface UserEmergencyCard {
  id: string;
  created_at: string;
  updated_at: string;
  card_id: string;
  user_id: string;
  full_legal_name: string;
  blood_type: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  date_of_birth: string | null;
}

export interface UserEmergencyCardContact {
  id: string;
  created_at: string;
  card_id: string;
  user_id: string;
  full_name: string;
  relationship: string;
  phone_number: string | null;
  is_mobile: boolean;
  email: string | null;
  priority: number;
}

export interface UserEmergencyCardDoctor {
  id: string;
  created_at: string;
  card_id: string;
  user_id: string;
  doctor_type: string;
  full_name: string;
  practice_name: string | null;
  phone_number: string | null;
}

export interface UserEmergencyCardHospital {
  id: string;
  created_at: string;
  card_id: string;
  user_id: string;
  name: string;
  address: string | null;
  phone_number: string | null;
  priority: number;
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
  allergies: {
    Tables: {
      user_allergens: {
        Row: UserAllergen;
        Insert: Omit<UserAllergen, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserAllergen, 'id' | 'created_at'>>;
      };
      symptoms: {
        Row: Symptom;
        Insert: Omit<Symptom, 'id' | 'created_at'>;
        Update: Partial<Omit<Symptom, 'id' | 'created_at'>>;
      };
      user_reaction_profiles: {
        Row: UserReactionProfile;
        Insert: Omit<UserReactionProfile, 'id' | 'created_at'>;
        Update: Partial<Omit<UserReactionProfile, 'id' | 'created_at'>>;
      };
      user_reaction_symptoms: {
        Row: UserReactionSymptom;
        Insert: Omit<UserReactionSymptom, 'id' | 'created_at'>;
        Update: Partial<Omit<UserReactionSymptom, 'id' | 'created_at'>>;
      };
      safety_levels: {
        Row: SafetyLevel;
        Insert: Omit<SafetyLevel, 'id' | 'created_at'>;
        Update: Partial<Omit<SafetyLevel, 'id' | 'created_at'>>;
      };
      user_safety_levels: {
        Row: UserSafetyLevel;
        Insert: Omit<UserSafetyLevel, 'id' | 'created_at'>;
        Update: Partial<Omit<UserSafetyLevel, 'id' | 'created_at'>>;
      };
      safety_rules: {
        Row: SafetyRule;
        Insert: Omit<SafetyRule, 'id' | 'created_at'>;
        Update: Partial<Omit<SafetyRule, 'id' | 'created_at'>>;
      };
      user_safety_rules: {
        Row: UserSafetyRule;
        Insert: Omit<UserSafetyRule, 'id' | 'created_at'>;
        Update: Partial<Omit<UserSafetyRule, 'id' | 'created_at'>>;
      };
    };
  };
  emergency: {
    Tables: {
      user_emergency_cards: {
        Row: UserEmergencyCard;
        Insert: Omit<UserEmergencyCard, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserEmergencyCard, 'id' | 'created_at'>>;
      };
      user_emergency_card_contacts: {
        Row: UserEmergencyCardContact;
        Insert: Omit<UserEmergencyCardContact, 'id' | 'created_at'>;
        Update: Partial<Omit<UserEmergencyCardContact, 'id' | 'created_at'>>;
      };
      user_emergency_card_doctors: {
        Row: UserEmergencyCardDoctor;
        Insert: Omit<UserEmergencyCardDoctor, 'id' | 'created_at'>;
        Update: Partial<Omit<UserEmergencyCardDoctor, 'id' | 'created_at'>>;
      };
      user_emergency_card_hospitals: {
        Row: UserEmergencyCardHospital;
        Insert: Omit<UserEmergencyCardHospital, 'id' | 'created_at'>;
        Update: Partial<Omit<UserEmergencyCardHospital, 'id' | 'created_at'>>;
      };
    };
  };
  epipen: {
    Tables: {
      user_epipen_cards: {
        Row: UserEpipenCard;
        Insert: Omit<UserEpipenCard, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserEpipenCard, 'id' | 'created_at'>>;
      };
      epipen_instructions: {
        Row: EpipenInstruction;
        Insert: Omit<EpipenInstruction, 'id' | 'created_at'>;
        Update: Partial<Omit<EpipenInstruction, 'id' | 'created_at'>>;
      };
      user_epipen_instructions: {
        Row: UserEpipenInstruction;
        Insert: Omit<UserEpipenInstruction, 'id' | 'created_at'>;
        Update: Partial<Omit<UserEpipenInstruction, 'id' | 'created_at'>>;
      };
    };
  };
}
