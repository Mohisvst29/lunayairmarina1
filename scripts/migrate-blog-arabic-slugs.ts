/**
 * Migration script to generate Arabic slugs for blog posts
 * Run with: npx ts-node --project tsconfig.json scripts/migrate-blog-arabic-slugs.ts
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://eslamabdaltif:oneone2@cluster0.ge4o8wk.mongodb.net/?appName=Cluster0";

// Define a simple schema for the migration
const BlogSchema = new mongoose.Schema({
    title: String,
    titleAr: String,
    slug: String,
    slugAr: String,
}, { strict: false });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

/**
 * Generate a URL-friendly slug from Arabic text
 * Keeps Arabic characters, replaces spaces with hyphens, removes special characters
 */
function generateArabicSlug(text: string): string {
    if (!text) return '';

    return text
        .trim()
        // Replace multiple spaces with single space
        .replace(/\s+/g, ' ')
        // Replace spaces with hyphens
        .replace(/\s/g, '-')
        // Remove any characters that aren't Arabic letters, numbers, or hyphens
        .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9a-zA-Z\-]/g, '')
        // Remove multiple consecutive hyphens
        .replace(/-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-|-$/g, '');
}

async function migrate() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

const blogs = await (Blog as any).find({}).lean();
    console.log(`Found ${blogs.length} blog posts`);

    let updated = 0;
    let skipped = 0;

    for (const blog of blogs) {
        const blogDoc = blog as any;

        // Skip if already has slugAr
        if (blogDoc.slugAr) {
            console.log(`Skipping "${blogDoc.title}" - already has slugAr: ${blogDoc.slugAr}`);
            skipped++;
            continue;
        }

        // Skip if no Arabic title
        if (!blogDoc.titleAr) {
            console.log(`Skipping "${blogDoc.title}" - no Arabic title`);
            skipped++;
            continue;
        }

        const slugAr = generateArabicSlug(blogDoc.titleAr);

        if (!slugAr) {
            console.log(`Skipping "${blogDoc.title}" - could not generate Arabic slug`);
            skipped++;
            continue;
        }

        console.log(`Updating "${blogDoc.title}": slugAr = "${slugAr}"`);

        await Blog.updateOne(
            { _id: blogDoc._id },
            { $set: { slugAr: slugAr } }
        );

        updated++;
    }

    console.log('\n--- Migration Complete ---');
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Total: ${blogs.length}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}

migrate().catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
});
