import { cookies } from "next/headers";
import { getTokenFromCookie } from "./lib/lib";

export async function middleware() {
  const token2 = getTokenFromCookie();
  console.log({ "1st": token2 });

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");
  console.log({ "2nd": token });
}
