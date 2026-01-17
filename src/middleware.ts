import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/signup");

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return null;
    }

    // Protect dashboard and product creation routes
    const protectedRoutes = ["/dashboard", "/product/create", "/account"];
    const isProtected = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    if (isProtected) {
        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            );
        }
    }

    return null;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup", "/product/create", "/account/:path*"],
};
