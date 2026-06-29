"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetail.module.css";
// import { Briefcase, TrendingUp, ShieldCheck, PieChart } from "lucide-react"; // If enabled, or use placeholders

interface FinancialSectionProps {
    service: any;
    language: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
}

export default function FinancialSection({ service, language, dir }: FinancialSectionProps) {
    const { t } = useLanguage();

    const content = {
        title: t('services.financial.title') || "الشؤون الإدارية والمالية",
        intro: t('services.financial.intro'),
        solutions: {
            title: t('services.financial.solutions.title'),
            desc: t('services.financial.solutions.desc')
        },
        management: {
            title: t('services.financial.management.title'),
            items: [
                t('services.financial.management.items.0'),
                t('services.financial.management.items.1'),
                t('services.financial.management.items.2'),
                t('services.financial.management.items.3')
            ]
        },
        process: {
            title: t('services.financial.process.title'),
            steps: [
                { title: t('services.financial.process.steps.0.title'), items: [t('services.financial.process.steps.0.items.0'), t('services.financial.process.steps.0.items.1')] },
                { title: t('services.financial.process.steps.1.title'), items: [t('services.financial.process.steps.1.items.0'), t('services.financial.process.steps.1.items.1')] },
                { title: t('services.financial.process.steps.2.title'), items: [t('services.financial.process.steps.2.items.0'), t('services.financial.process.steps.2.items.1'), t('services.financial.process.steps.2.items.2')] },
                { title: t('services.financial.process.steps.3.title'), items: [t('services.financial.process.steps.3.items.0'), t('services.financial.process.steps.3.items.1')] },
                { title: t('services.financial.process.steps.4.title'), items: [t('services.financial.process.steps.4.items.0'), t('services.financial.process.steps.4.items.1')] },
                { title: t('services.financial.process.steps.5.title'), items: [t('services.financial.process.steps.5.items.0'), t('services.financial.process.steps.5.items.1')] },
            ]
        }
    };

    return (
        <div className={styles.customSection}>
            {/* Header */}
            <div className={styles.contentBlock}>
                <h2>{content.title}</h2>
                <p className={styles.introText}>{content.intro}</p>
            </div>

            {/* Solutions & Management */}
            <div className={styles.featureGrid}>
                <div className={styles.featureText}>
                    <h3>{content.solutions.title}</h3>
                    <p>{content.solutions.desc}</p>

                    <h4 style={{ marginTop: '2rem' }}>{content.management.title}</h4>
                    <ul className={styles.checkList}>
                        {content.management.items.map((item: string, i: number) => item && <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>

            {/* Process Steps */}
            <div className={styles.contentBlock}>
                <h3>{content.process.title}</h3>
                <div className={styles.stepsGrid}>
                    {content.process.steps.map((step: any, i: number) => (
                        <div key={i} className={styles.stepCard}>
                            <h4>{step.title}</h4>
                            <ul>
                                {step.items && step.items.map((sub: string, j: number) => sub && <li key={j}>{sub}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
