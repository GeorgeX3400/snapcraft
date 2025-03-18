"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Preferences() {
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
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

      const { data, error } = await supabase
        .from("preferences")
        .select("name")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") { // PGRST116: No rows returned
        console.error("Error fetching preferences:", error.message);
        return;
      }
      setName(data?.name || "");
    };
    fetchUserData();
  }, [router]);

  const handleSavePreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const settings = { style, color, tone };
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SnapCraft</h2>
        </div>
        {/* Step Indicator */}
        <p className="text-lg text-gray-700 mb-6">Step {step} of 3</p>
        {/* Form Content */}
        {step === 1 && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Choose Your Style
            </h1>
            <div className="w-full max-w-md space-y-4 mb-6">
              {["Modern", "Vintage", "Minimalist"].map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={option}
                    checked={style === option}
                    onChange={(e) => setStyle(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
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
        {step === 2 && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Pick Your Color
            </h1>
            <div className="w-full max-w-md space-y-4 mb-6">
              {["Blue", "Red", "Green"].map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={option}
                    checked={color === option}
                    onChange={(e) => setColor(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
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
                disabled={!color}
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
        {step === 3 && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Set Your Tone
            </h1>
            <div className="w-full max-w-md space-y-4 mb-6">
              {["Casual", "Professional", "Playful"].map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={option}
                    checked={tone === option}
                    onChange={(e) => setTone(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
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
          </>
        )}
      </div>

    </div>
  );
}