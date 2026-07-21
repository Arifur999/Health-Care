import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { type IDoctorSchedule } from "@/types/doctorSchedule.types"
import { ColumnDef } from "@tanstack/react-table"
import { differenceInMinutes } from "date-fns"

const getDurationLabel = (doctorSchedule: IDoctorSchedule) => {
  const startTime = doctorSchedule.schedule?.startTime
  const endTime = doctorSchedule.schedule?.endTime

  if (!startTime || !endTime) {
    return "N/A"
  }

  const startDate = new Date(startTime)
  const endDate = new Date(endTime)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "N/A"
  }

  const durationInMinutes = differenceInMinutes(endDate, startDate)
  return durationInMinutes > 0 ? `${durationInMinutes} mins` : "N/A"
}

export const doctorSchedulesColumns: ColumnDef<IDoctorSchedule>[] = [
  {
    id: "startTime",
    accessorKey: "schedule.startTime",
    header: "Start",
    cell: ({ row }) => {
      const startTime = row.original.schedule?.startTime

      if (!startTime) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }

      return <DateCell date={startTime} formatString="MMM dd, yyyy hh:mm a" />
    },
  },
  {
    id: "endTime",
    accessorKey: "schedule.endTime",
    header: "End",
    cell: ({ row }) => {
      const endTime = row.original.schedule?.endTime

      if (!endTime) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }

      return <DateCell date={endTime} formatString="MMM dd, yyyy hh:mm a" />
    },
  },
  {
    id: "duration",
    header: "Duration",
    enableSorting: false,
    cell: ({ row }) => <span className="text-sm font-medium">{getDurationLabel(row.original)}</span>,
  },
  {
    id: "isBooked",
    accessorKey: "isBooked",
    header: "Booked",
    cell: ({ row }) => {
      const isBooked = row.original.isBooked

      return (
        <Badge variant={isBooked ? "destructive" : "secondary"}>
          {isBooked ? "Booked" : "Available"}
        </Badge>
      )
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Assigned On",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }

      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]