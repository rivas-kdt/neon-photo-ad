import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { email, password, username, full_name } = req.body;
    if (!email || !password || !username || !full_name) {
      return res.status(400).json("All fields are required");
    }

    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await sql`
        INSERT INTO users (email, password_hash, username, full_name)
        VALUES (${email}, ${passwordHash}, ${username}, ${full_name})
        RETURNING id
      `;
    const user = await sql`SELECT * FROM WHERE id = ${newUser.id}`;
    const { password_hash, ...data } = user[0];
    return NextResponse.json(data, { status: 200 });
  } catch (error) {}
}
