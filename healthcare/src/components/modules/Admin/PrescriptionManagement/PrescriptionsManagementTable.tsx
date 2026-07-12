import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type IPrescription } from "@/types/prescription.types"
import { format } from "date-fns"
import { FileText } from "lucide-react"
import Link from "next/link"

const formatDate = (value?: string) => {
  if (!value) {
    return "N/A"
  }

  const dateValue = new Date(value)
  return Number.isNaN(dateValue.getTime()) ? "N/A" : format(dateValue, "MMM dd, yyyy")
}

const truncate = (value: string, maxLength: number) => {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
}

const PrescriptionsManagementTable = ({ prescriptions }: { prescriptions: IPrescription[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Prescriptions</CardTitle>
        <p className="text-sm text-muted-foreground">
          {prescriptions.length} prescription{prescriptions.length === 1 ? "" : "s"} issued across
          the platform.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Instructions</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.length ? (
                prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.patient?.name ?? "N/A"}</TableCell>
                    <TableCell>{prescription.doctor?.name ?? "N/A"}</TableCell>
                    <TableCell className="max-w-xs text-sm text-muted-foreground">
                      {truncate(prescription.instructions, 80)}
                    </TableCell>
                    <TableCell>{formatDate(prescription.followUpDate)}</TableCell>
                    <TableCell>{formatDate(prescription.createdAt)}</TableCell>
                    <TableCell>
                      {prescription.pdfUrl ? (
                        <Link
                          href={prescription.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <FileText className="size-3.5" aria-hidden="true" />
                          View PDF
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No prescriptions found.
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

export default PrescriptionsManagementTable
