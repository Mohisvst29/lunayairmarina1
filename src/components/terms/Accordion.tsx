"use client";

import { ReactNode, RefObject, useEffect, useId, useRef, useState, useCallback } from "react";
import styles from "./Accordion.module.css";
import { ensureGsapPlugins } from "@/lib/gsapClient";

interface AccordionProps {
  id: string;
  children: ReactNode;
  triggerLabel?: string;
  collapseLabel?: string;
  flipTargetRef?: RefObject<HTMLElement>;
  prefersReducedMotion?: boolean;
}

const Accordion = ({
  id,
  children,
  triggerLabel = "Read more",
  collapseLabel = "Show less",
  flipTargetRef,
  prefersReducedMotion = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(false);
  const triggerId = useId();
  const regionId = `${id}-panel`;
  const flipStateRef = useRef<ReturnType<NonNullable<Awaited<ReturnType<typeof ensureGsapPlugins>>["Flip"]>["getState"]> | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const label = isOpen ? collapseLabel : triggerLabel;

  const captureFlip = useCallback(async () => {
    if (!flipTargetRef?.current || prefersReducedMotion) {
      return;
    }
    const { Flip } = await ensureGsapPlugins({ flip: true });
    if (Flip) {
      flipStateRef.current = Flip.getState(flipTargetRef.current);
    }
  }, [flipTargetRef, prefersReducedMotion]);

  const playFlip = useCallback(async () => {
    if (!flipStateRef.current || prefersReducedMotion) {
      flipStateRef.current = null;
      return;
    }
    const { Flip } = await ensureGsapPlugins({ flip: true });
    if (Flip) {
      Flip.from(flipStateRef.current, {
        duration: 0.5,
        ease: "power3.out",
      });
    }
    flipStateRef.current = null;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isMountedRef.current) {
      return;
    }

    const animate = async () => {
      if (!panelRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        panelRef.current.style.height = isOpen ? "auto" : "0px";
        panelRef.current.style.opacity = isOpen ? "1" : "0";
        return;
      }

      const { gsap } = await ensureGsapPlugins();
      if (!gsap) {
        panelRef.current.style.height = isOpen ? "auto" : "0px";
        panelRef.current.style.opacity = isOpen ? "1" : "0";
        return;
      }

      await new Promise<void>((resolve) => {
        gsap.to(panelRef.current, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => resolve(),
        });
      });
    };

    animate().then(playFlip);
  }, [isOpen, prefersReducedMotion, playFlip]);

  const handleToggle = async () => {
    await captureFlip();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.accordion}>
      <button
        id={triggerId}
        className={styles.accordion__trigger}
        aria-expanded={isOpen}
        aria-controls={regionId}
        onClick={handleToggle}
        data-open={isOpen}
      >
        {label}
        <span className={styles.accordion__icon} aria-hidden="true">
          ˅
        </span>
      </button>

      <div
        ref={panelRef}
        id={regionId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.accordion__panel}
        data-open={isOpen}
      >
        <div className={styles.accordion__body}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;

