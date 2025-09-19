"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage("❌ " + error.message)
    } else {
      setMessage("Connexion réussie ✅")

      // ✅ Supabase auth-helpers gère automatiquement les cookies
      // On attend un peu puis on redirige vers le dashboard
      setTimeout(() => {
        router.push("/")
      }, 800)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-[#154C79] text-center">
          🔐 Connexion
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#154C79] text-white p-2 rounded hover:bg-[#123a5f]"
        >
          Se connecter
        </button>
        {message && <p className="text-center">{message}</p>}
      </form>
    </div>
  )
}
