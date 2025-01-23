import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { cookies } from "next/headers";

async function checkCookie() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has("_vercel_jwt")
  if(hasCookie){
    console.log(hasCookie)
    return true
  }
  return null
}

export function middleware(request) {
  const ck = checkCookie()
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(request.nextUrl.pathname)) {
    if (!ck) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // const claims = verifyToken(token);
    // if (!claims) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
