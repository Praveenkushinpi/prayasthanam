import { supabase } from "../supabase";

export async function getSession() {
  return await supabase.auth.getSession();
}
