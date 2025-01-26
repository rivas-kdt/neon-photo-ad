import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export function setTokenCookie(token) {
  cookies().set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 3600,
    path: "/",
  });
}

export async function getTokenFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");
  return token;
}
