import { z } from "zod";
export const LoginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export type ILogin = z.infer<typeof LoginZodSchema>;

export const RegisterZodSchema = z.object({
    name: z.string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
    email: z.email("Invalid email address"),
    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type IRegister = z.infer<typeof RegisterZodSchema>;

export const ForgetPasswordZodSchema = z.object({
    email: z.email("Invalid email address"),
});

export type IForgetPassword = z.infer<typeof ForgetPasswordZodSchema>;

const passwordSchema = z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character");

export const ResetPasswordZodSchema = z.object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "Enter the 6-digit code"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type IResetPassword = z.infer<typeof ResetPasswordZodSchema>;

export const VerifyEmailZodSchema = z.object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "Enter the 6-digit code"),
});

export type IVerifyEmail = z.infer<typeof VerifyEmailZodSchema>;