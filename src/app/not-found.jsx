import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-16 h-[100dvh] min-h-screen font-bold uppercase">
      <div className="text-4xl">Page non trouvée</div>
      <Link
        href="/"
        className="hover:bg-tertiary px-6 py-4 border-3 rounded-4xl w-fit text-[23px] hover:text-primary text-center"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
