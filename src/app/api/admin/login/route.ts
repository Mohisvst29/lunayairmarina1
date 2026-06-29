import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Hardcoded admin credentials (requested)
        const adminUsername = 'admin';
        const adminPassword = 'admin123';
        
        if (username === adminUsername && password === adminPassword) {
            const isSecure = new URL(request.url).protocol === 'https:';
            const response = NextResponse.json({ success: true });

            // Set the session cookie on the response so it is persisted for the middleware
            response.cookies.set('admin_session', 'true', {
                httpOnly: true,
                secure: isSecure,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Invalid request' }, 
            { status: 400 }
        );
    }
}
