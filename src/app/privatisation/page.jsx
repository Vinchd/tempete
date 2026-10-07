import Image from "next/image";
import PrivatisationForm from "@/components/PrivatisationForm";

export const metadata = {
  title: "Privatisation / Groupe - Tempête",
  description:
    "Privatisez Tempête pour vos évènements et repas de groupe à partir de 10 personnes.",
};

export default function PrivatisationPage() {
  return (
    <main className="flex flex-col items-center gap-[clamp(8px,2dvh,20px)] px-6 pt-[clamp(56px,9dvh,80px)] pb-[clamp(12px,3dvh,24px)] h-full overflow-y-auto font-bold text-center uppercase tracking-tighter cursor-default scrollbar-hide">
      <h1 className="text-[clamp(24px,4.6dvh,36px)] text-balance leading-tight">
        <span className="whitespace-nowrap">Privatisation /</span> Groupe
      </h1>

      <div className="relative flex-1 rounded-2xl w-full max-w-3xl min-h-[12dvh] overflow-hidden basis-0">
        <Image
          src="/TEMPETE_salle_bas.jpg"
          alt="Salle du bas de Tempête : une cave voûtée en pierre avec une grande table en bois"
          sizes="(min-width: 768px) 768px, 100vw"
          fill
          priority
          className="object-[50%_65%] object-cover"
        />
      </div>

      <div className="w-full max-w-xl">
        <p className="mb-[clamp(8px,2dvh,16px)] text-[clamp(14px,2.2dvh,20px)] text-balance leading-snug">
          Pour toute demande de 10 personnes et plus, merci de nous écrire
          directement <span className="whitespace-nowrap">ci-dessous</span>.
        </p>
        <div className="mx-auto max-w-md">
          <PrivatisationForm />
        </div>
      </div>
    </main>
  );
}
