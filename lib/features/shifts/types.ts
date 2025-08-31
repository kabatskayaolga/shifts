export type Shift = {
  id: string;
  employeeId: string;
  date: string;
  start: string;
  end: string;
};

export type ByDateState = Record<string, Shift[]>;

export type Days = {
  id: string;
  day: string;
  shifts: Shift[];
};

export type MakeSelectMonthGrid = {
  quontity: number;
  days: Days[];
};
