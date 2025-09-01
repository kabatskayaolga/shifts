import type { Metadata } from "next";
import Employees from "../components/employees/Employees";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <h1 className="text-3xl sm:text-4xl md:text-6xl">Mitarbeiter*innen</h1>
      <Employees />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Mitarbeiter*innen",
};
