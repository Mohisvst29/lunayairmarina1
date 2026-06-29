
import { NextResponse } from 'next/server';
import { getServiceDetail } from '@/lib/service-detail';

export async function GET() {
    try {
        // ID for "Construction and Expansion Projects" from user request
        const id = '692b4b5732caa55e46a818ba';

        console.log(`Debug inspecting service detail for ${id}`);
        const result = await getServiceDetail(id);

        if (!result) {
            return NextResponse.json({ error: 'Service not found via getServiceDetail' }, { status: 404 });
        }

        return NextResponse.json({
            serviceTitle: result.service.title,
            relatedServicesCount: result.relatedServices.length,
            relatedServices: result.relatedServices.map(s => ({
                id: s.id,
                title: s.title
            }))
        });
    } catch (error) {
        console.error('Debug error:', error);
        return NextResponse.json({ error: (error as any).message, stack: (error as any).stack }, { status: 500 });
    }
}
