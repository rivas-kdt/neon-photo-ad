import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("_vercel_jwt");
  console.log(cookieStore);
  return <div>Try</div>;
}
