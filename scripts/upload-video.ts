import { readFileSync } from 'fs';
import { join } from 'path';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

async function uploadVideo() {
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }

        const bucket = new GridFSBucket(db, { bucketName: 'videos' });
        const filesCollection = db.collection('videos.files');

        // Check if video already exists
        const existingVideo = await filesCollection.findOne({
            'metadata.slug': 'homepage-video',
        });

        if (existingVideo) {
            console.log('Video already exists. Deleting old video...');
            await bucket.delete(existingVideo._id);
        }

        // Read the video file
        const videoPath = join(process.cwd(), 'public', 'WhatsApp Video 2025-11-23 at 20.22.09_11708834.mp4');
        console.log(`Reading video from: ${videoPath}`);
        
        const videoBuffer = readFileSync(videoPath);
        const filename = 'WhatsApp Video 2025-11-23 at 20.22.09_11708834.mp4';

        // Upload to GridFS
        const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
                section: 'homepage-video',
                slug: 'homepage-video',
                category: 'homepage',
                contentType: 'video/mp4',
                source: 'script-upload',
            },
        });

        uploadStream.end(videoBuffer);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        console.log(`✅ Video uploaded successfully! File ID: ${uploadStream.id}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading video:', error);
        process.exit(1);
    }
}

uploadVideo();





































