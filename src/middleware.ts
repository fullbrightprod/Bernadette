import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 🚪 Routes accessibles sans être connecté
const publicRoutes = ["/login"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // On récupère le token Supabase (mis en cookie automatiquement après login)
  const accessToken = req.cookies.get("sb-access-token")?.value

  // Si pas de token et qu'on essaie d'accéder à une page privée → redirect vers /login
  if (!accessToken && !publicRoutes.includes(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Si on est déjà connecté et qu’on va sur /login → redirect vers dashboard (/)
  if (accessToken && pathname === "/login") {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Sinon → continuer normalement
  return NextResponse.next()
}

// 🛠️ Appliquer le middleware sur toutes les routes sauf les fichiers statiques
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
