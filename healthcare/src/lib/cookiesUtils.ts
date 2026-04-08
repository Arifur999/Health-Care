import { cookies } from "next/headers"

export const setCookie = async (
    name: string,
    value: string,
    maxAgeInSeconds: number,
    
  ) => {
    const cookieStore=await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: maxAgeInSeconds,
    });

  }