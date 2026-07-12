"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllAppointments } from "@/services/appointment.services";
import { type IAppointment, type IAppointmentPatient } from "@/types/appointment.types";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_ALL_APPOINTMENTS_FOR_PATIENTS_QUERY_KEY = ["admin-all-appointments"];

interface IPatientRosterEntry {
  patient: IAppointmentPatient;
  appointmentCount: number;
}

const getInitials = (name?: string) => {
  if (!name) return "P";
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

const derivePatientRoster = (appointments: IAppointment[]): IPatientRosterEntry[] => {
  const rosterByPatientId = new Map<string, IPatientRosterEntry>();

  appointments.forEach((appointment) => {
    const patient = appointment.patient;
    if (!patient?.id) return;

    const existingEntry = rosterByPatientId.get(patient.id);
    if (existingEntry) {
      existingEntry.appointmentCount += 1;
      return;
    }

    rosterByPatientId.set(patient.id, { patient, appointmentCount: 1 });
  });

  return Array.from(rosterByPatientId.values()).sort(
    (a, b) => b.appointmentCount - a.appointmentCount,
  );
};

const PatientsRoster = () => {
  const { data: appointmentsResponse, isLoading } = useQuery({
    queryKey: ADMIN_ALL_APPOINTMENTS_FOR_PATIENTS_QUERY_KEY,
    queryFn: getAllAppointments,
  });

  const appointments: IAppointment[] = appointmentsResponse?.data ?? [];
  const roster = derivePatientRoster(appointments);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading patients...</p>;
  }

  if (roster.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No patients found yet. Patients will appear here once they book an appointment.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roster.map(({ patient, appointmentCount }) => (
        <Card key={patient.id}>
          <CardContent className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient.profilePhoto || undefined} alt={patient.name ?? "Patient"} />
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-sm font-medium">{patient.name ?? "N/A"}</p>
              <p className="truncate text-xs text-muted-foreground">{patient.email ?? "N/A"}</p>
              {patient.contactNumber && (
                <p className="truncate text-xs text-muted-foreground">{patient.contactNumber}</p>
              )}
              {patient.address && (
                <p className="truncate text-xs text-muted-foreground">{patient.address}</p>
              )}
              <Badge variant="secondary" className="mt-1">
                {appointmentCount} appointment{appointmentCount > 1 ? "s" : ""}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientsRoster;
