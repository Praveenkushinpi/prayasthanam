"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function useAuth() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
    setSuccessMsg(null);
  };

  /** ✅ LOGIN */
  const handleLogin = async () => {
    clearError();

    if (!email || !password) {
      setError("Email & password required");
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Incorrect email or password.");
      } else {
        setError(error.message);
      }
    } else if (data.user) {
      if (!data.user.confirmed_at) {
        setError("Please confirm your email before logging in.");
      } else {
        console.log("✅ Login successful:", email);
        router.replace("/dashboard");
      }
    }

    setIsLoading(false);
  };

  /** ✅ SIGNUP */
  const handleSignup = async () => {
    clearError();

    if (!email || !password) return setError("Email & password required");

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        setError("User already exists! Try logging in.");
      } else {
        setError(error.message);
      }
    } else if (data.user) {
      await supabase.from("profiles").insert({ user_id: data.user.id });
      setSuccessMsg("✅ Check your email to confirm your account!");
    }

    setIsLoading(false);
  };

  /** ✅ GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    clearError();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  /** ✅ PASSWORD RESET */
  const handlePasswordReset = async () => {
    clearError();
    if (!email) return setError("Enter your email first.");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetPassword`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg("Password reset email sent! Check your inbox.");
    }
  };

  /** ✅ LOGOUT */
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.replace("/login");
  };

  /** ✅ DELETE ACCOUNT */
  const deleteAccount = async (userId: string) => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Your account has been deleted.");
      await supabase.auth.signOut();
      router.replace("/goodbye");
    } else {
      alert("Error deleting account: " + data.error);
    }
  };

  /** ✅ SESSION LISTENER */
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignup,
    handleGoogleLogin,
    handlePasswordReset,
    signOut,
    deleteAccount, 
    isLoading,
    error,
    successMsg,
    clearError,
  };
}
