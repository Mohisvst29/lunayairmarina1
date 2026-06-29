"use client";

import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./TermsSection.module.css";
import type { TermsSectionCopy } from "@/data/termsContent";
import Accordion from "./Accordion";
import { ensureGsapPlugins } from "@/lib/gsapClient";

interface TermsSectionProps extends TermsSectionCopy {
  index: number;
  prefersReducedMotion?: boolean;
}

const TermsSection = (
  { id, title, summary, fullText, clauses, index, prefersReducedMotion = false }: TermsSectionProps,
  ref: ForwardedRef<HTMLElement>,
) => {
  const sectionRef = useRef<HTMLElement>(null!);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useImperativeHandle(ref, () => sectionRef.current as HTMLElement, []);

  const handleCopyLink = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const anchorUrl = `${window.location.origin}/terms#${id}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(anchorUrl);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = anchorUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setToastVisible(true);
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (!prefersReducedMotion) {
        const { gsap } = await ensureGsapPlugins();
        gsap?.fromTo(
          toastRef.current,
          { y: 6, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        );
      }
      toastTimeoutRef.current = window.setTimeout(() => setToastVisible(false), 1800);
    } catch (error) {
      console.error("Unable to copy link", error);
    }
  };

  React.useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.section}
      data-section-id={id}
      data-anim="terms-section"
    >
      <header className={styles.section__header}>
        <div className={styles.section__meta}>
          <span className={styles.section__index}>{String(index).padStart(2, "0")}</span>
          <div className={styles.section__titleBlock}>
            <h2
              className={styles.section__title}
              id={`${id}-title`}
              tabIndex={-1}
              data-anim="section-heading"
            >
              {title}
            </h2>
            <p className={styles.section__summary} data-anim="section-lead">
              {summary}
            </p>
          </div>
        </div>

        <div className={styles.section__actions}>
          <button type="button" className={styles.copyButton} onClick={handleCopyLink}>
            Copy link
          </button>
        </div>
      </header>

      <Accordion
        id={`${id}-accordion`}
        flipTargetRef={sectionRef}
        prefersReducedMotion={prefersReducedMotion}
      >
        <p>{fullText}</p>
        {clauses?.map((clause) => (
          <article key={clause.heading}>
            <h3>{clause.heading}</h3>
            <p>{clause.body}</p>
          </article>
        ))}
      </Accordion>

      <div
        ref={toastRef}
        className={styles.copyToast}
        data-visible={toastVisible}
        role="status"
        aria-live="polite"
      >
        Link copied
      </div>
    </section>
  );
};

export default forwardRef<HTMLElement, TermsSectionProps>(TermsSection);

