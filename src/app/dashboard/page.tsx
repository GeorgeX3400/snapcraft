"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Dashboard() {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [settings, setSettings] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("preferences")
        .select("name, settings, subscription_status")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching preferences:", error.message);
        return;
      }

      setName(data?.name || "");
      setSettings(data?.settings || {});
      setIsSubscribed(data?.subscription_status === "active");
    };
    fetchUserData();
  }, [router]);

  const handleGenerate = async () => {
    if (!isSubscribed) return;
    const enhancedPrompt = `${prompt}, style: ${settings.style || "modern"}`;
    const { data } = await axios.post("/api/generate", { prompt: enhancedPrompt, filters: settings });
    setImage(data.imageUrl);
    setCaption(data.captionText);
  };

  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post("/api/stripe/checkout");
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  const handlePostToInstagram = async () => {
    await axios.post("/api/post/instagram", { imageUrl: image, caption });
    alert("Posted to Instagram!");
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "snapcraft-post.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Side: Content */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-6 py-12 lg:py-0">
        {/* Logo Placeholder */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SnapCraft</h2>
        </div>
        {/* Personalized Greeting */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Welcome, {name || "User"}!
        </h1>
        {/* Slogan */}
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Create a Post, {name || "User"}!
        </p>
        {/* Paywall */}
        {!isSubscribed && (
          <div className="w-full max-w-md bg-yellow-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-yellow-800">Subscribe to unlock post generation!</p>
            <button
              onClick={handleSubscribe}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Subscribe Now ($10/month)
            </button>
          </div>
        )}
        {/* Form */}
        <div className="w-full max-w-md">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Bold Instagram post for a coffee shop"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600 mb-4"
            disabled={!isSubscribed}
          />
          <button
            onClick={handleGenerate}
            className="w-full flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
            disabled={!isSubscribed}
          >
            Generate
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
        </div>
        {/* Generated Post */}
        {image && (
          <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <img src={image} alt="Generated Post" className="w-full rounded-lg" />
            {caption && <p className="mt-4 text-gray-700 text-lg">{caption}</p>}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleDownload}
                className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={handlePostToInstagram}
                className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Post to Instagram
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Right Side: Gradient Background */}
      <div className="lg:w-1/2 h-64 lg:h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 lg:rounded-l-3xl">
        {/* Gradient background - purely decorative */}
      </div>
    </div>
  );
}