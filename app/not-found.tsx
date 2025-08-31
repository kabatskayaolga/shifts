import Link from "@/components/ui/Link";

export default function NotFound() {
  return (
    <div>
      <h1>Nicht gefunden</h1>
      <p>Die angeforderte Ressource wurde nicht gefunden.</p>
      <Link link={{ href: "/", title: "Zur Startseite" }} />
    </div>
  );
}
