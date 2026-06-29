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
        let files = state.images;

        if (slug) {
            files = files.filter((f: any) => f.metadata?.slug === slug || f._id === slug);
        } else if (section && section !== 'all') {
            files = files.filter((f: any) => f.metadata?.section === section);
        }

        return NextResponse.json(files);
    } catch (error) {
        console.error('Fetch images error:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
