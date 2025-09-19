"use client"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="bg-[#154C79] text-white w-64 min-h-screen p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Bernadette</h2>
      <nav className="flex flex-col gap-3 mt-6">
        <Link href="/">Accueil</Link>
        <Link href="/projets">Mes projets</Link>
        <Link href="/contenus">Mes contenus</Link>
        <Link href="/aide">Aide</Link>
        <Link href="/parametres">Paramètres</Link>
      </nav>
    </aside>
  )
}

