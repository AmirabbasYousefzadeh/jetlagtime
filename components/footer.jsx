import React from "react";
import { Clock } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-white/10 bg-white/60 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700 text-sm">
        {/* Left side — logo or brand */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">TimeClock</span>
        </div>

        {/* Center — nav links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-0 text-center">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            World Clock
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div>

        {/* Right side — copyright */}
        <div className="mt-4 sm:mt-0 text-center sm:text-right text-gray-600 text-xs sm:text-sm">
          © {new Date().getFullYear()} <span className="font-medium text-gray-800">TimeClock</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
