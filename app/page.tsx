import Schifts from "./components/shifts/Schifts";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <h1 className="text-3xl sm:text-4xl md:text-6xl">
        Dienstpläne für September
      </h1>
      <Schifts />
    </div>
  );
}
