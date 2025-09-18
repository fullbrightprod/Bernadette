'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AuthForm from '@/components/AuthForm'
import AuthStatus from '@/components/AuthStatus'
import Link from 'next/link'

// dans le JSX
<Link href="/dashboard" className="block text-center mt-6 text-blue-600 underline">
  Accéder au tableau de bord
</Link>

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="p-10 text-center">Chargement...</p>

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🔐 Authentification</h1>
      {user ? <AuthStatus /> : <AuthForm />}
    </main>
  )
}
