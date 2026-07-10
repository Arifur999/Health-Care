"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { IChangePasswordResponse } from "@/types/auth.types";
import { IChangePassword, ChangePasswordZodSchema } from "@/zod/auth.validation";

export const changePasswordAction = async (payload: IChangePassword): Promise<ApiErrorResponse> => {
    const parsedPayload = ChangePasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        };
    }

    try {
        const response = await httpClient.post<IChangePasswordResponse>("/auth/change-password", {
            currentPassword: parsedPayload.data.currentPassword,
            newPassword: parsedPayload.data.newPassword,
        });

        const { accessToken, refreshToken, token } = response.data;
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        return {
            success: true,
            message: response.message || "Password changed successfully",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to change password",
        };
    }
};
