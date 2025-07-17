import { supabase } from "../supabase";
import { User } from "@/types/models";

export async function getCurrentUser(): Promise<User | null> {
  const { data: authUser } = await supabase.auth.getUser();
  if (!authUser.user) return null;

  return {
    id: authUser.user.id,
    email: authUser.user.email!,
    created_at: authUser.user.created_at,
  };
}
