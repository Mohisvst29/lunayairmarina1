"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetail.module.css";

interface BookingSectionProps {
    service: any;
    language: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
}

export default function BookingSection({ service, language, dir }: BookingSectionProps) {
    const { t } = useLanguage();

    const content = {
        title: t('services.booking.title') || "خدمات الحجز وتخطيط الرحلات",
        intro: t('services.booking.intro'),
        services: {
            title: t('services.booking.services.title'),
            items: [
                t('services.booking.services.items.0'),
                t('services.booking.services.items.1'),
                t('services.booking.services.items.2')
            ]
        },
        why_us: {
            title: t('services.booking.why_us.title'),
            features: [
                { title: t('services.booking.why_us.features.0.title'), desc: t('services.booking.why_us.features.0.desc') },
                { title: t('services.booking.why_us.features.1.title'), desc: t('services.booking.why_us.features.1.desc') },
                { title: t('services.booking.why_us.features.2.title'), desc: t('services.booking.why_us.features.2.desc') }
            ]
        }
    };

    return (
        <div className={styles.customSection}>
            {/* Hero-like intro */}
            <div className={styles.contentBlock}>
                <h2>{content.title}</h2>
                <p className={styles.introText}>{content.intro}</p>
            </div>

            {/* Main Services */}
            <div className={styles.featureGrid}>
                <div className={styles.featureText}>
                    <h3>{content.services.title}</h3>
                    <ul className={styles.checkList}>
                        {content.services.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className={styles.featureImage}>
                    <Image
                        src={service.image?.url || "/api/images/slug/service-rental"}
                        alt="Booking Services"
                        width={600}
                        height={400}
                        className={styles.roundedImage}
                    />
                </div>
            </div>

            {/* Why Us Cards */}
            <div className={styles.cardsRow}>
                {content.why_us.features.map((feature: any, i: number) => (
                    <div key={i} className={styles.infoCard}>
                        <h4>{feature.title}</h4>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
