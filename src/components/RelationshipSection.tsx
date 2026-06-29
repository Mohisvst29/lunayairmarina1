"use client";

import Link from "next/link";
import Image from "next/image";
import RotatingBorderButton from "@/components/RotatingBorderButton";
import styles from "./RelationshipSection.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContourPattern from "@/components/ContourPattern";
import { normalizeImageUrl } from "@/utils/imageUrl";

interface RelationshipSectionProps {
    titleOverride?: string;
    descriptionOverride?: string;
    imageIdOverride?: string | null;
}

export default function RelationshipSection({
    titleOverride,
    descriptionOverride,
    imageIdOverride,
}: RelationshipSectionProps) {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const whyWidgetRef = useRef<HTMLDivElement>(null);
    const dashboardWidgetRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate Why Widget
            gsap.fromTo(whyWidgetRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: whyWidgetRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Dashboard Widget
            gsap.fromTo(dashboardWidgetRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: dashboardWidgetRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Animate Bars
            if (barsRef.current) {
                const bars = barsRef.current.children;
                gsap.fromTo(bars,
                    { scaleY: 0, transformOrigin: "bottom" },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        stagger: 0.1,
                        ease: "elastic.out(1, 0.5)",
                        scrollTrigger: {
                            trigger: barsRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Animate Heatmap dots
            const heatmapDots = document.querySelectorAll(`.${styles.metricHeatmap} span`);
            if (heatmapDots.length > 0) {
                gsap.fromTo(heatmapDots,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: {
                            amount: 1,
                            grid: [4, 7],
                            from: "center"
                        },
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: `.${styles.metricHeatmap}`,
                            start: "top 85%",
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.relationshipSection} ref={sectionRef}>
            {/* --- Widget 1: Why Choose --- */}
            <div className={styles.whyWidget} ref={whyWidgetRef}>
                <ContourPattern className={styles.contourBackground} opacity={0.4} />
                <div className={styles.whyText}>
                    <span className={styles.whyBadge}>
                        {t('why_choose_us.title')}
                    </span>
                    <h2>{titleOverride || t('why_choose_us.experience_title')}</h2>
                    <div className={styles.whyBody}>
                        <div dangerouslySetInnerHTML={{ __html: descriptionOverride || t('why_choose_us.experience_desc') }} />
                    </div>
                    <Link href="/contact" className={styles.conicButtonLink}>
                        <RotatingBorderButton text={t('hero.cta_know_more')} />
                    </Link>
                </div>

                <div className={styles.whyPhoto}>
                    <Image
                        src={normalizeImageUrl(imageIdOverride) || "/api/images/slug/relationship-crew"}
                        alt="Professional yacht crew team at the marina"
                        width={520}
                        height={520}
                        className={styles.whyImage}
                        sizes="(max-width: 768px) 100vw, 520px"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Widget 2: Relationship / Dashboard */}
            <div className={styles.dashboardWidget} ref={dashboardWidgetRef}>
                <ContourPattern className={styles.contourBackground} />
                <div className={styles.analyticsColumn}>
                    <div className={`${styles.whyPhoto} ${styles.deviceFrame}`}>
                        <Image
                            src="/newbackgrounds/localservices-section-mainpage.webp"
                            alt="Local and Regional Services"
                            width={520}
                            height={520}
                            className={styles.whyImage}
                            sizes="(max-width: 768px) 100vw, 520px"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className={styles.relationshipCopy}>
                    <h3>
                        {t('relationship_section.title')}
                    </h3>

                    <p>
                        {t('relationship_section.description')}
                    </p>

                </div>
            </div>
        </section>
    );
}
