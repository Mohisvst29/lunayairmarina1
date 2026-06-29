import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export async function POST() {
    try {
        await connectDB();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }
        const filesCollection = db.collection('images.files');

        // Map slug patterns to sections
        const slugToSectionMap: Record<string, string> = {
            'ocean-sunrise': 'experience-section',
            'relationship-crew': 'why-choose-us',
        };

        // Map portrait slugs to testimonials
        for (let i = 1; i <= 12; i++) {
            slugToSectionMap[`portrait-vip-${i}`] = 'testimonials';
        }

        const updates: Array<{ slug: string; section: string; count: number }> = [];

        // Update images based on their slugs
        for (const [slug, section] of Object.entries(slugToSectionMap)) {
            const result = await filesCollection.updateMany(
                { 'metadata.slug': slug },
                { $set: { 'metadata.section': section } }
            );
            if (result.modifiedCount > 0) {
                updates.push({ slug, section, count: result.modifiedCount });
            }
        }

        // Update service images (images with category='services')
        const servicesResult = await filesCollection.updateMany(
            {
                'metadata.category': 'services',
                'metadata.section': { $exists: false }
            },
            { $set: { 'metadata.section': 'services-primary' } }
        );

        if (servicesResult.modifiedCount > 0) {
            updates.push({
                slug: 'category=services',
                section: 'services-primary',
                count: servicesResult.modifiedCount
            });
        }

        // Set general section for uncategorized images
        const generalResult = await filesCollection.updateMany(
            {
                'metadata.section': { $exists: false },
                'metadata.slug': { $exists: false }
            },
            { $set: { 'metadata.section': 'general' } }
        );

        if (generalResult.modifiedCount > 0) {
            updates.push({
                slug: 'uncategorized',
                section: 'general',
                count: generalResult.modifiedCount
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Images migrated to sections successfully',
            updates,
            totalUpdated: updates.reduce((sum, u) => sum + u.count, 0)
        });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({
            error: 'Failed to migrate images',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
