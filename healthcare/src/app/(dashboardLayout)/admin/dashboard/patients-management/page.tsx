import PatientsManagementTable from "@/components/modules/Admin/PatientsManagement/PatientsManagementTable"
import { getAllPatients } from "@/services/patient.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const PatientsManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["admin-patients"],
    queryFn: getAllPatients,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
          <p className="text-sm text-muted-foreground">
            All registered patients.
          </p>
        </div>

        <PatientsManagementTable />
      </div>
    </HydrationBoundary>
  )
}

export default PatientsManagementPage
