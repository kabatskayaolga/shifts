import Link from "@/components/ui/Link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className=" typography-h3">Nicht gefunden</h1>
        <p>Die angeforderte Ressource wurde nicht gefunden.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link link={{ href: "/", title: "Zur Startseite" }} />
      </div>
    </>
  );
}
