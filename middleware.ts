import { NextResponse } from "next/server";
import { auth as authMiddleware } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await authMiddleware();

  // ダッシュボード配下は認証が必要
  if (pathname.startsWith("/dashboard")) {
    // 未認証の場合はログインページにリダイレクト
    if (!session) {
      const url = new URL("/signin", request.url);
      return NextResponse.redirect(url);
    }
  } else if (pathname === "/signup" || pathname === "/signin") {
    if (session) {
			// sessionがある場合、fetch("api/auth/user")を実行してユーザー情報をDBから取得
      const url = new URL("/dashboard", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};