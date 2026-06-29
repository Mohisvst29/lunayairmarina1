"use client";

import Link from 'next/link';
import styles from './ServiceInfoCard.module.css';

interface ServiceInfoCardProps {
    badge?: string;
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function ServiceInfoCard({
    badge = 'WITH US',
    title,
    subtitle,
    ctaText = 'KNOW MORE',
    ctaLink = '/contact',
}: ServiceInfoCardProps) {
    return (
        <div className={styles.contentSection}>
            <div className={styles.contentBadge}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="12" width="3" height="6" fill="#0c4fad" rx="1" />
                    <rect x="7" y="8" width="3" height="10" fill="#0c4fad" rx="1" />
                    <rect x="12" y="4" width="3" height="14" fill="#0c4fad" rx="1" />
                    <rect x="17" y="6" width="2" height="12" fill="#0c4fad" rx="1" />
                </svg>
                <span>{badge}</span>
            </div>
            <h3 className={styles.contentTitle}>{title}</h3>
            <p className={styles.contentDescription}>
                {subtitle}
            </p>
            <Link href={ctaLink} className={styles.knowMoreButton}>
                <span className={styles.buttonText}>{ctaText}</span>
                <span className={styles.buttonArrow}>➝</span>
            </Link>
        </div>
    );
}

















