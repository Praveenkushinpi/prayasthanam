"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import Link from "next/link";
import { UserPlus, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/recreated/Logo/logo";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";

const SignupForm = () => {
  const {
    email,
    password,
    handleSignup,
    handleGoogleLogin,
    setEmail,
    setPassword,
    error,
    clearError,
  } = useAuth();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      <Logo/>
      {/* Sparkles background */}
      <SparklesCore
        id="signup-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={120}
        particleColor="#FFFFFF"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Foreground container */}
      <section
        aria-label="Sign Up Form"
        className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200 dark:border-neutral-800"
      >
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={6}
            showBorder={false}
            className="text-3xl md:text-4xl font-bold text-center mt-4"
          >
            Create Your Account
          </GradientText>
        </div>

        {/* Google Signup */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-3"
          onClick={handleGoogleLogin}
        >
          <UserPlus className="h-5 w-5" />
          Sign up with Google
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-neutral-900 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearError();
            handleSignup();
          }}
          className="space-y-4"
        >
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pr-10"
            />
            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* StarBorder CTA Button */}
          <StarBorder
            color="pink"
            speed="8s"
            className="group relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold text-lg text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
            <span className="relative z-10 flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Sign Up
            </span>
          </StarBorder>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-pink-500">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignupForm;
