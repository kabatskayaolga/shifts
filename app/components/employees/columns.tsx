import { Employee } from "@/lib/features/employees/types";
import { ContractOption } from "@/lib/features/settings/types";
import { mmToHHMM } from "@/utils/time";
import { GridColDef } from "@mui/x-data-grid";

type Columns = (
  contracts: ContractOption[],
  totalsByEmp: Record<string, number>
) => GridColDef<Employee>[];

export const columns: Columns = (contracts, totalsByEmp) => {
  const contractMap = new Map(contracts.map((c) => [c.value, c]));

  return [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      editable: true,
    },

    {
      field: "contract",
      headerName: "Vertrag",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: contracts.map((e) => e),
    },

    {
      field: "working",
      headerName: "Zeit (Monat)",
      width: 160,
      cellClassName: ({ value, row }) => {
        const limit = contractMap.get(row.contract)?.maxMinutesPerMonth;
        if (limit && Number(value) > limit) return " bg-rose-500 text-white";
        return "";
      },
      valueGetter: (_, row) => {
        if (row) return totalsByEmp[row.id] ?? 0;
        return 0;
      },
      renderCell: ({ value, row }) => {
        const minutes = Number(value) || 0;
        const fact = mmToHHMM(minutes);

        const limit = contractMap.get(row.contract)?.maxMinutesPerMonth;
        return limit ? `${fact} / ${mmToHHMM(limit)}` : fact;
      },
      sortComparator: (a, b) => Number(a) - Number(b),
    },
  ];
};
