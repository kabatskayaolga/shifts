export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Settings = {
  businessHours: Record<Weekday, { start: string; end: string } | null>;
  slotStepMinutes: number;
  shiftConstraints: {
    minShiftMinutes: number;
    maxShiftMinutes: number;
  };
  contracts: Record<string, { label: string; maxMinutesPerMonth: number }>;
  holidays: string[];
};

export type BusinessDay = {
  id: string;
  day: string;
  start?: string;
  end?: string;
};
