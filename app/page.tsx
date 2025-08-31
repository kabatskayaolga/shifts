import Schifts from "./shifts/Schifts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-8 flex-wrap">
        <Image
          className="dark:invert dark:brightness-0 dark:contrast-100 w-80 h-24"
          src="/logo.svg"
          alt="Doppentsolecker logo"
          width={320}
          height={96}
          priority
        />
        <h1 className=" typography-h3">Dienstpläne für September</h1>
      </div>
      <Schifts />
    </>
  );
}
