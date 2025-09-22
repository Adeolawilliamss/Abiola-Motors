"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import useDimension from "@/hooks/useDimension";
import Model from "@/components/model";
import Navbar from "@/components/navbar";

export default function Home() {
  const device = useDimension();
  const frustumSize = device.height;
  const aspect = device.width / device.height;

  return (
    <main>
      <div className="relative w-full h-screen">
        <Navbar />
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url(/images/Autohead3.jpg)] bg-cover bg-center">
          <div className="absolute inset-0 bg-white/20 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/40 sm:to-white/2"></div>

          {/* Text inside background */}
          <div className="relative mx-auto max-w-screen px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 lg:pb-24">
            <div className="max-w-xl text-center sm:text-left ">
              <h1
                className={`text-4xl font-extrabold text-white dark:text-red-500 md:text-5xl`}
              >
                NEW SEASONS ARRIVALS
              </h1>

              <p className="mt-4 max-w-lg text-lg text-white md:text-3xl sm:leading-relaxed">
                CHECK OUT LATEST CARS
              </p>
            </div>
          </div>
        </div>

        {/* 3D Canvas Layer */}
        <Canvas>
          <OrthographicCamera
            makeDefault
            args={[
              (frustumSize * aspect) / -2,
              (frustumSize * aspect) / 2,
              frustumSize / 2,
              frustumSize / -2,
              -1000,
              1000,
            ]}
            position={[0, 0, 2]}
          />
          <Model />
        </Canvas>
      </div>
    </main>
  );
}
