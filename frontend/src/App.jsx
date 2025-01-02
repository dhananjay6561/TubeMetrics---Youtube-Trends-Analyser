import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import Settings from "./components/Settings";
import TrendingVideos from "./components/TrendingVideos";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { AlertTriangle } from "lucide-react";

export default function App() {
  const [region, setRegion] = useState(() => localStorage.getItem("region") || "US");
  const [maxResults, setMaxResults] = useState(() => Number(localStorage.getItem("maxResults")) || 50);
  const [category, setCategory] = useState(() => localStorage.getItem("category") || "");
  const [videoDefinition, setVideoDefinition] = useState(() => localStorage.getItem("videoDefinition") || "");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backendUrl, setBackendUrl] = useState(null);


  useEffect(() => {
    localStorage.setItem("region", region);
    localStorage.setItem("maxResults", maxResults.toString());
    localStorage.setItem("category", category);
    localStorage.setItem("videoDefinition", videoDefinition);
  }, [region, maxResults, category, videoDefinition]);


  const resolveBackendUrl = useCallback(async (retryCount = 0) => {
    const primaryUrl = "https://tube-metrics-youtube-tr-git-46989e-dhananjay-aggarwals-projects.vercel.app";
    const fallbackUrl = "http://127.0.0.1:5000";
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    try {
      const response = await fetch(`${primaryUrl}/health`, { 
        method: "HEAD",
        timeout: 5000
      });
      
      if (response.ok) {
        setBackendUrl(primaryUrl);
        setError("");
      } else {
        throw new Error("Primary URL not accessible");
      }
    } catch (error) {
      console.warn(`Backend resolution attempt ${retryCount + 1} failed:`, error.message);
      
      if (retryCount < maxRetries) {
        setTimeout(() => resolveBackendUrl(retryCount + 1), retryDelay);
      } else {
        console.warn("Falling back to localhost");
        setBackendUrl(fallbackUrl);
        setError("Using fallback server. Some features may be limited.");
      }
    }
  }, []);

  useEffect(() => {
    resolveBackendUrl();
  }, [resolveBackendUrl]);

  const fetchTrendingVideos = async () => {
    if (!backendUrl) {
      setError("Backend service is not available. Please try again later.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await axios.get(`${backendUrl}/api/trending`, {
        params: {
          region,
          maxResults,
          category,
          videoDefinition,
        },
        signal: controller.signal
      });

      clearTimeout(timeout);
      
      if (response.data && Array.isArray(response.data)) {
        setVideos(response.data);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching trending videos:", err);
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (err.response?.status === 429) {
        setError("Too many requests. Please wait a moment and try again.");
      } else {
        setError(
          "Failed to fetch trending videos. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Settings
              region={region}
              setRegion={setRegion}
              maxResults={maxResults}
              setMaxResults={setMaxResults}
              category={category}
              setCategory={setCategory}
              videoDefinition={videoDefinition}
              setVideoDefinition={setVideoDefinition}
              disabled={loading}
            />
            <button
              onClick={fetchTrendingVideos}
              disabled={loading || !backendUrl}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 mb-8 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Fetch Trending Videos"
              )}
            </button>
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md">
                <AlertTriangle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <TrendingVideos videos={videos} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}