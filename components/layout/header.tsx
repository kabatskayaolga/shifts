import { headerLinks } from "@/config/navigation";
import Link from "../ui/Link";
import Image from "next/image";
import { FormControlLabel, Switch } from "@mui/material";

const Header = () => {
  return (
    <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center w-full sm:justify-between md:justify-between">
      <Image
        className="dark:invert dark:brightness-0 dark:contrast-100 w-80 h-12"
        src="/logo.svg"
        alt="Doppentsolecker logo"
        width={240}
        height={32}
        priority
      />
      <div className="flex gap-6 flex-wrap">
        {headerLinks.map((l, k) => (
          <Link key={k} link={l} />
        ))}
      </div>
      <FormControlLabel control={<Switch defaultChecked />} label="Mode" />
    </header>
  );
};

export default Header;
