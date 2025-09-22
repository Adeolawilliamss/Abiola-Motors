"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 py-20">
      {/* Futuristic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-600/30 rounded-full blur-3xl animate-pulse" />

      {/* Left Content */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex-1 flex flex-col items-start space-y-6 max-w-xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          About Us
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-gray-300">
          We are driven by a passion for{" "}
          <span className="text-red-400">automotive excellence</span>, bringing
          the latest models and trends to enthusiasts everywhere. Our platform
          connects <span className="text-red-500">buyers</span>,
          <span className="text-red-500">sellers</span>, and{" "}
          <span className="text-red-500">dealers</span>, creating a trusted hub
          to explore, compare, and own your dream car.
        </p>
        <a href="tel:+2349066068147">
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition">
            Click to Call Us
          </button>
        </a>
      </motion.div>

      {/* Right Visual */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="z-10 flex-1 flex justify-center mt-10 laptop:mt-0"
      >
        <Image
          src="/images/Autohead1.jpeg"
          alt="Futuristic Concept"
          width={500}
          height={500}
          className="rounded-2xl shadow-2xl border border-red-500/30"
        />
      </motion.div>
    </section>
  );
}
