import Papa from "papaparse";

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
        <div className="flex flex-col items-center mx-auto max-w-3xl">
          <div className="mb-24">
            <h1 className="mb-16 max-sm:text-[clamp(32px,6vw,38px)] text-5xl text-center">
              Tempete
            </h1>
            {Object.entries(menuPrincipal).map(
              ([category, items], idx, arr) => (
                <div key={category} className="mx-6 mb-6">
                  <ul className="flex flex-col items-center gap-6">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col items-center my-1 w-full leading-[1.15]"
                      >
                        <div className="relative flex justify-center items-center w-full max-sm:text-[26px] text-center tracking-wide">
                          <p className="w-xs text-balance leading-7">
                            {item.nom}
                          </p>
                          <p className="right-0 absolute">{item.prix}</p>
                        </div>
                      </li>
                    ))}

                    {idx < arr.length - 1 && (
                      <hr className="my-8 border-primary border-t w-30" />
                    )}
                  </ul>
                </div>
              ),
            )}
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
