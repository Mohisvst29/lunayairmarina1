"use client";

import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import type { Locale } from '@/context/LanguageContext';
import styles from './ServiceDetail.module.css';

type RelatedServiceItem = {
    id: string;
    slug: string;
    title: string;
    description: string;
    image?: string | null;
    price?: string | null;
};

type RelatedServicesProps = {
    services: RelatedServiceItem[];
    language: Locale;
    dir: 'ltr' | 'rtl';
};

const RelatedServices = forwardRef<HTMLElement, RelatedServicesProps>(({ services, language, dir }, ref) => {
    if (services.length === 0) {
        return null;
    }

    return (
        <section className={`${styles.section} ${styles.relatedSection}`} ref={ref} dir={dir}>
            <div className={styles.sectionHeader}>
                <p className={styles.sectionBadge} data-animate="related-card">
                    {language === 'ar' ? 'خدمات مقترحة' : 'Suggested Services'}
                </p>
                <h2 className={styles.sectionTitle} data-animate="related-card">
                    {language === 'ar' ? 'مكملات مثالية لرحلتك' : 'Perfect complements to your journey'}
                </h2>
                <p className={styles.sectionSubtitle} data-animate="related-card">
                    {language === 'ar'
                        ? 'تم اختيار هذه الخدمات بناءً على الفئة ونسبة التشابه في قاعدة البيانات.'
                        : 'These services are curated dynamically based on category and similarity scores.'}
                </p>
            </div>

            <div className={styles.relatedGrid}>
                {services.map((service) => (
                    <article key={service.id} className={styles.relatedCard} data-animate="related-card">
                        <Link href={`/services/${service.slug}`} className={styles.relatedImageLink}>
                            <div className={styles.relatedImageFrame}>
                                {service.image ? (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 360px"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className={styles.relatedImagePlaceholder} aria-hidden="true">
                                        <span>LM</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                        <div className={styles.relatedContent}>
                            <h3>{service.title}</h3>
                            <div 
                                className={styles.relatedDescription}
                                dangerouslySetInnerHTML={{ __html: service.description }}
                            />
                            <div className={styles.relatedFooter}>
                                {service.price && <span className={styles.relatedPrice}>{service.price}</span>}
                                <Link href={`/services/${service.slug}`} className={styles.detailLink}>
                                    {language === 'ar' ? 'استعرض الخدمة' : 'View Service'}
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
});

RelatedServices.displayName = 'RelatedServices';

export default RelatedServices;








































