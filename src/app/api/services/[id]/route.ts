import { NextRequest, NextResponse } from 'next/server';
import { getServiceDetail } from '@/lib/service-detail';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const identifier = params.id;

    try {
        const detail = await getServiceDetail(identifier);

        if (!detail) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        const response = NextResponse.json(detail);
        response.headers.set('Cache-Control', 'no-store');
        response.headers.set('CDN-Cache-Control', 'no-store');
        response.headers.set('Vercel-CDN-Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.error(`[services/${identifier}]`, error);
        return NextResponse.json({ error: 'Failed to fetch service detail' }, { status: 500 });
    }
}








































