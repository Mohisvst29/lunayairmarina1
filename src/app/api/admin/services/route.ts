import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find({} as any).sort({ order: 1 });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Failed to fetch services from DB:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const newService = new Service(body);
        await newService.save();

        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error('Failed to create service in DB:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
