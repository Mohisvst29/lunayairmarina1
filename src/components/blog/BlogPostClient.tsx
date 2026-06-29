"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/app/blog/[slug]/page.module.css';
import { useBlogDetailAnimations } from '@/hooks/useBlogDetailAnimations';
import { processContentWithInternalLinks, InternalLinkMapping, generateBoatInternalLinks } from '@/lib/seo-internal-links';

interface BlogPost {
    _id: string;
    title: string;
    titleAr?: string;
    content: string;
    contentAr?: string;
    excerpt: string;
    excerptAr?: string;
    featuredImage?: string;
    category?: string;
    slug: string;
    author?: string;
    authorAr?: string;
    createdAt: string;
    tags?: string[];
    published?: boolean;
    internalLinks?: Array<{
        keyword: string;
        targetUrl: string;
        targetType: 'blog' | 'service' | 'page';
        title?: string;
    }>;
}

interface BlogPostClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    const { language, t, dir } = useLanguage();
    const [readingProgress, setReadingProgress] = useState(0);
    const [shareCopied, setShareCopied] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    const relatedRef = useRef<HTMLElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useBlogDetailAnimations({ headerRef, contentRef, relatedRef, dir });

    // Localized content resolution
    const title = language === 'ar' ? (post.titleAr || post.title) : post.title;
    const content = language === 'ar' ? (post.contentAr || post.content) : post.content;
    const author = language === 'ar' ? (post.authorAr || post.author) : post.author;

    // Reading progress calculation
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollableHeight = documentHeight - windowHeight;
            const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

            setReadingProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [post]);

    const calculateReadingTime = (contentText: string): number => {
        const text = contentText.replace(/<[^>]*>/g, '');
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = async (platform: 'copy' | 'facebook' | 'twitter') => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareTitle = title || '';

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(url);
                setShareCopied(true);
                setTimeout(() => setShareCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
        }
    };

    const readingTime = calculateReadingTime(content);

    // Process content with internal links
    const processedContent = useMemo(() => {
        const mappings: InternalLinkMapping[] = [];
        
        // Add custom internal links from the post if available
        if (post.internalLinks && post.internalLinks.length > 0) {
            mappings.push(...post.internalLinks.map(link => ({
                ...link,
                priority: 8
            })));
        }
        
        // Add default boat/yacht related internal links
        mappings.push(...generateBoatInternalLinks());
        
        // Process content with internal links
        return processContentWithInternalLinks(content, mappings, {
            maxLinksPerParagraph: 2,
            maxTotalLinks: 8,
            customClass: styles.internalLink
        });
    }, [content, post.internalLinks]);

    return (
        <main className={styles.blogPostPage} style={{ direction: dir }}>
            {/* Reading Progress Bar */}
            <div ref={progressBarRef} className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Breadcrumb - Reference Style */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb" style={{ padding: '8rem 2rem 0', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <ol className={styles.breadcrumbList} style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', fontSize: '0.9rem', color: '#64748b' }}>
                    <li>
                        <Link href="/" className={styles.breadcrumbLink} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>
                            {language === 'ar' ? 'الرئيسية' : 'Home'}
                        </Link>
                    </li>
                    <li aria-hidden="true" style={{ margin: '0 4px' }}>/</li>
                    <li>
                        <Link href="/blog" className={styles.breadcrumbLink} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>
                            {language === 'ar' ? 'المدونة' : 'Blog'}
                        </Link>
                    </li>
                    <li aria-hidden="true" style={{ margin: '0 4px' }}>/</li>
                    <li aria-current="page" style={{ color: 'var(--accent)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                        {title}
                    </li>
                </ol>
            </nav>

            {/* Header Section */}
            <header ref={headerRef} className={styles.header} style={{ paddingTop: '2rem' }}>
                <div className={styles.headerContent}>

                    <div className={styles.headerMeta} data-animate="header">
                        {post.category && (
                            <span className={styles.categoryBadge}>{post.category}</span>
                        )}
                        <span className={styles.readingTime}>{readingTime} {t('blog.minRead') || 'min read'}</span>
                    </div>

                    <h1 className={styles.title} data-animate="header">{title}</h1>

                    <div className={styles.meta} data-animate="header">
                        <div className={styles.authorInfo}>
                            <div className={styles.authorAvatar}>
                                <span>{author?.charAt(0) || 'L'}</span>
                            </div>
                            <div>
                                <span className={styles.author}>{author || t('blog.defaultAuthor')}</span>
                                <span className={styles.date}>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className={styles.shareButtons}>
                            <button
                                onClick={() => handleShare('copy')}
                                className={styles.shareButton}
                                aria-label="Copy link"
                                title="Copy link"
                            >
                                {shareCopied ? (
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                        <path d="M16 6L8 14l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                        <path d="M8 2v4M12 2v4M4 6h12M4 6v10a2 2 0 002 2h8a2 2 0 002-2V6M4 6l2-4M16 6l-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => handleShare('facebook')}
                                className={styles.shareButton}
                                aria-label="Share on Facebook"
                                title="Share on Facebook"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleShare('twitter')}
                                className={styles.shareButton}
                                aria-label="Share on Twitter"
                                title="Share on Twitter"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {post.featuredImage && (
                    <div className={styles.featuredImageWrapper} data-animate="header">
                        <div className={styles.imageParallax} data-parallax="true">
                            <Image
                                src={
                                    post.featuredImage.startsWith('http')
                                        ? post.featuredImage
                                        : post.featuredImage.startsWith('/')
                                            ? post.featuredImage
                                            : `/api/images/${post.featuredImage}`
                                }
                                alt={title}
                                fill
                                className={styles.featuredImage}
                                priority
                                sizes="100vw"
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Content Section */}
            <article ref={contentRef} className={styles.content}>
                <div className={styles.contentWrapper}>
                    <div
                        className={styles.postContent}
                        data-animate="content"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />

                    {post.tags && post.tags.length > 0 && (
                        <div className={styles.tags} data-animate="content">
                            <span className={styles.tagsLabel}>{t('blog.tags')}:</span>
                            <div className={styles.tagsList}>
                                {post.tags.map(tag => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section ref={relatedRef} className={styles.relatedSection}>
                    <div className={styles.relatedContainer}>
                        <h2 className={styles.relatedTitle} data-animate="related">{t('blog.relatedPosts')}</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((relatedPost) => {
                                const relatedTitle = language === 'ar' ? (relatedPost.titleAr || relatedPost.title) : relatedPost.title;
                                const relatedExcerpt = language === 'ar' ? (relatedPost.excerptAr || relatedPost.excerpt) : relatedPost.excerpt;

                                return (
                                    <Link
                                        key={relatedPost._id}
                                        href={`/blog/${relatedPost.slug || relatedPost._id}`}
                                        className={styles.relatedCard}
                                        data-animate="related"
                                    >
                                        {relatedPost.featuredImage && (
                                            <div className={styles.relatedImageWrapper}>
                                                <Image
                                                    src={
                                                        relatedPost.featuredImage.startsWith('http')
                                                            ? relatedPost.featuredImage
                                                            : relatedPost.featuredImage.startsWith('/')
                                                                ? relatedPost.featuredImage
                                                                : `/api/images/${relatedPost.featuredImage}`
                                                    }
                                                    alt={relatedTitle}
                                                    fill
                                                    className={styles.relatedImage}
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        )}
                                        <div className={styles.relatedContent}>
                                            {relatedPost.category && (
                                                <span className={styles.relatedCategory}>{relatedPost.category}</span>
                                            )}
                                            <h3 className={styles.relatedCardTitle}>{relatedTitle}</h3>
                                            <p className={styles.relatedCardExcerpt}>{relatedExcerpt}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
