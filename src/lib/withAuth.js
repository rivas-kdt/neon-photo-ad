"use client";

import { useSession } from "@/lib/Session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { user, loading } = useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    // useEffect(() => {
    //   if (!loading && !user) {
    //     router.push("/login");
    //   }
    // }, [user, loading, router]);

    useEffect(() => {
      if (!loading) {
        if (user) {
          setIsAuthorized(true);
        } else {
          router.push("/login");
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }

    if (!user) {
      return null;
    }

    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };
}
