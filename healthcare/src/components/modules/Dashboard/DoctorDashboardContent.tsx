"use client";

import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IDoctorDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const DoctorDashboardContent = () => {
  const { data: doctorDashboardData } = useQuery({
    queryKey: ["doctor-dashboard-data"],
    queryFn: () => getDashboardData<IDoctorDashboardData>(),
    refetchOnWindowFocus: "always",
  });

  const { data } = (doctorDashboardData ?? {}) as ApiResponse<IDoctorDashboardData>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Doctor Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your practice at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Appointments"
          value={data?.appointmentCount ?? 0}
          iconName="CalendarDays"
          description="All appointments booked with you"
        />
        <StatsCard
          title="Patients"
          value={data?.patientCount ?? 0}
          iconName="Users"
          description="Unique patients you've treated"
        />
        <StatsCard
          title="Reviews"
          value={data?.reviewCount ?? 0}
          iconName="Star"
          description="Reviews received from patients"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(data?.totalRevenue ?? 0).toFixed(2)}`}
          iconName="CreditCard"
          description="Revenue from paid appointments"
        />
      </div>

      <AppointmentPieChart
        data={data?.appointmentStatusDistribution ?? []}
        title="Appointment Status"
        description="Breakdown of your appointments by status"
      />
    </div>
  );
};

export default DoctorDashboardContent;
