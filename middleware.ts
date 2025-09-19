import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 🚪 Routes accessibles sans être connecté
const publicRoutes = ["/login"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ Supabase pose un cookie avec "-auth-token"
  const authCookie = req.cookies.get("sb-syrswgioypqqdqllnlra-auth-token")

  // Pas de cookie → redirect vers /login
  if (!authCookie && !publicRoutes.includes(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Déjà connecté mais route = /login → redirect vers /
  if (authCookie && pathname === "/login") {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
