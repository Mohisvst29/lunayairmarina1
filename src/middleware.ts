import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is for the admin panel
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the admin session cookie
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
