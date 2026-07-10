"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IResetPassword, ResetPasswordZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/dist/client/components/navigation";

export const resetPasswordAction = async (payload: IResetPassword): Promise<ApiErrorResponse> => {
    const parsedPayload = ResetPasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        };
    }

    try {
        await httpClient.post("/auth/reset-password", {
            email: parsedPayload.data.email,
            otp: parsedPayload.data.otp,
            newPassword: parsedPayload.data.newPassword,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: error?.response?.data?.message || "Failed to reset password",
        };
    }

    redirect("/login");
};
