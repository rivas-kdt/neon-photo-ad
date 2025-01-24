import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sql = neon(process.env.DATABASE_URL);
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length === 0) {
      res.status(404).json("Password does not match!");
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      res.status(404).json("Password does not match!");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    const { password_hash, ...data } = user;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
