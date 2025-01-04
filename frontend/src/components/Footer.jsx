import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/dhananjay6561/TubeMetrics---Youtube-Trends-Analyser", 
      label: "GitHub",
      hoverColor: "hover:text-green-400"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/dhananjay6561/", 
      label: "LinkedIn",
      hoverColor: "hover:text-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:dhananjayaggarwal6561@gmail.com", 
      label: "Email",
      hoverColor: "hover:text-pink-400"
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-r from-purple-900 to-black text-white py-12">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-8">
          {/* Brand Section */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              YouTube Trends Analyzer
            </h3>
            <p className="text-gray-300">
              Analyzing YouTube trends with powerful insights and visualization tools.
            </p>
          </div>

          {/* Spacer for better distribution */}
          <div className="hidden lg:block lg:w-1/4"></div>

          {/* Connect Section */}
          <div className="w-full lg:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative"
                  aria-label={link.label}
                >
                  <div className="p-3 rounded-full transition-all duration-300 
                    group-hover:bg-purple-800/30 
                    group-hover:ring-2 group-hover:ring-offset-2 
                    group-hover:ring-offset-purple-900 group-hover:ring-purple-400">
                    <link.icon 
                      className={`w-6 h-6 transition-all duration-300 ${link.hoverColor}`} 
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-purple-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="flex items-center">
              Created with 
              <Heart className="w-5 h-5 mx-2 text-pink-400 animate-pulse" />
              by Dhananjay
            </p>
            <p className="text-sm text-gray-400">
              &copy; {currentYear} YouTube Trends Analyzer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;