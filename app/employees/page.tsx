import type { Metadata } from "next";
import Employees from "../components/employees/Employees";
import { Typography } from "@mui/material";

export default function IndexPage() {
  return (
    <>
      <Typography variant="h1">Mitarbeiter*innen</Typography>
      <Employees />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mitarbeiter*innen",
};
