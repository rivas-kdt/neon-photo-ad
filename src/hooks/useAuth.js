"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return { user, loading }
}

