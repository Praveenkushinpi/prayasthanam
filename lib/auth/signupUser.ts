import { supabase } from "../supabase";

export async function signupUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  // ✅ Create empty profile row (optional but recommended)
  if (data.user) {
    await supabase.from("profiles").insert({ user_id: data.user.id });
  }

  return { data, error };
}
