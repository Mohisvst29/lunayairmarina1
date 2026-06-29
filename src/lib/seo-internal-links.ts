/**
 * SEO Internal Linking Utility for Blog Content
 * Automatically adds contextual links to blog content based on keyword mappings
 */

export interface InternalLinkMapping {
    keyword: string;
    targetUrl: string;
    targetType: 'blog' | 'service' | 'page';
    targetId?: string;
    title?: string;
    priority?: number; // Higher priority = checked first (for overlapping keywords)
}

export interface ProcessContentOptions {
    maxLinksPerParagraph?: number;
    maxTotalLinks?: number;
    openInNewTab?: boolean;
    addNoFollow?: boolean;
    customClass?: string;
}

const DEFAULT_OPTIONS: Required<ProcessContentOptions> = {
    maxLinksPerParagraph: 2,
    maxTotalLinks: 10,
    openInNewTab: false,
    addNoFollow: false,
    customClass: 'internal-link',
};

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Process HTML content and add internal links
 * Only links the first occurrence of each keyword
 */
export function processContentWithInternalLinks(
    content: string,
    mappings: InternalLinkMapping[],
    options: ProcessContentOptions = {}
): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    if (!content || mappings.length === 0) {
        return content;
    }

    // Sort by priority (higher first) and then by length (longer first to avoid partial matches)
    const sortedMappings = [...mappings].sort((a, b) => {
        const priorityA = a.priority ?? 0;
        const priorityB = b.priority ?? 0;
        if (priorityB !== priorityA) {
            return priorityB - priorityA;
        }
        return b.keyword.length - a.keyword.length;
    });

    // Track which keywords have been linked already
    const linkedKeywords = new Set<string>();
    let totalLinksAdded = 0;

    // Split content into paragraphs - using [\s\S] instead of 's' flag for ES compatibility
    const paragraphs = content.split(/(<p[^>]*>[\s\S]*?<\/p>)/i);

    const processedParagraphs = paragraphs.map((paragraph) => {
        // Skip if it's not a paragraph or contains no text
        if (!paragraph.toLowerCase().startsWith('<p')) {
            return paragraph;
        }

        let linksInParagraph = 0;
        let processedParagraph = paragraph;

        for (const mapping of sortedMappings) {
            if (linkedKeywords.has(mapping.keyword)) continue;
            if (totalLinksAdded >= opts.maxTotalLinks) break;
            if (linksInParagraph >= opts.maxLinksPerParagraph) break;

            const { keyword, targetUrl, title } = mapping;
            const escapedKeyword = escapeRegex(keyword);
            
            // Create regex to match the keyword as a whole word (with word boundaries for non-Arabic)
            // For Arabic text, we use a simpler approach
            const isArabic = /[\u0600-\u06FF]/.test(keyword);
            const boundary = isArabic ? '' : '\\b';
            const regex = new RegExp(
                `(${boundary}${escapedKeyword}${boundary})(?![^<]*<\/a>)(?![^<]*>)`,
                'i'
            );

            // Check if keyword exists in this paragraph and hasn't been linked yet
            if (regex.test(processedParagraph)) {
                const linkTitle = title ? ` title="${title}"` : '';
                const targetAttr = opts.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
                const noFollowAttr = opts.addNoFollow ? ' rel="nofollow"' : '';
                const classAttr = opts.customClass ? ` class="${opts.customClass}"` : '';
                
                const link = `<a href="${targetUrl}"${classAttr}${linkTitle}${targetAttr}${noFollowAttr}>${keyword}</a>`;
                
                // Replace only the first occurrence
                processedParagraph = processedParagraph.replace(regex, link);
                
                linkedKeywords.add(keyword);
                linksInParagraph++;
                totalLinksAdded++;
            }
        }

        return processedParagraph;
    });

    return processedParagraphs.join('');
}

/**
 * Extract potential keywords from content for link mapping
 */
export function extractPotentialKeywords(
    content: string,
    minLength: number = 4,
    maxLength: number = 50
): string[] {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, ' ');
    
    // Split into words and phrases
    const words = textContent.split(/\s+/);
    const phrases: string[] = [];
    
    // Extract single words and short phrases
    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[^\w\s\u0600-\u06FF-]/g, ''); // Keep Arabic chars
        
        if (word.length >= minLength && word.length <= maxLength) {
            phrases.push(word.toLowerCase());
        }
        
        // Also capture 2-3 word phrases
        if (i < words.length - 1) {
            const phrase2 = `${words[i]} ${words[i + 1]}`.replace(/[^\w\s\u0600-\u06FF-]/g, '');
            if (phrase2.length >= minLength && phrase2.length <= maxLength) {
                phrases.push(phrase2.toLowerCase());
            }
        }
        
        if (i < words.length - 2) {
            const phrase3 = `${words[i]} ${words[i + 1]} ${words[i + 2]}`.replace(/[^\w\s\u0600-\u06FF-]/g, '');
            if (phrase3.length >= minLength && phrase3.length <= maxLength) {
                phrases.push(phrase3.toLowerCase());
            }
        }
    }
    
    // Return unique phrases sorted by frequency
    const frequency: Record<string, number> = {};
    phrases.forEach(p => {
        frequency[p] = (frequency[p] || 0) + 1;
    });
    
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .map(([phrase]) => phrase)
        .filter((phrase, index, self) => self.indexOf(phrase) === index);
}

