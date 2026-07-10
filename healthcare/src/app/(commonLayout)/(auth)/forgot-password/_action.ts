"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { ForgetPasswordZodSchema, IForgetPassword } from "@/zod/auth.validation";
import { redirect } from "next/dist/client/components/navigation";

export const forgetPasswordAction = async (payload: IForgetPassword): Promise<ApiErrorResponse> => {
    const parsedPayload = ForgetPasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        };
    }

    try {
        await httpClient.post("/auth/forget-password", parsedPayload.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: error?.response?.data?.message || "Failed to send reset code",
        };
    }

    redirect(`/reset-password?email=${encodeURIComponent(parsedPayload.data.email)}`);
};
