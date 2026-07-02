import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { promises as fs } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getImageResponse(targetUrl: string) {
    if (targetUrl.startsWith('http')) {
        try {
            let response = await fetch(targetUrl);
            if (!response.ok) {
                console.warn(`External image returned ${response.status} for ${targetUrl}, using placeholder`);
                response = await fetch('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
            }
            const arrayBuffer = await response.arrayBuffer();
            const contentType = response.headers.get('content-type') || 'image/jpeg';
            return new Response(Buffer.from(arrayBuffer), {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                }
            });
        } catch (e) {
            console.error(`Error fetching external image, using placeholder:`, e);
            const response = await fetch('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
            const arrayBuffer = await response.arrayBuffer();
            return new Response(Buffer.from(arrayBuffer), {
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                }
            });
        }
    } else {
        const cleanPath = targetUrl.startsWith('/') ? targetUrl.substring(1) : targetUrl;
        const filePath = join(process.cwd(), 'public', cleanPath);
        try {
            const fileBuffer = await fs.readFile(filePath);
            let contentType = 'image/jpeg';
            if (cleanPath.endsWith('.svg')) contentType = 'image/svg+xml';
            else if (cleanPath.endsWith('.webp')) contentType = 'image/webp';
            else if (cleanPath.endsWith('.png')) contentType = 'image/png';
            
            return new Response(fileBuffer, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                }
            });
        } catch (e) {
            console.error(`Local file not found: ${filePath}, falling back to placeholder`);
            const response = await fetch('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
            const arrayBuffer = await response.arrayBuffer();
            return new Response(Buffer.from(arrayBuffer), {
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                }
            });
        }
    }
}

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        try {
            await connectDB();
            const db = mongoose.connection.db;
            if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
                const objectId = new mongoose.Types.ObjectId(id);
                const file = await db.collection('images.files').findOne({ _id: objectId });
                if (file) {
                    const bucket = new GridFSBucket(db, { bucketName: 'images' });
                    const downloadStream = bucket.openDownloadStream(objectId);
                    const contentType = file.metadata?.contentType || 'image/jpeg';
                    // @ts-ignore
                    return new Response(downloadStream, {
                        headers: {
                            'Content-Type': contentType,
                            'Cache-Control': 'public, max-age=31536000, immutable',
                        }
                    });
                }
            }

            // Fallback to query GridFS files collection by slug/filename
            if (db) {
                const fileBySlug = await db.collection('images.files').findOne({
                    $or: [
                        { 'metadata.slug': id },
                        { filename: id }
                    ]
                });
                if (fileBySlug) {
                    const bucket = new GridFSBucket(db, { bucketName: 'images' });
                    const downloadStream = bucket.openDownloadStream(fileBySlug._id);
                    const contentType = fileBySlug.metadata?.contentType || 'image/jpeg';
                    // @ts-ignore
                    return new Response(downloadStream, {
                        headers: {
                            'Content-Type': contentType,
                            'Cache-Control': 'public, max-age=31536000, immutable',
                        }
                    });
                }
            }
        } catch (dbError) {
            console.warn('Database failed in images/[id] API, will use static fallback:', dbError);
        }

        // Fallback for static assets and curated premium yachting images
        const localImages = [
            { _id: 'ocean-sunrise', url: '/newbackgrounds/hero-mainpage.webp', metadata: { slug: 'ocean-sunrise' } },
            { _id: 'about-hero', url: '/newbackgrounds/hero-aboutuspage.webp', metadata: { slug: 'about-hero' } },
            { _id: 'about-story', url: '/newbackgrounds/story-aboutuspage.webp', metadata: { slug: 'about-story' } },
            
            // Services Banner
            { _id: 'services-banner', url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1920&q=80', metadata: { slug: 'services-banner' } },

            // Contact
            { _id: 'contact-hero', url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'contact-hero' } },
            { _id: 'contact-map', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'contact-map' } },

            // Why Choose Us / Crew
            { _id: 'relationship-crew', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'relationship-crew' } },
            { _id: 'service-crewing', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-crewing' } },

            // Yacht Management
            { _id: 'service-yacht-management', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-yacht-management' } },
            { _id: '6a46ac5073141376894ad467', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-yacht-management' } },
            { _id: 'gallery-yacht-ops-bridge', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-yacht-ops-bridge' } },
            { _id: 'gallery-yacht-ops-maint', url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-yacht-ops-maint' } },

            // Marina Operations
            { _id: 'service-marina-operations', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-marina-operations' } },
            { _id: 'gallery-marina-ops-dock', url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-marina-ops-dock' } },
            { _id: 'gallery-marina-ops-club', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-marina-ops-club' } },

            // Visiting Yacht Concierge
            { _id: 'service-visiting-yacht', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-visiting-yacht' } },
            { _id: '6a436381a568306b76b6422e', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-visiting-yacht' } },
            { _id: 'gallery-visiting-yacht-vip', url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-visiting-yacht-vip' } },
            { _id: 'gallery-visiting-yacht-port', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-visiting-yacht-port' } },

            // Crew Recruitment
            { _id: 'service-crew-recruitment', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-crew-recruitment' } },
            { _id: 'gallery-crew-recruitment-deck', url: 'https://images.unsplash.com/photo-1505080856163-267552912e1f?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-crew-recruitment-deck' } },
            { _id: 'gallery-crew-recruitment-stew', url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'gallery-crew-recruitment-stew' } },

            // Yacht Cleaning & Rentals
            { _id: 'service-care-cleaning', url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-care-cleaning' } },
            { _id: 'service-care-cleaning-interior', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-care-cleaning-interior' } },
            { _id: 'service-rental', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80', metadata: { slug: 'service-rental' } },

            // Testimonials VIP portraits
            { _id: 'portrait-vip-1', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', metadata: { slug: 'portrait-vip-1' } },
            { _id: 'portrait-vip-2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', metadata: { slug: 'portrait-vip-2' } },
            { _id: 'portrait-vip-3', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', metadata: { slug: 'portrait-vip-3' } },
            { _id: 'portrait-vip-4', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', metadata: { slug: 'portrait-vip-4' } },
            { _id: 'portrait-vip-5', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', metadata: { slug: 'portrait-vip-5' } },
        ];
        const imgObj = localImages.find((i: any) => i._id === id || i.metadata?.slug === id || i.filename === id);
        const targetUrl = imgObj?.url || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80`;
        return await getImageResponse(targetUrl);
    } catch (error) {
        console.error('Error serving image:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
