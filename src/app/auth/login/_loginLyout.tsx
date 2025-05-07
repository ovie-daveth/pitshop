"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import woman from "../../../../public/images/woman.png";
import laptop from "../../../../public/images/laptop.png";
import forex from "../../../../public/images/forex.png";
import logo from "../../../../public/logo.svg";
import icon from "../../../../public/logoicon.svg";
import Image from "next/image";

export default function LoginLayout({ children, loginIndex, setLoginIndex }: { children: React.ReactNode, loginIndex: number, setLoginIndex: Dispatch<SetStateAction<number>>}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalSteps = 7


  // Array of images for the carousel
  const images = [laptop, woman, forex];

  // Auto-swipe every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);



  return (
    <div className="flex xl:gap-32 gap-10 min-h-screen w-full xl:px-7 md:py-5 sm:px-10 px-5">
      {/* Left side - Marketing content */}
      <div className="hidden lg:flex w-[500px] max-h-[95vh] bg-gray-800 relative rounded-3xl">
        <div className="absolute inset-0 bg-black/30 z-10 rounded-3xl border-none"></div>
        <div className="relative z-20 p-8 flex flex-col h-full rounded-3xl border-none">
          <div className="mb-auto">
            <Link href="/" className="flex items-center w-fit">
              <div className="text-[#4AE290] flex items-center gap-2">
                <Image src={icon} alt="icon" width={50} height={50} className="w-8 h-8" />
                <Image src={logo} alt="logo" width={150} height={150} className="w-36 mt-2" />
              </div>
            </Link>
          </div>

          <div className="mt-auto">
            <h2 className="text-white text-3xl font-bold">
              Built for <span className="text-[#4AE290]">scale.</span>
              <br />
              Designed for <span className="text-[#4AE290]">precision.</span>
            </h2>
            <p className="text-white/80 mt-4">
              Plumetrix connects your business operations and ad performance — so you can run leaner, scale faster, and
              spend smarter.
            </p>

            {/* Progress bar */}
            <div className="flex mt-8 space-x-2 bg-gray-600 w-fit p-1 rounded-full">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded-full relative overflow-hidden ${
                    index === currentImageIndex ? "bg-[#4AE290]" : "bg-gray-500"
                  }`}
                >
                  {index === currentImageIndex && (
                    <div
                      className="absolute inset-0 bg-[#4AE290] animate-wipe"
                      style={{ animationDuration: "10s" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image carousel */}
                <div className="absolute inset-0 z-0 rounded-3xl border-none overflow-hidden">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className={`object-cover rounded-3xl border-none absolute transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right side - Form content */}
        <div className="xl:pr-10 mx-auto lg:px-0 w-[700px]">
            <div className="w-full flex justify-between items-start">
                <div></div>
                <div className="gap-2 justify-end p-3 rounded-full border w-fit text-[#3A6B6B] text-xs xl:text-base lg:text-sm hidden sm:flex">
                            <span> Not a member? </span>
                            <Link href="/auth" className=" hover:underline">
                            Create an account
                            </Link>
                </div>
            </div>
          <div className="flex-1 flex flex-col items-center justify-center pb-12 w-full mt-24">
            <div className="w-full">{children}</div>
          </div>
        </div>
      {/* CSS for wipe animation */}
      <style jsx>{`
        @keyframes wipe {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-wipe {
          animation: wipe 10s linear forwards;
        }
      `}</style>
    </div>
  );
}