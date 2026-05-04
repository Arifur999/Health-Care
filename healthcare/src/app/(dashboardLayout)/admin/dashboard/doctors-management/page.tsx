import { getDoctors } from "@/services/doctor.services";
import { QueryClient } from "@tanstack/react-query";

const DoctorsManagementPage=async ()=> {

   const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return (
    <div>page</div>
  )
}

export default DoctorsManagementPage