import { RootState } from "@/lib/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessDay, Settings, Weekday } from "./types";

const initialState: Settings = {
  businessHours: {
    Monday: { start: "00:00", end: "00:00" },
    Tuesday: null,
    Wednesday: { start: "00:00", end: "00:00" },
    Thursday: { start: "00:00", end: "00:00" },
    Friday: { start: "00:00", end: "00:00" },
    Saturday: { start: "00:00", end: "00:00" },
    Sunday: { start: "00:00", end: "00:00" },
  },
  slotStepMinutes: 0,
  shiftConstraints: { minShiftMinutes: 0, maxShiftMinutes: 0 },
  contracts: {},
  holidays: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAllBySettings: (_state, { payload }: PayloadAction<Settings>) => {
      return payload;
    },

    clearAll: () => {
      return initialState;
    },
  },
});

export const { setAllBySettings, clearAll } = settingsSlice.actions;

export { settingsSlice };
export default settingsSlice.reducer;

export const selectSettings = (s: RootState) => s.settings;
export const selectBusinessHours = (s: RootState) => s.settings.businessHours;
export const selectSlotStep = (s: RootState) => s.settings.slotStepMinutes;
export const selectHolidays = (s: RootState) => s.settings.holidays;

const deDayLabel: Record<Weekday, string> = {
  Monday: "Montag",
  Tuesday: "Dienstag",
  Wednesday: "Mittwoch",
  Thursday: "Donnerstag",
  Friday: "Freitag",
  Saturday: "Samstag",
  Sunday: "Sonntag",
};

const weekdays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const selectBusinessHoursArray = createSelector(
  [selectBusinessHours],
  (bh) => {
    weekdays.map<BusinessDay>((wd) => {
      const interval = bh[wd];
      return interval
        ? {
            id: wd,
            day: deDayLabel[wd],
            start: interval.start,
            end: interval.end,
          }
        : { id: wd, day: deDayLabel[wd] };
    });
  }
);

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
};

export const selectWeekSlots = createSelector(
  [selectBusinessHours, selectSlotStep],
  (bh, step) => {
    const result: Record<Weekday, string[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
    if (step <= 0) return result;

    for (const wd of weekdays) {
      const interval = bh[wd];
      if (!interval) {
        result[wd] = [];
        continue;
      }

      const startMin = toMinutes(interval.start);
      const endMin = toMinutes(interval.end);

      if (endMin <= startMin) {
        result[wd] = [];
        continue;
      }

      const slots: string[] = [];
      for (let cur = startMin; cur < endMin; cur += step) {
        slots.push(toHHMM(cur));
      }
      result[wd] = slots;
    }
    return result;
  }
);
