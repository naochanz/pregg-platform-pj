import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth as authMiddleware } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ダッシュボード配下は認証が必要
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only"
      });
    
    // 未認証の場合はログインページにリダイレクト
    if (!token) {
      const url = new URL("/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
 }

export const config = {
  matcher: ["/dashboard/:path*"],//ダッシュボード配下は認証が必要
};