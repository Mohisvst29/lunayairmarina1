"use client";

import React, {
  ForwardedRef,
  forwardRef,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./TermsTOC.module.css";
import type { TermsSectionCopy } from "@/data/termsContent";

interface TermsTOCProps {
  sections: TermsSectionCopy[];
  activeSectionId?: string | null;
  onNavigate: (id: string) => void;
}

const subscribeToQuery = (query: string) => {
  const mediaQuery =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(query)
      : null;

  return (callback: () => void) => {
    if (!mediaQuery) {
      return () => undefined;
    }
    const handler = () => callback();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  };
};

const getQuerySnapshot = (query: string) => () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(query).matches
    : false;

const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    subscribeToQuery(query),
    getQuerySnapshot(query),
    () => false,
  );

const TermsTOC = (
  { sections, activeSectionId, onNavigate }: TermsTOCProps,
  ref: ForwardedRef<HTMLElement>,
) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [collapsed, setCollapsed] = useState(true);
  const isCollapsed = useMemo(
    () => (isMobile ? collapsed : false),
    [isMobile, collapsed],
  );

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    onNavigate(id);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const toggleCollapse = () => {
    if (!isMobile) {
      return;
    }
    setCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={styles.toc}
      data-mobile={isMobile}
      aria-label="Terms table of contents"
      ref={ref}
      data-anim="terms-toc"
    >
      <div className={styles.toc__header}>
        <p className={styles.toc__title}>Contents</p>
        <button
          type="button"
          className={styles.toc__toggle}
          onClick={toggleCollapse}
          aria-expanded={!isCollapsed}
          disabled={!isMobile}
        >
          {isCollapsed ? "Expand" : "Hide"}
        </button>
      </div>

      <ol className={styles.toc__list} data-collapsed={isCollapsed}>
        {sections.map((section, index) => (
          <li key={section.id} className={styles.toc__item}>
            <a
              href={`#${section.id}`}
              className={styles.toc__link}
              onClick={(event) => handleNavigate(event, section.id)}
              data-active={activeSectionId === section.id}
            >
              <span className={styles.toc__index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.toc__label}>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default forwardRef(TermsTOC);

