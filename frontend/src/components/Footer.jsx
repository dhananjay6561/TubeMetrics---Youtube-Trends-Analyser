import React from 'react';
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-black text-white py-12">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <p className="mb-4 text-gray-300">&copy; 2024 YouTube Trends Analyzer. All rights reserved.</p>
        <p className="mb-6 text-lg">Created with <span className="text-pink-400">❣️</span> by Dhananjay</p>
        <div className="flex flex-wrap justify-center gap-8">
          <motion.a 
            href="https://github.com/dhananjay6561/TubeMetrics---Youtube-Trends-Analyser"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub Repository
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/dhananjay6561/"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </div>
      </div>
    </footer>
  );
}