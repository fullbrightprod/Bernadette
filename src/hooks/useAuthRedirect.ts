"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

const publicRoutes = ["/login"]

export function useAuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session && !publicRoutes.includes(pathname)) {
        // Pas connecté → /login
        router.push("/login")
      } else if (session && pathname === "/login") {
        // Déjà connecté mais sur /login → /
        router.push("/")
      }
    }

    checkSession()

    // 🔄 Ecoute les changements de session (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !publicRoutes.includes(pathname)) {
        router.push("/login")
      } else if (session && pathname === "/login") {
        router.push("/")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])
}
