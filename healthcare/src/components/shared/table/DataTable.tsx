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
  emptyMessage?: string;
  isLoading?: boolean;

}

const DataTable = <TData,>({ data, columns, actions, emptyMessage , isLoading  }: DataTableProps<TData>) => {
  // Implement the table logic using @tanstack/react-table
  // Use the columns and data props to render the table
  // Handle actions (view, edit, delete) if provided
  // Display loading state or empty message as needed
    return (<div>
        {/* Render the table here using the columns and data */}
        {/* Handle actions and display loading/empty states */}
    </div>);
}