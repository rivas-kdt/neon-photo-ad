import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const { token } = cookies().get("token");
  console.log(token.value);
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
