"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PersonaForm, { emptyPersona } from "@/components/PersonaForm";
import { Persona } from "@/types/persona";
import {
  fetchPersonas,
  createPersona,
  updatePersona,
  deletePersona,
} from "@/lib/personaService";

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Persona | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const router = useRouter();

  // ✅ Étape 1 : vérifier si l’utilisateur est connecté
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.push("/login");
      } else {
        setCheckingAuth(false); // utilisateur trouvé → on continue
      }
    });
  }, [router]);

  // ✅ Étape 2 : charger les personas seulement si auth OK
  useEffect(() => {
    if (checkingAuth) return; // on attend la fin du check auth
    fetchPersonas()
      .then(setPersonas)
      .catch((err) => {
        console.error("Erreur chargement personas", err);
        alert("Problème de chargement. Êtes-vous connecté ?");
      })
      .finally(() => setLoading(false));
  }, [checkingAuth]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return personas;
    return personas.filter((p) =>
      [p.name, p.jobTitle, p.sector, p.topGoal ?? "", p.topFrustration ?? ""]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }, [personas, query]);

  async function handleSave(p: Persona) {
    try {
      if (editing) {
        const updated = await updatePersona(editing.id, p);
        setPersonas((prev) =>
          prev.map((x) => (x.id === editing.id ? updated : x))
        );
      } else {
        const created = await createPersona(p);
        setPersonas((prev) => [created, ...prev]);
      }
      setOpen(false);
      setEditing(null);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Erreur lors de l'enregistrement du persona");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce persona ?")) return;
    try {
      await deletePersona(id);
      setPersonas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  }

  // ✅ Affichage "Connexion en cours" pendant le check auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Connexion en cours...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Personas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un persona est une représentation semi-fictive de votre client idéal.
          Bien défini, il devient la boussole de votre marketing (réseaux
          sociaux, email, publicité, contenu) et aligne vos messages sur les
          besoins réels de vos clients.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="rounded-2xl bg-black px-4 py-2 text-white shadow hover:opacity-90"
          >
            + Créer un persona
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher (nom, métier, secteur, objectif, frustration)"
            className="min-w-[260px] flex-1 rounded-xl border px-3 py-2"
          />
        </div>
      </header>

      {/* Drawer Create / Edit */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editing
                  ? `Modifier persona — ${
                      editing.name || editing.jobTitle || "Sans titre"
                    }`
                  : "Créer un persona"}
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setEditing(null);
                }}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <PersonaForm
              key={editing?.id || "new"}
              initialData={editing || emptyPersona()}
              onCancel={() => {
                setOpen(false);
                setEditing(null);
              }}
              onSubmit={handleSave}
            />
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border p-8 text-center text-sm text-muted-foreground">
          Aucun persona pour l’instant. Cliquez sur « Créer un persona » pour
          commencer.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group relative rounded-2xl border p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">
                    {p.name || p.jobTitle || "Persona sans titre"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {p.jobTitle} • {p.sector}
                  </p>
                </div>
                <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setOpen(true);
                    }}
                    className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {p.topGoal && (
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                    🎯 {p.topGoal}
                  </span>
                )}
                {p.topFrustration && (
                  <span className="rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-700">
                    ⚠️ {p.topFrustration}
                  </span>
                )}
                {p.preferredChannels?.[0] && (
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] text-indigo-700">
                    📣 {p.preferredChannels[0]}
                  </span>
                )}
              </div>

              {p.shortBio && (
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {p.shortBio}
                </p>
              )}
              {p.quote && (
                <blockquote className="mt-2 border-l-2 pl-2 text-xs italic text-gray-600">
                  “{p.quote}”
                </blockquote>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
