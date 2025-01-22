import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const cookieStore = cookies();
  const jwt = cookieStore.get("_vercel_jwt")
  const token = jwt.value;
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
