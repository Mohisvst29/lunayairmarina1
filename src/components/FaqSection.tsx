"use client";

import styles from "./FaqSection.module.css";
import { useLanguage } from "@/context/LanguageContext";

interface FaqSectionProps {
  titleOverride?: string;
  descriptionOverride?: string;
  faqs?: any[];
}

export default function FaqSection({
  titleOverride,
  descriptionOverride,
  faqs = [],
}: FaqSectionProps) {
  const { t, dir, language } = useLanguage();

  return (
    <section className={styles.faqSection} dir={dir}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t("faq.badge")}</span>
          <h2
            className={styles.title}
            style={{
              color: "#ffffff", // أبيض ناصع
              fontWeight: "800", // عريض جداً (Bold)
              fontSize: "clamp(45px, 7vw, 80px)", // حجم أكبر شوية عشان الهيبة
              fontFamily: "'Playfair Display', serif", // التأكد من نوع الخط الفخم
              position: "relative",
              zIndex: "99",
              display: "block",
              textAlign: "center", // سنتر النص
              letterSpacing: "-1px", // تقريب الحروف لبعض بيخلي الشكل مودرن أكتر
              textShadow: "0 4px 15px rgba(0,0,0,0.3)", // ظل خفيف جداً يبرز الأبيض من الخلفية
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            {titleOverride || t("faq.title")}
          </h2>
          <p className={styles.subtitle}>
            {descriptionOverride || t("faq.subtitle")}
          </p>
        </div>

        <div className={styles.faqListWrapper}>
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              /* استخدمنا details هنا عشان يفتح ويقفل لوحده */
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <div className={styles.faqIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className={styles.faqQuestion}>
                    {language === "ar"
                      ? (faq.question?.ar || faq.qAr || (typeof faq.question === 'string' ? faq.question : ""))
                      : (faq.question?.en || faq.q || (typeof faq.question === 'string' ? faq.question : ""))}
                  </h3>
                  <span className={styles.faqIcon}>▼</span>
                </summary>

                <div className={styles.faqAnswer}>
                  <p>
                    {language === "ar"
                      ? (faq.answer?.ar || faq.aAr || (typeof faq.answer === 'string' ? faq.answer : ""))
                      : (faq.answer?.en || faq.a || (typeof faq.answer === 'string' ? faq.answer : ""))}
                  </p>
                </div>
              </details>
            ))
          ) : (
            <div className={styles.noFaqs}>
              {language === "ar"
                ? "لا توجد أسئلة شائعة حالياً"
                : "No FAQs available at the moment."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
