"use client";

import Image from 'next/image';
import { forwardRef } from 'react';
import type { Locale } from '@/context/LanguageContext';
import styles from './ServiceDetail.module.css';

import {
    ShieldCheck, Lock, Siren, Maximize as Expand, Building2 as Building, Leaf,
    ClipboardCheck, BadgeCheck, ClipboardList, Scale, Handshake, Clock,
    PieChart, TrendingUp, FileText, Wrench, Stethoscope, HardHat, Sparkles,
    Settings, Landmark, Shield, FileSignature, AlertTriangle, LineChart,
    Lightbulb, Briefcase, Brush, SprayCan, Eye, Users, GraduationCap,
    Heart, Map, Star, Truck, Wallet, Search, Glasses, Settings2, Diamond,
    BarChart3
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
    'shield-check': ShieldCheck,
    'lock': Lock,
    'siren': Siren,
    'expand': Expand,
    'building': Building,
    'leaf': Leaf,
    'document-check': ClipboardCheck,
    'badge-check': BadgeCheck,
    'clipboard-list': ClipboardList,
    'balance-scale': Scale,
    'handshake': Handshake,
    'clock-fast': Clock,
    'chart-pie': PieChart,
    'trend-up': TrendingUp,
    'file-invoice': FileText,
    'tools': Wrench,
    'stethoscope': Stethoscope,
    'helmet-safety': HardHat,
    'sparkles': Sparkles,
    'cog': Settings,
    'bank': Landmark,
    'shield': Shield,
    'file-signature': FileSignature,
    'alert-triangle': AlertTriangle,
    'chart-line': LineChart,
    'lightbulb': Lightbulb,
    'briefcase': Briefcase,
    'broom': Brush,
    'spray-can': SprayCan,
    'detail-oriented': Eye,
    'eye': Eye,
    'users': Users,
    'graduation-cap': GraduationCap,
    'heart': Heart,
    'map': Map,
    'star': Star,
    'truck-loading': Truck,
    'wallet': Wallet,
    'search': Search,
    'glasses': Glasses,
    'cogs': Settings2,
    'diamond': Diamond,
    'chart-bar': BarChart3
};

type BenefitItem = {
    id: string;
    icon?: string | null;
    title: string;
    description: string;
};

type ServiceBenefitsProps = {
    benefits: BenefitItem[];
    language: Locale;
    dir: 'ltr' | 'rtl';
};

const ServiceBenefits = forwardRef<HTMLElement, ServiceBenefitsProps>(({ benefits, language, dir }, ref) => {
    const hasBenefits = benefits.length > 0;
    const heading = language === 'ar' ? 'لماذا يختارنا العملاء' : 'Why clients choose us';

    return (
        <section className={`${styles.section} ${styles.benefitsSection}`} ref={ref} dir={dir}>
            <div className={styles.sectionHeader}>
                <p className={styles.sectionBadge} data-animate="benefit-card">
                    {language === 'ar' ? 'القيمة المضافة' : 'Value Delivered'}
                </p>
                <h2 className={styles.sectionTitle} data-animate="benefit-card">
                    {heading}
                </h2>
                <p className={styles.sectionSubtitle} data-animate="benefit-card">
                    {language === 'ar'
                        ? 'كل فائدة مستمدة مباشرة من بيانات الخدمة في قاعدة البيانات لضمان الاتساق مع التحديثات المستقبلية.'
                        : 'Each benefit is sourced directly from live service data to stay aligned with future updates.'}
                </p>
            </div>

            <div className={styles.benefitsGrid}>
                {hasBenefits
                    ? benefits.map((benefit) => {
                        const IconComponent = benefit.icon ? ICON_MAP[benefit.icon] : null;

                        return (
                            <article key={benefit.id} className={styles.benefitCard} data-animate="benefit-card">
                                <div className={styles.benefitIcon} aria-hidden="true">
                                    {IconComponent ? (
                                        <IconComponent size={32} />
                                    ) : (
                                        benefit.icon?.startsWith('http') ? (
                                            <Image
                                                src={benefit.icon}
                                                alt=""
                                                width={32}
                                                height={32}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className={styles.defaultIcon} />
                                        )
                                    )}
                                </div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </article>
                        );
                    })
                    : (
                        <article className={styles.benefitCard} data-animate="benefit-card">
                            <div className={styles.benefitIcon} aria-hidden="true">
                                <span className={styles.defaultIcon} />
                            </div>
                            <h3>{language === 'ar' ? 'تحديث قادم' : 'Update in progress'}</h3>
                            <p>
                                {language === 'ar'
                                    ? 'سيتم تحميل الفوائد التفصيلية فور إضافتها من لوحة التحكم.'
                                    : 'Detailed benefits will display automatically once they are added in the CMS.'}
                            </p>
                        </article>
                    )}
            </div>
        </section>
    );
});

ServiceBenefits.displayName = 'ServiceBenefits';

export default ServiceBenefits;
