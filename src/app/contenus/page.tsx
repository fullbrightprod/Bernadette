"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuthUser } from "../../hooks/useAuthUser"

export default function ContenusPage() {
  const { user, loading } = useAuthUser()
  const [contenus, setContenus] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [script, setScript] = useState("")

  useEffect(() => {
    if (user) fetchContenus()
  }, [user])

  async function fetchContenus() {
    const { data, error } = await supabase.from("contenus").select("*")
    if (!error && data) setContenus(data)
  }

  async function addContenu(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    const { error } = await supabase.from("contenus").insert([
      { title, script, user_id: user.id }
    ])
    if (!error) {
      setTitle("")
      setScript("")
      fetchContenus()
    }
  }

  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Contenus</h1>
      <form onSubmit={addContenu} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="border p-2 rounded"
        />
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Script"
          className="border p-2 rounded"
        />
        <button className="bg-[#154C79] text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {contenus.map((c) => (
          <li key={c.id} className="p-2 bg-gray-100 rounded">
            <strong>{c.title}</strong>
            <p className="text-sm">{c.script}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
