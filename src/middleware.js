import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("_vercel_jwt");
  console.log(cookieStore);

  return NextResponse.next();
}
