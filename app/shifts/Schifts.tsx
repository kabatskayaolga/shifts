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

const Schifts = () => {
  const [month] = useState(9);
  const [year] = useState(2025);

  const selectMonth = useMemo(
    () => makeSelectMonthRows(year, month),
    [year, month]
  );
  const { rows, quantity } = useAppSelector(selectMonth);
  const employees = useAppSelector(selectAllEmployees);
  const slots = useAppSelector(selectWeekSlots);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchShifts().then((v) => dispatch(setAllShifts(v)));
    fetchEmployees().then((v) => dispatch(setAllByEmployees(v)));
    fetchSettings().then((v) => dispatch(setAllBySettings(v)));
  }, [dispatch]);

  const columns = useMemo(
    () => buildColumns(quantity, { employees, slots }),
    [quantity, employees, slots]
  );

  return <DataGrid columns={columns} rows={rows} />;
};

export default Schifts;