/**
 * Generate default internal link mappings for boat/yacht related content
 */
export function generateBoatInternalLinks(): InternalLinkMapping[] {
    return [
        { keyword: 'yacht maintenance', targetUrl: '/services/yacht-maintenance', targetType: 'service', priority: 10 },
        { keyword: 'boat repair', targetUrl: '/services/boat-repair', targetType: 'service', priority: 10 },
        { keyword: 'marine services', targetUrl: '/services', targetType: 'page', priority: 9 },
        { keyword: 'boat rental', targetUrl: '/services/boat-rental', targetType: 'service', priority: 9 },
        { keyword: 'yacht rental', targetUrl: '/services/yacht-rental', targetType: 'service', priority: 9 },
        { keyword: 'boat storage', targetUrl: '/services/boat-storage', targetType: 'service', priority: 9 },
        { keyword: 'marina', targetUrl: '/about', targetType: 'page', priority: 8 },
        { keyword: 'Lunier Marina', targetUrl: '/about', targetType: 'page', priority: 8 },
        { keyword: 'contact us', targetUrl: '/contact', targetType: 'page', priority: 7 },
        { keyword: 'get a quote', targetUrl: '/contact', targetType: 'page', priority: 7 },
        { keyword: 'services', targetUrl: '/services', targetType: 'page', priority: 6 },
        { keyword: 'about us', targetUrl: '/about', targetType: 'page', priority: 6 },
        { keyword: 'blog', targetUrl: '/blog', targetType: 'page', priority: 5 },
        // Arabic keywords
        { keyword: 'صيانة اليخوت', targetUrl: '/services/yacht-maintenance', targetType: 'service', priority: 10 },
        { keyword: 'إصلاح القوارب', targetUrl: '/services/boat-repair', targetType: 'service', priority: 10 },
        { keyword: 'خدمات بحرية', targetUrl: '/services', targetType: 'page', priority: 9 },
        { keyword: 'تأجير القوارب', targetUrl: '/services/boat-rental', targetType: 'service', priority: 9 },
        { keyword: 'تأجير اليخوت', targetUrl: '/services/yacht-rental', targetType: 'service', priority: 9 },
        { keyword: 'تخزين القوارب', targetUrl: '/services/boat-storage', targetType: 'service', priority: 9 },
        { keyword: 'المارينا', targetUrl: '/about', targetType: 'page', priority: 8 },
        { keyword: 'لونير مارينا', targetUrl: '/about', targetType: 'page', priority: 8 },
        { keyword: 'اتصل بنا', targetUrl: '/contact', targetType: 'page', priority: 7 },
        { keyword: 'اطلب عرض سعر', targetUrl: '/contact', targetType: 'page', priority: 7 },
        { keyword: 'خدماتنا', targetUrl: '/services', targetType: 'page', priority: 6 },
        { keyword: 'من نحن', targetUrl: '/about', targetType: 'page', priority: 6 },
        { keyword: 'المدونة', targetUrl: '/blog', targetType: 'page', priority: 5 },
    ];
}

/**
 * Create dynamic internal links from blog posts
 */
export async function generateBlogInternalLinks(
    blogPosts: Array<{ title: string; slug: string; excerpt: string; category?: string }>
): Promise<InternalLinkMapping[]> {
    const mappings: InternalLinkMapping[] = [];
    
    for (const post of blogPosts) {
        // Add the title as a keyword (for shorter titles)
        if (post.title.length <= 50) {
            mappings.push({
                keyword: post.title,
                targetUrl: `/blog/${post.slug}`,
                targetType: 'blog',
                targetId: post.slug,
                title: `Read more about ${post.title}`,
                priority: 5,
            });
        }
        
        // Add category as keyword if exists
        if (post.category && post.category.length <= 30) {
            mappings.push({
                keyword: post.category,
                targetUrl: `/blog?category=${encodeURIComponent(post.category)}`,
                targetType: 'page',
                title: `Browse ${post.category} articles`,
                priority: 4,
            });
        }
    }
    
    return mappings;
}
