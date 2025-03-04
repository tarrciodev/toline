import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dash"];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(pathname);

    const data = await auth();

    if (!data?.user && isProtectedRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next({ request });
}
