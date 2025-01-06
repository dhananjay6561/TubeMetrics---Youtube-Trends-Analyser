import React from 'react';
import { motion } from "framer-motion";

export default function Settings({
  region,
  setRegion,
  maxResults,
  setMaxResults,
  category,
  setCategory,
  videoDefinition,
  setVideoDefinition,
}) {
  const regions = ["US", "IN", "UK", "CA", "AU"];
  const categories = ["", "Music", "Gaming", "Education", "Entertainment"];
  const definitions = ["", "HD", "SD"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="mb-12 p-6 bg-white rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Choose Parameters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-gray-700 font-medium block">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-gray-700 font-medium block">
            Max Results: {maxResults}
          </label>
          <motion.input
            type="range"
            min="10"
            max="50"
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-200"
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-gray-700 font-medium block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          >
            {categories.map(c => <option key={c} value={c}>{c || "All"}</option>)}
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-gray-700 font-medium block">Video Definition</label>
          <select
            value={videoDefinition}
            onChange={(e) => setVideoDefinition(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          >
            {definitions.map(d => <option key={d} value={d}>{d || "All"}</option>)}
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
}