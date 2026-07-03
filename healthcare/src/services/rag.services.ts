import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
    query: string;
    limit?: number;
    sourceTypes?: string;
}

export interface IRagSource {
    id: string;
    content: string;
    similarity: number;
    metadata?: {
        name?: string;
        [key: string]: unknown;
    };
}


export interface IRagQueryData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answers?: any;
    sources: IRagSource[];
    contextUsed: string;
}

export interface IIngestDoctorData {
    success: boolean;
    message: string;
    indexedCount: number;
}



export const queryRagService = async (payload: IRagQueryPayload) =>{
    const response = await httpClient.post<IRagQueryData>("/rag/query", payload);
    return response.data;
}

export const ingestDoctorService = async () => {
    const response = await httpClient.post<IIngestDoctorData>("/rag/ingest-doctors",{});
    return response.data;
}
