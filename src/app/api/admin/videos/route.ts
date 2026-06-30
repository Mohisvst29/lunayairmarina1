import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

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

        const filesCollection = db.collection('videos.files');
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
            url: `/api/videos/${f._id.toString()}`
        }));

        return NextResponse.json(mappedFiles);
    } catch (error) {
        console.error('Fetch videos error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const categoryInput = (formData.get('category') as string) || 'uncategorized';
        const sectionInput = (formData.get('section') as string) || undefined;
        const slugInput = formData.get('slug') as string || undefined;
        const languageInput = formData.get('language') as string || undefined;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }
        const bucket = new GridFSBucket(db, { bucketName: 'videos' });

        const uploadStream = bucket.openUploadStream(file.name, {
            metadata: {
                category: categoryInput,
                section: sectionInput,
                contentType: file.type,
                slug: slugInput,
                language: languageInput,
                source: 'admin-upload',
            },
        });

        uploadStream.end(buffer);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        return NextResponse.json({
            success: true,
            fileId: uploadStream.id,
            url: `/api/videos/${uploadStream.id}`,
            filename: file.name,
            slug: slugInput,
            section: sectionInput,
        });
    } catch (error) {
        console.error('Upload video error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
