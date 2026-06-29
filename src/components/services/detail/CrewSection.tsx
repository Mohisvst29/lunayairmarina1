"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetail.module.css";

interface CrewSectionProps {
    service: any;
    language: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
}

export default function CrewSection({ service, language, dir }: CrewSectionProps) {
    const { t } = useLanguage();

    const content = {
        title: t('services.crew.title') || "خدمات تجهيز الطاقم",
        intro: t('services.crew.intro') || "في لونير مارينا...",
        strategy: {
            title: t('services.crew.strategy.title') || "استراتيجيتنا في التوظيف",
            items: [
                t('services.crew.strategy.items.0'),
                t('services.crew.strategy.items.1'),
                t('services.crew.strategy.items.2')
            ]
        },
        environment: {
            title: t('services.crew.environment.title') || "بيئة العمل",
            items: [
                t('services.crew.environment.items.0'),
                t('services.crew.environment.items.1'),
                t('services.crew.environment.items.2')
            ]
        },
        cta: t('services.crew.cta'),
        teams: {
            marine: {
                title: t('services.crew.teams.marine.title'),
                items: [
                    t('services.crew.teams.marine.items.0'),
                    t('services.crew.teams.marine.items.1'),
                    t('services.crew.teams.marine.items.2')
                ]
            },
            admin: {
                title: t('services.crew.teams.admin.title'),
                items: [
                    t('services.crew.teams.admin.items.0'),
                    t('services.crew.teams.admin.items.1'),
                    t('services.crew.teams.admin.items.2')
                ]
            }
        },
        why_us: {
            title: t('services.crew.why_us.title'),
            items: [
                t('services.crew.why_us.items.0'),
                t('services.crew.why_us.items.1'),
                t('services.crew.why_us.items.2'),
                t('services.crew.why_us.items.3'),
                t('services.crew.why_us.items.4')
            ]
        },
        commitment: {
            title: t('services.crew.commitment.title'),
            items: [
                t('services.crew.commitment.items.0'),
                t('services.crew.commitment.items.1'),
                t('services.crew.commitment.items.2')
            ]
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
                    <h3>{content.strategy.title}</h3>
                    <ul>
                        {content.strategy.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className={styles.featureImage}>
                    <Image
                        src={service.image?.url || "/api/images/slug/service-crewing"}
                        alt="Crew Strategy"
                        width={600}
                        height={400}
                        className={styles.roundedImage}
                    />
                </div>
            </div>

            <div className={styles.featureGridReverse}>
                <div className={styles.featureText}>
                    <h3>{content.environment.title}</h3>
                    <ul>
                        {content.environment.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className={styles.featureImage}>
                    <Image
                        src="/api/images/slug/relationship-crew"
                        alt="Work Environment"
                        width={600}
                        height={400}
                        className={styles.roundedImage}
                    />
                </div>
            </div>

            <div className={styles.contentBlock}>
                <h3>{content.teams.marine.title}</h3>
                <ul className={styles.checkList}>
                    {content.teams.marine.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                </ul>
            </div>

            <div className={styles.contentBlock}>
                <h3>{content.teams.admin.title}</h3>
                <ul className={styles.checkList}>
                    {content.teams.admin.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                </ul>
            </div>

            <div className={styles.highlightBox}>
                <h3>{content.why_us.title}</h3>
                <ul>
                    {content.why_us.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                </ul>
                <p className={styles.conclusionText}>{content.cta}</p>
            </div>
        </div>
    );
}
