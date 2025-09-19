"use client"

import Link from "next/link"
// ✅ importe les icônes depuis lucide-react
import { Home, Folder, FileText, HelpCircle, Settings, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export function Sidebar() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <aside className="bg-[#154C79] text-white w-64 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold">Bernadette</h2>
        <nav className="flex flex-col gap-3 mt-6">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <Home size={18} /> Accueil
          </Link>
          <Link href="/projets" className="flex items-center gap-2 hover:underline">
            <Folder size={18} /> Mes projets
          </Link>
          <Link href="/contenus" className="flex items-center gap-2 hover:underline">
            <FileText size={18} /> Mes contenus
          </Link>
          <Link href="/aide" className="flex items-center gap-2 hover:underline">
            <HelpCircle size={18} /> Aide
          </Link>
          <Link href="/parametres" className="flex items-center gap-2 hover:underline">
            <Settings size={18} /> Paramètres
          </Link>
        </nav>
      </div>

      {/* 🔐 Bouton Déconnexion */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-6 text-red-200 hover:text-white"
      >
        <LogOut size={18} /> Se déconnecter
      </button>
    </aside>
  )
}
