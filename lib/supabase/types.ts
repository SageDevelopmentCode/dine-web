export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  allergies: {
    Tables: {
      safety_levels: {
        Row: {
          created_at: string
          id: string
          name: Database["public"]["Enums"]["safety_level"] | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: Database["public"]["Enums"]["safety_level"] | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: Database["public"]["Enums"]["safety_level"] | null
        }
        Relationships: []
      }
      safety_rules: {
        Row: {
          created_at: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id: string
          rule_key: string
          rule_text: string
          safety_level_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          rule_key: string
          rule_text: string
          safety_level_id: string
          sort_order: number
        }
        Update: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          rule_key?: string
          rule_text?: string
          safety_level_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "safety_rules_safety_level_id_fkey"
            columns: ["safety_level_id"]
            isOneToOne: false
            referencedRelation: "safety_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      symptoms: {
        Row: {
          created_at: string
          display_name: string
          id: string
          severity: Database["public"]["Enums"]["severity_level"]
          symptom_key: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          severity: Database["public"]["Enums"]["severity_level"]
          symptom_key: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          severity?: Database["public"]["Enums"]["severity_level"]
          symptom_key?: string
        }
        Relationships: []
      }
      user_allergens: {
        Row: {
          allergen: string
          allergen_id: string | null
          created_at: string
          id: string
          is_custom: boolean
          severity: Database["public"]["Enums"]["severity_level"]
          twemoji: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allergen: string
          allergen_id?: string | null
          created_at?: string
          id?: string
          is_custom?: boolean
          severity?: Database["public"]["Enums"]["severity_level"]
          twemoji: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allergen?: string
          allergen_id?: string | null
          created_at?: string
          id?: string
          is_custom?: boolean
          severity?: Database["public"]["Enums"]["severity_level"]
          twemoji?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reaction_profiles: {
        Row: {
          created_at: string
          first_symptom: string | null
          has_anaphylaxis: boolean
          has_reactions: boolean
          id: string
          reaction_speed: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          first_symptom?: string | null
          has_anaphylaxis: boolean
          has_reactions: boolean
          id?: string
          reaction_speed?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          first_symptom?: string | null
          has_anaphylaxis?: boolean
          has_reactions?: boolean
          id?: string
          reaction_speed?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reaction_symptoms: {
        Row: {
          created_at: string
          custom_symptom: string | null
          custom_symptom_severity:
            | Database["public"]["Enums"]["severity_level"]
            | null
          id: string
          is_custom: boolean
          symptom_id: string | null
          user_id: string
          user_reaction_profile_id: string
        }
        Insert: {
          created_at?: string
          custom_symptom?: string | null
          custom_symptom_severity?:
            | Database["public"]["Enums"]["severity_level"]
            | null
          id?: string
          is_custom?: boolean
          symptom_id?: string | null
          user_id: string
          user_reaction_profile_id: string
        }
        Update: {
          created_at?: string
          custom_symptom?: string | null
          custom_symptom_severity?:
            | Database["public"]["Enums"]["severity_level"]
            | null
          id?: string
          is_custom?: boolean
          symptom_id?: string | null
          user_id?: string
          user_reaction_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_reaction_symptoms_symptom_id_fkey"
            columns: ["symptom_id"]
            isOneToOne: false
            referencedRelation: "symptoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_reaction_symptoms_user_reaction_profile_id_fkey"
            columns: ["user_reaction_profile_id"]
            isOneToOne: false
            referencedRelation: "user_reaction_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_requested_allergens: {
        Row: {
          created_at: string
          id: string
          is_added: boolean | null
          requested_allergen: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_added?: boolean | null
          requested_allergen: string
        }
        Update: {
          created_at?: string
          id?: string
          is_added?: boolean | null
          requested_allergen?: string
        }
        Relationships: []
      }
      user_safety_levels: {
        Row: {
          created_at: string
          id: string
          is_custom: boolean
          safety_level_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_custom?: boolean
          safety_level_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_custom?: boolean
          safety_level_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_safety_levels_safety_level_id_fkey"
            columns: ["safety_level_id"]
            isOneToOne: false
            referencedRelation: "safety_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_safety_rules: {
        Row: {
          created_at: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id: string
          is_deleted: boolean
          rule_key: string
          rule_text: string | null
          sort_order: number
          updated_at: string | null
          user_id: string
          user_safety_level_id: string
        }
        Insert: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          is_deleted?: boolean
          rule_key: string
          rule_text?: string | null
          sort_order?: number
          updated_at?: string | null
          user_id: string
          user_safety_level_id: string
        }
        Update: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          is_deleted?: boolean
          rule_key?: string
          rule_text?: string | null
          sort_order?: number
          updated_at?: string | null
          user_id?: string
          user_safety_level_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_safety_rules_user_safety_level_id_fkey"
            columns: ["user_safety_level_id"]
            isOneToOne: false
            referencedRelation: "user_safety_levels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_complete_card_data: { Args: { p_user_id: string }; Returns: Json }
      get_user_card_data: {
        Args: { p_safety_level_id: string; p_user_id: string }
        Returns: Json
      }
      save_allergen_card_changes: {
        Args: {
          p_allergen_deletions: Json
          p_allergen_upserts: Json
          p_rule_deletions: Json
          p_rule_upserts: Json
          p_safety_level_id: string
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  core: {
    Tables: {
      reports: {
        Row: {
          content_author_id: string | null
          content_author_name: string | null
          content_preview: string | null
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_user_id: string
          resolution_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          target_id: string
          target_schema: string
          target_type: string
          updated_at: string | null
        }
        Insert: {
          content_author_id?: string | null
          content_author_name?: string | null
          content_preview?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_user_id: string
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_id: string
          target_schema: string
          target_type: string
          updated_at?: string | null
        }
        Update: {
          content_author_id?: string | null
          content_author_name?: string | null
          content_preview?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_user_id?: string
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_id?: string
          target_schema?: string
          target_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_content_author_id_fkey"
            columns: ["content_author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reports_reporter_user_id_fkey"
            columns: ["reporter_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_cards: {
        Row: {
          card_type: Database["public"]["Enums"]["card_type"]
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_type: Database["public"]["Enums"]["card_type"]
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_type?: Database["public"]["Enums"]["card_type"]
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          can_login: boolean
          created_at: string
          family_id: string | null
          first_name: string | null
          last_name: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_type: Database["public"]["Enums"]["account_type"]
          can_login?: boolean
          created_at?: string
          family_id?: string | null
          first_name?: string | null
          last_name?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          can_login?: boolean
          created_at?: string
          family_id?: string | null
          first_name?: string | null
          last_name?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_trusted_restaurants: {
        Row: {
          created_at: string
          restaurant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          restaurant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          restaurant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_trusted_restaurants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_trusted_restaurants_with_nested_data: {
        Args: { p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  emergency: {
    Tables: {
      user_emergency_card_contacts: {
        Row: {
          card_id: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_mobile: boolean
          phone_number: string
          priority: number | null
          relationship: string
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_mobile?: boolean
          phone_number: string
          priority?: number | null
          relationship: string
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_mobile?: boolean
          phone_number?: string
          priority?: number | null
          relationship?: string
          user_id?: string
        }
        Relationships: []
      }
      user_emergency_card_doctors: {
        Row: {
          card_id: string
          created_at: string
          doctor_type: string
          full_name: string
          id: string
          phone_number: string
          practice_name: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          doctor_type: string
          full_name: string
          id?: string
          phone_number: string
          practice_name?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          doctor_type?: string
          full_name?: string
          id?: string
          phone_number?: string
          practice_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_emergency_card_hospitals: {
        Row: {
          address: string
          card_id: string
          created_at: string
          id: string
          name: string
          phone_number: string
          priority: number
          user_id: string
        }
        Insert: {
          address: string
          card_id: string
          created_at?: string
          id?: string
          name: string
          phone_number: string
          priority: number
          user_id: string
        }
        Update: {
          address?: string
          card_id?: string
          created_at?: string
          id?: string
          name?: string
          phone_number?: string
          priority?: number
          user_id?: string
        }
        Relationships: []
      }
      user_emergency_cards: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"] | null
          card_id: string
          created_at: string
          date_of_birth: string | null
          full_legal_name: string
          height_cm: number
          id: string
          updated_at: string | null
          user_id: string
          weight_kg: number
        }
        Insert: {
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          card_id: string
          created_at?: string
          date_of_birth?: string | null
          full_legal_name: string
          height_cm: number
          id?: string
          updated_at?: string | null
          user_id: string
          weight_kg: number
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          card_id?: string
          created_at?: string
          date_of_birth?: string | null
          full_legal_name?: string
          height_cm?: number
          id?: string
          updated_at?: string | null
          user_id?: string
          weight_kg?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_emergency_card_data: { Args: { p_card_id: string }; Returns: Json }
      save_emergency_card_changes: {
        Args: {
          p_card_record_id: string
          p_card_updates: Json
          p_contact_upserts: Json
          p_doctor_upserts: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  epipen: {
    Tables: {
      epipen_instructions: {
        Row: {
          created_at: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id: string
          instruction_key: string
          instruction_text: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          instruction_key: string
          instruction_text: string
          sort_order: number
        }
        Update: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          instruction_key?: string
          instruction_text?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_epipen_cards: {
        Row: {
          brand_type: string
          card_id: string
          carries_epipen: Database["public"]["Enums"]["epipen_carry_options"]
          created_at: string
          custom_brand: string | null
          custom_primary_location: string | null
          custom_secondary_location: string | null
          dosage: string
          id: string
          instruction_type: Database["public"]["Enums"]["epipen_instruction_type"]
          primary_expiration_date: string | null
          primary_location: string
          primary_photo_url: string | null
          reminder_options: Json | null
          secondary_expiration_date: string | null
          secondary_location: string | null
          secondary_photo_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brand_type: string
          card_id: string
          carries_epipen: Database["public"]["Enums"]["epipen_carry_options"]
          created_at?: string
          custom_brand?: string | null
          custom_primary_location?: string | null
          custom_secondary_location?: string | null
          dosage: string
          id?: string
          instruction_type: Database["public"]["Enums"]["epipen_instruction_type"]
          primary_expiration_date?: string | null
          primary_location: string
          primary_photo_url?: string | null
          reminder_options?: Json | null
          secondary_expiration_date?: string | null
          secondary_location?: string | null
          secondary_photo_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brand_type?: string
          card_id?: string
          carries_epipen?: Database["public"]["Enums"]["epipen_carry_options"]
          created_at?: string
          custom_brand?: string | null
          custom_primary_location?: string | null
          custom_secondary_location?: string | null
          dosage?: string
          id?: string
          instruction_type?: Database["public"]["Enums"]["epipen_instruction_type"]
          primary_expiration_date?: string | null
          primary_location?: string
          primary_photo_url?: string | null
          reminder_options?: Json | null
          secondary_expiration_date?: string | null
          secondary_location?: string | null
          secondary_photo_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_epipen_instructions: {
        Row: {
          created_at: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id: string
          instruction_key: string
          instruction_text: string
          is_deleted: boolean
          sort_order: number
          user_id: string
        }
        Insert: {
          created_at?: string
          icon_type: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          instruction_key: string
          instruction_text: string
          is_deleted?: boolean
          sort_order: number
          user_id: string
        }
        Update: {
          created_at?: string
          icon_type?: Database["public"]["Enums"]["rule_icon_type"]
          id?: string
          instruction_key?: string
          instruction_text?: string
          is_deleted?: boolean
          sort_order?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_epipen_card_data: { Args: { p_card_id: string }; Returns: Json }
      get_epipen_card_data_web: { Args: { p_card_id: string }; Returns: Json }
      save_epipen_card_changes: {
        Args: {
          p_card_record_id: string
          p_card_updates: Json
          p_instruction_upserts: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  family: {
    Tables: {
      families: {
        Row: {
          created_at: string | null
          family_name: string | null
          id: string
          is_deleted: boolean
        }
        Insert: {
          created_at?: string | null
          family_name?: string | null
          id?: string
          is_deleted?: boolean
        }
        Update: {
          created_at?: string | null
          family_name?: string | null
          id?: string
          is_deleted?: boolean
        }
        Relationships: []
      }
      family_members: {
        Row: {
          family_id: string
          is_deleted: boolean
          role: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Insert: {
          family_id: string
          is_deleted?: boolean
          role: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Update: {
          family_id?: string
          is_deleted?: boolean
          role?: Database["public"]["Enums"]["role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  monitoring: {
    Tables: {
      api_metrics: {
        Row: {
          created_at: string
          endpoint: string
          id: number
          ip_address: string | null
          method: string
          occurred_at: string
          response_time_ms: number
          status_code: number
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: number
          ip_address?: string | null
          method: string
          occurred_at?: string
          response_time_ms: number
          status_code: number
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: number
          ip_address?: string | null
          method?: string
          occurred_at?: string
          response_time_ms?: number
          status_code?: number
          user_agent?: string | null
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          created_at: string
          endpoint: string
          error_message: string
          error_type: string | null
          id: number
          ip_address: string | null
          method: string | null
          occurred_at: string
          stack_trace: string | null
          status_code: number | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          endpoint: string
          error_message: string
          error_type?: string | null
          id?: number
          ip_address?: string | null
          method?: string | null
          occurred_at?: string
          stack_trace?: string | null
          status_code?: number | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string
          error_message?: string
          error_type?: string | null
          id?: number
          ip_address?: string | null
          method?: string | null
          occurred_at?: string
          stack_trace?: string | null
          status_code?: number | null
          user_agent?: string | null
        }
        Relationships: []
      }
      query_metrics: {
        Row: {
          created_at: string
          execution_time_ms: number
          id: number
          occurred_at: string
          params: Json | null
          query_name: string
        }
        Insert: {
          created_at?: string
          execution_time_ms: number
          id?: number
          occurred_at?: string
          params?: Json | null
          query_name: string
        }
        Update: {
          created_at?: string
          execution_time_ms?: number
          id?: number
          occurred_at?: string
          params?: Json | null
          query_name?: string
        }
        Relationships: []
      }
      request_stats: {
        Row: {
          avg_response_time_ms: number
          created_at: string
          endpoint: string
          error_count: number
          id: number
          max_response_time_ms: number
          min_response_time_ms: number
          request_count: number
          success_count: number
          time_bucket: string
        }
        Insert: {
          avg_response_time_ms: number
          created_at?: string
          endpoint: string
          error_count?: number
          id?: number
          max_response_time_ms: number
          min_response_time_ms: number
          request_count?: number
          success_count?: number
          time_bucket: string
        }
        Update: {
          avg_response_time_ms?: number
          created_at?: string
          endpoint?: string
          error_count?: number
          id?: number
          max_response_time_ms?: number
          min_response_time_ms?: number
          request_count?: number
          success_count?: number
          time_bucket?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_metrics: { Args: never; Returns: undefined }
      get_dashboard_overview: {
        Args: { time_range_hours?: number }
        Returns: {
          avg_response_time: number
          error_rate: number
          total_errors: number
          total_requests: number
          unique_endpoints: number
        }[]
      }
      get_endpoint_metrics: {
        Args: { time_range_hours?: number }
        Returns: {
          avg_response_time: number
          endpoint: string
          error_count: number
          max_response_time: number
          min_response_time: number
          request_count: number
          success_rate: number
        }[]
      }
      get_performance_trends: {
        Args: { bucket_minutes?: number; time_range_hours?: number }
        Returns: {
          avg_response_time: number
          error_count: number
          request_count: number
          time_bucket: string
        }[]
      }
      get_recent_errors: {
        Args: { limit_count?: number }
        Returns: {
          endpoint: string
          error_message: string
          error_type: string
          id: number
          occurred_at: string
          status_code: number
        }[]
      }
      get_recent_requests: {
        Args: { limit_count?: number }
        Returns: {
          endpoint: string
          id: number
          method: string
          occurred_at: string
          response_time_ms: number
          status_code: number
        }[]
      }
      get_slowest_queries: {
        Args: { limit_count?: number; time_range_hours?: number }
        Returns: {
          avg_execution_time: number
          execution_count: number
          max_execution_time: number
          query_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_family_profile_complete: {
        Args: {
          p_children_data: Json
          p_children_safety_rules_data: Json
          p_children_user_ids: string[]
          p_parent_data: Json
          p_parent_safety_rules_data: Json
          p_parent_user_id: string
        }
        Returns: Json
      }
      create_user_profile_complete: {
        Args: {
          p_profile_data: Json
          p_safety_rules_data: Json
          p_user_id: string
        }
        Returns: Json
      }
      get_food_allergies_data: { Args: { profile_slug: string }; Returns: Json }
      get_initial_profile_data: {
        Args: { profile_slug: string }
        Returns: Json
      }
      get_restaurant_edit_details: {
        Args: { p_restaurant_id: string }
        Returns: Json
      }
      get_restaurant_profile_data: {
        Args: { restaurant_slug: string }
        Returns: Json
      }
      get_user_available_cards: {
        Args: { p_user_id: string }
        Returns: {
          card_type: string
        }[]
      }
      get_user_card_data: {
        Args: { p_safety_level_id: string; p_user_id: string }
        Returns: Json
      }
      save_allergen_card_changes: {
        Args: {
          p_allergen_deletions: Json
          p_allergen_upserts: Json
          p_rule_deletions: Json
          p_rule_upserts: Json
          p_safety_level_id: string
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      account_type:
        | "just-me"
        | "parent"
        | "restaurant"
        | "store"
        | "child"
        | "guardian"
      blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      card_type:
        | "allergy"
        | "emergency"
        | "epipen"
        | "travel"
        | "school"
        | "custom"
        | "swe"
      epipen_carry_options:
        | "yes-carry"
        | "yes-no-yet"
        | "no-should-get"
        | "no-dont-need"
      epipen_instruction_type: "our-instructions" | "add-my-own"
      prevention_measures_categories:
        | "classroom"
        | "office"
        | "meetings-events"
        | "birthday-parties"
        | "field-trips"
      privacy_types: "public" | "password-protected"
      role: "owner" | "read-only"
      rule_icon_type: "check" | "cross"
      safety_level: "maximum" | "high" | "standard" | "custom"
      severity_level: "mild" | "moderate" | "severe"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  restaurant: {
    Tables: {
      restaurant_addresses: {
        Row: {
          city: string
          created_at: string
          id: string
          is_deleted: boolean
          line1: string
          line2: string | null
          restaurant_id: string
          state: string
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          line1: string
          line2?: string | null
          restaurant_id: string
          state: string
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          line1?: string
          line2?: string | null
          restaurant_id?: string
          state?: string
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_addresses_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_allergens_handled: {
        Row: {
          allergen: string
          allergen_id: string
          created_at: string
          is_deleted: boolean
          restaurant_id: string
          twemoji: string
        }
        Insert: {
          allergen: string
          allergen_id: string
          created_at?: string
          is_deleted?: boolean
          restaurant_id: string
          twemoji: string
        }
        Update: {
          allergen?: string
          allergen_id?: string
          created_at?: string
          is_deleted?: boolean
          restaurant_id?: string
          twemoji?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_allergens_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_cuisine_options: {
        Row: {
          created_at: string
          cuisine_id: string
          is_deleted: boolean
          label: string
          restaurant_id: string
          twemoji: string
        }
        Insert: {
          created_at?: string
          cuisine_id: string
          is_deleted?: boolean
          label: string
          restaurant_id: string
          twemoji: string
        }
        Update: {
          created_at?: string
          cuisine_id?: string
          is_deleted?: boolean
          label?: string
          restaurant_id?: string
          twemoji?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_cuisine_options_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_dietary_options: {
        Row: {
          created_at: string
          dietary_id: string
          is_custom: boolean
          is_deleted: boolean
          label: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          dietary_id: string
          is_custom?: boolean
          is_deleted?: boolean
          label: string
          restaurant_id: string
        }
        Update: {
          created_at?: string
          dietary_id?: string
          is_custom?: boolean
          is_deleted?: boolean
          label?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_dietary_options_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_hours: {
        Row: {
          close_time: string
          id: string
          open_time: string
          restaurant_id: string
          timezone: string
          weekday: number
        }
        Insert: {
          close_time: string
          id?: string
          open_time: string
          restaurant_id: string
          timezone: string
          weekday: number
        }
        Update: {
          close_time?: string
          id?: string
          open_time?: string
          restaurant_id?: string
          timezone?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_hours_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          expires_at: string | null
          id: number
          invitee_email: string
          invitee_user_id: string | null
          inviter_user_id: string
          requested_permissions: Json | null
          requested_role: string | null
          restaurant_id: string
          status: Database["restaurant"]["Enums"]["restaurant_invite_status"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: number
          invitee_email: string
          invitee_user_id?: string | null
          inviter_user_id: string
          requested_permissions?: Json | null
          requested_role?: string | null
          restaurant_id: string
          status?: Database["restaurant"]["Enums"]["restaurant_invite_status"]
          token: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: number
          invitee_email?: string
          invitee_user_id?: string | null
          inviter_user_id?: string
          requested_permissions?: Json | null
          requested_role?: string | null
          restaurant_id?: string
          status?: Database["restaurant"]["Enums"]["restaurant_invite_status"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_inivitations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_kitchen_protocols: {
        Row: {
          created_at: string
          is_custom: boolean
          label: string
          protocol_id: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          is_custom?: boolean
          label: string
          protocol_id: string
          restaurant_id: string
        }
        Update: {
          created_at?: string
          is_custom?: boolean
          label?: string
          protocol_id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_kitchen_protocols_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          restaurant_id: string
          slug: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          restaurant_id: string
          slug: string
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          restaurant_id?: string
          slug?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_allergen_modifications: {
        Row: {
          allergen_id: string
          can_be_removed: boolean | null
          can_be_substituted: boolean | null
          menu_item_id: string
          substitute_food: string | null
        }
        Insert: {
          allergen_id: string
          can_be_removed?: boolean | null
          can_be_substituted?: boolean | null
          menu_item_id: string
          substitute_food?: string | null
        }
        Update: {
          allergen_id?: string
          can_be_removed?: boolean | null
          can_be_substituted?: boolean | null
          menu_item_id?: string
          substitute_food?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_allergen_modifications_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_allergens: {
        Row: {
          allergen_id: string
          is_cross_contamination: boolean | null
          menu_item_id: string
        }
        Insert: {
          allergen_id: string
          is_cross_contamination?: boolean | null
          menu_item_id: string
        }
        Update: {
          allergen_id?: string
          is_cross_contamination?: boolean | null
          menu_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_allergens_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_dietary_options: {
        Row: {
          dietary_option: string
          menu_item_id: string
        }
        Insert: {
          dietary_option: string
          menu_item_id: string
        }
        Update: {
          dietary_option?: string
          menu_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_dietary_options_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          menu_item_id: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          menu_item_id: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          menu_item_id?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_images_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_modification_notes: {
        Row: {
          created_at: string
          description: string
          heading: string
          id: string
          linked_allergen_ids: string[] | null
          menu_item_id: string
        }
        Insert: {
          created_at?: string
          description: string
          heading: string
          id?: string
          linked_allergen_ids?: string[] | null
          menu_item_id: string
        }
        Update: {
          created_at?: string
          description?: string
          heading?: string
          id?: string
          linked_allergen_ids?: string[] | null
          menu_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_notes_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_preparation_methods: {
        Row: {
          menu_item_id: string
          method: string
        }
        Insert: {
          menu_item_id: string
          method: string
        }
        Update: {
          menu_item_id?: string
          method?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_preparation_methods_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_protocol_overrides: {
        Row: {
          menu_item_id: string
          protocol_id: string
        }
        Insert: {
          menu_item_id: string
          protocol_id: string
        }
        Update: {
          menu_item_id?: string
          protocol_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_protocol_overrides_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_review_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          restaurant_menu_item_review_id: string
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          restaurant_menu_item_review_id: string
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          restaurant_menu_item_review_id?: string
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_review_i_restaurant_menu_item_review__fkey"
            columns: ["restaurant_menu_item_review_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_item_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_item_reviews: {
        Row: {
          created_at: string
          food_allergies_accommodation_rating: number | null
          id: string
          is_deleted: boolean
          order_again_rating: number | null
          overall_rating: number | null
          presentation_rating: number | null
          quality_rating: number | null
          restaurant_menu_item_id: string
          review_description: string | null
          safety_rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          food_allergies_accommodation_rating?: number | null
          id?: string
          is_deleted?: boolean
          order_again_rating?: number | null
          overall_rating?: number | null
          presentation_rating?: number | null
          quality_rating?: number | null
          restaurant_menu_item_id: string
          review_description?: string | null
          safety_rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          food_allergies_accommodation_rating?: number | null
          id?: string
          is_deleted?: boolean
          order_again_rating?: number | null
          overall_rating?: number | null
          presentation_rating?: number | null
          quality_rating?: number | null
          restaurant_menu_item_id?: string
          review_description?: string | null
          safety_rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_item_reviews_restaurant_menu_item_id_fkey"
            columns: ["restaurant_menu_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menu_items: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          price: number | null
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          price?: number | null
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          price?: number | null
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_permissions: {
        Row: {
          description: string
          key: string
        }
        Insert: {
          description: string
          key: string
        }
        Update: {
          description?: string
          key?: string
        }
        Relationships: []
      }
      restaurant_review_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          restaurant_review_id: string
          sort_order: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          restaurant_review_id: string
          sort_order?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          restaurant_review_id?: string
          sort_order?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reviews_images_restaurant_review_id_fkey"
            columns: ["restaurant_review_id"]
            isOneToOne: false
            referencedRelation: "restaurant_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_reviews: {
        Row: {
          atmosphere_rating: number | null
          created_at: string
          dined_at: string
          food_allergies_accomodation_rating: number | null
          food_quality_rating: number | null
          id: string
          is_deleted: boolean
          overall_rating: number | null
          restaurant_id: string
          review_description: string | null
          safe_rating: number | null
          service_rating: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          atmosphere_rating?: number | null
          created_at?: string
          dined_at: string
          food_allergies_accomodation_rating?: number | null
          food_quality_rating?: number | null
          id?: string
          is_deleted?: boolean
          overall_rating?: number | null
          restaurant_id: string
          review_description?: string | null
          safe_rating?: number | null
          service_rating?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          atmosphere_rating?: number | null
          created_at?: string
          dined_at?: string
          food_allergies_accomodation_rating?: number | null
          food_quality_rating?: number | null
          id?: string
          is_deleted?: boolean
          overall_rating?: number | null
          restaurant_id?: string
          review_description?: string | null
          safe_rating?: number | null
          service_rating?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_staff: {
        Row: {
          created_at: string
          id: string
          restaurant_id: string
          role: Database["restaurant"]["Enums"]["restaurant_staff_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          restaurant_id: string
          role: Database["restaurant"]["Enums"]["restaurant_staff_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          restaurant_id?: string
          role?: Database["restaurant"]["Enums"]["restaurant_staff_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_staff_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_staff_permissions: {
        Row: {
          created_at: string
          granted: boolean
          permission_key: string
          staff_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          granted?: boolean
          permission_key: string
          staff_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          granted?: boolean
          permission_key?: string
          staff_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_staff_permissions_permission_key_fkey"
            columns: ["permission_key"]
            isOneToOne: false
            referencedRelation: "restaurant_permissions"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "restaurant_staff_permissions_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "restaurant_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          about: string | null
          allergy_accommodation:
            | Database["restaurant"]["Enums"]["restaurant_allergy_accommodation"]
            | null
          created_at: string
          id: string
          is_deleted: boolean
          is_verified: boolean
          menu_url: string | null
          name: string
          owner_id: string
          phone: string | null
          restaurant_type:
            | Database["restaurant"]["Enums"]["restaurant_type"]
            | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          allergy_accommodation?:
            | Database["restaurant"]["Enums"]["restaurant_allergy_accommodation"]
            | null
          created_at?: string
          id?: string
          is_deleted: boolean
          is_verified?: boolean
          menu_url?: string | null
          name: string
          owner_id: string
          phone?: string | null
          restaurant_type?:
            | Database["restaurant"]["Enums"]["restaurant_type"]
            | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          allergy_accommodation?:
            | Database["restaurant"]["Enums"]["restaurant_allergy_accommodation"]
            | null
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_verified?: boolean
          menu_url?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
          restaurant_type?:
            | Database["restaurant"]["Enums"]["restaurant_type"]
            | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_menu_item_with_details: {
        Args: {
          p_allergen_modifications?: Json
          p_allergens?: Json
          p_category_id: string
          p_cross_contamination_allergens?: Json
          p_description?: string
          p_dietary_options?: Json
          p_modification_notes?: Json
          p_name: string
          p_preparation_methods?: Json
          p_price?: number
          p_protocol_overrides?: Json
          p_restaurant_id: string
        }
        Returns: {
          error_message: string
          menu_item_id: string
          success: boolean
        }[]
      }
      get_menu_items_with_details: {
        Args: { p_menu_item_id?: string; p_restaurant_id: string }
        Returns: Json
      }
      get_restaurant_home_metrics: {
        Args: { p_restaurant_id: string }
        Returns: Json
      }
      get_restaurant_profile_data: {
        Args: { p_restaurant_id: string }
        Returns: Json
      }
      get_restaurant_reviews_paginated: {
        Args: { p_limit?: number; p_offset?: number; p_restaurant_id: string }
        Returns: Json
      }
      get_user_reviews_with_nested_data: {
        Args: { p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      restaurant_allergy_accommodation:
        | "yes"
        | "yes_certified"
        | "limited"
        | "no"
      restaurant_invite_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "canceled"
        | "expired"
      restaurant_staff_role:
        | "owner"
        | "manager"
        | "host_hostess"
        | "server_waiter"
        | "other"
      restaurant_type:
        | "full_service"
        | "fast_casual"
        | "food_truck"
        | "cafe_bakery"
        | "catering_events"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  swe: {
    Tables: {
      swe_categories: {
        Row: {
          category_name: string
          created_at: string
          id: string
        }
        Insert: {
          category_name: string
          created_at?: string
          id?: string
        }
        Update: {
          category_name?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      swe_measures: {
        Row: {
          category_id: string
          created_at: string
          id: string
          instruction_key: string
          instruction_text: string | null
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          instruction_key: string
          instruction_text?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          instruction_key?: string
          instruction_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swe_measures_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "swe_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_swe_cards: {
        Row: {
          card_id: string
          created_at: string
          id: string
          is_deleted: boolean
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_swe_categories: {
        Row: {
          created_at: string
          custom_category_name: string | null
          default_category_id: string | null
          id: string
          is_deleted: boolean
          swe_card_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_category_name?: string | null
          default_category_id?: string | null
          id?: string
          is_deleted?: boolean
          swe_card_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_category_name?: string | null
          default_category_id?: string | null
          id?: string
          is_deleted?: boolean
          swe_card_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_swe_categories_default_category_id_fkey"
            columns: ["default_category_id"]
            isOneToOne: false
            referencedRelation: "swe_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_swe_categories_swe_card_id_fkey"
            columns: ["swe_card_id"]
            isOneToOne: false
            referencedRelation: "user_swe_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_swe_measures: {
        Row: {
          created_at: string
          id: string
          instruction_key: string | null
          instruction_text: string | null
          is_custom: boolean | null
          is_deleted: boolean | null
          swe_card_id: string
          user_category_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          instruction_key?: string | null
          instruction_text?: string | null
          is_custom?: boolean | null
          is_deleted?: boolean | null
          swe_card_id: string
          user_category_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          instruction_key?: string | null
          instruction_text?: string | null
          is_custom?: boolean | null
          is_deleted?: boolean | null
          swe_card_id?: string
          user_category_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_swe_measures_swe_card_id_fkey"
            columns: ["swe_card_id"]
            isOneToOne: false
            referencedRelation: "user_swe_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_swe_measures_user_category_id_fkey"
            columns: ["user_category_id"]
            isOneToOne: false
            referencedRelation: "user_swe_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_swe_selected_cards: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean
          selected_card_id: string
          selected_subitems: Json | null
          swe_card_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          selected_card_id: string
          selected_subitems?: Json | null
          swe_card_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          selected_card_id?: string
          selected_subitems?: Json | null
          swe_card_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_swe_selected_cards_swe_card_id_fkey"
            columns: ["swe_card_id"]
            isOneToOne: false
            referencedRelation: "user_swe_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_swe_card_data: { Args: { p_card_id: string }; Returns: Json }
      get_swe_card_data_web: { Args: { p_card_id: string }; Returns: Json }
      get_swe_selected_card_types: {
        Args: { p_swe_card_id: string; p_user_id: string }
        Returns: {
          card_type: string
          selected_card_id: string
          selected_subitems: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  threads: {
    Tables: {
      channels: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_deleted: boolean
          is_restaurant_channel: boolean
          name: string
          restaurant_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_deleted?: boolean
          is_restaurant_channel?: boolean
          name: string
          restaurant_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_deleted?: boolean
          is_restaurant_channel?: boolean
          name?: string
          restaurant_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      comment_media: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          media_type: string
          media_url: string
          sort_order: number
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          media_type: string
          media_url: string
          sort_order: number
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_media_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_reactions: {
        Row: {
          comment_id: string
          created_at: string
          reaction: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          reaction?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_deleted: boolean | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_media: {
        Row: {
          created_at: string
          id: string
          media_type: string
          media_url: string
          post_id: string
          sort_order: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_type?: string
          media_url: string
          post_id: string
          sort_order?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          post_id?: string
          sort_order?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string
          post_id: string
          reaction: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          reaction?: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          allergens_attached: string[] | null
          channel_id: string
          created_at: string
          description: string | null
          id: string
          is_deleted: boolean
          post_type: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allergens_attached?: string[] | null
          channel_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_deleted?: boolean
          post_type: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allergens_attached?: string[] | null
          channel_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_deleted?: boolean
          post_type?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_post_with_channel: {
        Args: {
          p_allergens_attached?: string[]
          p_description?: string
          p_post_type: string
          p_restaurant_id: string
          p_title: string
          p_user_id: string
        }
        Returns: Json
      }
      get_all_community_posts_with_nested_data: { Args: never; Returns: Json }
      get_channel_posts_with_nested_data: {
        Args: { p_channel_id: string }
        Returns: Json
      }
      get_comment_replies: { Args: { p_comment_id: string }; Returns: Json }
      get_post_with_nested_data: { Args: { p_post_id: string }; Returns: Json }
      get_restaurant_posts_with_nested_data: {
        Args: { p_restaurant_id: string }
        Returns: Json
      }
      get_user_comments_with_nested_data: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_user_posts_with_nested_data: {
        Args: { p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  travel: {
    Tables: {
      allergen_translations: {
        Row: {
          allergen_name: string
          created_at: string | null
          id: string
          language_code: string
          translated_name: string
        }
        Insert: {
          allergen_name: string
          created_at?: string | null
          id?: string
          language_code: string
          translated_name: string
        }
        Update: {
          allergen_name?: string
          created_at?: string | null
          id?: string
          language_code?: string
          translated_name?: string
        }
        Relationships: []
      }
      travel_phrase_categories: {
        Row: {
          category_key: string
          category_name: string
          id: string
        }
        Insert: {
          category_key: string
          category_name: string
          id?: string
        }
        Update: {
          category_key?: string
          category_name?: string
          id?: string
        }
        Relationships: []
      }
      travel_phrases: {
        Row: {
          category_id: string
          created_at: string
          id: string
          phrase_key: string
          placeholder_type: string | null
          text: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          phrase_key: string
          placeholder_type?: string | null
          text: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          phrase_key?: string
          placeholder_type?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_phrases_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "travel_phrase_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_travel_cards: {
        Row: {
          card_id: string
          created_at: string
          id: string
          is_deleted: boolean
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_travel_languages: {
        Row: {
          created_at: string
          id: string
          language_code: string
          travel_card_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          language_code: string
          travel_card_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          language_code?: string
          travel_card_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_travel_languages_travel_card_id_fkey"
            columns: ["travel_card_id"]
            isOneToOne: false
            referencedRelation: "user_travel_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_travel_phrase_translations: {
        Row: {
          created_at: string | null
          id: string
          is_custom: boolean | null
          language_code: string
          translated_text: string
          updated_at: string | null
          user_id: string
          user_travel_phrase_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_custom?: boolean | null
          language_code: string
          translated_text: string
          updated_at?: string | null
          user_id: string
          user_travel_phrase_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_custom?: boolean | null
          language_code?: string
          translated_text?: string
          updated_at?: string | null
          user_id?: string
          user_travel_phrase_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_travel_phrase_translations_user_travel_phrase_id_fkey"
            columns: ["user_travel_phrase_id"]
            isOneToOne: false
            referencedRelation: "user_travel_phrases"
            referencedColumns: ["id"]
          },
        ]
      }
      user_travel_phrases: {
        Row: {
          allergen_ids: string[] | null
          contact_ids: string[] | null
          created_at: string
          default_phrase_id: string
          id: string
          travel_card_id: string
          user_id: string
        }
        Insert: {
          allergen_ids?: string[] | null
          contact_ids?: string[] | null
          created_at?: string
          default_phrase_id: string
          id?: string
          travel_card_id: string
          user_id: string
        }
        Update: {
          allergen_ids?: string[] | null
          contact_ids?: string[] | null
          created_at?: string
          default_phrase_id?: string
          id?: string
          travel_card_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_travel_phrases_default_phrase_id_fkey"
            columns: ["default_phrase_id"]
            isOneToOne: false
            referencedRelation: "travel_phrases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_travel_phrases_travel_card_id_fkey"
            columns: ["travel_card_id"]
            isOneToOne: false
            referencedRelation: "user_travel_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_travel_card_data: {
        Args: { p_card_id: string; p_user_id: string }
        Returns: Json
      }
      get_travel_card_data_web:
        | { Args: { p_user_id: string }; Returns: Json }
        | { Args: { p_card_id: string; p_user_id: string }; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  web_profiles: {
    Tables: {
      reserved_profile_slugs: {
        Row: {
          slug: string
        }
        Insert: {
          slug: string
        }
        Update: {
          slug?: string
        }
        Relationships: []
      }
      restaurant_web_profile_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          restaurant_id: string
          restaurant_web_profile_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          restaurant_id: string
          restaurant_web_profile_id: string
          sort_order: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          restaurant_id?: string
          restaurant_web_profile_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_web_profile_images_restaurant_web_profile_id_fkey"
            columns: ["restaurant_web_profile_id"]
            isOneToOne: false
            referencedRelation: "restaurant_web_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_web_profile_urls: {
        Row: {
          created_at: string
          id: string
          restaurant_id: string
          restaurant_web_profile_id: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          restaurant_id: string
          restaurant_web_profile_id: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          restaurant_id?: string
          restaurant_web_profile_id?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_web_profile_urls_restaurant_web_profile_id_fkey"
            columns: ["restaurant_web_profile_id"]
            isOneToOne: false
            referencedRelation: "restaurant_web_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_web_profiles: {
        Row: {
          created_at: string
          id: string
          is_deactivated: boolean
          is_deleted: boolean | null
          restaurant_id: string | null
          show_about_us: boolean | null
          show_address: boolean | null
          show_allergy_accommodations: boolean | null
          show_business_hours: boolean | null
          show_cuisine_types: boolean | null
          show_dietary_options: boolean | null
          show_food_allergens: boolean | null
          show_menu: boolean | null
          show_phone_number: boolean | null
          show_restaurant_type: boolean | null
          show_safety_protocols: boolean | null
          show_website: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_deactivated?: boolean
          is_deleted?: boolean | null
          restaurant_id?: string | null
          show_about_us?: boolean | null
          show_address?: boolean | null
          show_allergy_accommodations?: boolean | null
          show_business_hours?: boolean | null
          show_cuisine_types?: boolean | null
          show_dietary_options?: boolean | null
          show_food_allergens?: boolean | null
          show_menu?: boolean | null
          show_phone_number?: boolean | null
          show_restaurant_type?: boolean | null
          show_safety_protocols?: boolean | null
          show_website?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deactivated?: boolean
          is_deleted?: boolean | null
          restaurant_id?: string | null
          show_about_us?: boolean | null
          show_address?: boolean | null
          show_allergy_accommodations?: boolean | null
          show_business_hours?: boolean | null
          show_cuisine_types?: boolean | null
          show_dietary_options?: boolean | null
          show_food_allergens?: boolean | null
          show_menu?: boolean | null
          show_phone_number?: boolean | null
          show_restaurant_type?: boolean | null
          show_safety_protocols?: boolean | null
          show_website?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      user_web_profile_urls: {
        Row: {
          created_at: string
          id: string
          slug: string
          user_id: string
          user_web_profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          user_id: string
          user_web_profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          user_id?: string
          user_web_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_web_profile_urls_user_web_profile_id_fkey"
            columns: ["user_web_profile_id"]
            isOneToOne: false
            referencedRelation: "user_web_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_web_profiles: {
        Row: {
          about_me: string | null
          created_at: string
          display_emergency_contact: boolean
          display_epipen: boolean
          id: string
          is_deleted: boolean
          privacy_type: Database["public"]["Enums"]["privacy_types"]
          profile_password: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          about_me?: string | null
          created_at?: string
          display_emergency_contact: boolean
          display_epipen: boolean
          id?: string
          is_deleted?: boolean
          privacy_type: Database["public"]["Enums"]["privacy_types"]
          profile_password?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          about_me?: string | null
          created_at?: string
          display_emergency_contact?: boolean
          display_epipen?: boolean
          id?: string
          is_deleted?: boolean
          privacy_type?: Database["public"]["Enums"]["privacy_types"]
          profile_password?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_web_profiles_selected_cards: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean
          selected_card_id: string
          selected_subitems: Json | null
          user_id: string
          user_web_profiles_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          selected_card_id: string
          selected_subitems?: Json | null
          user_id: string
          user_web_profiles_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          selected_card_id?: string
          selected_subitems?: Json | null
          user_id?: string
          user_web_profiles_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_web_profiles_selected_cards_user_web_profiles_id_fkey"
            columns: ["user_web_profiles_id"]
            isOneToOne: false
            referencedRelation: "user_web_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  allergies: {
    Enums: {},
  },
  core: {
    Enums: {},
  },
  emergency: {
    Enums: {},
  },
  epipen: {
    Enums: {},
  },
  family: {
    Enums: {},
  },
  monitoring: {
    Enums: {},
  },
  public: {
    Enums: {
      account_type: [
        "just-me",
        "parent",
        "restaurant",
        "store",
        "child",
        "guardian",
      ],
      blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      card_type: [
        "allergy",
        "emergency",
        "epipen",
        "travel",
        "school",
        "custom",
        "swe",
      ],
      epipen_carry_options: [
        "yes-carry",
        "yes-no-yet",
        "no-should-get",
        "no-dont-need",
      ],
      epipen_instruction_type: ["our-instructions", "add-my-own"],
      prevention_measures_categories: [
        "classroom",
        "office",
        "meetings-events",
        "birthday-parties",
        "field-trips",
      ],
      privacy_types: ["public", "password-protected"],
      role: ["owner", "read-only"],
      rule_icon_type: ["check", "cross"],
      safety_level: ["maximum", "high", "standard", "custom"],
      severity_level: ["mild", "moderate", "severe"],
    },
  },
  restaurant: {
    Enums: {
      restaurant_allergy_accommodation: [
        "yes",
        "yes_certified",
        "limited",
        "no",
      ],
      restaurant_invite_status: [
        "pending",
        "accepted",
        "rejected",
        "canceled",
        "expired",
      ],
      restaurant_staff_role: [
        "owner",
        "manager",
        "host_hostess",
        "server_waiter",
        "other",
      ],
      restaurant_type: [
        "full_service",
        "fast_casual",
        "food_truck",
        "cafe_bakery",
        "catering_events",
      ],
    },
  },
  swe: {
    Enums: {},
  },
  threads: {
    Enums: {},
  },
  travel: {
    Enums: {},
  },
  web_profiles: {
    Enums: {},
  },
} as const
