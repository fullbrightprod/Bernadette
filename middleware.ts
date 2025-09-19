import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 🚪 Routes accessibles sans être connecté
const publicRoutes = ["/login"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ Supabase/SSR pose le cookie avec "-auth-token"
  const authCookie = req.cookies.get("sb-syrswgioypqqdqllnlra-auth-token")

  // Si pas de cookie et on veut une page privée → /login
  if (!authCookie && !publicRoutes.includes(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Si on est déjà connecté et qu’on va sur /login → /
  if (authCookie && pathname === "/login") {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// 🛠️ appliquer le middleware partout sauf static
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
