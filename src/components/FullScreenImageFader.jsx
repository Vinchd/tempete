"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/TEMPETE_by_Fabien_Voileau_DAY_1_L1890655.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_1_L1890628.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_2_L1900550.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_2_L1900193.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_2_L1900512.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_1_L1890737.jpeg",
  "/TEMPETE_by_Fabien_Voileau_DAY_2_L1900295.jpeg",
];

export default function FullScreenImageFader() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Background ${index}`}
          sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
          fill={true}
          priority={index === 0}
          className={`absolute object-cover top-0 left-0 w-full h-full transition-opacity duration-3000 ease-in ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </>
  );
}
