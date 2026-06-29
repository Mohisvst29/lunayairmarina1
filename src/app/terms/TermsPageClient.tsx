"use client";

import { useCallback, useRef, useState } from "react";
import type { TermsContent } from "@/data/termsContent";
import TermsHero from "@/components/terms/TermsHero";
import TermsTOC from "@/components/terms/TermsTOC";
import TermsSection from "@/components/terms/TermsSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTermsAnimations } from "@/hooks/useTermsAnimations";
import { ensureGsapPlugins } from "@/lib/gsapClient";
import styles from "./page.module.css";

interface TermsPageClientProps {
  content: TermsContent;
}

const TermsPageClient = ({ content }: TermsPageClientProps) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const tocRef = useRef<HTMLElement | null>(null);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(content.sections[0]?.id ?? null);

  const registerSectionRef = useCallback((id: string, node: HTMLElement | null) => {
    sectionsRef.current[id] = node;
  }, []);

  useTermsAnimations({
    heroRef,
    tocRef,
    sectionsRef,
    prefersReducedMotion,
    onActiveSectionChange: setActiveSectionId,
  });

  const handleAnchorNavigate = useCallback(
    async (sectionId: string) => {
      setActiveSectionId(sectionId);
      const target = sectionsRef.current[sectionId];
      if (!target) {
        return;
      }

      const highlightTarget = () => {
        target.setAttribute("data-highlight", "true");
        window.setTimeout(() => {
          target.removeAttribute("data-highlight");
        }, 1200);
      };

      if (prefersReducedMotion) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        highlightTarget();
        const heading = target.querySelector("h2");
        if (heading instanceof HTMLElement) {
          heading.focus();
        }
        return;
      } else {
        const { gsap, ScrollToPlugin } = await ensureGsapPlugins({ scrollTo: true });
        if (gsap && ScrollToPlugin) {
          gsap.to(window, {
            duration: 0.75,
            scrollTo: { y: target, offsetY: 32 },
            ease: "power3.out",
            onComplete: () => {
              highlightTarget();
              const heading = target.querySelector("h2");
              if (heading instanceof HTMLElement) {
                heading.focus();
              }
            },
          });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          highlightTarget();
          const heading = target.querySelector("h2");
          if (heading instanceof HTMLElement) {
            heading.focus();
          }
        }
      }
    },
    [prefersReducedMotion],
  );

  return (
    <main className={styles.termsPage}>
      <TermsHero ref={heroRef} lastUpdated={content.lastUpdated} siteName={content.siteName} />
      <section className={styles.contentArea}>
        <div className={styles.sections}>
          {content.sections.map((section, index) => (
            <TermsSection
              key={section.id}
              ref={(node) => registerSectionRef(section.id, node)}
              index={index + 1}
              prefersReducedMotion={prefersReducedMotion}
              {...section}
            />
          ))}
        </div>
        <TermsTOC
          ref={tocRef}
          sections={content.sections}
          activeSectionId={activeSectionId}
          onNavigate={handleAnchorNavigate}
        />
      </section>
    </main>
  );
};

export default TermsPageClient;

