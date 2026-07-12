import PatientsRoster, {
  ADMIN_ALL_APPOINTMENTS_FOR_PATIENTS_QUERY_KEY,
} from "@/components/modules/Admin/PatientsManagement/PatientsRoster"
import { getAllAppointments } from "@/services/appointment.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const PatientsManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ADMIN_ALL_APPOINTMENTS_FOR_PATIENTS_QUERY_KEY,
    queryFn: () => getAllAppointments(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
          <p className="text-sm text-muted-foreground">
            Showing patients derived from appointment history — there is no dedicated patient
            directory endpoint in the backend yet.
          </p>
        </div>

        <PatientsRoster />
      </div>
    </HydrationBoundary>
  )
}

export default PatientsManagementPage
