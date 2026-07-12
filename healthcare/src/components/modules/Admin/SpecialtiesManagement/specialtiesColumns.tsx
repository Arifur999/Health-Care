import DateCell from "@/components/shared/cell/DateCell"
import { type ISpecialty } from "@/types/specialty.types"
import { ColumnDef } from "@tanstack/react-table"
import { Stethoscope } from "lucide-react"

const truncate = (value: string | undefined, maxLength: number) => {
  if (!value) {
    return "N/A"
  }

  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
}

export const specialtiesColumns: ColumnDef<ISpecialty>[] = [
  {
    id: "icon",
    header: "Icon",
    enableSorting: false,
    cell: ({ row }) => {
      const specialty = row.original
      return (
        <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary ring-1 ring-foreground/10">
          {specialty.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={specialty.icon} alt={specialty.title} className="size-full object-cover" />
          ) : (
            <Stethoscope className="size-4" aria-hidden="true" />
          )}
        </span>
      )
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{truncate(row.original.description, 80)}</span>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }

      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
