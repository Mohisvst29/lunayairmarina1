import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const filtered = state.images.filter((i: any) => i._id !== id);
        if (filtered.length === state.images.length) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        state.images = filtered;
        writeState(state);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete image error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const index = state.images.findIndex((i: any) => i._id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const url = `/newbackgrounds/${file.name}`;
        state.images[index] = {
            ...state.images[index],
            filename: file.name,
            url: url,
        };

        writeState(state);

        return NextResponse.json({
            success: true,
            fileId: id,
            filename: file.name,
            slug: state.images[index].metadata?.slug,
        });
    } catch (error) {
        console.error('Replace image error:', error);
        return NextResponse.json({ error: 'Failed to replace image' }, { status: 500 });
    }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const state = readState();
        const index = state.images.findIndex((i: any) => i._id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const body = await request.json();
        const { order, section } = body;

        if (typeof order === 'number') {
            state.images[index].metadata = {
                ...state.images[index].metadata,
                order: order
            };
        }
        if (section) {
            state.images[index].metadata = {
                ...state.images[index].metadata,
                section: section
            };
        }

        writeState(state);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update image error:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}
