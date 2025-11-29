"use client";

import { useEffect, useState } from "react";

export default function ReservationPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById("zenchef-iframe");
    if (iframe) {
      iframe.addEventListener("load", () => setIsLoaded(true));
    }
  }, []);

  return (
    <main className="relative flex flex-col justify-center items-center pt-20 pb-12 h-full font-bold uppercase">
      <section className="p-2 overflow-y-auto cursor-default scrollbar-hide">
        <div className="w-full max-w-2xl">
          <h1 className="mx-12 mb-12 max-sm:mb-6 text-4xl text-center uppercase">
            Réserver une table
          </h1>
          <div className="relative shadow-md rounded-2xl overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col justify-center items-center animate-pulse">
                <div className="bg-gray-300 mb-6 rounded w-2/3 h-8"></div>
                <div className="bg-gray-300 mb-4 rounded w-1/2 h-6"></div>
                <div className="bg-gray-300 rounded w-1/3 h-6"></div>
              </div>
            )}
            <iframe
              id="zenchef-iframe"
              src="https://bookings.zenchef.com/results?rid=360820&pid=1001&fullscreen=true"
              title="Réservation Zenchef"
              loading="lazy"
              className={`${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700 w-full p-4 max-sm:h-[600px] h-[570px]`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
