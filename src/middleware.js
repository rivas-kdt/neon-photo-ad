import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("_vercel_jwt");
  const token = jwt?.value;
  console.log(jwt);
  console.log("JWT Token:", token);

  const cookieStore2 = await cookies();
  const jwt2 = cookieStore2.get("jwt");
  const token2 = jwt2?.value;
  console.log(jwt);
  console.log("JWT Token2:", token2);

  return NextResponse.next();
}
