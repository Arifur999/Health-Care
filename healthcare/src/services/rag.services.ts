import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
    query: string;
    limit?: number;
    sourceTypes?: string;
}

export const queryRagService = async (payload: IRagQueryPayload) =>{
    const response = await httpClient.post("/rag/query", payload);
    return response.data;
}

export const ingestDoctorService = async () => {
    const response = await httpClient.post("/rag/ingest-doctor",{});
    return response.data;
}