import SpecialtiesTable from "@/components/modules/Admin/SpecialtiesManagement/SpecialtiesTable"
import { getAllSpecialties } from "@/services/doctor.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const SpecialtiesManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
    staleTime: 1000 * 60,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Specialties Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage the medical specialties patients can browse and filter doctors by.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialtiesTable />
      </HydrationBoundary>
    </div>
  )
}

export default SpecialtiesManagementPage
