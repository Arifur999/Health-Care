"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegister, RegisterZodSchema } from "@/zod/auth.validation";

export const RegisterAction = async (payload: IRegister): Promise<ApiErrorResponse> => {
    const parsedPayload = RegisterZodSchema.safeParse(payload);
    
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }

    try {
        const registrationData = {
            name: parsedPayload.data.name,
            email: parsedPayload.data.email,
            password: parsedPayload.data.password,
        };
        
        const response = await httpClient.post("/auth/register", registrationData);
        
        return {
            success: response.success,
            message: response.message || "Registration failed",
        };

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
        }
    }
}
