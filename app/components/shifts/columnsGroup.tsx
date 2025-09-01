import { GridColumnGroupingModel } from "@mui/x-data-grid";

type Props = (quantity: number) => GridColumnGroupingModel;
export const columnGroupingModel: Props = (quantity) => {
  return Array.from({ length: quantity }, (_, i) => ({
    groupId: `${i + 1} Schicht`,
    children: [
      { field: `s${i}_start` },
      { field: `s${i}_end` },
      { field: `s${i}_employeeId` },
    ],
  }));
};
