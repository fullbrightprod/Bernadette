"use client"

import { CardModule } from "@/components/CardModule"
import { ProgressBar } from "@/components/ProgressBar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

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
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-[#154C79]">
        Bienvenue sur Bernadette 👋
      </h1>

      {/* Barre de progression */}
      <ProgressBar value={35} />

      {/* Cartes modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardModule title="🎯 Persona" link="/persona" color="bg-[#EAB676]" />
        <CardModule title="🎨 Direction artistique" link="/da" color="bg-[#EAB676]" />
        <CardModule title="✍️ Contenus & scripts" link="/contenus" color="bg-[#EAB676]" />
        <CardModule title="📢 Diffusion" link="/diffusion" color="bg-[#EAB676]" />
      </div>
    </div>
  )
}
