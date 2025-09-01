export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Contract = Record<
  string,
  { label: string; maxMinutesPerMonth: number }
>;

export type Settings = {
  businessHours: Record<Weekday, { start: string; end: string } | null>;
  slotStepMinutes: number;
  shiftConstraints: {
    minShiftMinutes: number;
    maxShiftMinutes: number;
  };
  contracts: Contract;
  holidays: string[];
};

export type BusinessDay = {
  id: string;
  day: string;
  start?: string;
  end?: string;
};

export type ContractOption = {
  value: string;
  label: string;
  maxMinutesPerMonth: number;
};
