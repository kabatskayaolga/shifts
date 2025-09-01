import { Employee } from "@/lib/features/employees/types";
import { DayRow, Weekday } from "@/lib/features/shifts/types";

import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

export const buildColumns = (
  quantity: number,
  selects: {
    employees: Employee[];
    slots: Record<Weekday, string[]>;
  }
): GridColDef<DayRow>[] => {
  const base: GridColDef<DayRow>[] = [
    {
      field: "dateISO",
      headerName: "Datum",
      width: 110,
      valueFormatter: (value?: string) =>
        value && format(new Date(value), "dd.MM.yyyy"),
    },
    {
      field: "weekday",
      headerName: "Tag",
      width: 70,
    },
  ];

  const slotCols: GridColDef<DayRow>[] = [];
  for (let i = 0; i < quantity; i++) {
    slotCols.push(
      {
        field: `s${i}_start`,
        headerName: "Von",
        type: "singleSelect",
        width: 80,
        editable: true,
        valueOptions: ({ row }) =>
          row
            ? selects.slots[format(new Date(row.dateISO), "iiii") as Weekday]
            : [],
      },
      {
        field: `s${i}_end`,
        headerName: "Bis",
        type: "singleSelect",
        width: 80,
        editable: true,
        valueOptions: ({ row }) =>
          row
            ? selects.slots[format(new Date(row.dateISO), "iiii") as Weekday]
            : [],
      },
      {
        field: `s${i}_employeeId`,
        headerName: "Mitarbeiter",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: selects.employees.map((e) => ({
          value: e.id,
          label: e.name,
        })),
      }
    );
  }
  return [...base, ...slotCols];
};
