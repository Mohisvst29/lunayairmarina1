import { NextResponse } from 'next/server';
import { readState, writeState } from '@/lib/localDbHelper';

export async function GET() {
    try {
        const state = readState();
        return NextResponse.json(state.services);
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const state = readState();

        const newService = {
            ...body,
            _id: body._id || `service-${Date.now()}`,
            slug: body.slug || `service-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        state.services.push(newService);
        writeState(state);

        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error('Failed to create service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
