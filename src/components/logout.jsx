"use client";

import { useSession } from "@/lib/Session";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useSession()

  const handleLogout = async () => {
    await logout()
  };

  return <button onClick={handleLogout}>Logout</button>;
}
