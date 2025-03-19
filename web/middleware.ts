import { stackServerApp } from "@/stack";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Skip authentication check for the home page
	if (
		request.nextUrl.pathname === "/guide" ||
		request.nextUrl.pathname === "/" ||
		request.nextUrl.pathname === ""
	) {
		return NextResponse.next();
	}

	const user = await stackServerApp.getUser();
	if (!user) {
		return NextResponse.redirect(new URL("/handler/sign-in", request.url));
	}
	return NextResponse.next();
}

export const config = {
	// Protect all routes except:
	// 1. Any routes starting with /handler (for auth)
	// 2. Next.js static assets and API routes
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|handler).*)"],
};
