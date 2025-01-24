import { NextResponse } from "next/server";

export async function POST(res) {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set cookie to be sent only over HTTPS in production
      sameSite: "Lax",
    });
    return NextResponse.json("Logged Out Successfully!", { status: 200 });
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
