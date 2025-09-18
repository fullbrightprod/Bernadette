'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-2xl font-bold">🎉 Tableau de bord</h1>
        <p className="mt-4">Tu es connecté et tu peux voir cette page.</p>
      </main>
    </ProtectedRoute>
  )
}
