import DoctorTable from "@/components/modules/Admin/DoctorsManagement/DoctorTable";
import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {use} from "react";

const DoctorsManagementPage=async ({ 
  searchParams,
}:{
  searchParams:  Promise<{ [key: string]: string | string[] | undefined }>;
})=> {
  const queryParamsObject = await searchParams;
  console.log(queryParamsObject);

  const queryString = Object.entries(queryParamsObject)
    .map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(",") : value ?? ""}`)
    .join("&");


   const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 60, // Cache the data for 1 hour
    gcTime: 1000 * 60 * 60*6 , // Garbage collect the cache after 1 hour
  });
  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorTable></DoctorTable>
   </HydrationBoundary>
  )
}

export default DoctorsManagementPage