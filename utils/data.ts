import { DayRow, Shift } from "@/lib/features/shifts/types";
import { AlertColor } from "@mui/material";

export function rowToShifts(row: DayRow, quantity: number): Shift[] {
  const shifts: Shift[] = [];
  for (let i = 0; i < quantity; i++) {
    const id = row[`s${i}_id`] ?? "";
    const start = row[`s${i}_start`] ?? "";
    const end = row[`s${i}_end`] ?? "";
    const employeeId = row[`s${i}_employeeId`] ?? "";
    if (start || end || employeeId) {
      shifts.push({
        id,
        date: row.dateISO,
        start,
        end,
        employeeId,
      });
    }
  }
  return shifts.sort((a, b) => a.start.localeCompare(b.start));
}

export function validateRow(row: DayRow, quantity: number) {
  let hasError = undefined;

  for (let i = 0; i < quantity; i++) {
    const start = row[`s${i}_start`] ?? "";
    const end = row[`s${i}_end`] ?? "";
    const emp = row[`s${i}_employeeId`] ?? "";

    const filled = [start, end, emp].map(Boolean);
    const allEmpty = !filled[0] && !filled[1] && !filled[2];
    const allFilled = filled[0] && filled[1] && filled[2];

    if (!allEmpty && !allFilled) {
      hasError = {
        type: "warning" as AlertColor,
        text: "Alle Felder müssen ausgefüllt sein, damit die Änderungen gespeichert werden.",
      };
    }
    if (allFilled && start >= end) {
      console.log("allFilled && start >= end", allFilled && start >= end);
      hasError = {
        type: "error" as AlertColor,
        text: "Die Startzeit muss vor der Endzeit liegen",
      };
    }
  }

  return hasError;
}
