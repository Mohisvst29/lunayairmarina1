import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        const body = await request.json();
        const state = readState();
        const index = state.services.findIndex((s: any) => s._id === id || s.slug === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        state.services[index] = {
            ...state.services[index],
            ...body,
            _id: id,
            updatedAt: new Date().toISOString(),
        };

        writeState(state);
        return NextResponse.json(state.services[index]);
    } catch (error) {
        console.error('Failed to update service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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
        const filtered = state.services.filter((s: any) => s._id !== id && s.slug !== id);

        if (filtered.length === state.services.length) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        state.services = filtered;
        writeState(state);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete service:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
