import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setTokenCookie } from "@/lib/lib";

export async function POST(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { email, password } = await req.json();

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    setTokenCookie(token);
    const { password_hash, ...data } = user;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
