import { RootState } from "@/lib/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessDay, ContractOption, Settings, Weekday } from "./types";
import { toMinutes, toHHMM } from "@/utils/time";

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
export const selectContacts = (s: RootState) => s.settings.contracts;

export const selectContactsInfo = createSelector([selectContacts], (c) => {
  const optionValues: ContractOption[] = [];
  const contracts = Object.keys(c);

  contracts.map((t) => {
    optionValues.push({
      value: t,
      label: c[t].label,
      maxMinutesPerMonth: c[t].maxMinutesPerMonth,
    });
  });
  return optionValues;
});

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
    return weekdays.map<BusinessDay>((wd) => {
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
