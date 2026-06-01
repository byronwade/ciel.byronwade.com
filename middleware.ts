import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/session-cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/app")) {
    const session = request.cookies.get(SESSION_COOKIE);
    if (!session?.value) {
      const login = new URL("/auth/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) {
    const session = request.cookies.get(SESSION_COOKIE);
    if (session?.value) {
      return NextResponse.redirect(new URL("/app/overview", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/auth/login", "/auth/signup"],
};
