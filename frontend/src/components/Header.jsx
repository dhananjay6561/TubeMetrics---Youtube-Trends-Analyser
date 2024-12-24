import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-black text-white p-6">
      <div className="container mx-auto max-w-5xl text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-2">TubeMetrics</h1>
        <p className="text-gray-400 mb-6 text-center">
          Discover what's trending on YouTube in just a few clicks!
        </p>
      </div>
    </header>
  );
}
