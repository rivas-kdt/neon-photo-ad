"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/SessionProvider";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { toast } = useToast();
  const { user, isLoading, logout } = useSession()
  console.log(user)

  // if(user){
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   const token = getTokenFromCookie()
  //   if (!token) {
  //     router.push("/login"); // Redirect if no token exists
  //     return;
  //   }
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch("/api/users/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProfile(data);
  //       } else {
  //         throw new Error("Failed to fetch profile");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load profile. Please try again.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [router, toast]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Implement profile update logic here
  //   toast({
  //     title: "Profile Updated",
  //     description: "Your profile has been updated successfully.",
  //   });
  // };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      asd
    </div>
  );
}
