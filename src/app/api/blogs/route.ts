import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog, { IBlog } from '@/models/Blog';
import { getCache, setCache } from '@/lib/cache';
import { readState } from '@/lib/localDbHelper';

const BLOG_CACHE_KEY = 'blogs_all';
const BLOG_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days (1 month)

type BlogRecord = {
    _id: string;
    title: string;
    titleAr?: string;
    excerpt: string;
    excerptAr?: string;
    content: string;
    contentAr?: string;
    featuredImage?: string;
    category?: string;
    slug: string;
    slugAr?: string;
    author?: string;
    authorAr?: string;
    published: boolean;
    extraImages?: string[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
};

type LeanBlogLike = Omit<BlogRecord, '_id' | 'createdAt' | 'updatedAt'> & {
    _id: string | { toString: () => string };
    createdAt?: string | Date;
    updatedAt?: string | Date;
};

const toIdString = (value: LeanBlogLike['_id']): string =>
    typeof value === 'string' ? value : value?.toString?.() ?? '';

const toDateString = (value?: string | Date): string =>
    value instanceof Date ? value.toISOString() : value ?? '';

function normalizeBlogs(data: Array<IBlog | LeanBlogLike>): BlogRecord[] {
    return data.map((item) => {
        const source: LeanBlogLike =
            typeof (item as IBlog).toObject === 'function'
                ? ((item as IBlog).toObject() as LeanBlogLike)
                : (item as LeanBlogLike);

        return {
            _id: toIdString(source._id),
            title: source.title,
            titleAr: source.titleAr,
            excerpt: source.excerpt,
            excerptAr: source.excerptAr,
            content: source.content,
            contentAr: source.contentAr,
            featuredImage: source.featuredImage,
            category: source.category,
            slug: source.slug,
            slugAr: (source as any).slugAr,
            author: source.author,
            authorAr: source.authorAr,
            published: source.published,
            extraImages: source.extraImages,
            tags: source.tags,
            createdAt: toDateString(source.createdAt),
            updatedAt: toDateString(source.updatedAt),
        };
    });
}

function localizeBlogs(blogs: BlogRecord[], lang: string | null) {
    if (lang !== 'ar') {
        return blogs;
    }

    return blogs.map((blog) => ({
        ...blog,
        title: blog.titleAr ?? blog.title,
        excerpt: blog.excerptAr ?? blog.excerpt,
        content: blog.contentAr ?? blog.content,
        author: blog.authorAr ?? blog.author,
    }));
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const preferredLang = request.nextUrl.searchParams.get('lang');
        const blogs = await Blog.find({ published: true }).exec();

        const normalized = normalizeBlogs(blogs as any);

        return NextResponse.json(localizeBlogs(normalized, preferredLang), {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache',
            },
        });
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

