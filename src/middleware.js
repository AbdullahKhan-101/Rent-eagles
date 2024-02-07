import { NextResponse } from "next/server";

export function middleware(request) {
    let path = request.nextUrl.pathname;
    const isPublicPath = path === "/host/log-in" || path === "/driver/log-in" || path === "/host/sign-up" || path === "/driver/sign-up";
    const token = request.cookies.get("token")?.value || "";
    const dashboard = path === "/host/dashboard/:path*" || path === "/host/car-listing" || path === "/driver/dashboard/:path*" || path === "/driver/profile/:path*" || path === "/host/profile/:path*";
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!token && dashboard) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}
export const config = {
    matcher: ["/host/car-listing", "/host/dashboard/:path*", "/host/log-in", "/driver/log-in", "/driver/dashboard/:path*", "/driver/profile/:path*", "/host/profile/:path*"],
};