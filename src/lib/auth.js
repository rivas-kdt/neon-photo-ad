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

export function getTokenFromCookie() {
  return cookies().get("token")?.value;
}

export async function verifyAuth(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
