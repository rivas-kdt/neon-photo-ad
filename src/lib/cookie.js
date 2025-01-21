"use server"
import { cookies } from "next/headers"

export async function getTokenCookie() {
    const token = (await cookies()).get("token")
    return token
  }