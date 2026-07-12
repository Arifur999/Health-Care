import AppointmentsManagementList, {
  ADMIN_ALL_APPOINTMENTS_QUERY_KEY,
} from "@/components/modules/Admin/AppointmentsManagement/AppointmentsManagementList"
import { getAllAppointments } from "@/services/appointment.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const AppointmentsManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ADMIN_ALL_APPOINTMENTS_QUERY_KEY,
    queryFn: () => getAllAppointments(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
          <p className="text-sm text-muted-foreground">
            All appointments booked across every doctor and patient on the platform.
          </p>
        </div>

        <AppointmentsManagementList />
      </div>
    </HydrationBoundary>
  )
}

export default AppointmentsManagementPage
