import DoctorApplicationsClient from "@/components/modules/Admin/DoctorApplications/DoctorApplicationsClient"
import { getDoctorApplications } from "@/services/doctorApplication.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const DoctorApplicationsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["doctor-applications"],
    queryFn: () => getDoctorApplications(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorApplicationsClient />
    </HydrationBoundary>
  )
}

export default DoctorApplicationsPage
