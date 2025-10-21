import Image from "next/image";
import FullScreenImageFader from "@/components/FullScreenImageFader";

export default function Home() {
  return (
    <main className="relative h-full overflow-hidden">
      <FullScreenImageFader />
      <div className="z-20 absolute inset-0 bg-black/20" />
      <div className="z-30 absolute inset-0 flex flex-col justify-center items-center">
        <div className="relative w-2/3 max-sm:w-full h-full">
          <Image
            src="/logo_tempete.svg"
            alt="Logo Tempête"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
