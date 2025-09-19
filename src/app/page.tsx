"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  if (loading) {
    return <p className="p-6">Chargement...</p>
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[#154C79]">
        👋 Bienvenue sur ton Dashboard
      </h1>
      <p className="text-gray-600">
        Choisis un module pour commencer :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/persona"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#154C79]">🎯 Persona</h2>
          <p className="text-gray-600 mt-2">
            Définis ton buyer persona (âge, besoins, budget).
          </p>
        </Link>

        <Link
          href="/da"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#154C79]">🎨 Direction Artistique</h2>
          <p className="text-gray-600 mt-2">
            Génère ta charte visuelle (couleurs, typographies, moodboard).
          </p>
        </Link>

        <Link
          href="/contenus"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#154C79]">✍️ Contenus</h2>
          <p className="text-gray-600 mt-2">
            Crée des scripts vidéo, posts réseaux sociaux et storyboards.
          </p>
        </Link>

        <Link
          href="/diffusion"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#154C79]">📢 Diffusion</h2>
          <p className="text-gray-600 mt-2">
            Planifie et exporte ton calendrier éditorial.
          </p>
        </Link>
      </div>
    </div>
  )
}
