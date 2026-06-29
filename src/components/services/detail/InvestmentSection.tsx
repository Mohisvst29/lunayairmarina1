"use client";

import Image from "next/image";
import styles from "./ServiceDetail.module.css";
import DOMPurify from "isomorphic-dompurify";
import { cleanHTML } from "@/utils/cleanHtml";
import type { ServiceDetailDto, LocalizedText } from "@/lib/service-detail";
import type { Locale } from "@/context/LanguageContext";

type Props = {
  service: ServiceDetailDto;
  language: Locale;
  dir: string;
};

const pickLocale = (language: Locale, value?: LocalizedText) =>
  value ? (language === "ar" ? value.ar : value.en) : "";

const sanitize = (html: string) => ({
  __html: DOMPurify.sanitize(cleanHTML(html || "")),
});

export default function InvestmentSection({ service, language, dir }: Props) {
  const isAr = language === "ar";

  const sectionOrder = service.sectionOrder ?? [
    "description",
    "benefits",
    "advantages",
  ];

  const isSectionVisible = (id: string) => {
    switch (id) {
      case "description":
        return !!(service.longDescription || service.description);
      case "benefits":
        return service.benefits?.length > 0;
      case "advantages":
        return service.advantages?.length > 0;
      case "extra1":
        return service.extra1?.enabled;
      case "extra2":
        return service.extra2?.enabled;
      default:
        return false;
    }
  };

  const renderers: Record<string, () => React.ReactNode> = {
    description: () => {
      const desc = pickLocale(
        language,
        service.longDescription || service.description,
      );
      if (!desc) return null;

      return (
        <section className={styles.descriptionSection}>
          <div
            className={styles.bodyText}
            dangerouslySetInnerHTML={sanitize(desc)}
          />
        </section>
      );
    },

    benefits: () => {
      if (!service.benefits?.length) return null;

      return (
        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>
            {isAr ? "المؤشرات" : "Indicators"}
          </h2>

          <div className={styles.benefitsGrid}>
            {service.benefits.map((item, i) => (
              <div key={i} className={styles.benefitCard}>
                <h3>{pickLocale(language, item.title)}</h3>
                <div
                  dangerouslySetInnerHTML={sanitize(
                    pickLocale(language, item.description),
                  )}
                />
              </div>
            ))}
          </div>
        </section>
      );
    },

    advantages: () => {
      if (!service.advantages?.length) return null;

      return (
        <section className={styles.descriptionSection}>
          <h3>{isAr ? "المزايا" : "Advantages"}</h3>

          <ul className={styles.featuresList}>
            {service.advantages.map((adv, i) => (
              <li key={i}>
                <strong>{pickLocale(language, adv.title)}: </strong>
                <span
                  dangerouslySetInnerHTML={sanitize(
                    pickLocale(language, adv.description),
                  )}
                />
              </li>
            ))}
          </ul>
        </section>
      );
    },
  };

  return (
    <main className={styles.page} dir={dir}>
      <div className={styles.section}>
        {/* HERO */}
        <header className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {isAr ? "استثمار مارينا" : "Marina Investment"}
            </span>

            <h1 className={styles.heroTitle}>
              {pickLocale(language, service.heroTitle) ||
                (isAr ? "فرص استثمارية" : "Investment Opportunities")}
            </h1>

            <div
              className={`${styles.heroLead} ${styles.richTextHero}`}
              dangerouslySetInnerHTML={sanitize(
                pickLocale(language, service.description),
              )}
            />
          </div>

          {/* ✅ FIX: رجعنا الـ wrapper اللي بيخلي Image fill يشتغل */}
          <div className={styles.heroMedia}>
            <div className={styles.heroImageFrame}>
              <Image
                src={service.mainImage || "/fallback.jpg"}
                alt="Hero"
                fill
                priority
                className={styles.heroImage}
              />
            </div>
          </div>
        </header>

        {/* SECTIONS */}
        <div className={styles.sectionsWrapper}>
          {sectionOrder
            .filter((id) => isSectionVisible(id))
            .map((id) => (
              <div key={id}>{renderers[id]?.()}</div>
            ))}
        </div>
      </div>
    </main>
  );
}
