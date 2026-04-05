import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API base URL is not defined in environment variables');
}
const axiosInstance=() => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return instance;
}

export interface ApiRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    
}

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        console.error('HTTP GET Error:', error);
        throw error;
    }
}

const httpPost = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().post(endpoint, data, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        console.error('HTTP POST Error:', error);
        throw error;
    }
}

const httpPut = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().put(endpoint, data, {
            headers: options?.headers,
            params: options?.params,
        });
        return response.data;
    } catch (error) {
        console.error('HTTP PUT Error:', error);
        throw error;
    }
}





export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,

}