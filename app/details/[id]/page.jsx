"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cars } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export default function ItemDetails() {
  const { id } = useParams();
  const car = cars[id];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!car) {
    return <p className="text-center text-red-500 mt-20">Car not found</p>;
  }

  const recommended = cars.filter((c, i) => c.type === car.type && i != id);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % car.image.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? car.image.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const contentVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="container mx-auto mt-20 px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Carousel */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="relative w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={`/${car.image[currentIndex]}`}
                  alt={car.name}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-[400px]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={goPrev}
              aria-label="Previous Image"
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={goNext}
              aria-label="Next Image"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
            >
              ▶
            </button>
          </div>

          {/* Dots under image */}
          <div className="flex gap-2 mt-4">
            {car.image.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-[#912d3f]" : "bg-[#912d12]/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Car details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{car.name}</h2>
          <p className="text-gray-500">{car.type}</p>
          <p className="text-2xl font-bold text-green-600 mt-3"> ₦ {car.price}</p>

          <span className="inline-block mt-3 bg-red-500 text-white px-4 py-1 rounded-full text-sm">
            {car.status}
          </span>

          {/* Contact buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="tel:+2349066068147">
              <button className="flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
                <Image
                  src="/images/phone.png"
                  alt="phone-icon"
                  width={20}
                  height={20}
                  className="w-6 h-auto"
                />
                <span className="font-medium">+234-465-544-555</span>
              </button>
            </a>
            <a>
              <button className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                <Image
                  src="/images/whatsapp.png"
                  alt="whatsapp-icon"
                  width={20}
                  height={20}
                  className="w-6 h-auto"
                />
                <span className="font-medium">+234-344-555-555</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Recommended products */}
      {recommended.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">
            More {car.type}s:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommended.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <Image
                  src={`/${rec.image[0]}`}
                  alt={rec.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h4 className="text-lg font-semibold">{rec.name}</h4>
                  <p className="text-gray-500">{rec.type}</p>
                  <p className="text-green-600 font-bold mt-1"> ₦ {rec.price}</p>
                  <Link href={`/details/${cars.indexOf(rec)}`}>
                    <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
