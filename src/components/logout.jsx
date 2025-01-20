"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
