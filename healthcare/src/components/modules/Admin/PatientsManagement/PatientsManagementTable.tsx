"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPatients } from "@/services/patient.services";
import { type IPatientListItem } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";

const getInitials = (name?: string) => {
  if (!name) return "P";
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

const PatientsManagementTable = () => {
  const { data: patientsResponse, isLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: getAllPatients,
  });

  const patients: IPatientListItem[] = patientsResponse?.data ?? [];

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading patients...</p>;
  }

  if (patients.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No patients registered yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardContent className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient.profilePhoto || undefined} alt={patient.name} />
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-sm font-medium">{patient.name}</p>
              <p className="truncate text-xs text-muted-foreground">{patient.email}</p>
              {patient.contactNumber && (
                <p className="truncate text-xs text-muted-foreground">{patient.contactNumber}</p>
              )}
              {patient.address && (
                <p className="truncate text-xs text-muted-foreground">{patient.address}</p>
              )}
              <Badge variant={patient.user?.status === "ACTIVE" ? "secondary" : "outline"} className="mt-1">
                {patient.user?.status ?? "ACTIVE"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientsManagementTable;
