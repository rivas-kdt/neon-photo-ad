import { NextResponse } from "next/server"
import { verifyToken, getTokenFromCookie } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  const token = getTokenFromCookie()
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const userId = verifyToken(token)
  if (!userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)
    const users = await sql`SELECT id, username, email FROM users WHERE id = ${userId}`

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = users[0]
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

