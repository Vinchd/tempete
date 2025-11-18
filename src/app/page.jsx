import Image from "next/image";

export default function Home() {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Tempête",
    image: "https://tempeteparis.fr/logo_tempete.jpg",
    "@id": "https://tempeteparis.fr",
    url: "https://tempeteparis.fr",
    telephone: "+33 9 70 66 74 96",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 Cour des Petites Écuries",
      addressLocality: "Paris",
      postalCode: "75010",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.87239,
      longitude: 2.35317,
    },
    servesCuisine: ["Française", "Fusion"],
    priceRange: "€€",
    openingHours: ["Tu-Sa 19:00-02:00"],
  };

  return (
    <main className="relative h-full overflow-hidden">
      <Image
        src="/TEMPETE_by_Fabien_Voileau_DAY_2_L1900512.jpeg"
        alt="Background Tempête"
        sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
        fill
        priority
        className="top-0 left-0 absolute w-full h-full object-cover"
      />
      <div className="z-20 absolute inset-0 bg-black/20" />
      <div className="z-30 absolute inset-0 flex flex-col justify-center items-center">
        <div className="relative w-2/3 max-sm:w-full h-full -translate-y-[3%]">
          <Image
            src="/logo_tempete.svg"
            alt="Logo Tempête"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </main>
  );
}
