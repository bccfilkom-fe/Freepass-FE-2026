import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to handle redirects and route protection
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Redirect root path to /canteens
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/canteens", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
	],
};
