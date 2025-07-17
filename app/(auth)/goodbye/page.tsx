"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoodbyePage() {
  const router = useRouter();

  // Optional: Redirect to homepage after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">👋 Goodbye!</h1>
        <p className="mt-4 text-gray-700">
          Your account has been successfully deleted.
        </p>
        <p className="mt-2 text-gray-500">
          We’re sorry to see you go. You’ll be redirected to the homepage in 5 seconds.
        </p>

        <button
          onClick={() => router.replace("/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Homepage Now
        </button>
      </div>
    </main>
  );
}
