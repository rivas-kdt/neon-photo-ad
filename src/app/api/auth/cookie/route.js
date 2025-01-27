import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("jwt")?.value;
    console.log({ jwtAPIuser: cookie });
    if (!cookie) {
      return NextResponse.json("No Cookie", { status: 401 });
    }
    return NextResponse.json(cookie, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unauthenticated");
  }
}
