"use client";
import { useEffect, useState } from "react";
import { DataGrid as MuiDataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Props<T extends GridValidRowModel> = React.ComponentProps<
  typeof MuiDataGrid<T>
>;

export default function DataGrid<T extends GridValidRowModel>(props: Props<T>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MuiDataGrid className=" w-full" {...props} rowHeight={34} />
    </Box>
  );
}
