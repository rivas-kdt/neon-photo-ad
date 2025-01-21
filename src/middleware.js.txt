import { NextResponse } from "next/server";
import { getTokenFromCookie } from "./lib/auth";

export function middleware(request) {
  const token = getTokenFromCookie();
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
