"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetail.module.css";

interface AdminSectionProps {
    service: any;
    language: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
}

export default function AdminSection({ service, language, dir }: AdminSectionProps) {
    const { t } = useLanguage();

    const content = {
        title: t('services.admin.title') || "الشؤون الإدارية",
        intro: t('services.admin.intro'),
        leadership: {
            title: t('services.admin.leadership.title'),
            items: [
                t('services.admin.leadership.items.0'),
                t('services.admin.leadership.items.1'),
                t('services.admin.leadership.items.2'),
                t('services.admin.leadership.items.3')
            ]
        },
        responsibilities: {
            title: t('services.admin.responsibilities.title'),
            sections: [
                { title: t('services.admin.responsibilities.sections.0.title'), items: [t('services.admin.responsibilities.sections.0.items.0'), t('services.admin.responsibilities.sections.0.items.1')] },
                { title: t('services.admin.responsibilities.sections.1.title'), items: [t('services.admin.responsibilities.sections.1.items.0'), t('services.admin.responsibilities.sections.1.items.1')] },
                { title: t('services.admin.responsibilities.sections.2.title'), items: [t('services.admin.responsibilities.sections.2.items.0'), t('services.admin.responsibilities.sections.2.items.1')] },
                { title: t('services.admin.responsibilities.sections.3.title'), items: [t('services.admin.responsibilities.sections.3.items.0'), t('services.admin.responsibilities.sections.3.items.1')] },
                { title: t('services.admin.responsibilities.sections.4.title'), items: [t('services.admin.responsibilities.sections.4.items.0'), t('services.admin.responsibilities.sections.4.items.1')] }
            ]
        },
        results: {
            title: t('services.admin.results.title'),
            items: [
                t('services.admin.results.items.0'),
                t('services.admin.results.items.1'),
                t('services.admin.results.items.2')
            ],
            conclusion: t('services.admin.results.conclusion')
        }
    };

    return (
        <div className={styles.customSection}>
            <div className={styles.contentBlock}>
                <h2>{content.title}</h2>
                <p className={styles.introText}>{content.intro}</p>
            </div>

            <div className={styles.featureGrid}>
                <div className={styles.featureText}>
                    <h3>{content.leadership.title}</h3>
                    <ul className={styles.checkList}>
                        {content.leadership.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>

            <div className={styles.contentBlock}>
                <h3>{content.responsibilities.title}</h3>
                <div className={styles.stepsGrid}>
                    {content.responsibilities.sections.map((section: any, i: number) => (
                        <div key={i} className={styles.stepCard}>
                            <h4>{section.title}</h4>
                            <ul>
                                {section.items && section.items.map((sub: string, j: number) => sub && <li key={j}>{sub}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.highlightBox}>
                <h3>{content.results.title}</h3>
                <ul>
                    {content.results.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                </ul>
                <p className={styles.conclusionText}>{content.results.conclusion}</p>
            </div>
        </div>
    );
}
