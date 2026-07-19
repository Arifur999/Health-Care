"use client";

import AppointmentBarChart from "@/components/shared/AppointmentBarChart";
import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardContent = () => {
    const {data : adminDashboardData} = useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        refetchOnWindowFocus: "always" // Refetch the data when the window regains focus
    })

    const {data} = adminDashboardData as ApiResponse<IAdminDashboardData>;

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
                Overview of appointments and patients across the platform.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatsCard
            title="Total Appointments"
            value={data?.appointmentCount || 0}
            iconName="CalendarDays"
            description="Number of appointments scheduled"
            />
            <StatsCard
            title="Total Patients"
            value={data?.patientCount || 0}
            iconName="Users"
            description="Number of patients registered"
            />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            <AppointmentBarChart
            data={data?.barChartData || []}
            />

            <AppointmentPieChart
            data={data?.pieChartData || []}
            title="Appointment Status"
            description="Breakdown of all appointments by status"
            />
        </div>
    </div>
  )
}

export default AdminDashboardContent