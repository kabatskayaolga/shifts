import { RootState } from "@/lib/store";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ByDateState, DayRow, Shift, Weekday } from "./types";
import { durationMin } from "@/utils/time";

const initialState: ByDateState = {};

const groupAndSortByDate = (rows: Shift[]): ByDateState => {
  const next: ByDateState = {};
  for (const s of rows) (next[s.date] ??= []).push(s);
  for (const k in next) next[k].sort((a, b) => a.start.localeCompare(b.start));
  return next;
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    setAllShifts: (_state, { payload }: PayloadAction<Shift[]>) => {
      return groupAndSortByDate(payload);
    },
    setDay: (
      state,
      { payload }: PayloadAction<{ date: string; shifts: Shift[] }>
    ) => {
      state[payload.date] = [...payload.shifts].sort((a, b) =>
        a.start.localeCompare(b.start)
      );
    },

    clearAll: () => {
      return {};
    },
  },
});

export const { setAllShifts, setDay, clearAll } = shiftsSlice.actions;

export const selectByDate = (root: RootState) => root.shifts as ByDateState;

export const makeSelectMonthRows = (year: number, month0: number) =>
  createSelector(selectByDate, (byDate) => {
    const start = startOfMonth(new Date(year, month0 - 1, 1));
    const end = endOfMonth(start);
    const daysISO = eachDayOfInterval({ start, end }).map((d) =>
      format(d, "yyyy-MM-dd")
    );

    const quantity =
      daysISO.reduce(
        (m, dateISO) => Math.max(m, byDate[dateISO]?.length ?? 0),
        0
      ) || 1;
    const rows = daysISO.map<DayRow>((dateISO) => {
      const weekday = format(new Date(dateISO), "EEE") as Weekday;
      const shifts = (byDate[dateISO] ?? []).slice(0);

      const shiftsRow = Array.from({ length: quantity }).reduce<
        Record<string, string>
      >((acc, _, i) => {
        acc[`s${i}_id`] = crypto.randomUUID();
        acc[`s${i}_start`] = "";
        acc[`s${i}_end`] = "";
        acc[`s${i}_employeeId`] = "";
        return acc;
      }, {});

      const flat: Partial<DayRow> = {
        id: dateISO,
        dateISO,
        weekday,
        ...shiftsRow,
      };

      shifts.forEach((s, i) => {
        flat[`s${i}_id` as const] = s.id ?? "";
        flat[`s${i}_start` as const] = s.start ?? "";
        flat[`s${i}_end` as const] = s.end ?? "";
        flat[`s${i}_employeeId` as const] = s.employeeId ?? "";
      });
      return flat as DayRow;
    });
    return { rows, quantity };
  });

export const makeSelectMonthlyWorkByEmployee = (year: number, month0: number) =>
  createSelector(selectByDate, (byDate) => {
    const ym = `${year}-${String(month0).padStart(2, "0")}`;
    const acc: Record<string, number> = {};

    for (const [dateISO, shifts] of Object.entries(byDate)) {
      if (!dateISO.startsWith(ym)) continue;
      for (const sh of shifts) {
        const mins = durationMin(sh.start, sh.end);
        acc[sh.employeeId] = (acc[sh.employeeId] ?? 0) + mins;
      }
    }
    return acc;
  });
export { shiftsSlice };
export default shiftsSlice.reducer;
