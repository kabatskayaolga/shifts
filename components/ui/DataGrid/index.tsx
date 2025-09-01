"use client";
import { DataGrid as MuiDataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Props<T extends GridValidRowModel> = React.ComponentProps<
  typeof MuiDataGrid<T>
>;

export default function DataGrid<T extends GridValidRowModel>(props: Props<T>) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MuiDataGrid className=" w-full" {...props} rowHeight={34} />
    </Box>
  );
}
