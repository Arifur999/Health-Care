import { NextRequest } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";

export async function proxy(request: NextRequest) {
    const { pathname} =request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    

    const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success;

}

export const config = {
    matcher:[]
}