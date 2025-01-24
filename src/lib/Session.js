"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const router = useRouter();
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "/api/auth/user",
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUser(response.data);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to login",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
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

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "/api/auth/register",
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log(response.data);
        setUser(response.data);
        toast({
          title: "Success",
          description: "Account created successfully. Logged in.",
        });
        router.push("/"); // Redirect to home or dashboard
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to register",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Register error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <SessionContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    console.log("useSession must be within a Session Provider");
  }
  return context;
};
