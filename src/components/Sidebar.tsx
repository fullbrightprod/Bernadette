"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

import { Home, Folder, FileText, HelpCircle, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadSession() {
      console.log("📌 Sidebar mounted, checking session…")
      const { data } = await supabase.auth.getSession()

      if (data?.session?.user) {
        console.log("✅ Session trouvée:", data.session.user.email)
        setEmail(data.session.user.email ?? null)
      } else {
        console.log("ℹ️ Pas de session initiale (on attend onAuthStateChange)")
      }

      // ⚠️ Très important : on ne redirige pas ici
      setLoading(false)
    }

    loadSession()

    // ✅ écoute login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth state changed:", event, session)

      if (event === "SIGNED_IN" && session?.user) {
        setEmail(session.user.email ?? null)
        if (window.location.pathname === "/login") {
          router.replace("/persona") // replace pour éviter retour en arrière
        }
      }

      if (event === "SIGNED_OUT") {
        setEmail(null)
        if (window.location.pathname !== "/login") {
          router.replace("/login")
        }
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    setEmail(null)
    console.log("👋 Déconnexion")
    router.replace("/login")
  }

  if (loading) {
    return (
      <div className="w-64 bg-[#154C79] text-white flex flex-col p-4 min-h-screen">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="w-64 bg-[#154C79] text-white flex flex-col p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Bernadette</h1>

      {/* ✅ Email utilisateur connecté */}
      {email && (
        <div className="mb-6 text-sm bg-[#123a5f] p-2 rounded">
          Connecté en tant que<br />
          <span className="font-semibold">{email}</span>
        </div>
      )}

      {/* Menu principal */}
      <nav className="flex-1 space-y-2">
        <Link href="/" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <Home size={18} /> Dashboard
        </Link>
        <Link href="/persona" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <Folder size={18} /> Personas
        </Link>
        <Link href="/da" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <FileText size={18} /> Direction Artistique
        </Link>
        <Link href="/contenus" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <FileText size={18} /> Contenus
        </Link>
        <Link href="/diffusion" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <FileText size={18} /> Diffusion
        </Link>
      </nav>

      {/* Bas de sidebar */}
      <div className="mt-auto space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded w-full text-left"
        >
          <LogOut size={18} /> Déconnexion
        </button>
        <Link href="/settings" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <Settings size={18} /> Paramètres
        </Link>
        <Link href="/help" className="flex items-center gap-2 hover:bg-[#123a5f] p-2 rounded">
          <HelpCircle size={18} /> Aide
        </Link>
      </div>
    </div>
  )
}
