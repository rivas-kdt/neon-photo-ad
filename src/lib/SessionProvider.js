// context/SessionProvider.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Check if the user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://express-api-tawny-alpha.vercel.app/user",
          {
            method: "GET",
            credentials: 'include',
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const response = await fetch(
        "https://express-api-tawny-alpha.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );

      if (response.ok) {
        router.push("/");
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        return true;
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to login",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://express-api-tawny-alpha.vercel.app/logout",
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setUser(null);
        toast({
          title: "Success",
          description: "Logged out successfully",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <SessionContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
