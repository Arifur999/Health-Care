import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type IPrescription } from "@/types/prescription.types";
import { format } from "date-fns";
import { FileDown } from "lucide-react";
import Link from "next/link";
import PrescriptionPrintButton from "./PrescriptionPrintButton";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy");
};

const MyPrescriptionsList = ({ prescriptions }: { prescriptions: IPrescription[] }) => {
  if (prescriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No prescriptions yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Prescriptions from completed consultations will show up here.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/consultation">Browse Doctors</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {prescriptions.map((prescription) => (
        <Card key={prescription.id}>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <CardTitle className="text-base">{prescription.doctor?.name ?? "Doctor"}</CardTitle>
              <Badge variant="secondary">Follow-up: {formatDate(prescription.followUpDate)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
            <p className="text-xs text-muted-foreground">Issued {formatDate(prescription.createdAt)}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <PrescriptionPrintButton prescription={prescription} />
            {prescription.pdfUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={prescription.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="size-4" aria-hidden="true" />
                  Download PDF
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyPrescriptionsList;
