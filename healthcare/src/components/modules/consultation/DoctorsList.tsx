"use client";
import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";
import { useQuery } from "@tanstack/react-query";

const DoctorsList=()=> {
    const { data } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getDoctors(),
          // Simulate an API call
      });

      console.log(data);
  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data.data?.map((doctor:any) => (
        <div key={doctor.id}>{doctor.name}</div>
      ))}
    </div>
  )
}

export default DoctorsList