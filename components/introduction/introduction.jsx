"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./introduction.css";

function Introduction() {
  const [slideUp, setSlideUp] = useState(false);

  // Slide-up animation
  const slideUpVariant = {
    initial: {
      top: 0,
      position: "fixed",
      width: "100%",
      height: "100%",
      background: "#fff", // optional: white background until it slides
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    animate: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  useEffect(() => {
    // wait 5s (for glowing effect) then slide up
    const timer = setTimeout(() => setSlideUp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="intro-wrapper"
      variants={slideUpVariant}
      initial="initial"
      animate={slideUp ? "animate" : "initial"}
    >
      {/* Glow effect on the image */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(255,0,0,0)", // start (transparent red)
            "0 0 40px rgba(255,0,0,0.8)", // glow peak (bright red)
            "0 0 0px rgba(255,0,0,0)", // fade out
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity, // keeps pulsing while waiting
        }}
        className="rounded-full p-4"
      >
        <Image
          src="/images/Abiola-Motors.jpg"
          width={128}
          height={128}
          alt="Abiola Motors Logo"
          className="w-30 md:w-40 h-auto rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}

export default Introduction;
