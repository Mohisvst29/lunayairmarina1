import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

interface ImageToAdd {
    slug: string;
    filename: string;
    url: string;
    section: 'about-page' | 'contact-page';
}

const imagesToAdd: ImageToAdd[] = [
    {
        slug: 'about-story',
        filename: 'about-story.jpg',
        url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        section: 'about-page',
    },
    {
        slug: 'contact-hero',
        filename: 'contact-hero.jpg',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
        section: 'contact-page',
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
                // Update existing image to have the correct section
                if (existing.metadata?.section !== image.section) {
                    await filesCollection.updateOne(
                        { _id: existing._id },
                        { $set: { 'metadata.section': image.section } }
                    );
                    console.log(`✅ Updated section for existing image: ${image.slug} -> ${image.section}`);
                } else {
                    console.log(`⏭️  Image ${image.slug} already exists with correct section`);
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
                    category: image.section === 'about-page' ? 'about' : 'contact',
                    contentType: response.headers.get('content-type') || 'image/jpeg',
                    sourceUrl: image.url,
                    seeded: true,
                },
            });

            uploadStream.end(buffer);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', resolve);
                uploadStream.on('error', reject);
            });

            console.log(`✅ Added image: ${image.slug} to section ${image.section}`);
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

