import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export async function GET() {
    try {
        const state = readState();
        return NextResponse.json(state.blogs, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const state = readState();

        if (!body.slug && body.title) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const newBlog = {
            ...body,
            _id: body._id || `blog-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        state.blogs.unshift(newBlog);
        writeState(state);

        return NextResponse.json(newBlog, {
            status: 201,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Failed to create blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
