import { FaInstagram } from "react-icons/fa";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center py-12 w-full min-h-full overflow-y-auto font-bold text-center uppercase tracking-tighter scrollbar-hide">
      <h1 className="mb-12 text-4xl">Horaires d'ouverture</h1>
      <p className="text-[22px]">Mardi au Samedi 19h-2h</p>
      <a
        href="tel:+33970667496"
        className="mt-8 text-[22px] hover:text-tertiary hover:scale-105 duration-300 ease-in"
      >
        09 70 66 74 96
      </a>
      <a
        href="https://maps.app.goo.gl/v7awqcWYoM9FNiuX6"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mt-6 mb-6 text-[22px] hover:text-tertiary hover:scale-105 transition duration-300 ease-in"
      >
        <p>5 Cour des Petites Écuries</p>
        <p>75010 Paris</p>
      </a>
      <a
        href="https://www.instagram.com/tempete.paris/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:text-tertiary hover:scale-105 transition duration-300 ease-in"
      >
        <FaInstagram className="w-9 h-9" />
      </a>
    </main>
  );
}
