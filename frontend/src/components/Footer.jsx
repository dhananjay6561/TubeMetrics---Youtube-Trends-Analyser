export default function Footer() {
    return (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <p className="mb-4">&copy; 2024 YouTube Trending Analyzer. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/dhananjay6561/TubeMetrics---Youtube-Trends-Analysern-300">
              GitHub Repository
            </a>
            <a href="https://www.linkedin.com/in/dhananjay6561/" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    )
  }
  
  