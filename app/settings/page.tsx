import type { Metadata } from "next";
import BusinessHours from "../components/businessHours/BusinessHours";
import { Typography } from "@mui/material";

// import Schifts from "./components/shifts/Schifts";

export default function IndexPage() {
  return (
    <>
      <Typography variant="h1">Einstellüngen</Typography>
      <BusinessHours />
    </>
  );
}

export const metadata: Metadata = {
  title: "Einstellüngen",
};
