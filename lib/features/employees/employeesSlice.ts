import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "./types";

const initialState: Employee[] = [];

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setAllByEmployees: (state, { payload }: PayloadAction<Employee[]>) => {
      return payload;
    },

    clearAll: () => {
      return [];
    },
  },
});

export const { setAllByEmployees, clearAll } = employeesSlice.actions;

export const selectAllEmployees = (state: RootState) => state.employees;

export { employeesSlice };
export default employeesSlice.reducer;
