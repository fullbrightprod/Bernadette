"use client"

import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { Sidebar } from "@/components/Sidebar"
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  useAuthRedirect()

  return (
    <html lang="fr">
      <body className="antialiased bg-[#FAFAFA]">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
