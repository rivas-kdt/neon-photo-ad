"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Map, User, Home, Upload, LogOut, LogIn, UserPlus } from "lucide-react";
import { useSession } from "@/lib/Session";

const Navbar = () => {
  const pathname = usePathname();
  const { user, loading, logout } = useSession();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/camera", icon: Camera, label: "Camera" },
    { href: "/upload", icon: Upload, label: "Upload" },
    { href: "/map", icon: Map, label: "Map" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      {loading ? (
        <div className=" w-full h-full bg-[#f2f2f2] animate-pulse"></div>
      ) : (
        <div className="container mx-auto px-4">
          {user ? (
            <ul className="flex justify-around py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center ${
                      pathname === item.href ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={logout}
                  className="flex flex-col items-center text-red-500"
                >
                  <LogOut className="h-6 w-6"></LogOut>
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex justify-around py-2">
              <li>
                <Link
                  href={'/login'}
                  className={`flex flex-col items-center ${
                    pathname === '/login' ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <LogIn className="h-6 w-6" />
                  <span className="text-xs mt-1">Login</span>
                </Link>
              </li>
              <li>
                <Link
                  href={'/register'}
                  className={`flex flex-col items-center ${
                    pathname === '/register' ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <UserPlus className="h-6 w-6" />
                  <span className="text-xs mt-1">Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
