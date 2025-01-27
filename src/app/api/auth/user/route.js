import { getTokenFromCookie, verifyToken } from "@/lib/lib";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    // const cookie = getTokenFromCookie();

    const cookieStore = await cookies();
    const cookie = cookieStore.get("jwt");
    const token = jwt.verify(cookie, process.env.JWT_SECRET);
    console.log({ jwtAPIuser: cookie });
    console.log(token);
    if (!cookie) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    if (!token) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }
    const user = await sql`SELECT * FROM users WHERE id=${token.id}`;
    const { password_hash, ...data } = user[0];
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unauthenticated");
  }
}
