import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("_vercel_jwt");
  const token = jwt?.value
  console.log(jwt);
  console.log("JWT Token:", token)

  return NextResponse.next();
}
