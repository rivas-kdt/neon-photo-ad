import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies["_vercel_jwt"];
  console.log({ mid: request.headers[0].cookie, mid2: token });
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
