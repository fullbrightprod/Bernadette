"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuthUser } from "../../hooks/useAuthUser"

export default function PersonaPage() {
  const { user, loading } = useAuthUser()
  const [personas, setPersonas] = useState<any[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (user) fetchPersonas()
  }, [user])

  async function fetchPersonas() {
    const { data, error } = await supabase.from("personas").select("*")
    if (!error && data) setPersonas(data)
  }

  async function addPersona(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    const { error } = await supabase.from("personas").insert([
      { name, description, user_id: user.id }
    ])
    if (!error) {
      setName("")
      setDescription("")
      fetchPersonas()
    }
  }

  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Personas</h1>
      <form onSubmit={addPersona} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="border p-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <button className="bg-[#154C79] text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {personas.map((p) => (
          <li key={p.id} className="p-2 bg-gray-100 rounded">
            <strong>{p.name}</strong><br />
            <span className="text-sm">{p.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
