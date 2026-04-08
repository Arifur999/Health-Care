"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILogin, LoginZodSchema } from "@/zod/auth.validation";



export const LoginAction = async (payload : ILogin): Promise<ILoginResponse | ApiErrorResponse> => {

    const parsedPayload = LoginZodSchema.safeParse(payload);
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
           
            
        }
    }
    try {
        
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
        const { token, accessToken, refreshToken, user } = response.data;
        // Store tokens in cookies
       
        return response.data;

    } catch (error) {
        return {
            success: false,
            message: `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            
        }
    
    }
}