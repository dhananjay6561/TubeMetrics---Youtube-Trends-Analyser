export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <p className="mb-4">&copy; 2024 YouTube Trends Analyzer. All rights reserved.</p>
        <p className="mb-4">Created with ❣️ by Dhananjay</p>
        <div className="flex flex-wrap justify-center space-x-6">
          <a href="https://github.com/dhananjay6561/TubeMetrics---Youtube-Trends-Analyser" className="hover:underline">
            GitHub Repository
          </a>
          <a href="https://www.linkedin.com/in/dhananjay6561/" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
            Contact Me
          </a>
        </div>
      </div>
    </footer>
  );
}
