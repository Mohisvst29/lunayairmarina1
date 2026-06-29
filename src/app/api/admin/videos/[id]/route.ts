import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const filtered = state.videos.filter((v: any) => v._id !== id);
        if (filtered.length === state.videos.length) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        state.videos = filtered;
        writeState(state);
        return NextResponse.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Delete video error:', error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const index = state.videos.findIndex((v: any) => v._id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        state.videos[index] = {
            ...state.videos[index],
            filename: file.name,
        };

        writeState(state);

        return NextResponse.json({
            fileId: id,
            message: 'Video updated successfully',
        });
    } catch (error) {
        console.error('Update video error:', error);
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const index = state.videos.findIndex((v: any) => v._id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const body = await request.json();
        const { order, section, poster } = body;

        if (typeof order === 'number') {
            state.videos[index].metadata = {
                ...state.videos[index].metadata,
                order: order
            };
        }
        if (section) {
            state.videos[index].metadata = {
                ...state.videos[index].metadata,
                section: section
            };
        }
        if (poster !== undefined) {
            state.videos[index].metadata = {
                ...state.videos[index].metadata,
                poster: poster
            };
        }

        writeState(state);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update video metadata error:', error);
        return NextResponse.json({ error: 'Failed to update video metadata' }, { status: 500 });
    }
}
