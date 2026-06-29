import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

interface ImageToAdd {
    slug: string;
    filename: string;
    url: string;
    section: 'hero-home' | 'contact-page';
    order?: number;
}

const imagesToAdd: ImageToAdd[] = [
    {
        slug: 'hero-banner-1',
        filename: 'hero-banner-1.jpg',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        section: 'hero-home',
        order: 100,
    },
    {
        slug: 'hero-banner-2',
        filename: 'hero-banner-2.jpg',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80',
        section: 'hero-home',
        order: 200,
    },
    {
        slug: 'contact-map',
        filename: 'contact-map.jpg',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
        section: 'contact-page',
        order: 200,
    },
];

async function addImages() {
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }

        const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });
        const filesCollection = db.collection('images.files');

        for (const image of imagesToAdd) {
            // Check if image with this slug already exists
            const existing = await filesCollection
                .findOne({
                    'metadata.slug': image.slug,
                });

            if (existing) {
                // Update existing image to have the correct section and order
                const updates: Record<string, unknown> = {};
                if (existing.metadata?.section !== image.section) {
                    updates['metadata.section'] = image.section;
                }
                if (image.order !== undefined && existing.metadata?.order !== image.order) {
                    updates['metadata.order'] = image.order;
                }
                
                if (Object.keys(updates).length > 0) {
                    await filesCollection.updateOne(
                        { _id: existing._id },
                        { $set: updates }
                    );
                    console.log(`✅ Updated existing image: ${image.slug} -> section: ${image.section}, order: ${image.order}`);
                } else {
                    console.log(`⏭️  Image ${image.slug} already exists with correct settings`);
                }
                continue;
            }

            // Download the image
            console.log(`📥 Downloading ${image.slug}...`);
            const response = await fetch(image.url);
            if (!response.ok) {
                throw new Error(`Failed to download ${image.url}: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload to GridFS
            const uploadStream = bucket.openUploadStream(image.filename, {
                metadata: {
                    section: image.section,
                    slug: image.slug,
                    category: image.section === 'hero-home' ? 'hero' : 'contact',
                    contentType: response.headers.get('content-type') || 'image/jpeg',
                    sourceUrl: image.url,
                    order: image.order,
                    seeded: true,
                },
            });

            uploadStream.end(buffer);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', resolve);
                uploadStream.on('error', reject);
            });

            console.log(`✅ Added image: ${image.slug} to section ${image.section} (order: ${image.order})`);
        }

        // Also ensure ocean-sunrise exists and is in the hero-home section
        const oceanSunrise = await filesCollection.findOne({
            'metadata.slug': 'ocean-sunrise',
        });

        if (oceanSunrise) {
            // Update it to be in hero-home section if it's not already
            if (oceanSunrise.metadata?.section !== 'hero-home') {
                await filesCollection.updateOne(
                    { _id: oceanSunrise._id },
                    { $set: { 'metadata.section': 'hero-home', 'metadata.order': 50 } }
                );
                console.log(`✅ Updated ocean-sunrise to hero-home section`);
            } else {
                console.log(`✓ ocean-sunrise already exists in hero-home section`);
            }
        } else {
            // Add ocean-sunrise if it doesn't exist
            console.log(`📥 Downloading ocean-sunrise...`);
            const response = await fetch('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80');
            if (response.ok) {
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const uploadStream = bucket.openUploadStream('ocean-sunrise.jpg', {
                    metadata: {
                        section: 'hero-home',
                        slug: 'ocean-sunrise',
                        category: 'hero',
                        contentType: response.headers.get('content-type') || 'image/jpeg',
                        order: 50,
                        seeded: true,
                    },
                });
                uploadStream.end(buffer);
                await new Promise((resolve, reject) => {
                    uploadStream.on('finish', resolve);
                    uploadStream.on('error', reject);
                });
                console.log(`✅ Added ocean-sunrise to hero-home section`);
            } else {
                console.log(`⚠️  Failed to download ocean-sunrise`);
            }
        }

        console.log('\n✅ All images processed successfully!');
    } catch (error) {
        console.error('❌ Error adding images:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
}

addImages()
    .then(() => {
        console.log('Script completed.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Script failed:', error);
        process.exit(1);
    });

