import React from 'react';
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-900 to-black text-white p-8"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.h1 
          className="text-5xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300"
          whileHover={{ scale: 1.02 }}
        >
          TubeMetrics
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover what's trending on YouTube in just a few clicks!
        </motion.p>
      </div>
    </motion.header>
  );
}