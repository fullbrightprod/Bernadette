"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuthUser } from "../../hooks/useAuthUser"
type Diffusion = {
  id: string
  platform: string
  status: "draft" | "scheduled" | "published"
  user_id: string
}




export default function DiffusionPage() {
  const [diffusions, setDiffusions] = useState<Diffusion[]>([])
  const { user, loading } = useAuthUser()
  const [platform, setPlatform] = useState("")
  const [status, setStatus] = useState("draft")

  useEffect(() => {
    if (user) fetchDiffusions()
  }, [user])

  async function fetchDiffusions() {
    const { data, error } = await supabase.from("diffusions").select("*")
    if (!error && data) setDiffusions(data)
  }

  async function addDiffusion(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    const { error } = await supabase.from("diffusions").insert([
      { platform, status, user_id: user.id }
    ])
    if (!error) {
      setPlatform("")
      setStatus("draft")
      fetchDiffusions()
    }
  }

  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📢 Diffusion</h1>
      <form onSubmit={addDiffusion} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Plateforme (Instagram, LinkedIn...)"
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
        <button className="bg-[#154C79] text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {diffusions.map((d) => (
          <li key={d.id} className="p-2 bg-gray-100 rounded">
            <strong>{d.platform}</strong> - {d.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
