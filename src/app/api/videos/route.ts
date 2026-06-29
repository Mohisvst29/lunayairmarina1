import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const section = searchParams.get('section');
        const slug = searchParams.get('slug');

        const mockVideos = [
            {
                _id: 'hero-lonier-video-static',
                filename: 'لونير .mp4',
                uploadDate: new Date().toISOString(),
                metadata: {
                    slug: 'hero-lonier-video',
                    section: 'hero-home',
                    category: 'hero',
                    order: -1000,
                    cloudinaryUrl: '/لونير%20.mp4'
                }
            }
        ];

        let files = mockVideos;
        if (slug) {
            files = files.filter(f => f.metadata.slug === slug);
        } else if (section) {
            files = files.filter(f => f.metadata.section === section);
        }

        return NextResponse.json(files);
    } catch (error) {
        console.error('Fetch videos error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
























