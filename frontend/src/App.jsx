import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Settings from "./components/Settings";
import TrendingVideos from "./components/TrendingVideos";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";


export default function App() {
  const [region, setRegion] = useState("US");
  const [maxResults, setMaxResults] = useState(50);
  const [category, setCategory] = useState("");
  const [videoDefinition, setVideoDefinition] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  const backendUrl = "http://tubemetricsbackend.vercel.app/";

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
        "Failed to fetch trending videos. It's likely that the backend server is down. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-8">
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
            />
            <button
              onClick={fetchTrendingVideos}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 mb-8 font-semibold text-lg"
            >
              Fetch Trending Videos
            </button>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
