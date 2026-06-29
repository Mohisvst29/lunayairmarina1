import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const body = await request.json();
        const state = readState();
        const index = state.blogs.findIndex((b: any) => b._id === id || b.slug === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        state.blogs[index] = {
            ...state.blogs[index],
            ...body,
            _id: id,
            updatedAt: new Date().toISOString(),
        };

        writeState(state);
        return NextResponse.json(state.blogs[index], {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Failed to update blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    return PUT(request, props);
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const filtered = state.blogs.filter((b: any) => b._id !== id && b.slug !== id);

        if (filtered.length === state.blogs.length) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        state.blogs = filtered;
        writeState(state);
        return NextResponse.json({ success: true }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Failed to delete blog:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
