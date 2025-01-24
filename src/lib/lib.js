import { cookies } from "next/headers";
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

export function setTokenCookie(token) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 3600,
    path: "/",
  });
}

export function getTokenFromCookie() {
  console.log(cookies);
  return cookies.get("token")?.value;
}
