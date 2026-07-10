"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData, IDoctorDashboardData, IPatientDashboardData } from "@/types/dashboard.types";

export async function getDashboardData<
    TData = IAdminDashboardData | IDoctorDashboardData | IPatientDashboardData
>() {
    try {
        const response = await httpClient.get<TData>("/stats");
        return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        console.error("Error fetching dashboard data:", error);
        return {
            success: false,
            message: error.message || "An error occurred while fetching dashboard data.",
            data: null,
            meta: null
        }

    }
}
