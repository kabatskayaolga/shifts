import { BusinessDay, Weekday } from "@/lib/features/settings/types";
import { GridColDef } from "@mui/x-data-grid";

type Columns = (slots: Record<Weekday, string[]>) => GridColDef<BusinessDay>[];

export const columns: Columns = (slots) => {
  return [
    {
      field: "day",
      headerName: "Data",
      width: 110,
      editable: true,
      cellClassName: "dayCellStyle",
    },
    {
      field: "start",
      headerName: "Von",
      width: 110,
      type: "singleSelect",
      editable: true,
      valueOptions: ({ id }) => {
        const slotsOptions = slots[id as Weekday] ?? [];
        return slotsOptions;
      },
    },
    {
      field: "end",
      headerName: "Bis",
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: ({ id }) => {
        const slotsOptions = slots[id as Weekday] ?? [];
        return slotsOptions;
      },
    },
  ];
};
