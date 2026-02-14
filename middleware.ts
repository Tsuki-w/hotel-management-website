import { auth } from "@/_lib/auth";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessions = await auth();
  const baseUrl = request.url; //获取完整地址
  const loginUrl = new URL("/login", baseUrl);
  const { pathname } = request.nextUrl; //跳转前的路径
  loginUrl.searchParams.set("callbackUrl", pathname);
  if (!sessions?.user?.id) {
    return Response.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/account/:path*"],
};
