"use server";
import { httpClient } from "@/lib/axios/httpClient"
import { QueryClient } from "@tanstack/react-query";

interface IDoctor {
    id:number;
    name:string;
    specialization:string;
    experience:number;
    rating:number;
}

await QueryClient.prefetchQuery({
    queryClient:["doctors"],
    queryFn:getDoctors,
})

export const getDoctors = async () => {
    const doctors =await httpClient.get("/doctors");
    return doctors.data;
}