"use client";

import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { columns } from "./columns";

import {
  selectBusinessHoursArray,
  selectWeekSlots,
  setAllBySettings,
} from "@/lib/features/settings/settingsSlice";

import { fetchSettings } from "@/services/settings";

import DataGrid from "@/components/ui/dataGrid";
import { Box } from "@mui/material";

export default function BusinessHours() {
  const [isLoaded, setIsLoaded] = useState(false);
  const businessHours = useAppSelector(selectBusinessHoursArray);
  const slots = useAppSelector(selectWeekSlots);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchSettings().then((v) => {
      dispatch(setAllBySettings(v));
      setIsLoaded(true);
    });
  }, [dispatch]);

  if (!isLoaded) return;

  return (
    <Box sx={{ width: "100%", maxWidth: "400px" }}>
      <DataGrid rows={businessHours} columns={columns(slots)} />
    </Box>
  );
}
