"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSave = async () => {
    if (!name.trim()) return;

    setLoading(true);

    // Get current logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update profile with name
    await supabase
      .from("profiles")
      .update({ name })
      .eq("user_id", user.id);

    setLoading(false);

    // After setting name → go to greetings
    router.replace("/greetings");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="max-w-md w-full p-6 rounded-xl shadow-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200 dark:border-neutral-800 text-center">
        
        <GradientText
          colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
          animationSpeed={6}
          showBorder={false}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Welcome! 🎉
        </GradientText>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Please tell us your name to complete your profile.
        </p>

        <div className="mt-6 space-y-4">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={loading || !name.trim()}
          >
            {loading ? "Saving..." : "Continue"}
          </Button>
        </div>
      </div>
    </main>
  );
}
