import React from "react";
import { Clock } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-white/10 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-[58px] py-6 flex flex-col sm:flex-row items-center justify-between text-gray-700 text-sm">
        {/* Left side — logo or brand */}
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">TimeClock</span>
        </div>

        {/* Center — nav links (optional placeholder) */}
        <div className="flex gap-6 mt-4 sm:mt-0">
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
        <div className="mt-4 sm:mt-0 text-gray-600">
          © {new Date().getFullYear()} TimeClock. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
