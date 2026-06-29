import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import mongoose from 'mongoose';

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getPost(slug: string, showUnpublished = false) {
    await connectDB();
    const decodedSlug = decodeURIComponent(slug); // Decode URL-encoded Arabic text
    
    let query: any = {
        $or: [{ slug: slug }, { slug: decodedSlug }],
        published: true
    };
    if (showUnpublished) {
        delete query.published;
    }
    
    // Check if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(slug)) {
        query = {
            $or: [{ slug: slug }, { slug: decodedSlug }, { _id: new mongoose.Types.ObjectId(slug) }]
        };
        if (!showUnpublished) {
            query.published = true;
        }
    }

    const post = await Blog.findOne(query).exec();

    if (!post) {
        return null;
    }

    return JSON.parse(JSON.stringify(post.toObject())); // Serialize for client component
}

async function getRelatedPosts(currentPost: any) {
    await connectDB();
    const currentId = mongoose.Types.ObjectId.isValid(currentPost._id)
        ? new mongoose.Types.ObjectId(currentPost._id)
        : currentPost._id;

    const related = await Blog.find({
        _id: { $ne: currentId },
        category: currentPost.category,
        published: true
    })
    .limit(3)
    .exec();

    return JSON.parse(JSON.stringify(related.map(r => r.toObject())));
}

// Generate Metadata for SEO
export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const post = await getPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found | Lunier Marina',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const ogImage = post.featuredImage
        ? post.featuredImage.startsWith('http')
            ? post.featuredImage
            : `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/images/${post.featuredImage}`
        : previousImages[0];

    return {
        title: `${post.title} | Lunier Marina Blogs`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`,
            siteName: 'Lunier Marina',
            images: [ogImage],
            type: 'article',
            publishedTime: post.createdAt,
            authors: [post.author || 'Lunier Marina Team'],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage(props: Props) {
    const params = await props.params;
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post);

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage
            ? [`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/images/${post.featuredImage}`]
            : [],
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: [{
            '@type': 'Person',
            name: post.author || 'Lunier Marina Team',
        }],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
        </>
    );
}
