"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Camera, Map, User, Home, Upload, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/SessionProvider"

const Navbar = () => {
  const pathname = usePathname()
  const { user, logout } = useSession()
  console.log(user)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/camera", icon: Camera, label: "Camera" },
    { href: "/upload", icon: Upload, label: "Upload" },
    { href: "/map", icon: Map, label: "Map" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  if (!user) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center ${pathname === item.href ? "text-blue-500" : "text-gray-500"}`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <Button variant="ghost" className="flex flex-col items-center text-gray-500" onClick={logout}>
              <LogOut className="h-6 w-6" />
              <span className="text-xs mt-1">Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

