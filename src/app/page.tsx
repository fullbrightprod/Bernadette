'use client'

import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🔐 Authentification</h1>
      <AuthForm />
    </main>
  )
}
