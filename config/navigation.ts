import { HTMLAttributeAnchorTarget } from "react";

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
    img: "/linkedin.svg",
    target: "_blank",
  },
  {
    href: "https://www.facebook.com/olha.kabatska",
    title: "Facebook",
    img: "/facebook.svg",
    target: "_blank",
  },
  {
    href: "https://wa.me/380636167227",
    title: "Whatsapp",
    img: "/whatsapp.svg",
    target: "_blank",
  },
  {
    href: "/Lebenslauf_Zeugnisse_Olha_Kabatska.pdf",
    title: "Lebenslauf",
    img: "file.svg",
    target: "_blank",
  },
];

export { footerLinks };
