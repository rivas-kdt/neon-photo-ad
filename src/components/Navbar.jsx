"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Image,
  GalleryVerticalEnd,
  User,
  Home,
  Upload,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const user = {uid: "123vawZw12AJna"}
  const pathname = usePathname();
  console.log(user);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/photos", icon: Image, label: "Photos" },
    { href: "/upload", icon: Upload, label: "Upload" },
    { href: "/albums", icon: GalleryVerticalEnd, label: "Albums" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const navItems2 = [
    { href: "/login", icon: LogIn, label: "Login" },
    { href: "/register", icon: UserPlus, label: "Register" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto px-4 h-full">
        <ul className="flex justify-around items-center h-full">
          {user
            ? navItems.map((item) => (
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
              ))
            : navItems2.map((item) => (
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
