"use server"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function setTokenCookie(token) {
  cookies().set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600,
    path: "/",
  });
}

export async function getTokenFromCookie() {
  const cookie = cookies().get("token")
  const token = cookie.value
  return token
}
