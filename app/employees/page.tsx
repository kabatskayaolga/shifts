import type { Metadata } from "next";
import Employees from "../components/employees/Employees";

export default function IndexPage() {
  return (
    <>
      <h1 className=" typography-h3">Mitarbeiter*innen</h1>
      <Employees />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mitarbeiter*innen",
};
