"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  const navData = [
    { linkto: "/about", name: "About" },
    { linkto: "/speakers", name: "Speakers" },
    { linkto: "/schedule", name: "Schedule" },
    { linkto: "/workshop", name: "Workshops" },
    { linkto: "/expo", name: "Expo" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 z-60
          flex items-center justify-between
          px-6 w-full h-15 bg-red-500 shadow-md

          md:top-6 md:left-1/2 md:-translate-x-1/2
          md:max-w-[63rem]
          md:rounded-full md:px-16 md:py-4
        `}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/Abiola-Motors.jpg"
            alt="FacelessCon Logo"
            width={55}
            height={49}
            className="h-auto w-8 lg:w-[40px]"
          />
          <span className="text-lg md:text-2xl font-bold text-white">
            Abiola Motors
          </span>
        </div>

        {/* Desktop Nav */}
        <div>
          <ul className="flex justify-between text-white gap-4 md:gap-10">
            <Link href={'/about'}>
              <li className="hover:underline text-sm md:text-md lg:text-lg">
                About
              </li>
            </Link>
            <li className="hover:underline text-sm md:text-md lg:text-lg">
              <a href="tel:+2349066068147">
                <Image
                  src="/images/phone.png"
                  alt="FacelessCon Logo"
                  width={10}
                  height={10}
                  className="h-auto w-5 lg:w-7"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
