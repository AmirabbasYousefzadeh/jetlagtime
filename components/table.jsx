"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

// Default world cities
const cities = [
  { country: "USA", city: "New York", zone: "America/New_York" },
  { country: "UK", city: "London", zone: "Europe/London" },
  { country: "France", city: "Paris", zone: "Europe/Paris" },
  { country: "UAE", city: "Dubai", zone: "Asia/Dubai" },
  { country: "India", city: "New Delhi", zone: "Asia/Kolkata" },
  { country: "China", city: "Beijing", zone: "Asia/Shanghai" },
  { country: "Japan", city: "Tokyo", zone: "Asia/Tokyo" },
  { country: "Australia", city: "Sydney", zone: "Australia/Sydney" },
];

function Table() {
  const [times, setTimes] = useState({});
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user's location via IP
  useEffect(() => {
    async function getLocation() {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        const locRes = await fetch(`https://ipwho.is/${ip}`);
        const data = await locRes.json();

        if (data.success) {
          setUserLocation({
            country: data.country,
            city: data.city,
            zone: data.timezone.id,
          });
        } else {
          console.warn("Location lookup failed:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch location", error);
      }
    }

    getLocation();
  }, []);

  // Update times every second
  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      const allCities = userLocation ? [userLocation, ...cities] : cities;
      allCities.forEach((c) => {
        newTimes[c.city] = DateTime.now()
          .setZone(c.zone)
          .toFormat("HH:mm:ss");
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [userLocation]);

  const allRows = userLocation ? [userLocation, ...cities] : cities;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6">
      <div className="border rounded-xl border-white/10 bg-white/70 shadow-sm backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2 border-b border-b-[#DFDDD9] bg-white/40 font-semibold text-gray-700 text-sm sm:text-base">
          <div className="flex items-center justify-center py-3 border-r border-r-[#DFDDD9]">
            Country / City
          </div>
          <div className="flex items-center justify-center py-3">
            Local Time
          </div>
        </div>

        {/* Rows */}
        {allRows.map((c, index) => (
          <div
            key={c.city}
            className={`grid grid-cols-2 text-sm sm:text-base border-b border-b-[#DFDDD9] 
              ${index % 2 === 0 ? "bg-white/50" : "bg-white/30"} 
              ${userLocation && index === 0 ? "font-semibold text-teal-700" : ""}
              `}
          >
            <div className="flex items-center justify-center py-2 px-2 border-r border-r-[#DFDDD9] text-gray-800 text-center">
              {c.country} — {c.city}
            </div>
            <div className="flex items-center justify-center py-2 px-2 text-gray-900 font-mono text-center">
              {times[c.city] || "--:--:--"}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive hint on small devices */}
      <p className="text-xs text-gray-500 text-center mt-3 sm:hidden">
        Swipe → to view all cities
      </p>
    </div>
  );
}

export default Table;
