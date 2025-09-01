import type { Metadata } from "next";
import BusinessHours from "../components/businessHours/BusinessHours";

// import Schifts from "./components/shifts/Schifts";

export default function IndexPage() {
  return (
    <>
      <h1 className=" typography-h3">Einstellüngen</h1>
      <BusinessHours />
    </>
  );
}

export const metadata: Metadata = {
  title: "Einstellüngen",
};
