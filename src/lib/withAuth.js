"use client";

import { useSession } from "@/lib/Session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { user, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
