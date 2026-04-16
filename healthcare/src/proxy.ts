import { NextRequest } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { UserRole } from "./lib/authUtils";

export async function proxy(request: NextRequest) {
   try {
     const { pathname} =request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    
    const decodedAccessToken= accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).decoded;

    const isValidAccessToken=accessToken &&  jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success;

    const userRole : UserRole | null;
   
   } catch (error) {
    console.error("Error in proxy middleware:", error);
   }
}

export const config = {
    matcher:[]
}