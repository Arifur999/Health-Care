"use client";

import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { Button } from "@/components/ui/button";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IPatientDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";
import { CalendarPlus, ClipboardList } from "lucide-react";
import Link from "next/link";

const PatientDashboardContent = () => {
  const { data: patientDashboardData } = useQuery({
    queryKey: ["patient-dashboard-data"],
    queryFn: () => getDashboardData<IPatientDashboardData>(),
    refetchOnWindowFocus: "always",
  });

  const { data } = (patientDashboardData ?? {}) as ApiResponse<IPatientDashboardData>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-linear-to-r from-cyan-50 via-white to-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s a quick look at your appointments and reviews.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/my-appointments">
              <ClipboardList className="size-4" aria-hidden="true" />
              My Appointments
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/book-appointments">
              <CalendarPlus className="size-4" aria-hidden="true" />
              Book Appointment
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard
          title="Total Appointments"
          value={data?.appointmentCount ?? 0}
          iconName="CalendarDays"
          description="Appointments you have booked"
        />
        <StatsCard
          title="Reviews Given"
          value={data?.reviewCount ?? 0}
          iconName="Star"
          description="Reviews you have submitted"
        />
      </div>

      <div className="grid gap-4">
        <AppointmentPieChart
          data={data?.appointmentStatusDistribution ?? []}
          title="Appointment Status"
          description="Breakdown of your appointments by status"
        />
      </div>
    </div>
  );
};

export default PatientDashboardContent;
