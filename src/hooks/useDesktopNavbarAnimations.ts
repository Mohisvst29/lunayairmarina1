"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseDesktopNavbarAnimationsProps {
  scrolled: boolean;
  isRTL: boolean;
  isBlogPage: boolean;
}

export const useDesktopNavbarAnimations = ({
  scrolled,
  isRTL,
  isBlogPage,
}: UseDesktopNavbarAnimationsProps) => {
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const menuContainerRef = useRef<HTMLElement>(null);

  // Initial load animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 1100) return;

    const navbar = navbarRef.current;
    const logo = logoRef.current;
    const navLinks = navLinksRef.current.filter(Boolean);
    const languageButton = languageButtonRef.current;
    const ctaButton = ctaButtonRef.current;
    const menuContainer = menuContainerRef.current;

    if (!navbar) return;

    const ctx = gsap.context(() => {
      // Navbar fade in from top
      gsap.fromTo(
        navbar,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Logo animation removed - no animations for logo

      // Menu container animation
      if (menuContainer) {
        gsap.fromTo(
          menuContainer,
          {
            scale: 0.95,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
          }
        );
      }

      // Staggered nav links reveal
      if (navLinks.length > 0) {
        gsap.fromTo(
          navLinks,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }

      // Language button animation
      if (languageButton) {
        gsap.fromTo(
          languageButton,
          {
            x: isRTL ? 20 : -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.6,
            ease: "power2.out",
          }
        );
      }

      // CTA button animation
      if (ctaButton) {
        gsap.fromTo(
          ctaButton,
          {
            scale: 0.9,
            opacity: 0,
            y: 10,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.7,
            ease: "back.out(1.2)",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isRTL]);

  // Sticky navbar transition animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 1100) return;

    const navbar = navbarRef.current;
    if (!navbar) return;

    const ctx = gsap.context(() => {
      if (scrolled || isBlogPage) {
        gsap.to(navbar, {
          backgroundColor: isBlogPage
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(1, 6, 18, 0.92)",
          backdropFilter: "blur(20px)",
          boxShadow: isBlogPage
            ? "0 4px 24px rgba(0, 0, 0, 0.08)"
            : "0 8px 32px rgba(0, 0, 0, 0.3)",
          paddingTop: "16px",
          paddingBottom: "16px",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(navbar, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          paddingTop: "28px",
          paddingBottom: "28px",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [scrolled, isBlogPage]);

  // Nav link hover micro-interactions
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 1100) return;

    const navLinks = navLinksRef.current.filter(Boolean);

    const handleMouseEnter = (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    navLinks.forEach((link) => {
      if (!link) return;
      link.addEventListener("mouseenter", () => handleMouseEnter(link));
      link.addEventListener("mouseleave", () => handleMouseLeave(link));
    });

    return () => {
      navLinks.forEach((link) => {
        if (!link) return;
        const mouseEnterHandler = () => handleMouseEnter(link);
        const mouseLeaveHandler = () => handleMouseLeave(link);
        link.removeEventListener("mouseenter", mouseEnterHandler);
        link.removeEventListener("mouseleave", mouseLeaveHandler);
      });
    };
  }, []);

  // Logo hover micro-interaction - disabled to prevent size changes
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   if (window.innerWidth <= 1100) return;

  //   const logo = logoRef.current;
  //   if (!logo) return;

  //   const handleMouseEnter = () => {
  //     gsap.to(logo, {
  //       y: -3,
  //       scale: 1.05,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   };

  //   const handleMouseLeave = () => {
  //     gsap.to(logo, {
  //       y: 0,
  //       scale: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   };

  //   logo.addEventListener("mouseenter", handleMouseEnter);
  //   logo.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     logo.removeEventListener("mouseenter", handleMouseEnter);
  //     logo.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  // Language button hover micro-interaction
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 1100) return;

    const languageButton = languageButtonRef.current;
    if (!languageButton) return;

    const handleMouseEnter = () => {
      gsap.to(languageButton, {
        scale: 1.08,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(languageButton, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    languageButton.addEventListener("mouseenter", handleMouseEnter);
    languageButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      languageButton.removeEventListener("mouseenter", handleMouseEnter);
      languageButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // CTA button hover micro-interaction
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 1100) return;

    const ctaButton = ctaButtonRef.current;
    if (!ctaButton) return;

    const handleMouseEnter = () => {
      gsap.to(ctaButton, {
        y: -3,
        scale: 1.05,
        boxShadow: "0 16px 40px rgba(122, 61, 245, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ctaButton, {
        y: 0,
        scale: 1,
        boxShadow: "0 10px 25px rgba(82, 50, 157, 0.35)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    ctaButton.addEventListener("mouseenter", handleMouseEnter);
    ctaButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ctaButton.removeEventListener("mouseenter", handleMouseEnter);
      ctaButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return {
    navbarRef,
    logoRef,
    navLinksRef,
    languageButtonRef,
    ctaButtonRef,
    menuContainerRef,
  };
};





















