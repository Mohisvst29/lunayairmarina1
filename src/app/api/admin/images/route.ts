import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const searchParams = request.nextUrl.searchParams;
        const section = searchParams.get('section');
        const slug = searchParams.get('slug');

        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not initialized.');
        }

        const filesCollection = db.collection('images.files');
        let query: any = {};

        if (slug) {
            query['$or'] = [
                { 'metadata.slug': slug },
                { filename: slug }
            ];
            if (slug.match(/^[0-9a-fA-F]{24}$/)) {
                query['$or'].push({ _id: new mongoose.Types.ObjectId(slug) });
            }
        } else if (section && section !== 'all') {
            query['metadata.section'] = section;
        }

        const files = await filesCollection.find(query).sort({ uploadDate: -1 }).toArray();

        const mappedFiles = files.map((f: any) => ({
            _id: f._id.toString(),
            filename: f.filename,
            uploadDate: f.uploadDate,
            length: f.length,
            chunkSize: f.chunkSize,
            metadata: f.metadata,
            url: `/api/images/${f._id.toString()}`
        }));

        return NextResponse.json(mappedFiles);
    } catch (error) {
        console.error('Fetch images error:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
