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
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch external image: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        return new Response(Buffer.from(arrayBuffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            }
        });
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

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = params.slug?.toLowerCase();

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (db) {
            const file = await db.collection('images.files').findOne({
                $or: [
                    { 'metadata.slug': slug },
                    { filename: slug },
                    ...(slug.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: new mongoose.Types.ObjectId(slug) }] : [])
                ]
            });
            if (file) {
                const bucket = new GridFSBucket(db, { bucketName: 'images' });
                const downloadStream = bucket.openDownloadStream(file._id);
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

        const localImages = [
            { _id: 'ocean-sunrise', url: '/newbackgrounds/hero-mainpage.webp', metadata: { slug: 'ocean-sunrise' } },
            { _id: 'about-hero', url: '/newbackgrounds/hero-aboutuspage.webp', metadata: { slug: 'about-hero' } },
            { _id: 'about-story', url: '/newbackgrounds/story-aboutuspage.webp', metadata: { slug: 'about-story' } },
        ];
        const imgObj = localImages.find((i: any) => i._id === slug || i.metadata?.slug === slug || i.filename === slug);
        const targetUrl = imgObj?.url || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80`;
        return await getImageResponse(targetUrl);
    } catch (error) {
        console.error(`Error serving slug image (${slug}):`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

