"use client";

import React from "react";
import styles from "@/app/page.module.css";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/app-showcase/Hero";
import FeatureSection from "@/components/app-showcase/FeatureSection";
import FAQ from "@/components/app-showcase/FAQ";
import ContactForm from "@/components/app-showcase/ContactForm";
import SectionSeparator from "@/components/app-showcase/SectionSeparator";

interface AppPageClientProps {
  cmsData: any;
  language: string;
}

export default function AppPageClient({
  language: serverLang,
}: AppPageClientProps) {
  const { t, language: contextLang, dir } = useLanguage();
  const activeLang = contextLang || serverLang || "ar";

  return (
    <div className={`${styles.container}`} dir={dir}>
      <main>
        <Hero label={t("appPage.hero.label")} title={t("appPage.hero.title")} />
        <SectionSeparator />
        <SectionSeparator />
        <div
          style={{
            width: "100%",
            backgroundColor: "#0a1628",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8rem 0",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "600",
              textAlign: "center",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("appPage.benefits.title")}
          </h1>
        </div>
        <SectionSeparator />
        <div id="features" style={{ position: "relative", zIndex: 2 }}>
          <FeatureSection
            number="01"
            title={t("appPage.features.tankLevels.title")}
            description={t("appPage.features.tankLevels.description")}
            variant="tankLevels"
            lightBg={false}
          />
          <SectionSeparator />
          <FeatureSection
            number="02"
            title={t("appPage.features.checklist.title")}
            description={t("appPage.features.checklist.description")}
            variant="checklist"
            reversed={true}
          />
          <SectionSeparator />
          <FeatureSection
            number="03"
            title={t("appPage.features.services.title")}
            description={t("appPage.features.services.description")}
            variant="services"
            lightBg={false}
          />
        </div>
        <SectionSeparator />
        <div style={{ width: "100%", backgroundColor: "#0a1628" }}>
          <FAQ items={[]} />
        </div>{" "}
        <SectionSeparator />
        <ContactForm />
      </main>
    </div>
  );
}
