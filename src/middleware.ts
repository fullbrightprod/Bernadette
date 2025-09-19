import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// liste des routes publiques (pas besoin d'être connecté)
const publicRoutes = ["/login"]

export function middleware(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Récupère le token stocké par Supabase (cookie)
  const accessToken = req.cookies.get("sb-access-token")?.value

  const { pathname } = req.nextUrl

  // si pas de token et route non publique → redirect vers login
  if (!accessToken && !publicRoutes.includes(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // sinon → continue normalement
  return NextResponse.next()
}

// middleware s’applique sur toutes les routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
