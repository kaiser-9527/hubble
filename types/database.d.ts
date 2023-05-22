export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
  public: {
    Tables: {
      extensions: {
        Row: {
          id: string
          inserted_at: string
          settings: Json | null
          tenant_external_id: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          id: string
          inserted_at: string
          settings?: Json | null
          tenant_external_id?: string | null
          type?: string | null
          updated_at: string
        }
        Update: {
          id?: string
          inserted_at?: string
          settings?: Json | null
          tenant_external_id?: string | null
          type?: string | null
          updated_at?: string
        }
      }
      repo: {
        Row: {
          comment: string | null
          created_at: string | null
          github_id: number
          id: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          github_id: number
          id?: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          github_id?: number
          id?: number
          user_id?: string
        }
      }
      repo_tag: {
        Row: {
          created_at: string | null
          id: number
          repo_id: number
          tag_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          repo_id: number
          tag_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          repo_id?: number
          tag_id?: number
          user_id?: string
        }
      }
      schema_migrations: {
        Row: {
          inserted_at: string | null
          version: number
        }
        Insert: {
          inserted_at?: string | null
          version: number
        }
        Update: {
          inserted_at?: string | null
          version?: number
        }
      }
      tag: {
        Row: {
          created_at: string | null
          id: number
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string
          user_id?: string
        }
      }
      tenants: {
        Row: {
          external_id: string | null
          id: string
          inserted_at: string
          jwt_secret: string | null
          max_bytes_per_second: number
          max_channels_per_client: number
          max_concurrent_users: number
          max_events_per_second: number
          max_joins_per_second: number
          name: string | null
          postgres_cdc_default: string | null
          updated_at: string
        }
        Insert: {
          external_id?: string | null
          id: string
          inserted_at: string
          jwt_secret?: string | null
          max_bytes_per_second?: number
          max_channels_per_client?: number
          max_concurrent_users?: number
          max_events_per_second?: number
          max_joins_per_second?: number
          name?: string | null
          postgres_cdc_default?: string | null
          updated_at: string
        }
        Update: {
          external_id?: string | null
          id?: string
          inserted_at?: string
          jwt_secret?: string | null
          max_bytes_per_second?: number
          max_channels_per_client?: number
          max_concurrent_users?: number
          max_events_per_second?: number
          max_joins_per_second?: number
          name?: string | null
          postgres_cdc_default?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      up_repo: {
        Args: {
          p_id?: number
          p_user_id?: string
          p_github_id?: number
          p_comment?: string
        }
        Returns: {
          id: number
          github_id: string
          comment: string
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
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
}
