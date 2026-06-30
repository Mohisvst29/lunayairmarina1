import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find({} as any).sort({ createdAt: -1 });
        return NextResponse.json(blogs, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Failed to fetch blogs from DB:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        if (!body.slug && body.title) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const newBlog = new Blog(body);
        await newBlog.save();

        return NextResponse.json(newBlog, {
            status: 201,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Failed to create blog in DB:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
