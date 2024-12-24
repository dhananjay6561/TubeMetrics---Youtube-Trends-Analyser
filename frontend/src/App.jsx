import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import APIKeyInput from "./components/APIKeyInput";
import Settings from "./components/Settings";
import TrendingVideos from "./components/TrendingVideos";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

// Mocking process.env for environment variables
const process = {
  env: {
    REACT_APP_BACKEND_URL: "https://tubemetrics-youtube-trends-analyser.onrender.com", // Replace with your actual backend URL
  },
};

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [region, setRegion] = useState("US");
  const [maxResults, setMaxResults] = useState(50);
  const [category, setCategory] = useState("");
  const [videoDefinition, setVideoDefinition] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend URL from environment variable with fallback
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  console.log("Backend URL:", backendUrl); // Debugging line

  useEffect(() => {
    const storedApiKey = localStorage.getItem("youtubeApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const fetchTrendingVideos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${backendUrl}/api/trending`, {
        params: {
          region,
          maxResults,
          category,
          videoDefinition,
        },
      });
      setVideos(response.data);
    } catch (err) {
      console.error("Error fetching trending videos:", err);
      setError(
        "Failed to fetch trending videos. Please check the backend URL or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <Settings
          region={region}
          setRegion={setRegion}
          maxResults={maxResults}
          setMaxResults={setMaxResults}
          category={category}
          setCategory={setCategory}
          videoDefinition={videoDefinition}
          setVideoDefinition={setVideoDefinition}
        />
        <button
          onClick={fetchTrendingVideos}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 mb-8 font-semibold text-lg"
        >
          Fetch Trending Videos
        </button>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <TrendingVideos videos={videos} loading={loading} />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
