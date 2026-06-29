"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface DynamicImageProps {
    slug: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    sizes?: string;
    style?: React.CSSProperties;
}

/**
 * DynamicImage component that fetches the latest image from GridFS
 * and adds cache busting to ensure updates are reflected immediately
 */
export default function DynamicImage({
    slug,
    alt,
    width,
    height,
    fill,
    className,
    priority = false,
    sizes,
    style,
}: DynamicImageProps) {
    const [imageUrl, setImageUrl] = useState(`/api/images/slug/${slug}`);

    useEffect(() => {
        // Fetch image metadata to get the latest upload date for cache busting
        const updateImageUrl = async () => {
            try {
                const response = await fetch(`/api/admin/images?slug=${slug}`, {
                    cache: 'no-store',
                });
                
                if (response.ok) {
                    const images = await response.json();
                    const image = Array.isArray(images) && images.length > 0 
                        ? images[0] // Get the first (latest) image
                        : null;
                    
                    if (image?.uploadDate) {
                        const timestamp = new Date(image.uploadDate).getTime();
                        setImageUrl(`/api/images/slug/${slug}?v=${timestamp}`);
                    }
                }
            } catch (error) {
                // If fetch fails, use the slug URL without version
                console.error('Failed to fetch image metadata:', error);
            }
        };

        updateImageUrl();
    }, [slug]);

    if (fill) {
        return (
            <Image
                src={imageUrl}
                alt={alt}
                fill
                className={className}
                priority={priority}
                sizes={sizes}
                style={style}
            />
        );
    }

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            sizes={sizes}
            style={style}
        />
    );
}








































