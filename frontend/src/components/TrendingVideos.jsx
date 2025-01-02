import React from 'react';
import { motion } from "framer-motion";

export default function TrendingVideos({ videos, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-500 text-xl p-12"
      >
        No videos to display. Click "Fetch Trending Videos" to get started!
      </motion.p>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {videos.map((video) => (
        <motion.div
          key={video.id}
          className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -8 }}
        >
          <div className="relative group">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.svg
                className="w-16 h-16 text-white"
                whileHover={{ scale: 1.1 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              </motion.svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
              {video.title}
            </h3>
            <p className="text-purple-600 font-medium mb-2">{video.channelName}</p>
            <p className="text-gray-600 text-sm">
              {video.viewCount?.toLocaleString() || "N/A"} Views
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}