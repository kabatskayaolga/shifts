import { headerLinks } from "@/config/navigation";
import Link from "../ui/Link";

const Header = () => {
  return (
    <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center">
      {headerLinks.map((l, k) => (
        <Link key={k} link={l} />
      ))}
    </header>
  );
};

export default Header;
