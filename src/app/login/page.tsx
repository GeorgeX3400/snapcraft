"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } 
    if (data.user) {
      // Check if preferences exist
      const { data: preferences, error: prefsError } = await supabase
        .from("preferences")
        .select("user_id")
        .eq("user_id", data.user.id)
        .single();
  
      if (prefsError || !preferences) {
        // No preferences found, redirect to /preferences
        router.push("/preferences");
      } else {
        // Preferences exist, redirect to /dashboard
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Side: Content */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-center text-center lg:text-left px-6 py-12 lg:py-0">
        {/* Logo Placeholder */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SnapCraft</h2>
        </div>
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ps-2">
          Welcome Back to SnapCraft
        </h1>
        {/* Slogan */}
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Access Your AI-Powered Posts
        </p>
        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
          <button
            type="submit"
            className="w-full flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
          >
            Log In
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        <p className="text-md text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      {/* Right Side: Gradient Background */}
      <div className="lg:w-1/2 h-64 lg:h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 lg:rounded-l-3xl">
        {/* Gradient background - purely decorative */}
      </div>
    </div>
  );
}