"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/about/page.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_CONTENT } from "../lib/contactInfo";
import { useAboutAnimations } from "../hooks/useAboutAnimations";
import AboutHeroStats from "@/components/AboutHeroStats";

export default function AboutPageClient() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const { language, dir } = useLanguage();

  const content = ABOUT_CONTENT[language] || ABOUT_CONTENT["en"] || {};

  useAboutAnimations({
    rootRef,
    heroRef,
    storyRef,
    missionRef,
    valuesRef,
    timelineRef,
    ctaRef,
  });

  return (
    <main className={styles.page} ref={rootRef} style={{ direction: dir }}>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroAura} aria-hidden="true" />
        <p className={styles.heroBadge} data-animate="hero">
          {content?.story?.badge || ""}
        </p>
        <h1 data-animate="hero">
          {content.hero.title.map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <div
          className={styles.heroLead}
          data-animate="hero"
          dangerouslySetInnerHTML={{ __html: content.hero.lead }}
        />
        <AboutHeroStats
          key={language}
          stats={content.hero.stats}
          language={language}
        />
      </section>

      <section className={styles.storySection} ref={storyRef}>
        <div className={styles.storyText} data-animate="story-text">
          <p className={styles.sectionBadge}>{content.story.badge}</p>
          <h2>{content.story.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: content.story.paragraphs.join("\n\n"),
            }}
          />
        </div>
        <div className={styles.storyMedia} data-animate="story-media">
          <div className={styles.mediaGlow} aria-hidden="true" />
          <Image
            src="/i.webp"
            alt="About Story"
            width={620}
            height={760}
            className={styles.storyImage}
            priority={false}
          />
          <div className={styles.storyCard}>
            <p>{content.story.card.label}</p>
            <strong>{content.story.card.value}</strong>
            <span>{content.story.card.helper}</span>
          </div>
        </div>
      </section>

      <section className={styles.missionSection} ref={missionRef}>
        {content.missionVision.map((item: any) => (
          <article
            key={item.title}
            className={styles.missionCard}
            data-animate="mission-card"
          >
            <h3>{item.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
          </article>
        ))}
      </section>

      <section className={styles.valuesSection} ref={valuesRef}>
        <div className={styles.valuesIntro}>
          <p className={`${styles.sectionBadge} ${styles.largeBadge}`}>
            {content.values.badge}
          </p>
          <h2>{content.values.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: content.values.description }}
          />
        </div>
        <div className={styles.valuesGrid}>
          {content.values.cards.map((value: any) => (
            <article
              key={value.title}
              className={styles.valueCard}
              data-animate="value-card"
            >
              <span aria-hidden="true">✦</span>
              <h3>{value.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: value.body }} />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.clientSection}>
        <div className={styles.clientGrid}>
          <article className={styles.clientCard}>
            <p className={styles.sectionBadge}>{content.client.badge}</p>
            <h2>{content.client.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: content.client.paragraphs.join("\n\n"),
              }}
            />
            <p>
              <strong>{content.client.quote}</strong>
            </p>
          </article>
          <article className={styles.clientCard}>
            <h3>{content.client.highlightsTitle}</h3>
            <ul>
              {content.client.highlights.map((h: string) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={styles.ctaCopy}>
          <p className={styles.sectionBadge}>{content.cta.badge}</p>
          <h2>{content.cta.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content.cta.description }} />
        </div>
        <Link href="/contact" className={styles.ctaButton}>
          {content.cta.button} <span aria-hidden="true">➝</span>
        </Link>
      </section>
    </main>
  );
}
