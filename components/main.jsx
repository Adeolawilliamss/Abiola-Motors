"use client";

import Link from "next/link";
import { useState } from "react";
import { cars } from "@/utils/data";

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Filter cars based on both search term + dropdown
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? car.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  return (
    <section className="bg-white mt-32 w-full min-h-screen">
      <div className="mx-auto flex flex-col md:flex-row justify-between gap-6 px-8 lg:px-16 py-6">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 flex items-center rounded-2xl border-2 border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:border-red-500">
          <input
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none px-2 text-gray-700"
          />
          <button className="text-gray-500 hover:text-red-500">🔍</button>
        </div>

        {/* Dropdown */}
        <div className="w-full md:w-1/2 flex items-center rounded-2xl border-2 border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:border-red-500">
          <select
            id="cars"
            name="cars"
            className="w-full bg-transparent outline-none text-gray-700"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Find a car model</option>
            <option value="Toyota">Toyota</option>
            <option value="Lexus">Lexus</option>
            <option value="Honda">Honda</option>
            <option value="Audi">Audi</option>
          </select>
        </div>
      </div>

      {/* Contact row */}
      <div className="flex justify-center mt-10 py-10 px-6 md:px-16">
        <div className="flex flex-row w-96 text-center items-center border border-black rounded-md p-3">
          <img
            src="/globe.svg"
            alt="spinning"
            className="w-6 h-6 animate-spin mr-5"
          />
          <div className="border-l border-black pl-3">
            <a
              href="tel:+2349066068147"
              className="text-black text-sm hover:text-red-500"
            >
              +234-906-606-8147
            </a>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 lg:px-16 mb-10 gap-8 justify-items-center">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={`/${car.image[0]}`}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {car.status}
                </span>
              </div>

              {/* Car Details */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {car.type}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {car.name}
                </div>
                <div className="text-lg md:text-xl font-bold text-green-600">
                  ₦ {car.price}
                </div>
              </div>

              {/* CTA */}
              <Link href={`/details/${index}`}>
                <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No cars found
          </p>
        )}
      </div>
    </section>
  );
}
