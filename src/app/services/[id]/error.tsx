"use client";

import { useEffect } from "react";
import styles from "@/components/services/detail/ServiceDetail.module.css";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ServiceDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>We hit some rough seas.</h1>
          <p className={styles.heroLead}>
            Please refresh the page or try again. If the issue continues, reach
            out to support with the reference below.
          </p>
          {error.digest && (
            <code
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.08)",
                fontSize: "0.9rem",
              }}
            >
              {error.digest}
            </code>
          )}
          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={reset}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
