import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from '../src/lib/db';
import Service from '../src/models/Service';
import Blog from '../src/models/Blog';
import HomeSection from '../src/models/HomeSection';
import PageSection from '../src/models/PageSection';

// Manually load environment variables from .env.local
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach((line) => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.error("Error loading .env.local manually:", e);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env.local or process.env');
  process.exit(1);
}

import crypto from 'crypto';

function getConsistentObjectId(seed: string): mongoose.Types.ObjectId {
  if (!seed || typeof seed !== 'string') {
    return new mongoose.Types.ObjectId();
  }
  if (mongoose.Types.ObjectId.isValid(seed)) {
    return new mongoose.Types.ObjectId(seed);
  }
  const hash = crypto.createHash('md5').update(seed).digest('hex');
  return new mongoose.Types.ObjectId(hash.substring(0, 24));
}

async function migrate() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected successfully!');

  // Read localState.json
  const localStatePath = path.resolve(process.cwd(), 'src/data/localState.json');
  if (!fs.existsSync(localStatePath)) {
    console.error(`Error: localState.json not found at ${localStatePath}`);
    process.exit(1);
  }

  const localState = JSON.parse(fs.readFileSync(localStatePath, 'utf8'));

  // 1. Migrate Services
  console.log('Migrating Services...');
  await Service.deleteMany({});
  if (Array.isArray(localState.services)) {
    // Map services and resolve any ObjectId issues
    const servicesToInsert = localState.services.map((s: any) => {
      const _id = getConsistentObjectId(s._id || s.slug);
      return {
        ...s,
        _id,
        relatedServices: Array.isArray(s.relatedServices)
          ? s.relatedServices.map((rId: string) => getConsistentObjectId(rId))
          : []
      };
    });
    await Service.insertMany(servicesToInsert);
    console.log(`Inserted ${servicesToInsert.length} services.`);
  }

  // 2. Migrate Blogs
  console.log('Migrating Blogs...');
  await Blog.deleteMany({});
  if (Array.isArray(localState.blogs)) {
    const blogsToInsert = localState.blogs.map((b: any) => {
      const _id = getConsistentObjectId(b._id || b.slug);
      return {
        ...b,
        _id,
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : new Date()
      };
    });
    await Blog.insertMany(blogsToInsert);
    console.log(`Inserted ${blogsToInsert.length} blogs.`);
  }

  // 3. Migrate Home Sections
  console.log('Migrating Home Sections...');
  await HomeSection.deleteMany({});
  if (Array.isArray(localState.homeSections)) {
    const homeSectionsToInsert = localState.homeSections.map((sec: any) => {
      const _id = getConsistentObjectId(sec._id || sec.key);
      return {
        _id,
        page: sec.page || "home",
        key: sec.key,
        label: sec.label,
        order: sec.order || 100,
        enabled: sec.enabled !== false,
        content: sec.content || {}
      };
    });
    await HomeSection.insertMany(homeSectionsToInsert);
    console.log(`Inserted ${homeSectionsToInsert.length} home sections.`);
  }

  // 4. Migrate Page Sections
  console.log('Migrating Page Sections...');
  await PageSection.deleteMany({});
  const pageSectionsToInsert: any[] = [];
  if (localState.pageSections) {
    for (const [page, sectionsObj] of Object.entries(localState.pageSections)) {
      for (const [key, sectionVal] of Object.entries(sectionsObj as any)) {
        const section = sectionVal as any;
        const _id = getConsistentObjectId(section._id || `${page}-${key}`);
        pageSectionsToInsert.push({
          _id,
          page,
          key,
          label: section.label || key,
          order: section.order || 100,
          enabled: section.enabled !== false,
          content: section.content || {}
        });
      }
    }
  }
  if (pageSectionsToInsert.length > 0) {
    await PageSection.insertMany(pageSectionsToInsert);
    console.log(`Inserted ${pageSectionsToInsert.length} page sections.`);
  }

  console.log('Migration successfully completed! 🎉');
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed with error:', err);
  process.exit(1);
});
