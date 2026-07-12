import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type IAppointment } from "@/types/appointment.types"
import { format } from "date-fns"

const formatDate = (value?: string | Date) => {
  if (!value) {
    return "N/A"
  }

  const dateValue = new Date(value)
  return Number.isNaN(dateValue.getTime()) ? "N/A" : format(dateValue, "MMM dd, yyyy hh:mm a")
}

const paymentStatusVariant = (status?: string) => {
  if (status === "PAID") {
    return "default" as const
  }

  if (status === "FAILED") {
    return "destructive" as const
  }

  return "secondary" as const
}

const AppointmentPaymentStatusTable = ({ appointments }: { appointments: IAppointment[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Payment Status</CardTitle>
        <p className="text-sm text-muted-foreground">
          The <span className="font-medium text-foreground">paymentStatus</span> field on each
          appointment &mdash; not a transaction ledger. {appointments.length} appointment
          {appointments.length === 1 ? "" : "s"} total.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Appointment Status</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient?.name ?? appointment.patient?.email ?? "N/A"}</TableCell>
                    <TableCell>{appointment.doctor?.name ?? appointment.doctor?.email ?? "N/A"}</TableCell>
                    <TableCell>{formatDate(appointment.schedule?.startDateTime)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{appointment.status ?? "N/A"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={paymentStatusVariant(appointment.paymentStatus)}>
                        {appointment.paymentStatus ?? "N/A"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default AppointmentPaymentStatusTable
