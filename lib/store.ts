import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { shiftsSlice } from "./features/shifts/shiftsSlice";

const rootReducer = combineSlices(shiftsSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
