import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import "./globals.css";

const helvetica = localFont({
  variable: "--font-helvetica",
  src: [
    {
      path: "./fonts/helvetica/Helvetica-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/Helvetica-LightOblique.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/Helvetica.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/Helvetica-Oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/Helvetica-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/Helvetica-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Tempête",
  description:
    "Du Mardi au Samedi, de 19h jusqu’à 2h. 5 cour des Petites Écuries Paris 10. Fusion food & natural wine.",
  keywords: [
    "restaurant",
    "paris",
    "restau",
    "tempete",
    "bar",
    "fusion",
    "food",
    "fusion food",
    "natural",
    "wine",
    "natural wine",
  ],
  creator: "Vincent Daviaud",
  publisher: "Vincent Daviaud",
  openGraph: {
    title: "Tempête",
    description:
      "Du Mardi au Samedi, de 19h jusqu’à 2h. 5 cour des Petites Écuries Paris 10. Fusion food & natural wine.",
    url: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    siteName: "Tempête",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo_tempete.jpg`,
        width: 1080,
        height: 1000,
        alt: "Logo Tempête",
      },
    ],
    locale: "fr_FR",
    type: "website",
    twitter: {
      card: "summary_large_image",
      title: "Tempête",
      description:
        "Du Mardi au Samedi, de 19h jusqu’à 2h. 5 cour des Petites Écuries Paris 10. Fusion food & natural wine.",
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/logo_tempete.jpg`],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-dvh">
      <body
        className={`${helvetica.className} ${helvetica.variable} antialiased h-dvh bg-primary text-secondary`}
      >
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
