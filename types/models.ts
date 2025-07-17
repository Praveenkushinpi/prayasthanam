import { Database } from "@/lib/database.types"


export type UserDetails = Database["public"]["Tables"]["user_details"]["Row"]


export type User = {
  id: string;
  email: string;
  full_name?: string | null;
  created_at: string;
  tokens_left?: number;
};
