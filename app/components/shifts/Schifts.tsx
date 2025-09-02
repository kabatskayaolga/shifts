"use client";

import DataGrid from "@/components/ui/dataGrid";
import { buildColumns } from "./columns";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  makeSelectMonthRows,
  setAllShifts,
  setDay,
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
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { columnGroupingModel } from "./columnsGroup";
import { rowToShifts, validateRow } from "@/utils/data";

const Schifts = () => {
  const [month] = useState(9);
  const [year] = useState(2025);
  const [isLoaded, setIsLoaded] = useState(false);

  const [error, setError] = useState<
    { type: AlertColor; text: string } | undefined
  >(undefined);

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
  if (!isLoaded) return;
  return (
    <Box sx={{ width: "100%", maxWidth: "800px" }}>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={error.type} variant="filled" sx={{ width: "100%" }}>
            {error.text}
          </Alert>
        </Snackbar>
      )}
      <DataGrid
        columns={columns}
        rows={rows}
        columnGroupingModel={columnGroupingModel(quantity)}
        processRowUpdate={(updated) => {
          const hasError = validateRow(updated, quantity);

          if (hasError) {
            setError(hasError);
            return updated;
          }

          setError(undefined);
          const nextDayShifts = rowToShifts(updated, quantity);
          dispatch(setDay({ date: updated.dateISO, shifts: nextDayShifts }));

          return updated;
        }}
        onProcessRowUpdateError={(err) => console.error(err)}
      />
    </Box>
  );
};

export default Schifts;
