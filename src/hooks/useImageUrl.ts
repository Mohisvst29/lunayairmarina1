import { useState, useEffect } from 'react';

interface AdminImageDoc {
    uploadDate?: string;
    metadata?: {
        slug?: string;
    };
}

const isAdminImageArray = (value: unknown): value is AdminImageDoc[] => Array.isArray(value);

/**
 * Hook to get the latest image URL with cache busting
 * Fetches the image metadata to get the latest upload date
 */
export function useImageUrl(slug: string | null | undefined): string | null {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) {
            return;
        }

        let isMounted = true;

        const fetchImageUrl = async () => {
            try {
                const response = await fetch(`/api/admin/images?section=all&slug=${slug}`, {
                    cache: 'no-store',
                });

                const fallbackUrl = `/api/images/slug/${slug}`;

                if (!response.ok) {
                    if (isMounted) {
                        setImageUrl(fallbackUrl);
                    }
                    return;
                }

                const imagesPayload: unknown = await response.json();
                const images = isAdminImageArray(imagesPayload) ? imagesPayload : [];
                const image = images.find((img) => img.metadata?.slug === slug);

                if (!isMounted) {
                    return;
                }

                if (image?.uploadDate) {
                    const uploadDate = new Date(image.uploadDate).getTime();
                    setImageUrl(`/api/images/slug/${slug}?v=${uploadDate}`);
                } else {
                    setImageUrl(fallbackUrl);
                }
            } catch (error) {
                console.error('Failed to fetch image URL:', error);
                if (isMounted) {
                    setImageUrl(`/api/images/slug/${slug}`);
                }
            }
        };

        fetchImageUrl();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    if (!slug) {
        return null;
    }

    return imageUrl ?? `/api/images/slug/${slug}`;
}

