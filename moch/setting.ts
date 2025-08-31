export const demoSettings = {
  businessHours: {
    Monday: { start: "08:30", end: "22:00" },
    Tuesday: null,
    Wednesday: { start: "08:30", end: "22:00" },
    Thursday: { start: "08:30", end: "22:00" },
    Friday: { start: "08:30", end: "22:00" },
    Saturday: { start: "08:30", end: "22:00" },
    Sunday: { start: "08:30", end: "22:00" },
  },
  slotStepMinutes: 30,
  shiftConstraints: {
    minShiftMinutes: 180,
    maxShiftMinutes: 480,
  },
  contracts: {
    fullTime: { label: "Vollzeit", maxMinutesPerMonth: 9600 },
    partTime: { label: "Teilzeit", maxMinutesPerMonth: 4800 },
    miniJob: { label: "Minijob", maxMinutesPerMonth: 2580 },
  },
  holidays: ["2025-12-25", "2025-12-26", "2026-01-01"],
};
