"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)   // ✅ plus de any
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setUser(null)
        router.push("/login")
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    loadUser()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user)
      else {
        setUser(null)
        router.push("/login")
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [router])

  return { user, loading }
}
