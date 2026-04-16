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
// export const SuperAdminProtectedRoutes:RouteConfig = {
//     pattern:[/^\/admin\/dashboard/],
//     exact:[]
// }

export const AdminProtectedRoutes:RouteConfig = {
    pattern:[/^\/admin\/dashboard/],
    exact:[]
}

export const patientProtectedRoutes:RouteConfig = {
    pattern:[/^\/dashboard/],
    exact:["/payment/success"]
}

export const isRouteMatches = (pathname:string, routes:RouteConfig) => {
    if(routes.exact.includes(pathname)){
        return true;
    }
    return routes.pattern.some((pattern:RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname:string) : "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if(isRouteMatches(pathname,commonProtectedRoutes)){
        return "COMMON";
    }
    if(isRouteMatches(pathname,doctorProtectedRoutes)){
        return "DOCTOR";
    }
    // if(isRouteMatches(pathname,SuperAdminProtectedRoutes)){
    //     return "SUPER_ADMIN";
    // }

    if(isRouteMatches(pathname,AdminProtectedRoutes)){
        return "ADMIN";
    }
    if(isRouteMatches(pathname,patientProtectedRoutes)){
        return "PATIENT";
    }
    return null;

}

export const getDefaultDashboardRoute = (role:UserRole) => {
    if(role === "ADMIN" || role === "SUPER_ADMIN"){
        return "/admin/dashboard";
    }
    if(role === "DOCTOR"){
        return "/doctor/dashboard";
    }
    if(role === "PATIENT"){
        return "/patient/dashboard";
    }
    return "/";
}