"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

const cities = [
  {
    name: "New York",
    zone: "America/New_York",
    image: "/Lights_of_Rockefeller_Center_during_sunset.jpg",
  },
  {
    name: "London",
    zone: "Europe/London",
    image: "/london.jpg",
  },
  {
    name: "Tokyo",
    zone: "Asia/Tokyo",
    image: "/e3df4ea66b17c3f9303171ff7f64678d-24206-TokyoHelicopterTour-005.jpg",
  },
  {
    name: "Dubai",
    zone: "Asia/Dubai",
    image: "/dubai-marina-hd.jpg",
  },
  {
    name: "Paris",
    zone: "Europe/Paris",
    image: "/753564-visuel-paris-tour-eiffel-rue.jpg",
  },
  {
    name: "Sydney",
    zone: "Australia/Sydney",
    image: "/vzvmnbw5xkbxrwhj7kva.jpg",
  },
];

function Location() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      cities.forEach((city) => {
        newTimes[city.name] = DateTime.now()
          .setZone(city.zone)
          .toFormat("HH:mm:ss");
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-b text-black">
      {/* Input Section */}
      <div className="w-[1200px] max-w-full px-6">
        <input
          className="border px-4 h-12 w-full rounded-xl border-gray-200 bg-white/70 backdrop-blur-md 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all shadow-sm"
          placeholder="Enter your location"
          type="text"
        />
      </div>

      {/* City Cards */}
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 px-6 w-full max-w-[1200px] border-b-[1px] border-gray-500 pb-10">
        {cities.map((city, index) => (
          <div
            key={index}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-white/10 
            group hover:shadow-cyan-400/20 hover:scale-[1.03] transition-all duration-500 ease-out"
          >
            <img
              src={city.image}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end items-center h-full pb-5 text-white select-none">
              <h2 className="text-lg font-semibold tracking-wide drop-shadow-sm">
                {city.name}
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-3xl font-mono font-light">{times[city.name]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Location;

