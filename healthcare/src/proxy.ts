import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";


export async function proxy(request: NextRequest) {
   try {
     const { pathname} =request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    
    const decodedAccessToken= accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).decoded;

    const isValidAccessToken=accessToken &&  jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success;

    let userRole : UserRole | null = null;


    if(decodedAccessToken ){
        userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);

    const unifySuperAdminAndAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

    userRole = unifySuperAdminAndAdminRole

    const isAuth=isAuthRoute(pathname);

    if(isAuth && isValidAccessToken){
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    
    }

   

    if(routeOwner === null){
        return NextResponse.next();
     }

     if(!accessToken || !isValidAccessToken){
        const loginUrl =new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);

     }

     if(routeOwner === "COMMON"){
        return NextResponse.next();

     } 

     if(routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT"){
        if(routeOwner !== userRole){
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
        
     }

    
 return NextResponse.next();
   
   } catch (error) {
    console.error("Error in proxy middleware:", error);
   }
}

export const config = {
    matcher : [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ]
}