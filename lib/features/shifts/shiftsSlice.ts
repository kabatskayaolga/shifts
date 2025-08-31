import { RootState } from "@/lib/store";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ByDateState, Shift } from "./types";

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
    setAllByDate: (_state, { payload }: PayloadAction<Shift[]>) => {
      return groupAndSortByDate(payload);
    },

    clearAll: () => {
      return {};
    },
  },
});

export const { setAllByDate, clearAll } = shiftsSlice.actions;

export const selectByDate = (root: RootState) => root.shifts as ByDateState;
const byStartTime = (a: Shift, b: Shift) => a.start.localeCompare(b.start);

export const makeSelectMonthGrid = (year: number, month: number) =>
  createSelector(selectByDate, (shifts) => {
    const start = startOfMonth(new Date(year, month, 1));
    const end = endOfMonth(start);
    const daysISO = eachDayOfInterval({ start, end }).map((d) =>
      format(d, "yyyy-MM-dd")
    );

    const days = daysISO.map((dayISO) => ({
      id: dayISO,
      day: dayISO,
      shifts: (shifts[dayISO] ?? []).slice().sort(byStartTime),
    }));

    const maxPerDay = days.reduce((m, d) => Math.max(m, d.shifts.length), 0);

    return {
      quantity: maxPerDay + 1,
      days,
    };
  });
export { shiftsSlice };
export default shiftsSlice.reducer;
