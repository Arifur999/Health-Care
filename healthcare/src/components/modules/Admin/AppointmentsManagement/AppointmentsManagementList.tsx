"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeAppointmentStatus, getAllAppointments } from "@/services/appointment.services";
import { type IAppointment } from "@/types/appointment.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

export const ADMIN_ALL_APPOINTMENTS_QUERY_KEY = ["admin-all-appointments"];

const STATUS_OPTIONS = ["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELED"];

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy • hh:mm a");
};

const getStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "COMPLETED":
      return "secondary" as const;
    case "CANCELED":
      return "destructive" as const;
    case "INPROGRESS":
      return "default" as const;
    default:
      return "outline" as const;
  }
};

const getPaymentBadgeVariant = (status?: string) => {
  if (status === "PAID") return "secondary" as const;
  if (status === "FAILED") return "destructive" as const;
  return "outline" as const;
};

const AppointmentsManagementList = () => {
  const queryClient = useQueryClient();

  const { data: appointmentsResponse, isLoading } = useQuery({
    queryKey: ADMIN_ALL_APPOINTMENTS_QUERY_KEY,
    queryFn: getAllAppointments,
  });

  const appointments: IAppointment[] = appointmentsResponse?.data ?? [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => changeAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success("Appointment status updated");
      queryClient.invalidateQueries({ queryKey: ADMIN_ALL_APPOINTMENTS_QUERY_KEY });
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
            Appointments booked across the platform will show up here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Doctor</p>
                  <CardTitle className="text-base">{appointment.doctor?.name ?? "N/A"}</CardTitle>
                  <p className="text-sm text-muted-foreground">{appointment.doctor?.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Patient</p>
                  <p className="text-base font-medium">{appointment.patient?.name ?? "N/A"}</p>
                  <p className="text-sm text-muted-foreground">{appointment.patient?.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={getStatusBadgeVariant(appointment.status)}>
                  {appointment.status ?? "N/A"}
                </Badge>
                <Badge variant={getPaymentBadgeVariant(appointment.paymentStatus)}>
                  {appointment.paymentStatus ?? "UNPAID"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
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
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsManagementList;
