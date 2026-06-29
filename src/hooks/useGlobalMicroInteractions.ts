"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

interface UseGlobalMicroInteractionsProps {
  isRTL?: boolean;
  enabled?: boolean;
}

/**
 * Global micro-interactions hook for site-wide subtle animations
 * Applies lightweight GSAP animations to interactive elements
 */
export const useGlobalMicroInteractions = ({
  isRTL = false,
  enabled = true,
}: UseGlobalMicroInteractionsProps = {}) => {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const buttonCleanups: Array<() => void> = [];
    const linkCleanups: Array<() => void> = [];
    const cardCleanups: Array<() => void> = [];
    const iconCleanups: Array<() => void> = [];
    const inputCleanups: Array<() => void> = [];
    const imageCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Staggered fade-in for page sections on load (using Intersection Observer)
      const sections = document.querySelectorAll("section[data-animate-on-load]");
      if (sections.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                gsap.fromTo(
                  entry.target,
                  {
                    opacity: 0,
                    y: 20,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out",
                  }
                );
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
          sections.forEach((section) => observer.unobserve(section));
        };
      }

      // Smooth reveal on scroll for elements with data-animate-on-scroll
      const scrollElements = document.querySelectorAll("[data-animate-on-scroll]");
      if (scrollElements.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.fromTo(
                  entry.target,
                  {
                    opacity: 0,
                    y: 30,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                  }
                );
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        scrollElements.forEach((element) => observer.observe(element));

        return () => {
          scrollElements.forEach((element) => observer.unobserve(element));
        };
      }

      // Enhanced button hover interactions
      const buttons = document.querySelectorAll(
        "button:not([data-no-micro-interaction]), a[role='button']:not([data-no-micro-interaction])"
      );

      buttons.forEach((button) => {
        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const handleMouseDown = () => {
          gsap.to(button, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.out",
          });
        };

        const handleMouseUp = () => {
          gsap.to(button, {
            scale: 1.02,
            duration: 0.1,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
        button.addEventListener("mousedown", handleMouseDown);
        button.addEventListener("mouseup", handleMouseUp);

        buttonCleanups.push(() => {
          button.removeEventListener("mouseenter", handleMouseEnter);
          button.removeEventListener("mouseleave", handleMouseLeave);
          button.removeEventListener("mousedown", handleMouseDown);
          button.removeEventListener("mouseup", handleMouseUp);
        });
      });

      // Link hover micro-interactions
      const links = document.querySelectorAll(
        "a:not([data-no-micro-interaction]):not(button):not([role='button'])"
      );

      links.forEach((link) => {
        const handleMouseEnter = () => {
          gsap.to(link, {
            opacity: 0.85,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(link, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        linkCleanups.push(() => {
          link.removeEventListener("mouseenter", handleMouseEnter);
          link.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      // Card hover micro-interactions
      const cards = document.querySelectorAll(
        "[data-card]:not([data-no-micro-interaction]), .card:not([data-no-micro-interaction])"
      );

      cards.forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -4,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        cardCleanups.push(() => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      // Icon micro-bounce on hover
      const icons = document.querySelectorAll(
        "[data-icon]:not([data-no-micro-interaction]), svg:not([data-no-micro-interaction])"
      );

      icons.forEach((icon) => {
        const handleMouseEnter = () => {
          const direction = isRTL ? -2 : 2;
          gsap.to(icon, {
            x: direction,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        };

        icon.addEventListener("mouseenter", handleMouseEnter);

        iconCleanups.push(() => {
          icon.removeEventListener("mouseenter", handleMouseEnter);
        });
      });

      // Form input focus animations
      const inputs = document.querySelectorAll(
        "input:not([data-no-micro-interaction]), textarea:not([data-no-micro-interaction]), select:not([data-no-micro-interaction])"
      );

      inputs.forEach((input) => {
        const handleFocus = () => {
          gsap.to(input, {
            scale: 1.01,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const handleBlur = () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);

        inputCleanups.push(() => {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        });
      });

      // Image hover micro-interactions
      const images = document.querySelectorAll(
        "img:not([data-no-micro-interaction]):not([aria-hidden='true'])"
      );

      images.forEach((img) => {
        const handleMouseEnter = () => {
          gsap.to(img, {
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        img.addEventListener("mouseenter", handleMouseEnter);
        img.addEventListener("mouseleave", handleMouseLeave);

        imageCleanups.push(() => {
          img.removeEventListener("mouseenter", handleMouseEnter);
          img.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    });

    return () => {
      ctx.revert();
      // Cleanup all event listeners
      buttonCleanups.forEach((cleanup) => cleanup());
      linkCleanups.forEach((cleanup) => cleanup());
      cardCleanups.forEach((cleanup) => cleanup());
      iconCleanups.forEach((cleanup) => cleanup());
      inputCleanups.forEach((cleanup) => cleanup());
      imageCleanups.forEach((cleanup) => cleanup());
    };
  }, [isRTL, enabled]);
};

