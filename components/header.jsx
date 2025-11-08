"use client";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header className="w-full border-b border-lime-50 py-5 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Top Row: Logo + Title */}
      <div className="flex flex-wrap items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Image
            src="/jetlagtimelogo.png"
            alt="JetLagTime Logo"
            width={35}
            height={35}
            className="object-contain"
          />
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
            JetLagTime
          </p>
        </div>

        {/* (Optional Right Section for Future Buttons) */}
        <div className="hidden md:flex items-center space-x-4 font-[Alan_Sans]">
          {/* Add buttons or icons later */}
        </div>
      </div>

      {/* Bottom Row: Time Labels */}
      <div className="flex justify-center sm:justify-start md:justify-between pl-0 sm:pl-6 flex-wrap mt-3 gap-x-10 sm:gap-x-20 md:gap-x-40 lg:gap-x-[410px]">
        <p className="text-gray-700 text-sm sm:text-base tracking-wide">hours</p>
        <p className="text-gray-700 text-sm sm:text-base tracking-wide">minutes</p>
        <p className="text-gray-700 text-sm sm:text-base tracking-wide">seconds</p>
      </div>
    </header>
  );
}

export default Header;
