import { readFileSync } from 'fs';
import { join } from 'path';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

async function uploadHeroVideo() {
    // Upload the "لونيير .mp4" asset to the hero-home media bucket.
    const HERO_SLUG = 'hero-lonier-video';
    const ORDER_VALUE = 900;

    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }

        const bucket = new GridFSBucket(db, { bucketName: 'videos' });
        const filesCollection = db.collection('videos.files');

        // Remove any previous upload for the same slug so the script is idempotent.
        const existingVideo = await filesCollection.findOne({ 'metadata.slug': HERO_SLUG });
        if (existingVideo) {
            console.log('Existing hero video found. Deleting old video...');
            await bucket.delete(existingVideo._id);
        }

        const filename = 'لونيير .mp4';
        const videoPath = join(process.cwd(), 'public', filename);
        console.log(`Reading video from: ${videoPath}`);

        const videoBuffer = readFileSync(videoPath);

        const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
                section: 'hero-home',
                slug: HERO_SLUG,
                category: 'hero',
                order: ORDER_VALUE,
                contentType: 'video/mp4',
                source: 'script-upload',
            },
        });

        uploadStream.end(videoBuffer);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        console.log(`✅ Hero video uploaded successfully! File ID: ${uploadStream.id}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading hero video:', error);
        process.exit(1);
    }
}

uploadHeroVideo();


























