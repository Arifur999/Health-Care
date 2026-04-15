export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoles =["/login","/register","/verify-email","/forgot-password","/reset-password"];
    

    export const isAuthRoute = (pathname:string) => {
        return authRoles.some((router :string) => router === pathname);
    }