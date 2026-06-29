import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service, { IService } from '@/models/Service';
import { getCache, setCache } from '@/lib/cache';
import { readState } from '@/lib/localDbHelper';

const SERVICE_CACHE_KEY = 'services_all';
const SERVICE_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

type ServiceRecord = {
    _id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    image: string;
    price?: string;
    priceAr?: string;
    slug?: string;
    category?: string;
    order?: number;
    createdAt?: string;
};

type LeanServiceLike = Omit<ServiceRecord, '_id' | 'createdAt'> & {
    _id: string | { toString: () => string };
    createdAt?: string | Date;
    priceAr?: string;
    category?: string;
    order?: number;
};

const toServiceId = (value: LeanServiceLike['_id']): string =>
    typeof value === 'string' ? value : value?.toString?.() ?? '';

const toServiceDate = (value?: string | Date): string | undefined =>
    value instanceof Date ? value.toISOString() : value;

function normalizeServices(data: Array<IService | LeanServiceLike>): ServiceRecord[] {
    return data.map((item) => {
        const source: LeanServiceLike =
            typeof (item as IService).toObject === 'function'
                ? ((item as IService).toObject() as LeanServiceLike)
                : (item as LeanServiceLike);

        return {
            _id: toServiceId(source._id),
            title: source.title,
            titleAr: source.titleAr,
            description: source.description,
            descriptionAr: source.descriptionAr,
            image: source.image,
            price: source.price,
            priceAr: source.priceAr,
            slug: source.slug,
            category: source.category,
            order: (source as any).order ?? 0,
            createdAt: toServiceDate(source.createdAt),
        };
    });
}

function localizeServices(services: ServiceRecord[], lang: string | null) {
    if (lang !== 'ar') {
        return services;
    }

    return services.map((service) => ({
        ...service,
        title: service.titleAr ?? service.title,
        description: service.descriptionAr ?? service.description,
        price: service.priceAr ?? service.price,
    }));
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const preferredLang = request.nextUrl.searchParams.get('lang');
        const services = await Service.find().sort({ order: 1 }).exec();

        console.log('Fetched parent services from MongoDB:', services.length);

        const normalized = normalizeServices(services as any);

        return NextResponse.json(localizeServices(normalized, preferredLang));
    } catch (error) {
        console.error('Failed to fetch public services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}
