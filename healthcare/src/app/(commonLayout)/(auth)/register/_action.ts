"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse } from "@/types/auth.types";
import { IRegister, RegisterZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const RegisterAction = async (payload: IRegister): Promise<IRegisterResponse | ApiErrorResponse> => {
    const parsedPayload = RegisterZodSchema.safeParse(payload);
    
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }

    try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...registrationData } = parsedPayload.data;
        
        const response = await httpClient.post<IRegisterResponse>("/auth/register", registrationData);
        
        if (response.data.success) {
            // Optionally store tokens if API returns them
            // const { token, accessToken, refreshToken } = response.data;
            // await setTokenInCookies("accessToken", accessToken);
            // await setTokenInCookies("refreshToken", refreshToken);
            // await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
            
            // Redirect to verify email or login page
            redirect("/verify-email");
        }

        return response.data;

    } catch (error) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" &&
            error.digest.startsWith("NEXT_REDIRECT_")) {
            throw new Error("Redirection in progress. Please wait...");
        }

        return {
            success: false,
            message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        }
    }
}
