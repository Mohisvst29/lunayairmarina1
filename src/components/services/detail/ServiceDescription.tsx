"use client";

import { forwardRef, useMemo } from 'react';
import type { Locale } from '@/context/LanguageContext';
import styles from './ServiceDetail.module.css';

type ServiceDescriptionProps = {
    description: string;
    longDescription: string;
    features: string[];
    language: Locale;
    dir: 'ltr' | 'rtl';
};

const ServiceDescription = forwardRef<HTMLElement, ServiceDescriptionProps>(
    ({ description, longDescription, features, language, dir }, ref) => {
        const paragraphs = useMemo(
            () =>
                (longDescription || description)
                    .split(/\n+/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean),
            [description, longDescription]
        );

        const featureLabel = language === 'ar' ? 'المزايا الرئيسية' : 'Key Features';
        const descriptionLabel = language === 'ar' ? 'الوصف التفصيلي' : 'Detailed Description';

        return (
            <section
                id="service-description"
                className={`${styles.section} ${styles.descriptionSection}`}
                ref={ref}
                dir={dir}
            >
                <div className={styles.descriptionContent}>
                    <div className={styles.sectionHeaderLeft}>
                        <p className={styles.sectionBadge} data-animate="description">
                            {descriptionLabel}
                        </p>
                        <h2 className={styles.sectionTitle} data-animate="description">
                            {language === 'ar'
                                ? 'إثراء التجربة في كل مرحلة'
                                : 'Elevating the experience at every phase'}
                        </h2>
                        <div className={styles.bodyText}>
                            <div 
                                dangerouslySetInnerHTML={{ __html: longDescription || description }} 
                                data-animate="description"
                            />
                        </div>
                    </div>

                    <div className={styles.featurePanel}>
                        <div className={styles.featurePanelHeader} data-animate="description">
                            <h3>{featureLabel}</h3>
                            <p>
                                {language === 'ar'
                                    ? 'كل عنصر مدعوم بفرق متخصصة وأدوات مراقبة مباشرة.'
                                    : 'Each capability is backed by dedicated teams and live monitoring.'}
                            </p>
                        </div>
                        <ul className={styles.featuresList}>
                            {features.map((feature) => (
                                <li key={feature} data-animate="description">
                                    <span className={styles.featureBullet} aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                            {features.length === 0 && (
                                <li data-animate="description">
                                    <span className={styles.featureBullet} aria-hidden="true" />
                                    <span>
                                        {language === 'ar'
                                            ? 'سيتم تحديث تفاصيل المزايا قريبًا بناءً على التعديلات في لوحة التحكم.'
                                            : 'Feature details update in real time as the service evolves.'}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
);

ServiceDescription.displayName = 'ServiceDescription';

export default ServiceDescription;








































