import { HTMLAttributeAnchorTarget } from "react";
import facebook from "@/public/facebook.svg";
import linkedin from "@/public/linkedin.svg";
import whatsapp from "@/public/whatsapp.svg";
import file from "@/public/file.svg";

export type Link = {
  href: string;
  title: string;
  img?: string;
  target?: HTMLAttributeAnchorTarget;
};

const footerLinks: Link[] = [
  {
    href: "https://www.linkedin.com/in/olha-kabatska/",
    title: "Linkedin",
    img: linkedin,
    target: "_blank",
  },
  {
    href: "https://www.facebook.com/olha.kabatska",
    title: "Facebook",
    img: facebook,
    target: "_blank",
  },
  {
    href: "https://wa.me/380636167227",
    title: "Whatsapp",
    img: whatsapp,
    target: "_blank",
  },
  {
    href: "/Lebenslauf_Zeugnisse_Olha_Kabatska.pdf",
    title: "Lebenslauf",
    img: file,
    target: "_blank",
  },
];

const headerLinks: Link[] = [
  {
    href: "/",
    title: "Dienstpläne",
  },
  {
    href: "/employees",
    title: "Mitarbeiter*innen",
  },
  {
    href: "/settings",
    title: "Einstellüngen",
  },
];

export { footerLinks, headerLinks };
