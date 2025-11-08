"use client";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="h-28 border-b border-lime-50 py-7 px-7  items-center ">
      {/* Left Section */}
      <div className="flex">
        <div className="mr-1 pl-6 flex flex-col items-center">
          <div className="flex ">
            <Image
              src="/jetlagtimelogo.png"
              alt="logo"
              height={1}
              width={30}
              
            />
          </div>

        </div>


        {/* Center Title */}
        <p className="text-2xl text-black font-semibold">JetLagTime</p>

        {/* Right side (can be empty for now or for future buttons) */}
        <div className="font-[Alan_Sans] flex space-x-4 items-center"></div>
        
      </div>
      <div className="flex pl-6 space-x-[410px]">
          <p className="text-gray-700 mt-4 text-sm tracking-wide">hours</p>
          <p className="text-gray-700 mt-4 text-sm tracking-wide">minutes</p>
          <p className="text-gray-700 mt-4 text-sm tracking-wide">seconds</p>
        </div>
    </div>


  );
}

export default Header;
