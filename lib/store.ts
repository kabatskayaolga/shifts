import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { shiftsSlice } from "./features/shifts/shiftsSlice";
import { employeesSlice } from "./features/employees/employeesSlice";
import { settingsSlice } from "./features/settings/settingsSlice";

const rootReducer = combineSlices(shiftsSlice, employeesSlice, settingsSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
