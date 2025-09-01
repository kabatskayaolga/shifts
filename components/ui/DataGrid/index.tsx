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
          color: "var(--foreground)",
          "& .MuiDataGrid-columnHeaders .MuiDataGrid-filler": {
            backgroundColor: "var(--background)",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "var(--background)",
            color: "var(--background)",
            // "&:hover": {
            //   backgroundColor: "#1e1e1e",
            //   cursor: "pointer",
            // },
            "& .MuiDataGrid-filler": {
              backgroundColor: "#d0d0d021",
            },
            "& .MuiDataGrid-scrollbarFiller": {
              backgroundColor: "var(--background)",
            },
          },
          "& .MuiDataGrid-row": {
            "--rowBorderColor": "#d0d0d021",
            "&:hover": { backgroundColor: "#d0d0d021" },
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#d0d0d021",
            "&:hover": { backgroundColor: "#d0d0d021" },
          },

          "& .MuiDataGrid-pinnedColumnHeaders": {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "var(--foreground)",
            fontWeight: 600,
          },
        }}
      />
    </Box>
  );
}
