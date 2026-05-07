import { ColumnDef } from "@tanstack/react-table";

interface DataTableActions<TData>{
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;

}

interface DataTableProps <TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableActions<TData>;

}