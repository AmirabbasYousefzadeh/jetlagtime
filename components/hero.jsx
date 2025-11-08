"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [time, setTime] = useState("00:00:00");

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        const timezone = data.timezone?.id || "UTC";

        const getTime = () => {
          const now = new Date().toLocaleString("en-US", { timeZone: timezone });
          setTime(formatTime(new Date(now)));
        };

        getTime();
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }

    fetchLocation();
  }, []);

  const digits = time.split("");

  return (
    <section className="mt-6 flex items-center justify-center bg-[#DFDDD9] bg-gradient-to-b from-[#E1E0DC] to-[#DFDDD9] font-[Saira] text-black h-[120px] sm:h-[160px] md:h-[190px] lg:h-[220px]">
      <div className="flex flex-wrap justify-center">
        {digits.map((digit, i) => (
          <div
            key={i}
            className="relative flex justify-center items-center 
                       w-[60px] h-[100px]
                       sm:w-[90px] sm:h-[130px]
                       md:w-[120px] md:h-[160px]
                       lg:w-[150px] lg:h-[190px]
                       overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={digit}
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 150, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute select-none font-semibold leading-none
                           text-[120px] sm:text-[180px] md:text-[220px] lg:text-[260px]"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
