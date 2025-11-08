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
    <section className="mt-9 flex bg-[#DFDDD9] items-center justify-center h-[190px] bg-gradient-to-b font-[Saira] text-black">
      <div className="flex">
        {digits.map((digit, i) => (
          <div key={i} className="relative w-[150px] h-[190px] overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={digit}
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 150, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute text-[260px] font-semibold leading-none select-none"
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
