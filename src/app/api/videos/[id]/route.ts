import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    try {
        await connectDB();
        const db = mongoose.connection.db;

        if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
            const objectId = new mongoose.Types.ObjectId(id);
            const file = await db.collection('videos.files').findOne({ _id: objectId });
            if (file) {
                const bucket = new GridFSBucket(db, { bucketName: 'videos' });
                const downloadStream = bucket.openDownloadStream(objectId);
                const contentType = file.metadata?.contentType || 'video/mp4';
                
                // @ts-ignore
                return new Response(downloadStream, {
                    headers: {
                        'Content-Type': contentType,
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Accept-Ranges': 'bytes',
                    }
                });
            }
        }

        // Fallback redirection to default static video
        return NextResponse.redirect(new URL('/%D9%84%D9%88%D9%86%D9%8A%D8%B1%20.mp4', request.url), 302);
    } catch (error) {
        console.error('Error serving video:', error);
        return NextResponse.redirect(new URL('/%D9%84%D9%88%D9%86%D9%8A%D8%B1%20.mp4', request.url), 302);
    }
}

