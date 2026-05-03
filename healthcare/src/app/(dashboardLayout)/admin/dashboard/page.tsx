import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


const AdminDashboardPage=async()=> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000, // 30 seconds data freshness
    gcTime: 5 * 60 * 1000, // 5 minutes garbage collection time
  })


  // const dashboardData = queryClient.getQueryData(["admin-dashboard-data"]) as ApiResponse<IAdminDashboardData>;
  // console.log(dashboardData.data);

  return (
    
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  )
}

export default AdminDashboardPage