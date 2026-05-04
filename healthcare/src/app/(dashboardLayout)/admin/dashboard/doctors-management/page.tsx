import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorsManagementPage=async ()=> {

   const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 60, // Cache the data for 1 hour
    gcTime: 1000 * 60 * 60*6 , // Garbage collect the cache after 1 hour
  });
  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
      
   </HydrationBoundary>
  )
}

export default DoctorsManagementPage