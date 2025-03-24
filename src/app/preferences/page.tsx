"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Preferences() {
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [tone, setTone] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
    };
    fetchUserData();
  }, [router]);

  const handleSavePreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const settings = { style, colorScheme, tone };
    const { error } = await supabase.from("preferences").upsert({
      user_id: user.id,
      name,
      settings,
      subscription_status: "inactive",
    });

    if (error) alert(error.message);
    else router.push("/dashboard");
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Side: Content */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-6 py-12 lg:py-0">
        {/* Logo Placeholder */}
        
        {/* Step Indicator */}
        <p className="text-lg text-gray-700 mb-6">Step {step} of 4</p>
        {/* Form Content */}
        {step === 1 && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              What’s Your Name?
            </h1>
            <div className="w-full max-w-md space-y-4 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
              />
            </div>
            <button
              onClick={nextStep}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
              disabled={!name}
            >
              Next
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
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Choose Your Style
            </h1>
            <div className="w-full max-w-md space-y-4 mb-6">
              {["Modern",
        "Vintage",
        "Minimalist",
        "Bohemian",
        "Futuristic",
        "Artistic",
        "Grunge",
        "Elegant",].map((option) => (
          <label
          key={option}
          className={`relative flex flex-col  items-center p-4 border rounded-lg cursor-pointer transition-all ${
            style === option
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          <input
            type="radio"
            value={option}
            checked={style === option}
            onChange={(e) => setStyle(e.target.value)}
            className="absolute opacity-0"
          />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={nextStep}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
              disabled={!style}
            >
              Next
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
          </>
        )}
        {step === 3 && (
  <>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
      Pick Your Color Scheme
    </h1>
    <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        { name: "Sunset Glow", colors: ["#FF6F61", "#FF9A8B", "#FFD700"] },
        { name: "Ocean Breeze", colors: ["#4ECDC4", "#1B263B", "#A3DFFA"] },
        { name: "Forest Whisper", colors: ["#2A5D38", "#8A9A5B", "#F5F5DC"] },
        { name: "Berry Bliss", colors: ["#9B1D64", "#4B2E83", "#E0B0FF"] },
        { name: "Citrus Burst", colors: ["#A8E6CF", "#FF8C42", "#FFD166"] },
        { name: "Pastel Dream", colors: ["#F7CAC9", "#C5E3BF", "#E6E6FA"] },
        { name: "Midnight Sky", colors: ["#191970", "#483D8B", "#C0C0C0"] },
        { name: "Golden Hour", colors: ["#D4AF37", "#FFBF00", "#FFFDD0"] },
        { name: "Tropical Paradise", colors: ["#FF6F61", "#40E0D0", "#FFB347"] },
        { name: "Autumn Harvest", colors: ["#B7410E", "#FFDB58", "#8B4513"] },
        { name: "Neon Pop", colors: ["#FF10F0", "#00F7FF", "#BFFF00"] },
        { name: "Desert Mirage", colors: ["#EDC9AF", "#E2725B", "#9CB071"] },
        { name: "Spring Blossom", colors: ["#FF9999", "#C8A2C8", "#A9CBA4"] },
        { name: "Icy Frost", colors: ["#99E1F2", "#D3D3D3", "#F5F7FA"] },
        { name: "Royal Elegance", colors: ["#4B0082", "#FFD700", "#DC143C"] },
        { name: "Black and White", colors: ["#000000", "#FFFFFF"] },
        { name: "Twilight Serenity", colors: ["#2C3E50", "#9B59B6", "#F1C1CC", "#D5D8DC"] },
        { name: "Emerald Forest", colors: ["#2ECC71", "#1F5A44", "#F4D03F", "#34495E"] },
        { name: "Candy Pop", colors: ["#FF6EB4", "#87CEEB", "#FFFF99", "#98FF98"] },
        { name: "Vintage Rose", colors: ["#D98880", "#AEB6BF", "#F5F5DC", "#CC5500"] },
        { name: "Cosmic Glow", colors: ["#8E44AD", "#00CED1", "#FF69B4", "#F0F8FF"] },
      ].map((scheme) => (
        <label
          key={scheme.name}
          className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
            colorScheme === scheme.name
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          <input
            type="radio"
            value={scheme.name}
            checked={colorScheme === scheme.name}
            onChange={(e) => setColorScheme(e.target.value)}
            className="absolute opacity-0"
          />
          <div className="flex space-x-1 mb-2">
            {scheme.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-gray-700 text-center">{scheme.name}</span>
        </label>
      ))}
    </div>
    <div className="flex space-x-4">
      <button
        onClick={prevStep}
        className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-colors"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
        disabled={!colorScheme}
      >
        Next
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
  </>
)}
        {step === 4 && (
  <>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
      Set Your Tone
    </h1>
    <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        "Casual",
        "Professional",
        "Playful",
        "Inspirational",
        "Witty",
        "Bold",
        "Romantic",
        "Mysterious",
        "Adventurous",
        "Nostalgic",
      ].map((option) => (
        <label
          key={option}
          className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
            tone === option
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          <input
            type="radio"
            value={option}
            checked={tone === option}
            onChange={(e) => setTone(e.target.value)}
            className="absolute opacity-0"
          />
          <span className="text-gray-700 text-center">{option}</span>
        </label>
      ))}
    </div>
    <div className="flex space-x-4">
      <button
        onClick={prevStep}
        className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-colors"
      >
        Back
      </button>
      <button
        onClick={handleSavePreferences}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
        disabled={!tone}
      >
        Save Preferences
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
  </>
)}
      </div>

    </div>
  );
}