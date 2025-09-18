'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setIsAuth(true)
      } else {
        router.push('/') // si pas connecté → retour page login
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <p className="p-10 text-center">Chargement...</p>
  if (!isAuth) return null

  return <>{children}</>
}
