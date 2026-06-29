"use client";

import React, { useState } from "react";
import styles from "./FAQ.module.css";
import MobileFloatingCard from "./MobileFloatingCard";
import { useLanguage } from "@/context/LanguageContext";

// تعريف الـ Props اللي المكون هيستقبلها
interface FAQProps {
  title?: string;
  items?: Array<{ title: string; body: string }>;
}

export default function FAQ({ title, items }: FAQProps) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // لو الباك اند بعت داتا نستخدمها، لو مبعتش نستخدم الداتا القديمة (Static)
  const displayItems =
    items && items.length > 0
      ? items
      : [
          {
            title: t("appPage.faq.items.q1.question"),
            body: t("appPage.faq.items.q1.answer"),
          },
          {
            title: t("appPage.faq.items.q2.question"),
            body: t("appPage.faq.items.q2.answer"),
          },
          {
            title: t("appPage.faq.items.q3.question"),
            body: t("appPage.faq.items.q3.answer"),
          },
        ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container} id="faq-section">
      <MobileFloatingCard section="faq" position="left" />
      <MobileFloatingCard section="faq" position="right" />

      <div className={styles.contentWrapper}>
        {/* العنوان من الباك اند أو من الترجمة */}
        <h2 className={styles.title}>{title || t("appPage.faq.title")}</h2>

        <div className={styles.list}>
          {displayItems.map((faq, index) => (
            <div key={index} className={styles.item}>
              <button
                className={`${styles.question} ${openIndex === index ? styles.open : ""}`}
                onClick={() => toggle(index)}
              >
                {faq.title}{" "}
                {/* لاحظ غيرنا faq.q لـ faq.title عشان توافق الـ CMS */}
                <span className={styles.icon}>▼</span>
              </button>
              <div
                className={`${styles.answer} ${openIndex === index ? styles.open : ""}`}
              >
                {/* استخدم dangerouslySetInnerHTML لو الداتا جاية فيها Tags HTML من الباك اند */}
                <p dangerouslySetInnerHTML={{ __html: faq.body }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
