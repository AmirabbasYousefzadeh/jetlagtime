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
      // Include user's location if available
      const allCities = userLocation
        ? [userLocation, ...cities]
        : cities;

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
    <div className="h-auto px-[58px] py-4">
      <div className="border rounded-xl border-white/10 bg-white/70 shadow-sm backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="h-10 border-b border-b-[#DFDDD9] flex bg-white/40 font-semibold text-gray-700">
          <div className="w-[600px] border-r border-r-[#DFDDD9] flex items-center justify-center">
            Country / City
          </div>
          <div className="w-[600px] flex items-center justify-center">
            Local Time
          </div>
        </div>

        {/* Rows */}
        {allRows.map((c, index) => (
          <div
            key={c.city}
            className={`h-10 flex border-b border-b-[#DFDDD9] ${
              index % 2 === 0 ? "bg-white/50" : "bg-white/30"
            } ${userLocation && index === 0 ? "font-semibold text-teal-700" : ""}`}
          >
            <div className="w-[600px] border-r border-r-[#DFDDD9] flex items-center justify-center text-gray-800">
              {c.country} — {c.city}
            </div>
            <div className="w-[600px] flex items-center justify-center text-gray-900 font-mono">
              {times[c.city] || "--:--:--"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
