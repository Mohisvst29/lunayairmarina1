import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { generateBoatInternalLinks, InternalLinkMapping } from '@/lib/seo-internal-links';

// GET - Fetch internal link suggestions or mappings
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'default';
        const blogId = searchParams.get('blogId');
        
        let mappings: InternalLinkMapping[] = [];
        
        if (type === 'default') {
            // Return default boat/yacht related internal links
            mappings = generateBoatInternalLinks();
        } else if (type === 'blog' && blogId) {
            // Return custom internal links for a specific blog post
            const blog = await Blog.findById(blogId).lean();
            if (blog && blog.internalLinks) {
                mappings = blog.internalLinks.map((link: any) => ({
                    keyword: link.keyword,
                    targetUrl: link.targetUrl,
                    targetType: link.targetType,
                    title: link.title,
                    priority: 8 // Higher priority for custom links
                }));
            }
        } else if (type === 'all') {
            // Combine default links with all blog post titles as potential links
            mappings = generateBoatInternalLinks();
            
            // Add all published blog posts as potential internal links
            const blogs = await Blog.find({ published: true })
                .select('title slug category')
                .lean();
            
            for (const blog of blogs) {
                if (blog.title && blog.title.length <= 50) {
                    mappings.push({
                        keyword: blog.title,
                        targetUrl: `/blog/${blog.slug}`,
                        targetType: 'blog',
                        targetId: blog._id?.toString(),
                        title: `Read more: ${blog.title}`,
                        priority: 6
                    });
                }
            }
        }
        
        return NextResponse.json({ mappings });
    } catch (error) {
        console.error('Error fetching internal links:', error);
        return NextResponse.json(
            { error: 'Failed to fetch internal links' },
            { status: 500 }
        );
    }
}

// POST - Update internal links for a specific blog post
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        
        const body = await request.json();
        const { blogId, internalLinks, operation } = body;
        
        if (!blogId) {
            return NextResponse.json(
                { error: 'Blog ID is required' },
                { status: 400 }
            );
        }
        
        if (operation === 'auto-generate') {
            // Auto-generate internal links based on content
            const blog = await Blog.findById(blogId).lean();
            if (!blog) {
                return NextResponse.json(
                    { error: 'Blog post not found' },
                    { status: 404 }
                );
            }
            
            // Get default links and filter those that appear in the content
            const defaultLinks = generateBoatInternalLinks();
            const content = (blog.content || '') + ' ' + (blog.contentAr || '');
            const contentLower = content.toLowerCase();
            
            const relevantLinks = defaultLinks.filter(link => 
                contentLower.includes(link.keyword.toLowerCase())
            ).slice(0, 5); // Limit to 5 auto-generated links
            
            // Update blog with auto-generated links
            await Blog.findByIdAndUpdate(blogId, {
                internalLinks: relevantLinks.map(link => ({
                    keyword: link.keyword,
                    targetUrl: link.targetUrl,
                    targetType: link.targetType,
                    title: link.title || `Learn more about ${link.keyword}`
                }))
            });
            
            return NextResponse.json({ 
                message: 'Auto-generated internal links added',
                links: relevantLinks 
            });
        }
        
        // Manual update of internal links
        if (!Array.isArray(internalLinks)) {
            return NextResponse.json(
                { error: 'internalLinks must be an array' },
                { status: 400 }
            );
        }
        
        // Validate each link
        for (const link of internalLinks) {
            if (!link.keyword || !link.targetUrl || !link.targetType) {
                return NextResponse.json(
                    { error: 'Each link must have keyword, targetUrl, and targetType' },
                    { status: 400 }
                );
            }
            if (!['blog', 'service', 'page'].includes(link.targetType)) {
                return NextResponse.json(
                    { error: 'targetType must be blog, service, or page' },
                    { status: 400 }
                );
            }
        }
        
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { internalLinks },
            { new: true }
        );
        
        if (!updatedBlog) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ 
            message: 'Internal links updated successfully',
            internalLinks: updatedBlog.internalLinks 
        });
    } catch (error) {
        console.error('Error updating internal links:', error);
        return NextResponse.json(
            { error: 'Failed to update internal links' },
            { status: 500 }
        );
    }
}

// DELETE - Remove all internal links from a blog post
export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const blogId = searchParams.get('blogId');
        
        if (!blogId) {
            return NextResponse.json(
                { error: 'Blog ID is required' },
                { status: 400 }
            );
        }
        
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { $unset: { internalLinks: 1 } },
            { new: true }
        );
        
        if (!updatedBlog) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ 
            message: 'Internal links removed successfully' 
        });
    } catch (error) {
        console.error('Error removing internal links:', error);
        return NextResponse.json(
            { error: 'Failed to remove internal links' },
            { status: 500 }
        );
    }
}
