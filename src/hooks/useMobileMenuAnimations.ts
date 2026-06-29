"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface UseMobileMenuAnimationsProps {
  menuOpen: boolean;
  isRTL: boolean;
}

export const useMobileMenuAnimations = ({
  menuOpen,
  isRTL,
}: UseMobileMenuAnimationsProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only run animations after component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    const closeButton = closeButtonRef.current;
    const menuItems = menuItemsRef.current.filter(Boolean);
    const languageButton = languageButtonRef.current;
    const ctaButton = ctaButtonRef.current;

    if (!overlay || !drawer) return;

    const slideDirection = isRTL ? -100 : 100;
    const ctx = gsap.context(() => {
      if (menuOpen) {
        // Overlay fade in
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }
        );

        // Drawer slide in with spring
        gsap.fromTo(
          drawer,
          {
            x: slideDirection,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          }
        );

        // Close button animation
        if (closeButton) {
          gsap.fromTo(
            closeButton,
            { scale: 0, rotation: -180, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.4,
              delay: 0.2,
              ease: "back.out(1.7)",
            }
          );
        }

        // Menu items staggered animation
        if (menuItems.length > 0) {
          gsap.fromTo(
            menuItems,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              delay: 0.15,
              ease: "power2.out",
            }
          );
        }

        // Language button animation
        if (languageButton) {
          gsap.fromTo(
            languageButton,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              delay: 0.4,
              ease: "power2.out",
            }
          );
        }

        // CTA button animation
        if (ctaButton) {
          gsap.fromTo(
            ctaButton,
            { y: 15, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4,
              delay: 0.45,
              ease: "back.out(1.2)",
            }
          );
        }
      } else {
        // Close animations
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });

        gsap.to(drawer, {
          x: slideDirection,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });

        if (closeButton) {
          gsap.to(closeButton, {
            scale: 0,
            rotation: isRTL ? 180 : -180,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        gsap.to([...menuItems, languageButton, ctaButton].filter(Boolean), {
          y: 10,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [menuOpen, isRTL, isMounted]);

  // Add hover/tap micro-interactions
  useEffect(() => {
    if (!menuOpen || !isMounted) return;

    const menuItems = menuItemsRef.current.filter(Boolean);
    const languageButton = languageButtonRef.current;
    const ctaButton = ctaButtonRef.current;

    const handleMouseEnter = (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleTap = (element: HTMLElement) => {
      gsap.to(element, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    };

    const handlers: Array<{
      element: HTMLElement;
      mouseEnter: () => void;
      mouseLeave: () => void;
      tap: () => void;
    }> = [];

    menuItems.forEach((item) => {
      if (!item) return;
      const mouseEnterHandler = () => handleMouseEnter(item);
      const mouseLeaveHandler = () => handleMouseLeave(item);
      const tapHandler = () => handleTap(item);
      item.addEventListener("mouseenter", mouseEnterHandler);
      item.addEventListener("mouseleave", mouseLeaveHandler);
      item.addEventListener("touchstart", tapHandler);
      handlers.push({
        element: item,
        mouseEnter: mouseEnterHandler,
        mouseLeave: mouseLeaveHandler,
        tap: tapHandler,
      });
    });

    if (languageButton) {
      const mouseEnterHandler = () => handleMouseEnter(languageButton);
      const mouseLeaveHandler = () => handleMouseLeave(languageButton);
      const tapHandler = () => handleTap(languageButton);
      languageButton.addEventListener("mouseenter", mouseEnterHandler);
      languageButton.addEventListener("mouseleave", mouseLeaveHandler);
      languageButton.addEventListener("touchstart", tapHandler);
      handlers.push({
        element: languageButton,
        mouseEnter: mouseEnterHandler,
        mouseLeave: mouseLeaveHandler,
        tap: tapHandler,
      });
    }

    if (ctaButton) {
      const mouseEnterHandler = () => handleMouseEnter(ctaButton);
      const mouseLeaveHandler = () => handleMouseLeave(ctaButton);
      const tapHandler = () => handleTap(ctaButton);
      ctaButton.addEventListener("mouseenter", mouseEnterHandler);
      ctaButton.addEventListener("mouseleave", mouseLeaveHandler);
      ctaButton.addEventListener("touchstart", tapHandler);
      handlers.push({
        element: ctaButton,
        mouseEnter: mouseEnterHandler,
        mouseLeave: mouseLeaveHandler,
        tap: tapHandler,
      });
    }

    const cleanup = () => {
      handlers.forEach(({ element, mouseEnter, mouseLeave, tap }) => {
        element.removeEventListener("mouseenter", mouseEnter);
        element.removeEventListener("mouseleave", mouseLeave);
        element.removeEventListener("touchstart", tap);
      });
    };

    return cleanup;
  }, [menuOpen, isMounted]);

  return {
    overlayRef,
    drawerRef,
    closeButtonRef,
    menuItemsRef,
    languageButtonRef,
    ctaButtonRef,
  };
};
