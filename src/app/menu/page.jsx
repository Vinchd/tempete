import Papa from "papaparse";
import Image from "next/image";

export const metadata = {
  title: "Menu - Tempête",
  description: "Découvrez le menu de Tempête.",
  openGraph: {
    title: "Menu - Tempête",
    description: "Parcourez le menu de Tempête.",
    url: `${new URL(process.env.NEXT_PUBLIC_SITE_URL)}/menu`,
    siteName: "Tempête",
    images: [
      {
        url: "/logo_tempete.svg",
        width: 267,
        height: 200,
        alt: "Logo Tempête",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

async function getMenu() {
  const res = await fetch(process.env.GOOGLE_SHEET_URL, {
    next: { revalidate: 10 }, // Revalidation toutes les 10s
  });

  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true }).data;

  const menuPrincipal = parsed.reduce((acc, { Id, Catégorie, Nom, Prix }) => {
    if (!Catégorie || !Nom) return acc;

    if (Catégorie === "Plat" || Catégorie === "Dessert") {
      if (!acc[Catégorie]) acc[Catégorie] = [];
      acc[Catégorie].push({
        id: Id,
        nom: Nom,
        prix: Prix?.replace(/,00$/, ""),
      });
    }

    return acc;
  }, {});

  return menuPrincipal;
}

export default async function page() {
  const menuPrincipal = await getMenu();

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Tempête",
    url: `${new URL(process.env.NEXT_PUBLIC_SITE_URL)}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 cour de Petites Écuries",
      addressLocality: "Paris",
      postalCode: "75010",
      addressCountry: "FR",
    },
    hasMenu: {
      "@type": "Menu",
      name: "Menu",
      hasMenuSection: Object.entries(menuPrincipal).map(
        ([category, items]) => ({
          "@type": "MenuSection",
          name: category,
          hasMenuItem: items.map((item) => ({
            "@type": "MenuItem",
            name: item.nom,
            offers: {
              "@type": "Offer",
              price: item.prix,
              priceCurrency: "EUR",
            },
          })),
        }),
      ),
    },
  };

  return (
    <main className="relative flex flex-col pt-20 max-sm:pt-18 pb-12 h-full font-bold uppercase">
      <section className="overflow-y-auto cursor-default scrollbar-hide">
        <div className="flex flex-col items-center mx-auto">
          <div className="">
            {/* <h1 className="mb-16 max-sm:text-[clamp(32px,6vw,38px)] text-5xl text-center">
              Tempete
            </h1> */}
            <div className="flex justify-center">
              <Image
                src="/logo_tempete.svg"
                alt="Logo Tempête"
                width={400}
                height={150}
                priority
                className=""
              />
            </div>
            {/* {Object.entries(menuPrincipal).map(([category, items]) => (
              <div key={category} className="">
                <ul className="flex flex-col items-end mb-16">
                  {items.map((item) => (
                    <li key={item.id} className="">
                      <div className="flex gap-3 max-sm:bg-amber-900 max-md:bg-blue-500 max-sm:text-[clamp(10px,1vw,12px)] max-md:text-[clamp(12px,2vw,16px)] tracking-tighter">
                        <p className="">{item.nom}</p>
                        <p className="">{item.prix}€</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
            {Object.entries(menuPrincipal).map(([category, items]) => (
              <div key={category}>
                <ul className="flex flex-col items-center mr-16 max-sm:mr-0 mb-16 max-sm:mb-6 text-[15px]">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-center w-full max-sm:text-[clamp(8px,2vw,13px)] max-md:text-[clamp(13px,2vw,15px)]"
                    >
                      <div className="flex gap-4 w-full max-w-full whitespace-nowrap">
                        <p className="flex-1 text-right">{item.nom}</p>
                        <p className="w-[60px] text-left">{item.prix}€</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </main>
  );
}
