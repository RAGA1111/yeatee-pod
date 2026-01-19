import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    const isAuthPage =
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup");

    const isApiRoute = pathname.startsWith("/api");
    const isPublicAsset =
        pathname.startsWith("/_next") ||
        pathname.match(/\.(.*)$/) || // files with extensions
        pathname === "/favicon.ico";

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    }

    if (isApiRoute || isPublicAsset) {
        return NextResponse.next();
    }

    if (!isAuth && pathname !== "/") {
        let from = pathname;
        if (req.nextUrl.search) {
            from += req.nextUrl.search;
        }

        return NextResponse.redirect(
            new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
    }

    // Add logic for root page if needed - currently allowing it but could protect too
    // If we want root page to be protected:
    if (!isAuth && pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
