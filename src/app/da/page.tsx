"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuthUser } from "../../hooks/useAuthUser"

export default function DaPage() {
  const { user, loading } = useAuthUser()
  const [daList, setDaList] = useState<any[]>([])
  const [style, setStyle] = useState("")
  const [colors, setColors] = useState("")

  useEffect(() => {
    if (user) fetchDa()
  }, [user])

  async function fetchDa() {
    const { data, error } = await supabase.from("directions_artistiques").select("*")
    if (!error && data) setDaList(data)
  }

  async function addDa(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    const { error } = await supabase.from("directions_artistiques").insert([
      { style, colors: colors.split(","), user_id: user.id }
    ])
    if (!error) {
      setStyle("")
      setColors("")
      fetchDa()
    }
  }

  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 Direction Artistique</h1>
      <form onSubmit={addDa} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Style (ex: moderne)"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Couleurs séparées par virgule"
          className="border p-2 rounded"
        />
        <button className="bg-[#154C79] text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {daList.map((d) => (
          <li key={d.id} className="p-2 bg-gray-100 rounded">
            <strong>{d.style}</strong><br />
            <span className="text-sm">{JSON.stringify(d.colors)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
