"use client";

import { ForwardedRef, forwardRef, useMemo } from "react";
import styles from "./TermsHero.module.css";

interface TermsHeroProps {
  lastUpdated: string;
  siteName: string;
}

const TermsHero = ({ lastUpdated, siteName }: TermsHeroProps, ref: ForwardedRef<HTMLElement>) => {
  const formattedDate = useMemo(() => {
    const date = new Date(lastUpdated);
    if (Number.isNaN(date.getTime())) {
      return lastUpdated;
    }
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  }, [lastUpdated]);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="terms-title">
      <div className={styles.hero__content}>
        <p className={styles.hero__eyebrow} data-anim="hero-line">
          {siteName} Legal
        </p>
        <h1 id="terms-title" className={styles.hero__title} data-anim="hero-line">
          Terms & Conditions
        </h1>
        <p className={styles.hero__subtitle} data-anim="hero-line">
          A trustworthy reference for how we operate, protect your interests, and
          keep every voyage with us transparent and safe.
        </p>
        <div className={styles.hero__meta} data-anim="hero-line">
          <span className={styles.hero__badge}>Last updated</span>
          <time dateTime={lastUpdated} className={styles.hero__date}>
            {formattedDate}
          </time>
        </div>
      </div>
    </section>
  );
};

export default forwardRef(TermsHero);







































