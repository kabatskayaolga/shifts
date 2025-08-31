import Link from "@/components/ui/Link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Image
          className="dark:invert dark:brightness-0 dark:contrast-100 w-96 h-40"
          src="/logo.svg"
          alt="Doppentsolecker logo"
          width={400}
          height={160}
          priority
        />
        <h1 className=" typography-h3">Nicht gefunden</h1>
        <p>Die angeforderte Ressource wurde nicht gefunden.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link link={{ href: "/", title: "Zur Startseite" }} />
      </div>
    </>
  );
}
