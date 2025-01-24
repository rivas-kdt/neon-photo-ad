import { getTokenFromCookie } from "@/lib/lib";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const cookie = req.cookies["jwt"];
    const id = getTokenFromCookie()
    console.log(id)
    if (!cookie) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }
    const user = await sql`SELECT * FROM users WHERE id=${claims.id}`;
    const { password_hash, ...data } = user[0];
    return NextResponse.json(data, { status: 401 });
  } catch (error) {
    return NextResponse.json("Unauthenticated");
  }
}
