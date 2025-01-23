"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/SessionProvider";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, logout } = useSession();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Implement profile update logic here
  //   toast({
  //     title: "Profile Updated",
  //     description: "Your profile has been updated successfully.",
  //   });
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center justify-center mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={
              user.profile_picture_url || "/placeholder.svg?height=96&width=96"
            }
            alt={user.full_name}
          />
          <AvatarFallback>
            {user.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={user.username} readOnly />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={user.email} readOnly />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={user.full_name}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={user.bio || ""}
            onChange={(e) => console.log("Talaga")}
            rows={4}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>

      <Button onClick={logout} className="mt-2">
        <LogOut className="h-6 w-6" />
        <span className="text-xs mt-1">Logout</span>
      </Button>
    </div>
  );
}
