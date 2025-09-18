'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    setMessage('')
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setMessage(error ? error.message : 'Connexion réussie ✅')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      setMessage(error ? error.message : 'Inscription réussie 🎉')
    }
  }

  return (
    <div className="max-w-md mx-auto border p-6 rounded space-y-4">
      <h2 className="text-xl font-bold text-center">{isLogin ? 'Connexion' : 'Inscription'}</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        className="border p-2 w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleAuth} className="bg-blue-600 text-white px-4 py-2 w-full rounded">
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </button>

      <p
        className="text-sm text-center text-blue-500 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
      </p>

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </div>
  )
}
