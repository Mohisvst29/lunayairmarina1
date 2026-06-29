"use client";

import Link from 'next/link';
import Image from 'next/image';
import { forwardRef } from 'react';
import type { Locale } from '@/context/LanguageContext';
import styles from './ServiceDetail.module.css';

type HeroStat = {
    label: string;
    value: string;
};

type ServiceHeaderProps = {
    title: string;
    description: string;
    longDescription: string;
    price?: string | null;
    mainImage?: string | null;
    stats: HeroStat[];
    language: Locale;
    dir: 'ltr' | 'rtl';
};

const ServiceHeader = forwardRef<HTMLElement, ServiceHeaderProps>(
    ({ title, description, longDescription, price, mainImage, stats, language, dir }, ref) => {
        const backLabel = language === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services';
        const primaryCta = language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey';
        const secondaryCta = language === 'ar' ? 'استكشف التفاصيل' : 'Explore Details';
        const badgeLabel = language === 'ar' ? 'تفاصيل الخدمة' : 'Service Detail';
        const learnMoreLabel = language === 'ar' ? 'مصمم حسب احتياجاتك بدقة عالية' : 'Tailored precisely to your needs.';
        const priceLabel = language === 'ar' ? 'الاستثمار المبدئي' : 'Investment';
        const priceValue = price ?? (language === 'ar' ? 'عرض مخصص' : 'Custom Quote');

        return (
            <section className={`${styles.section} ${styles.heroSection}`} ref={ref} dir={dir}>
                <div className={styles.heroBackdrop} aria-hidden="true" />
                <div className={styles.heroPattern} aria-hidden="true" />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={styles.heroBeams} aria-hidden="true" />
                <div className={styles.heroOrbs} aria-hidden="true" />
                <div className={styles.heroNoise} aria-hidden="true" />
                <div className={styles.heroContent}>
                    <div className={styles.backRow} data-animate="heading">
                        <Link href="/services" className={styles.backLink} aria-label={backLabel}>
                            <span aria-hidden="true">↩</span>
                            {backLabel}
                        </Link>
                        <p className={styles.heroBadge}>{badgeLabel}</p>
                    </div>

                    <div className={styles.heroTextGroup}>
                        <p className={styles.heroEyebrow} data-animate="heading">
                            {learnMoreLabel}
                        </p>
                        <h1 className={styles.heroTitle} data-animate="heading">
                            {title}
                        </h1>
                        <p className={styles.heroLead} data-animate="heading">
                            {description}
                        </p>
                        <p className={styles.heroDescription} data-animate="heading">
                            {longDescription}
                        </p>
                    </div>

                    <div className={styles.heroMetaRow}>
                        {price && (
                            <div className={styles.priceCard} data-animate="heading">
                                <span>{priceLabel}</span>
                                <strong>{priceValue}</strong>
                            </div>
                        )}
                        {stats && stats.length > 0 && (
                            <div className={styles.heroStats} data-animate="heading">
                                {stats.map((stat, i) => (
                                    <div key={i} className={styles.statCard}>
                                        <span>{stat.label}</span>
                                        <strong>{stat.value}</strong>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.heroActions} data-animate="heading">
                        <Link href="/contact" className={styles.primaryButton}>
                            {primaryCta}
                        </Link>
                        <button 
                            type="button" 
                            className={styles.secondaryButton}
                            onClick={() => {
                                document.getElementById('service-description')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {secondaryCta}
                        </button>
                    </div>
                </div>

                <div className={styles.heroMedia} data-animate="hero-media">
                    <div className={styles.heroMediaGlow} aria-hidden="true" />
                    <div className={styles.heroImageFrame}>
                        {mainImage ? (
                            <Image
                                src={mainImage}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                                priority
                            />
                        ) : (
                            <div className={styles.heroImageFallback} aria-hidden="true">
                                <span>{language === 'ar' ? 'قريباً' : 'Coming Soon'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
);

ServiceHeader.displayName = 'ServiceHeader';

export default ServiceHeader;




































