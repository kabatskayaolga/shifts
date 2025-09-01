export type Shift = {
  id: string;
  employeeId: string;
  date: string;
  start: string;
  end: string;
};

export type ByDateState = Record<string, Shift[]>;

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DayRow = {
  id: string;
  dateISO: string;
  weekday: Weekday;
} & {
  [K in `s${number}_id`]?: string;
} & {
  [K in `s${number}_start`]?: string;
} & {
  [K in `s${number}_end`]?: string;
} & {
  [K in `s${number}_employeeId`]?: string;
};
