"use client";

import DataGrid from "@/components/ui/DataGrid";
import { buildColumns } from "./columns";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  makeSelectMonthRows,
  setAllShifts,
} from "@/lib/features/shifts/shiftsSlice";
import { fetchShifts } from "@/services/shifts";

import {
  selectAllEmployees,
  setAllByEmployees,
} from "@/lib/features/employees/employeesSlice";

import {
  selectWeekSlots,
  setAllBySettings,
} from "@/lib/features/settings/settingsSlice";

import { fetchEmployees } from "@/services/employees";
import { fetchSettings } from "@/services/settings";
import { Box, LinearProgress } from "@mui/material";

const Schifts = () => {
  const [month] = useState(9);
  const [year] = useState(2025);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectMonth = useMemo(
    () => makeSelectMonthRows(year, month),
    [year, month]
  );
  const { rows, quantity } = useAppSelector(selectMonth);
  const employees = useAppSelector(selectAllEmployees);
  const slots = useAppSelector(selectWeekSlots);

  const dispatch = useAppDispatch();

  useEffect(() => {
    Promise.all([
      fetchShifts().then((v) => dispatch(setAllShifts(v))),
      fetchEmployees().then((v) => dispatch(setAllByEmployees(v))),
      fetchSettings().then((v) => dispatch(setAllBySettings(v))),
    ]).then(() => setIsLoaded(true));
  }, [dispatch]);

  const columns = useMemo(
    () => buildColumns(quantity, { employees, slots }),
    [quantity, employees, slots]
  );
  if (!isLoaded)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  return <DataGrid columns={columns} rows={rows} />;
};

export default Schifts;
