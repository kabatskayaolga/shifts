import Schifts from "./components/shifts/Schifts";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-6xl">
        Dienstpläne für September
      </h1>
      <Schifts />
    </>
  );
}
