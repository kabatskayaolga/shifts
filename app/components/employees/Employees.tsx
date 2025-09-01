"use client";

import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo, useState } from "react";
import { columns as buildColumns } from "./columns";
import DataGrid from "@/components/ui/DataGrid";
import { Box, LinearProgress } from "@mui/material";
import {
  selectAllEmployees,
  setAllByEmployees,
} from "@/lib/features/employees/employeesSlice";
import { fetchEmployees } from "@/services/employees";
import {
  selectContactsInfo,
  setAllBySettings,
} from "@/lib/features/settings/settingsSlice";
import {
  makeSelectMonthlyWorkByEmployee,
  setAllShifts,
} from "@/lib/features/shifts/shiftsSlice";
import { fetchSettings } from "@/services/settings";
import { fetchShifts } from "@/services/shifts";

export default function Employees() {
  const year = 2025;
  const month0 = 9;

  const [isLoaded, setIsLoaded] = useState(false);
  const employees = useAppSelector(selectAllEmployees);
  const contracts = useAppSelector(selectContactsInfo);
  const dispatch = useAppDispatch();

  const selectWork = useMemo(
    () => makeSelectMonthlyWorkByEmployee(year, month0),
    [year, month0]
  );

  const totalsByEmp = useAppSelector(selectWork);

  const cols = useMemo(
    () => buildColumns(contracts, totalsByEmp),
    [contracts, totalsByEmp]
  );
  useEffect(() => {
    Promise.all([
      fetchShifts().then((v) => dispatch(setAllShifts(v))),
      fetchEmployees().then((v) => dispatch(setAllByEmployees(v))),
      fetchSettings().then((v) => dispatch(setAllBySettings(v))),
    ]).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <Box sx={{ width: "100%", maxWidth: "400px" }}>
      <DataGrid rows={employees} columns={cols} />
    </Box>
  );
}
