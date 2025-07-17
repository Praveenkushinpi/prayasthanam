"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/recreated/Logo/logo";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";
import { Button } from "@/components/shadcn/ui/button";
import { createBrowserClient } from "@supabase/ssr";

export default function GreetingPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email?? null);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Logo */}
      <Logo />

      {/* Sparkles Background */}
      <SparklesCore
        id="greeting-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={120}
        particleColor="#FFFFFF"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Foreground Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Welcome Message */}
        <GradientText
          colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
          animationSpeed={5}
          showBorder={false}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome {userEmail ? `, ${userEmail.split("@")[0]}` : "Back!"}
        </GradientText>

        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mb-8">
          You’re successfully logged in. Let’s get started with your journey!
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Go to Dashboard */}
          <StarBorder
            color="pink"
            speed="8s"
            className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => router.push("/dashboard")}
          >
            <span
              className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100
                bg-gradient-to-r from-pink-600 via-pink-500 to-red-500 blur-sm transition-opacity duration-300"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 rounded-[inherit] border border-pink-400/30"
              aria-hidden="true"
            />
            <span className="relative z-10">Go to Dashboard</span>
          </StarBorder>

          {/* Logout Button */}
          <Button
            variant="outline"
            className="px-6 py-3 text-lg border-gray-400 dark:border-neutral-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <button onClick={() => deleteAccount(session.user.id)}>
  Delete My Account
</button>

        </div>
      </section>
    </main>
  );
}
