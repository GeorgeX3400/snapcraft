"use client"
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
    };
    checkUser();
  }, []);

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
          Craft Social Magic in a Snap
        </h1>
        {/* Slogan */}
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          AI-Powered Posts for Influencers, Businesses, and Marketers
        </p>
        {/* Pain Point */}
        <p className="text-md md:text-lg text-gray-600 mb-8">
          Tired of spending hours on lackluster social content?
        </p>
        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            With SnapCraft, you can:
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✔</span>
              <span>Generate stunning posts instantly with AI.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✔</span>
              <span>Elevate your brand with professional visuals.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✔</span>
              <span>Master social media without design skills.</span>
            </li>
          </ul>
        </div>
        {/* Get Started CTA */}
        <Link href="/register">
          <button className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors">
            Get Started
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
        </Link>
      </div>
      {/* Right Side: Gradient Background */}
      <div className="lg:w-1/2 h-64 lg:h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 lg:rounded-l-3xl">
        {/* Gradient background - purely decorative */}
      </div>
    </div>
  );
}