"use client";
import { DataGrid as MuiDataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { Box, createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React from "react";
import { useTheme } from "next-themes";

type Props<T extends GridValidRowModel> = React.ComponentProps<
  typeof MuiDataGrid<T>
>;

const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      DataGrid: {
        bg: "--background",
        pinnedBg: "--background",
        headerBg: "--background",
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-withBorderColor": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
  });

export default function DataGrid<T extends GridValidRowModel>(props: Props<T>) {
  const { theme } = useTheme();
  const themeClass = React.useMemo(
    () => theme && getTheme(theme as PaletteMode),
    [theme]
  );
  if (!themeClass) return;
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <ThemeProvider theme={themeClass}>
        <MuiDataGrid
          className=" w-full"
          {...props}
          rowHeight={34}
          disableColumnFilter
          hideFooter
        />
      </ThemeProvider>
    </Box>
  );
}
