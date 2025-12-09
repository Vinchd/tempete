import Papa from "papaparse";
import LogoTempete from "@/components/LogoTempete";

export const metadata = {
  title: "Menu - Tempête",
  description: "Découvrez le menu de Tempête.",
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
    <main className="relative flex flex-col pt-18 max-sm:pt-18 pb-8 h-full font-bold uppercase">
      <section className="overflow-y-auto cursor-default scrollbar-hide">
        <div className="flex flex-col items-center mx-auto text-[clamp(13px,2vw,15px)] max-sm:text-[clamp(8px,2.2vw,13px)] leading-4.5 max-sm:leading-3 tracking-tight">
          <div>
            <div className="flex justify-end">
              <div className="relative mb-12 w-[200px] max-sm:w-[150px] h-[200px] max-sm:h-[150px] overflow-visible">
                <LogoTempete className="top-0 right-46 max-sm:right-24 absolute w-full h-full text-secondary -rotate-90 origin-top-right" />
              </div>
            </div>
            {Object.entries(menuPrincipal).map(([category, items]) => (
              <div key={category}>
                <ul className="flex flex-col items-center mr-16 max-sm:mr-0 mb-8 max-sm:mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-center w-full">
                      <div className="flex gap-3 w-full max-w-full whitespace-nowrap">
                        <p className="flex-1 text-right">{item.nom}</p>
                        <p className="text-left">{item.prix}€</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="pr-16 max-sm:pr-0 w-full max-w-full text-right whitespace-nowrap">
              {"Vins Vivants // Cocktails // Cuisine Freestyle"}
            </div>
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
