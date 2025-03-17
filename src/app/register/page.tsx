"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const result = await response.json();
    if (response.ok) router.push("/login");
    else alert(result.error || "Registration failed");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Side: Content */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-6 py-12 lg:py-0">
        {/* Logo Placeholder */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SnapCraft</h2>
        </div>
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Join SnapCraft
        </h1>
        {/* Slogan */}
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Create AI-Powered Posts Instantly
        </p>
        {/* Form */}
        <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
          />
          <button
            type="submit"
            className="w-full flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
          >
            Sign Up
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
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
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