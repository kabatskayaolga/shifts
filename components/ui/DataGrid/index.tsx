"use client";
import { DataGrid as MuiDataGrid, GridValidRowModel } from "@mui/x-data-grid";

import React from "react";

type Props<T extends GridValidRowModel> = React.ComponentProps<
  typeof MuiDataGrid<T>
>;

export default function DataGrid<T extends GridValidRowModel>(props: Props<T>) {
  return (
    <MuiDataGrid
      className=" w-full"
      {...props}
      rowHeight={34}
      disableColumnFilter
      disableColumnMenu
      disableColumnResize
      hideFooter
      sx={{
        border: 0,
        backgroundColor: "var(--background)",
        "& .MuiDataGrid-columnHeader,  & .MuiDataGrid-columnHeaders .MuiDataGrid-filler, & .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller":
          {
            background: "var(--background)",
          },
      }}
    />
  );
}
