import { motion } from "framer-motion";

export default function TrendingVideos({ videos, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-16 h-16 border-t-4 border-black border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No videos to display. Click "Fetch Trending Videos" to get started!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">{video.channelName}</p>
            <p className="text-gray-500 text-sm">
              {video.viewCount || "N/A"} Views
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
