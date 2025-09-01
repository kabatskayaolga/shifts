import { RootState } from "@/lib/store";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Employee } from "./types";

const initialState: Employee[] = [];

const employeesAdapter = createEntityAdapter({
  selectId: (employee: Employee) => employee.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: employeesAdapter.getInitialState(initialState),
  reducers: {
    setAllByEmployees: (state, { payload }: PayloadAction<Employee[]>) => {
      employeesAdapter.setAll(state, payload);
    },

    clearAll: (state) => {
      employeesAdapter.removeAll(state);
    },
  },
});

export const { setAllByEmployees, clearAll } = employeesSlice.actions;

export const {
  selectById: selectEmployeeById,
  selectAll: selectAllEmployees,
  selectEntities: selectEntitiesEmployees,
} = employeesAdapter.getSelectors<RootState>((state) => state.employees);

export { employeesSlice };
export default employeesSlice.reducer;
