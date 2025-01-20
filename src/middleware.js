import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { cookies } from "next/headers";

export function middleware(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  // List of paths that don't require authentication
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
