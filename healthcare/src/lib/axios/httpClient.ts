import { ApiResponse } from '@/types/api.types';
import axios from 'axios';

const FALLBACK_API_BASE_URL = "http://127.0.0.1:5000/api/v1";
const API_BASE_URL =
    process.env.API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
    FALLBACK_API_BASE_URL;

const normalizedBaseUrl = API_BASE_URL.replace(/\/+$/, "");

if (process.env.NODE_ENV === "production" && !process.env.API_BASE_URL && !process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error("API base URL is not defined in environment variables");
}

const TRANSIENT_NETWORK_ERROR_CODES = new Set(["ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "EHOSTUNREACH"]);

const axiosInstance = axios.create({
    baseURL: normalizedBaseUrl,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface ApiRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    
}

const getApiErrorMessage = (error: unknown): Error => {
    if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const responseMessage =
            responseData &&
            typeof responseData === "object" &&
            "message" in responseData &&
            typeof (responseData as Record<string, unknown>).message === "string"
                ? (responseData as Record<string, string>).message
                : null;

        if (typeof responseMessage === "string" && responseMessage.trim()) {
            return new Error(responseMessage);
        }

        if (error.code && TRANSIENT_NETWORK_ERROR_CODES.has(error.code)) {
            return new Error(
                `Unable to connect to API at ${normalizedBaseUrl}. Please make sure your backend server is running.`
            );
        }

        if (typeof error.message === "string" && error.message.trim()) {
            return new Error(error.message);
        }
    }

    if (error instanceof Error) {
        return error;
    }

    return new Error("Unexpected API error");
};

const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const response =  await axiosInstance.get<ApiResponse<TData>>(endpoint, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        throw getApiErrorMessage(error);
    }
}

const httpPost = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<TData>>(endpoint, data, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        throw getApiErrorMessage(error);
    }
}

const httpPut = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.put<ApiResponse<TData>>(endpoint, data, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        throw getApiErrorMessage(error);
    }
}

const httpPatch = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.patch<ApiResponse<TData>>(endpoint, data, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        throw getApiErrorMessage(error);
    }
}


const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<TData>>(endpoint, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        throw getApiErrorMessage(error);
    }
}






export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete,

}
