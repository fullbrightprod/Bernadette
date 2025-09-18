'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Récupérer l'utilisateur connecté au chargement
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Surveiller les changements de session (connexion/déconnexion)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!user) return null

  return (
    <div className="border p-4 rounded mb-6 text-center">
      <p className="mb-2">✅ Connecté en tant que : <strong>{user.email}</strong></p>
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
        Se déconnecter
      </button>
    </div>
  )
}
