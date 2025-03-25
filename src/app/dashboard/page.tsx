"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import axios from "axios";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [descriptionPrompt, setDescriptionPrompt] = useState("");
  const [description, setDescription] = useState("");
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
        .select("name, subscription_status")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching preferences:", error.message);
        return;
      }

      setName(data?.name || "");
      setIsSubscribed(data?.subscription_status === "active");
    };
    fetchUserData();
  }, [router]);

  const handleGenerateImage = async () => {
    if (!isSubscribed) return;
    const { data } = await axios.post("/api/generate", { prompt: imagePrompt });
    setImage(data.imageUrl);
  };

  const handleGenerateDescription = async () => {
    if (!isSubscribed) return;
    const { data } = await axios.post("/api/generate", { prompt: descriptionPrompt, type: "caption" });
    setDescription(data.captionText);
    setDescriptionPrompt(""); // Clear the prompt after generating
  };

  const handlePostToInstagram = async () => {
    if (!image || !description) return;
    await axios.post("/api/post/instagram", { imageUrl: image, caption: description });
    alert("Posted to Instagram!");
  };

  const handlePostToX = async () => {
    if (!image || !description) return;
    await axios.post("/api/post/x", { imageUrl: image, caption: description });
    alert("Posted to X!");
  };

  return (
      <div className="flex flex-col items-center  lg:text-left px-2 py-12 bg-white">
        <div className="mb-4">
    <a href="/issues" className="text-blue-600 hover:underline">
      Report a Bug
    </a>
  </div>
        {/* Personalized Greeting */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Welcome, {name || "User"}!
        </h1>
        {/* Slogan */}
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Create Your Post, {name || "User"}!
        </p>
        {/* Paywall */}
        {!isSubscribed && (
          <div className="w-full max-w-md bg-yellow-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-yellow-800">Subscribe to unlock post generation!</p>
            <button
              onClick={() => alert("Subscribe via /api/stripe/checkout (to be implemented)")}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Subscribe Now ($10/month)
            </button>
          </div>
        )}
        {/* Image Prompt Textbox */}
        <input
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          placeholder="Enter image prompt (e.g., Bold Instagram post for a coffee shop)"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600 mb-4"
          disabled={!isSubscribed}
        />
        <button
          onClick={handleGenerateImage}
          className="w-full max-w-md flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors mb-6"
          disabled={!isSubscribed}
        >
          Generate Image
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
        {/* Image Container */}
        <div className="w-full max-w-md mb-6 bg-white p-4 rounded-lg shadow-md">
          {image ? (
            <img src={image} alt="Generated Post" className="w-full rounded-lg" />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Placeholder
            </div>
          )}
        </div>
        {/* Description Textbox and Button */}
        <input
          value={descriptionPrompt}
          onChange={(e) => setDescriptionPrompt(e.target.value)}
          placeholder="Enter description prompt or edit result"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600 mb-2"
          disabled={!isSubscribed}
        />
        <button
          onClick={handleGenerateDescription}
          className="w-full max-w-md flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors mb-6"
          disabled={!isSubscribed}
        >
          Generate Description
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Generated description will appear here"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600 mb-6 h-24"
          disabled={!isSubscribed}
        />
        {/* Post Buttons */}
        <div className="w-full max-w-md flex space-x-4">
          <button
            onClick={handlePostToInstagram}
            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            disabled={!isSubscribed || !image || !description}
          >
            Post to Instagram
          </button>
          <button
            onClick={handlePostToX}
            className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            disabled={!isSubscribed || !image || !description}
          >
            Post to X
          </button>
        </div>
      </div>

  );
}