import { MutableRefObject, useEffect } from "react";
import { ensureGsapPlugins } from "@/lib/gsapClient";

interface UseTermsAnimationsOptions {
  heroRef: MutableRefObject<HTMLElement | null>;
  tocRef: MutableRefObject<HTMLElement | null>;
  sectionsRef: MutableRefObject<Record<string, HTMLElement | null>>;
  prefersReducedMotion: boolean;
  onActiveSectionChange?: (id: string) => void;
}

interface ScrollTriggerMatchMedia {
  revert: () => void;
}

export const useTermsAnimations = ({
  heroRef,
  tocRef,
  sectionsRef,
  prefersReducedMotion,
  onActiveSectionChange,
}: UseTermsAnimationsOptions) => {
  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") {
      return;
    }

    let ctx: ReturnType<NonNullable<Awaited<ReturnType<typeof ensureGsapPlugins>>["gsap"]>["context"]> | null = null;
    let mm: ScrollTriggerMatchMedia | null = null;
    const triggers: Array<ReturnType<NonNullable<Awaited<ReturnType<typeof ensureGsapPlugins>>["ScrollTrigger"]>["create"]>> = [];
    let cancelled = false;

    const setup = async () => {
      const { gsap, ScrollTrigger } = await ensureGsapPlugins({ scrollTrigger: true });
      if (!gsap || !ScrollTrigger || cancelled) {
        return;
      }

      ctx = gsap.context(() => {
        const heroTargets = heroRef.current?.querySelectorAll('[data-anim="hero-line"]');
        if (heroTargets?.length) {
          gsap.fromTo(
            heroTargets,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
            },
          );
        }

        if (tocRef.current) {
          gsap.fromTo(
            tocRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.1,
            },
          );
        }
      });

      mm = ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const sectionElements = Object.values(sectionsRef.current).filter(Boolean) as HTMLElement[];
          sectionElements.forEach((section) => {
            const headingTarget = section.querySelector('[data-anim="section-heading"]');
            if (headingTarget) {
              gsap.fromTo(
                headingTarget,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                  },
                },
              );
            }

            const leadTarget = section.querySelector('[data-anim="section-lead"]');
            if (leadTarget) {
              gsap.fromTo(
                leadTarget,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power3.out",
                  delay: 0.08,
                  scrollTrigger: {
                    trigger: section,
                    start: "top 78%",
                  },
                },
              );
            }

            const trigger = ScrollTrigger.create({
              trigger: section,
              start: "top 25%",
              end: "bottom 25%",
              onEnter: () => onActiveSectionChange?.(section.dataset.sectionId ?? ""),
              onEnterBack: () => onActiveSectionChange?.(section.dataset.sectionId ?? ""),
            });

            triggers.push(trigger);
          });
        },
      }) as unknown as ScrollTriggerMatchMedia;
    };

    setup();

    return () => {
      cancelled = true;
      ctx?.revert();
      triggers.forEach((trigger) => trigger.kill());
      mm?.revert();
    };
  }, [heroRef, tocRef, sectionsRef, prefersReducedMotion, onActiveSectionChange]);
};

