export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_details: {
        Row: {
          user_id: string
          full_name: string | null
          created_at: string
          email: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          user_id: string
          full_name?: string | null
          created_at?: string
          email: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          full_name?: string | null
          email?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: []
      }

      user_tokens: {
        Row: {
          id: string
          user_id: string
          tokens: number
          created_at: string
          type: "purchase" | "usage" | "free" | "refund"
          context: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tokens: number
          created_at?: string
          type: "purchase" | "usage" | "free" | "refund"
          context?: string | null
        }
        Update: {
          tokens?: number
          created_at?: string
          type?: "purchase" | "usage" | "free" | "refund"
          context?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_details"
            referencedColumns: ["user_id"]
            isOneToOne: false
          }
        ]
      }

      user_balance: {
        Row: {
          user_id: string
          balance: number
          updated_at: string
          created_at: string
        }
        Insert: {
          user_id: string
          balance?: number
          updated_at?: string
          created_at?: string
        }
        Update: {
          balance?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_balance_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_details"
            referencedColumns: ["user_id"]
            isOneToOne: true
          }
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
      token_type: "purchase" | "usage" | "free" | "refund"
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database["public"]

// ✅ Helpers for quick usage
export type Tables<Name extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][Name]["Row"]

export type TablesInsert<Name extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][Name]["Insert"]

export type TablesUpdate<Name extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][Name]["Update"]
