import { footerLinks } from "@/config/navigation";
import Link from "@/components/ui/Link";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      Danke für Ihren Besuch!
      {footerLinks.map((l, k) => (
        <Link key={k} link={l} />
      ))}
    </footer>
  );
};

export default Footer;
