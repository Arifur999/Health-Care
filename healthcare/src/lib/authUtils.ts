export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoles =["/login","/register","/verify-email","/forgot-password","/reset-password"];
    

    export const isAuthRoute = (pathname:string) => {
        return authRoles.some((router :string) => router === pathname);
    }

export type RouteConfig = {
    exact:string[];
    pattern:RegExp[];
}

export const commonProtectedRoutes:RouteConfig = {
    exact:["/my-profile","/change-password"],
    pattern:[]
}

export const doctorProtectedRoutes:RouteConfig = {
    pattern:[/^\/doctor\/dashboard/],
    exact:[]
}

export const adminOrSuperAdminProtectedRoutes:RouteConfig = {
    pattern:[/^\/admin\/dashboard/],
    exact:[]
}

export const patientProtectedRoutes:RouteConfig = {
    pattern:[/^\/dashboard/],
    exact:["/payment/success"]
}