"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("🟢 Tentative de connexion…");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📡 Login result:", { data, error });

      if (error) {
        setResult({ error: error.message });
      } else {
        setResult({
          user: data.user,
          session: data.session,
        });
      }
    } catch (err: any) {
      console.error("💥 Exception JS:", err);
      setResult({ exception: err.message });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-[#154C79] text-center">
          🔐 Connexion (mode debug)
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#154C79] text-white p-2 rounded hover:bg-[#123a5f]"
        >
          Se connecter
        </button>

        {/* ✅ Affiche le résultat du login */}
        {result && (
          <pre className="mt-4 p-2 text-xs bg-gray-50 rounded border overflow-auto max-h-64">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </form>
    </div>
  );
}
