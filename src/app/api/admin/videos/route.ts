import { NextRequest, NextResponse } from 'next/server';
import { readState } from '@/lib/localDbHelper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const section = searchParams.get('section');
        const slug = searchParams.get('slug');

        const state = readState();
        let files = state.videos;

        if (slug) {
            files = files.filter((f: any) => f.metadata?.slug === slug || f._id === slug);
        } else if (section) {
            files = files.filter((f: any) => f.metadata?.section === section);
        }

        return NextResponse.json(files);
    } catch (error) {
        console.error('Fetch videos error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    return NextResponse.json({ fileId: 'static-video', message: 'Video upload mocked successfully' });
}
