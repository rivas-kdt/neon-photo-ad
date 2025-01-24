import { getTokenFromCookie, verifyToken } from "@/lib/lib";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const cookie = getTokenFromCookie();
    const user_id = verifyToken(cookie);
    console.log(cookie);
    console.log(user_id);
    if (!cookie) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    if (!user_id) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }
    const user = await sql`SELECT * FROM users WHERE id=${user_id}`;
    const { password_hash, ...data } = user[0];
    return NextResponse.json(data, { status: 401 });
  } catch (error) {
    return NextResponse.json("Unauthenticated");
  }
}
