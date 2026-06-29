"use client";

import styles from "./CommitmentShowcase.module.css";
import { useLanguage } from "@/context/LanguageContext";

interface CommitmentShowcaseProps {
  titleOverride?: string;
  descriptionOverride?: string;
}

export default function CommitmentShowcase({
  titleOverride,
  descriptionOverride,
}: CommitmentShowcaseProps) {
  const { t } = useLanguage();

  const commitments = [
    {
      id: "1",
      title: t('commitment.performance_title'),
      body: [t('commitment.performance_desc')],
    },
    {
      id: "2",
      title: t('commitment.quality_title'),
      body: [t('commitment.quality_desc')],
    },
    {
      id: "3",
      title: t('commitment.environment_title'),
      body: [t('commitment.environment_desc')],
    },
    {
      id: "4",
      title: t('commitment.confidentiality_title'),
      body: [t('commitment.confidentiality_desc')],
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>{titleOverride || t('commitment.title')}</h2>
          <div dangerouslySetInnerHTML={{ __html: descriptionOverride || t('commitment.performance_desc') }} />
        </div>

        <div className={styles.cards}>
          {commitments.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.badge}>{item.id}</span>
              <h3>{item.title}</h3>
              {item.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


