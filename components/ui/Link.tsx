import type { Link as LinkType } from "@/config/navigation";
import Image from "next/image";

const Link = ({ link: { href, title, img, target } }: { link: LinkType }) => {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4 dark:invert dark:brightness-0 dark:contrast-100"
      href={href}
      target={target}
      rel="noopener noreferrer"
    >
      {img && (
        <Image aria-hidden src={img} alt="File icon" width={16} height={16} />
      )}
      {title}
    </a>
  );
};

export default Link;
