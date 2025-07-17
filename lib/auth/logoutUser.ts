import { supabase } from "../supabase";

export async function logoutUser() {
  return await supabase.auth.signOut();
}
