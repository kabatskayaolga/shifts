import Image from "next/image";
import Footer from "../components/layout/footer";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert dark:brightness-0 dark:contrast-100"
          src="/logo.svg"
          alt="Doppentsolecker logo"
          width={300}
          height={100}
          priority
        />
      </main>
      <Footer />
    </div>
  );
}
