export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          event_name: string
          event_type: string
          id: string
          ip_address: unknown | null
          os: string | null
          page_url: string | null
          properties: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_name: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          os?: string | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          os?: string | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_page_views: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          created_at: string
          id: string
          page_url: string
          unique_visitors: number | null
          updated_at: string
          view_count: number | null
          view_date: string
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string
          id?: string
          page_url: string
          unique_visitors?: number | null
          updated_at?: string
          view_count?: number | null
          view_date: string
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string
          id?: string
          page_url?: string
          unique_visitors?: number | null
          updated_at?: string
          view_count?: number | null
          view_date?: string
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          entry_page: string | null
          exit_page: string | null
          id: string
          is_bounce: boolean | null
          os: string | null
          page_count: number | null
          referrer: string | null
          session_id: string
          started_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_bounce?: boolean | null
          os?: string | null
          page_count?: number | null
          referrer?: string | null
          session_id: string
          started_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_bounce?: boolean | null
          os?: string | null
          page_count?: number | null
          referrer?: string | null
          session_id?: string
          started_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          rss_feed_id: string | null
          slug: string
          source: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          rss_feed_id?: string | null
          slug: string
          source?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          rss_feed_id?: string | null
          slug?: string
          source?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_blog_posts_rss_feed"
            columns: ["rss_feed_id"]
            isOneToOne: false
            referencedRelation: "rss_feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          annual_revenue: string | null
          budget_range: string | null
          company: string | null
          company_size: string | null
          created_at: string
          current_solution: string | null
          decision_maker: boolean | null
          demo_type: string | null
          email: string
          first_name: string
          form_source: string | null
          id: string
          industry: string | null
          interested_services: string[] | null
          job_title: string | null
          last_name: string
          lead_score: number | null
          notes: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          primary_challenge: string | null
          status: string | null
          timeline: string | null
          timezone: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          annual_revenue?: string | null
          budget_range?: string | null
          company?: string | null
          company_size?: string | null
          created_at?: string
          current_solution?: string | null
          decision_maker?: boolean | null
          demo_type?: string | null
          email: string
          first_name: string
          form_source?: string | null
          id?: string
          industry?: string | null
          interested_services?: string[] | null
          job_title?: string | null
          last_name: string
          lead_score?: number | null
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          primary_challenge?: string | null
          status?: string | null
          timeline?: string | null
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          annual_revenue?: string | null
          budget_range?: string | null
          company?: string | null
          company_size?: string | null
          created_at?: string
          current_solution?: string | null
          decision_maker?: boolean | null
          demo_type?: string | null
          email?: string
          first_name?: string
          form_source?: string | null
          id?: string
          industry?: string | null
          interested_services?: string[] | null
          job_title?: string | null
          last_name?: string
          lead_score?: number | null
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          primary_challenge?: string | null
          status?: string | null
          timeline?: string | null
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number | null
          file_type: string
          filename: string
          id: string
          original_name: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          file_type: string
          filename: string
          id?: string
          original_name: string
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          file_type?: string
          filename?: string
          id?: string
          original_name?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rss_feeds: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          last_fetched_at: string | null
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          last_fetched_at?: string | null
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          last_fetched_at?: string | null
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      security_settings: {
        Row: {
          created_at: string
          id: string
          max_login_attempts: number
          password_min_length: number
          require_numbers: boolean
          require_special_chars: boolean
          session_timeout: number
          two_factor_enabled: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_login_attempts?: number
          password_min_length?: number
          require_numbers?: boolean
          require_special_chars?: boolean
          session_timeout?: number
          two_factor_enabled?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          max_login_attempts?: number
          password_min_length?: number
          require_numbers?: boolean
          require_special_chars?: boolean
          session_timeout?: number
          two_factor_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      service_benefits: {
        Row: {
          benefit_text: string
          created_at: string
          display_order: number
          icon_name: string
          id: string
          service_id: string | null
        }
        Insert: {
          benefit_text: string
          created_at?: string
          display_order?: number
          icon_name?: string
          id?: string
          service_id?: string | null
        }
        Update: {
          benefit_text?: string
          created_at?: string
          display_order?: number
          icon_name?: string
          id?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_benefits_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          color: string
          created_at: string
          description: string | null
          display_order: number
          icon_name: string
          id: string
          patient_image_url: string | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          patient_image_url?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          patient_image_url?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_activity: {
        Row: {
          activity_description: string
          activity_type: string
          created_at: string
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_description: string
          activity_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_description?: string
          activity_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_config: {
        Row: {
          backup_frequency: string
          cache_enabled: boolean
          created_at: string
          debug_mode: boolean
          email_notifications: boolean
          id: string
          maintenance_mode: boolean
          site_name: string
          updated_at: string
        }
        Insert: {
          backup_frequency?: string
          cache_enabled?: boolean
          created_at?: string
          debug_mode?: boolean
          email_notifications?: boolean
          id?: string
          maintenance_mode?: boolean
          site_name?: string
          updated_at?: string
        }
        Update: {
          backup_frequency?: string
          cache_enabled?: boolean
          created_at?: string
          debug_mode?: boolean
          email_notifications?: boolean
          id?: string
          maintenance_mode?: boolean
          site_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metric_date: string
          metric_name: string
          metric_value: Json
          recorded_at: string
        }
        Insert: {
          id?: string
          metric_date?: string
          metric_name: string
          metric_value: Json
          recorded_at?: string
        }
        Update: {
          id?: string
          metric_date?: string
          metric_name?: string
          metric_value?: Json
          recorded_at?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          granted_by: string | null
          id: string
          permission: Database["public"]["Enums"]["permission_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          granted_by?: string | null
          id?: string
          permission: Database["public"]["Enums"]["permission_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          granted_by?: string | null
          id?: string
          permission?: Database["public"]["Enums"]["permission_type"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          employee_type: Database["public"]["Enums"]["employee_type"] | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_type?: Database["public"]["Enums"]["employee_type"] | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          employee_type?: Database["public"]["Enums"]["employee_type"] | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      value_proposition_features: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon_name: string
          id: string
          subtitle: string | null
          subtitle2: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          subtitle?: string | null
          subtitle2?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          subtitle?: string | null
          subtitle2?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_content: {
        Row: {
          background_image_url: string | null
          background_video_url: string | null
          button_text: string | null
          button_url: string | null
          content_data: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          laptop_background_url: string | null
          mobile_background_url: string | null
          section_key: string
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          background_video_url?: string | null
          button_text?: string | null
          button_url?: string | null
          content_data?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          laptop_background_url?: string | null
          mobile_background_url?: string | null
          section_key: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          background_video_url?: string | null
          button_text?: string | null
          button_url?: string | null
          content_data?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          laptop_background_url?: string | null
          mobile_background_url?: string | null
          section_key?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_analytics_summary: {
        Args: { start_date?: string; end_date?: string }
        Returns: {
          total_page_views: number
          unique_visitors: number
          total_sessions: number
          avg_session_duration: number
          bounce_rate: number
          top_pages: Json
          traffic_sources: Json
          device_breakdown: Json
        }[]
      }
      get_default_permissions: {
        Args: { _employee_type: Database["public"]["Enums"]["employee_type"] }
        Returns: Database["public"]["Enums"]["permission_type"][]
      }
      has_permission: {
        Args: {
          _user_id: string
          _permission: Database["public"]["Enums"]["permission_type"]
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_system_activity: {
        Args: {
          activity_type: string
          activity_description: string
          user_id?: string
          metadata?: Json
        }
        Returns: string
      }
      record_system_metric: {
        Args: { metric_name: string; metric_value: Json }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      employee_type:
        | "admin"
        | "manager"
        | "content_editor"
        | "marketing_specialist"
        | "customer_service"
        | "demo_coordinator"
      permission_type:
        | "dashboard_view"
        | "analytics_view"
        | "leads_view"
        | "leads_manage"
        | "content_view"
        | "content_edit"
        | "blog_view"
        | "blog_edit"
        | "preview_view"
        | "user_management_view"
        | "user_management_edit"
        | "system_settings_view"
        | "system_settings_edit"
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
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      employee_type: [
        "admin",
        "manager",
        "content_editor",
        "marketing_specialist",
        "customer_service",
        "demo_coordinator",
      ],
      permission_type: [
        "dashboard_view",
        "analytics_view",
        "leads_view",
        "leads_manage",
        "content_view",
        "content_edit",
        "blog_view",
        "blog_edit",
        "preview_view",
        "user_management_view",
        "user_management_edit",
        "system_settings_view",
        "system_settings_edit",
      ],
    },
  },
} as const
