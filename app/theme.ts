"use client";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        DataGrid: {
          bg: "--background",
          pinnedBg: "--background",
          headerBg: "--background",
        },
      },
    },
    dark: {
      palette: {
        DataGrid: {
          bg: "--background",
          pinnedBg: "--background",
          headerBg: "--background",
        },
      },
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },
        columnHeaders: {
          borderBottom: "none",
        },
        cell: {
          borderBottom: "none",
        },
      },
    },
  },
});

export default theme;
