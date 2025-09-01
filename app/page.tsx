import { Typography } from "@mui/material";
import Schifts from "./components/shifts/Schifts";

export default function Home() {
  return (
    <>
      <Typography variant="h1">Dienstpläne für September</Typography>
      <Schifts />
    </>
  );
}
