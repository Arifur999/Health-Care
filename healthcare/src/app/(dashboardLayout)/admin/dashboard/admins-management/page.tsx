import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorTable";
import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminManagementPage=async ()=> {

  

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <DoctorsTable />
   </HydrationBoundary>
  )
}

export default AdminManagementPage