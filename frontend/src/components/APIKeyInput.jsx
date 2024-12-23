import { useState } from "react";
import { motion } from "framer-motion";

export default function APIKeyInput({ apiKey, setApiKey }) {
  const [inputKey, setInputKey] = useState(apiKey || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (inputKey.length < 10) {
      setError("API key must be at least 10 characters long");
      return;
    }
    setApiKey(inputKey);
    localStorage.setItem("youtubeApiKey", inputKey);
    setError("");
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">API Key Setup</h2>
      <div className="flex space-x-4">
      <input
  type="text"
  value={inputKey}
  onChange={(e) => setInputKey(e.target.value)}
  placeholder="Enter your API key"
  className="flex-grow border border-gray-300 rounded-md px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
/>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
        >
          Save API Key
        </motion.button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {!apiKey && (
        <p className="text-gray-500 mt-2">Enter API Key to get started!</p>
      )}
    </div>
  );
}
