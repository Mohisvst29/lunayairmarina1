"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetail.module.css";

// Define the interface for the cleaning service structure
interface CleaningService {
    slug: string;
    title: string; // fallback
    // In real app, we use translations
}

interface CleaningSectionProps {
    service: any; // We'll type this loosely or import ServiceDetailResponse['service']
    language: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
}

export default function CleaningSection({ service, language, dir }: CleaningSectionProps) {
    const { t } = useLanguage();

    // Helper to get translated content
    // We assume these keys are added to ar.json/en.json under "services.cleaning"
    const content = {
        title: t('services.cleaning.title') || "خدمات النظافة والعناية الفاخرة",
        intro: t('services.cleaning.intro') || "في لونير مارينا...",
        sustainability: {
            title: t('services.cleaning.sustainability.title') || "التزامنا بالاستدامة",
            items: [
                t('services.cleaning.sustainability.items.0') || "المنتجات الصديقة للبيئة...",
                t('services.cleaning.sustainability.items.1') || "التقنيات المتقدمة...",
                t('services.cleaning.sustainability.items.2') || "الحفاظ على البيئة..."
            ]
        },
        services: {
            title: t('services.cleaning.services.title') || "خدمات النظافة والعناية الفاخرة",
            items: [
                t('services.cleaning.services.items.0') || "تلميع فاخر...",
                t('services.cleaning.services.items.1') || "تنظيف عميق...",
                t('services.cleaning.services.items.2') || "رعاية احترافية...",
                t('services.cleaning.services.items.3') || "تنسيق الأثاث...",
                t('services.cleaning.services.items.4') || "تنظيف المسابح..."
            ]
        },
        personal_care: {
            title: t('services.cleaning.personal_care.title') || "رعايتنا الشخصية",
            items: [
                t('services.cleaning.personal_care.items.0') || "منتجات فاخرة...",
                t('services.cleaning.personal_care.items.1') || "اهتمام بالتفاصيل...",
                t('services.cleaning.personal_care.items.2') || "راحة بالكم..."
            ]
        },
        why_us: {
            title: t('services.cleaning.why_us.title') || "لماذا لونير مارينا؟",
            items: [
                t('services.cleaning.why_us.items.0') || "الجودة والفخامة...",
                t('services.cleaning.why_us.items.1') || "الراحة والمرونة...",
                t('services.cleaning.why_us.items.2') || "الاستدامة والفخامة..."
            ]
        },
        conclusion: t('services.cleaning.conclusion') || "في لونير مارينا..."
    };

    return (
        <div className={styles.customSection}>
            {/* Intro Section */}
            <div className={styles.contentBlock}>
                <h2>{content.title}</h2>
                <p className={styles.introText}>{content.intro}</p>
            </div>

            {/* Sustainability Section */}
            <div className={styles.featureGrid}>
                <div className={styles.featureText}>
                    <h3>{content.sustainability.title}</h3>
                    <ul>
                        {content.sustainability.items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.featureImage}>
                    <Image
                        src={service.image?.url || "/api/images/slug/service-care-cleaning"}
                        alt="Sustainability"
                        width={600}
                        height={400}
                        className={styles.roundedImage}
                    />
                </div>
            </div>

            {/* Services List */}
            <div className={styles.contentBlock}>
                <h3>{content.services.title}</h3>
                <ul className={styles.checkList}>
                    {content.services.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Personal Care */}
            <div className={styles.featureGridReverse}>
                <div className={styles.featureText}>
                    <h3>{content.personal_care.title}</h3>
                    <ul>
                        {content.personal_care.items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.featureImage}>
                    <Image
                        src="/api/images/slug/service-care-cleaning-interior" // Fallback or secondary image
                        alt="Personal Care"
                        width={600}
                        height={400}
                        className={styles.roundedImage}
                    />
                </div>
            </div>

            {/* Why Us and Conclusion */}
            <div className={styles.highlightBox}>
                <h3>{content.why_us.title}</h3>
                <ul>
                    {content.why_us.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
                <p className={styles.conclusionText}>{content.conclusion}</p>
            </div>
        </div>
    );
}
