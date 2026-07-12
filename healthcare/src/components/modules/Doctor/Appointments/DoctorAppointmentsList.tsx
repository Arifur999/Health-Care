"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeAppointmentStatus, getMyAppointments } from "@/services/appointment.services";
import { type IAppointment } from "@/types/appointment.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const STATUS_OPTIONS = ["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELED"];

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy • hh:mm a");
};

const DoctorAppointmentsList = () => {
  const queryClient = useQueryClient();

  const { data: appointmentsResponse, isLoading } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: getMyAppointments,
  });

  const appointments: IAppointment[] = appointmentsResponse?.data ?? [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => changeAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success("Appointment status updated");
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No appointments yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Appointments booked with you will show up here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">{appointment.patient?.name ?? "Patient"}</CardTitle>
                <p className="text-sm text-muted-foreground">{appointment.patient?.email}</p>
              </div>
              <Badge variant={appointment.paymentStatus === "PAID" ? "secondary" : "outline"}>
                {appointment.paymentStatus ?? "UNPAID"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {formatDateTime(appointment.schedule?.startDateTime)} — {formatDateTime(appointment.schedule?.endDateTime)}
            </p>

            <Select
              value={appointment.status}
              onValueChange={(status) => statusMutation.mutate({ id: appointment.id, status })}
              disabled={statusMutation.isPending}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          {appointment.status === "COMPLETED" && (
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={`/doctor/dashboard/prescription?appointmentId=${appointment.id}`}>
                  <FileText className="size-4" aria-hidden="true" />
                  Write Prescription
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DoctorAppointmentsList;
