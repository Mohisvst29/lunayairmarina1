import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';

interface ImageMetadata {
    category?: string;
    section?: string;
    slug?: string;
    contentType?: string;
    seeded?: boolean;
    sourceImageId?: string;
}

interface ImageFileDoc {
    _id: mongoose.Types.ObjectId;
    filename?: string;
    contentType?: string;
    metadata?: ImageMetadata;
}

async function seedExperienceSection() {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database connection is not initialized.");
    }
    
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });
    const filesCollection = db.collection('images.files');

    // Check if logo already exists in experience-section
    const existingLogo = await filesCollection
        .find<{ _id: mongoose.Types.ObjectId }>({
            'metadata.section': 'experience-section',
            'metadata.slug': 'lm-logo',
        })
        .toArray();

    if (existingLogo.length > 0) {
        console.log('LM Logo already exists in experience-section. Skipping logo seed.');
    } else {
        // Read the logo file from public directory
        const logoPath = join(process.cwd(), 'public', 'LM Logo.svg');
        let logoBuffer: Buffer;
        try {
            logoBuffer = readFileSync(logoPath);
        } catch (error) {
            console.error('Failed to read LM Logo.svg:', error);
            throw new Error('LM Logo.svg not found in public directory');
        }

        // Upload logo to experience-section
        const logoUploadStream = bucket.openUploadStream('LM Logo.svg', {
            metadata: {
                category: 'logo',
                section: 'experience-section',
                slug: 'lm-logo',
                contentType: 'image/svg+xml',
                seeded: true,
            },
        });

        logoUploadStream.end(logoBuffer);

        await new Promise<void>((resolve, reject) => {
            logoUploadStream.on('finish', () => {
                console.log(`✅ LM Logo seeded successfully with ID: ${logoUploadStream.id}`);
                resolve();
            });
            logoUploadStream.on('error', reject);
        });
    }

    // Check if ocean-sunrise exists in experience-section
    const oceanSunriseInExperience = await filesCollection
        .find<{ _id: mongoose.Types.ObjectId }>({
            'metadata.slug': 'ocean-sunrise',
            'metadata.section': 'experience-section',
        })
        .toArray();

    if (oceanSunriseInExperience.length > 0) {
        console.log('✅ ocean-sunrise already exists in experience-section');
    } else {
        // Find the original ocean-sunrise image
        const oceanSunrise = await filesCollection
            .find<ImageFileDoc>({
                'metadata.slug': 'ocean-sunrise',
            })
            .sort({ uploadDate: -1 })
            .limit(1)
            .toArray();

        if (oceanSunrise.length > 0) {
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

            // Upload as experience-section image (keep original slug for reference)
            const uploadStream = bucket.openUploadStream(sourceImage.filename || 'ocean-sunrise.jpg', {
                metadata: {
                    category: sourceImage.metadata?.category || 'hero',
                    section: 'experience-section',
                    slug: 'ocean-sunrise',
                    contentType: sourceImage.contentType || 'image/jpeg',
                    seeded: true,
                    sourceImageId: sourceImage._id.toString(),
                },
            });

            uploadStream.end(buffer);

            await new Promise<void>((resolve, reject) => {
                uploadStream.on('finish', () => {
                    console.log(`✅ ocean-sunrise seeded to experience-section with ID: ${uploadStream.id}`);
                    resolve();
                });
                uploadStream.on('error', reject);
            });
        } else {
            console.log('⚠️  ocean-sunrise image not found. Please run seed.ts first to seed initial images.');
        }
    }
}

seedExperienceSection()
    .then(() => {
        console.log('Seeding complete.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });

