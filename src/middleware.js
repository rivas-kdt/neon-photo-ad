import { NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "./lib/auth";

export function middleware(request) {
  const token = getTokenFromCookie();
  const userId = verifyToken(token);
  console.log({token: token, uid: userId})
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(request.nextUrl.pathname)) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
