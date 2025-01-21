import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    sameSite: "strict",
    maxAge: 3600, // 1 hour
    path: "/",
  });
}

export function getTokenFromCookie() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return token ? token.split("=")[1] : null;
}
