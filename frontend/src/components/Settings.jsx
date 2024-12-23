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

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="region" className="block mb-2 font-medium">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="maxResults" className="block mb-2 font-medium">
            Max Results: {maxResults}
          </label>
          <motion.input
            type="range"
            id="maxResults"
            min="10"
            max="50"
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
            className="w-full bg-white text-black"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c || "All"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="videoDefinition" className="block mb-2 font-medium">
            Video Definition
          </label>
          <select
            id="videoDefinition"
            value={videoDefinition}
            onChange={(e) => setVideoDefinition(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            {definitions.map((d) => (
              <option key={d} value={d}>
                {d || "All"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
