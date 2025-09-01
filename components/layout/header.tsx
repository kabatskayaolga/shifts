"use client";

import { headerLinks } from "@/config/navigation";
import Link from "../ui/Link";
import Image from "next/image";
import image from "@/public/logo.svg";
import ModeSwitch from "../ui/modeSwitch";

const Header = () => {
  return (
    <header className="row-start-1 flex gap-4 flex-wrap items-center justify-center w-full  xl:justify-between">
      <Image
        className="dark:invert dark:brightness-0 dark:contrast-100 w-80 h-12"
        src={image}
        alt="Doppentsolecker logo"
        width={240}
        height={32}
        priority
      />
      <div className="flex gap-6 flex-wrap justify-center">
        {headerLinks.map((l, k) => (
          <Link key={k} link={l} />
        ))}
      </div>
      <div className="w-80 flex justify-center">
        <ModeSwitch />
      </div>
    </header>
  );
};

export default Header;
