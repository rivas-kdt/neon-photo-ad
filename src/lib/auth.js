import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export function getTokenFromCookie() {
  return cookies().get("token")?.value
}

