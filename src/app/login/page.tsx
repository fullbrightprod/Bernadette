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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
  setMessage("❌ " + error.message)
} else {
  setMessage("Connexion réussie ✅")
  // force la mise à jour de la session dans les cookies
  if (data.session) {
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    })
  }
  // redirection vers dashboard
  router.push("/")
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
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
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
