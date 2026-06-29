import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    return NextResponse.redirect(new URL('/لونير%20.mp4', request.url), 302);
}

