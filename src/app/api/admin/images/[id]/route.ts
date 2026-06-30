import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not initialized.');
        }
        const bucket = new GridFSBucket(db, { bucketName: 'images' });
        await bucket.delete(new mongoose.Types.ObjectId(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete image error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not initialized.');
        }
        const bucket = new GridFSBucket(db, { bucketName: 'images' });
        const filesCollection = db.collection('images.files');
        
        const oldFile: any = await filesCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!oldFile) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Delete old file from GridFS first
        try {
            await bucket.delete(new mongoose.Types.ObjectId(id));
        } catch (e) {
            console.error('Error deleting old image in PUT replacement:', e);
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadStream = bucket.openUploadStream(file.name, {
            id: new mongoose.Types.ObjectId(id), // keep the exact same ID
            metadata: {
                ...oldFile.metadata,
                contentType: file.type,
            }
        });

        uploadStream.end(buffer);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        return NextResponse.json({
            success: true,
            fileId: id,
            filename: file.name,
            slug: oldFile.metadata?.slug,
        });
    } catch (error) {
        console.error('Replace image error:', error);
        return NextResponse.json({ error: 'Failed to replace image' }, { status: 500 });
    }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not initialized.');
        }
        const filesCollection = db.collection('images.files');

        const body = await request.json();
        const { order, section } = body;

        const updateDoc: any = {};
        if (typeof order === 'number') updateDoc['metadata.order'] = order;
        if (section !== undefined) updateDoc['metadata.section'] = section;

        const result = await filesCollection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: updateDoc }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update image error:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}
