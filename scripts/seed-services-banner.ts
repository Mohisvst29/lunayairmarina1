import mongoose from 'mongoose';
import connectDB from '@/lib/db';

async function seedServicesBanner() {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database connection is not initialized.");
    }
    
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });
    const filesCollection = db.collection('images.files');

    // Check if services-banner already exists
    const existing = await filesCollection
        .find<{ _id: mongoose.Types.ObjectId }>({
            'metadata.section': 'services-banner',
        })
        .toArray();

    if (existing.length > 0) {
        console.log('Services banner already exists. Skipping seed.');
        process.exit(0);
    }

    // Find the ocean-sunrise image to use as the initial services banner
    const oceanSunrise = await filesCollection
        .find<{ _id: mongoose.Types.ObjectId; filename: string; contentType?: string }>({
            'metadata.slug': 'ocean-sunrise',
        })
        .sort({ uploadDate: -1 })
        .limit(1)
        .toArray();

    if (oceanSunrise.length === 0) {
        console.error('ocean-sunrise image not found. Please run seed.ts first to seed initial images.');
        process.exit(1);
    }

    const sourceImage = oceanSunrise[0];
    
    // Download the source image
    const downloadStream = bucket.openDownloadStream(sourceImage._id);
    const chunks: Buffer[] = [];
    
    await new Promise<void>((resolve, reject) => {
        downloadStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        downloadStream.on('end', resolve);
        downloadStream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);

    // Upload as services-banner
    const uploadStream = bucket.openUploadStream('services-banner.jpg', {
        metadata: {
            category: 'services',
            section: 'services-banner',
            slug: 'services-banner',
            contentType: sourceImage.contentType || 'image/jpeg',
            seeded: true,
            sourceImageId: sourceImage._id.toString(),
        },
    });

    uploadStream.end(buffer);

    await new Promise<void>((resolve, reject) => {
        uploadStream.on('finish', () => {
            console.log(`✅ Services banner seeded successfully with ID: ${uploadStream.id}`);
            resolve();
        });
        uploadStream.on('error', reject);
    });
}

seedServicesBanner()
    .then(() => {
        console.log('Seeding complete.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });


