"use client";
import { DataGrid as MuiDataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React from "react";

type Props<T extends GridValidRowModel> = React.ComponentProps<
  typeof MuiDataGrid<T>
>;

export default function DataGrid<T extends GridValidRowModel>(props: Props<T>) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MuiDataGrid
        className=" w-full"
        {...props}
        rowHeight={34}
        disableColumnFilter
        hideFooter
        sx={{
          border: 0,
          backgroundColor: "var(--background)",
        }}
      />
    </Box>
  );
}
