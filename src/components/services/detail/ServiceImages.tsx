"use client";

import Image from 'next/image';
import { forwardRef } from 'react';
import type { Locale } from '@/context/LanguageContext';
import styles from './ServiceDetail.module.css';

type GalleryItem = {
    id: string;
    url: string;
    caption: string;
};

type ServiceImagesProps = {
    mainImage?: string | null;
    gallery: GalleryItem[];
    language: Locale;
    dir: 'ltr' | 'rtl';
};

const ServiceImages = forwardRef<HTMLElement, ServiceImagesProps>(
    ({ mainImage, gallery, language, dir }, ref) => {
        const fallbackCaption = language === 'ar' ? 'صورة الخدمة' : 'Service visual';
        const hasAdditional = gallery.length > 0;

        return (
            <section
                className={`${styles.section} ${styles.imageSection}`}
                ref={ref}
                aria-label={language === 'ar' ? 'معرض الخدمة' : 'Service gallery'}
                dir={dir}
            >
                <div className={styles.sectionHeader}>
                    <p className={styles.sectionBadge} data-animate="images">
                        {language === 'ar' ? 'المعرض المرئي' : 'Visual Story'}
                    </p>
                    <h2 className={styles.sectionTitle} data-animate="images">
                        {language === 'ar' ? 'اكتشف الخدمة عن قرب' : 'Experience the service up close'}
                    </h2>
                    <p className={styles.sectionSubtitle} data-animate="images">
                        {language === 'ar'
                            ? 'صور عالية الدقة لعرض أدق التفاصيل.'
                            : 'High-fidelity imagery to capture every detail.'}
                    </p>
                </div>

                <div className={styles.imageGrid}>
                    <figure className={styles.primaryImage} data-animate="images">
                        <div className={styles.imageFrame}>
                            {mainImage ? (
                                <Image
                                    src={mainImage}
                                    alt={fallbackCaption}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 900px"
                                    priority={false}
                                />
                            ) : (
                                <div className={styles.imagePlaceholder} aria-hidden="true">
                                    <span>{fallbackCaption}</span>
                                </div>
                            )}
                        </div>
                        <figcaption>{fallbackCaption}</figcaption>
                    </figure>

                    {hasAdditional && (
                        <div className={styles.secondaryGrid}>
                            {gallery.map((item) => (
                                <figure key={item.id} className={styles.secondaryImage} data-animate="images">
                                    <div className={styles.imageFrame}>
                                        <Image
                                            src={item.url}
                                            alt={item.caption}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            loading="lazy"
                                        />
                                    </div>
                                    <figcaption>{item.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
);

ServiceImages.displayName = 'ServiceImages';

export default ServiceImages;

