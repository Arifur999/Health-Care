import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role : UserRole) : NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            // title : "Dashboard",
            items : [
                {
                    title : "Home",
                    href : "/",
                    icon : "Home"
                },
                {
                    title : "Dashboard",
                    href : defaultDashboard,
                    icon : "LayoutDashboard"

                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                },
            ]
        },
        {
            title : "Settings",
            items : [
                {
                    title : "Change Password",
                    href : "change-password",
                    icon : "Settings"
                }
            ]
        }
    ]
}

export const doctorNavItems : NavSection[] = [
    {
        title: " Patient Management",
        items : [
            {
                title : "Appointments",
                href : "/doctor/dashboard/appointments",
                icon : "Calender"
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock",
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText",
            },
            {
                title: "My Reviews",
                href: "/doctor/dashboard/my-reviews",
                icon: "Star",
            },
        ]
    }
]
