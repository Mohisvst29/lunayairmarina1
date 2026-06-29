"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseFooterAnimationsProps {
  isRTL: boolean;
}

let gsapRegistered = false;

const registerGsapPlugins = () => {
  if (typeof window === "undefined" || gsapRegistered) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
};

export const useFooterAnimations = ({ isRTL }: UseFooterAnimationsProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const contactActionsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const bottomLinksRef = useRef<(HTMLAnchorElement | HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    registerGsapPlugins();

    if (!footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Check if footer is already in viewport - if so, skip animation
      const footerRect = footerRef.current?.getBoundingClientRect();
      const isFooterVisible = footerRect && footerRect.top < window.innerHeight;

      if (!isFooterVisible) {
        // Only set opacity 0 if footer is not yet visible
        gsap.set(footerRef.current, { opacity: 0 });

        // Footer fade-in - only animate when scrolled into view
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(footerRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // Stars animation
      if (starsRef.current && !isFooterVisible) {
        const stars = starsRef.current.querySelectorAll("span");
        gsap.set(stars, { opacity: 0, scale: 0.5, rotation: -180 });
        ScrollTrigger.create({
          trigger: starsRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(stars, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.7)",
            });
          },
        });
      }

      // Title fade-up
      if (titleRef.current && !isFooterVisible) {
        gsap.set(titleRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              duration: 0.7,
              delay: 0.2,
              ease: "power2.out",
            });
          },
        });
      }

      // Logo animation removed - no animations for logo

      // Subtitle fade-up
      if (subtitleRef.current && !isFooterVisible) {
        gsap.set(subtitleRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: subtitleRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(subtitleRef.current, {
              opacity: 1,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
            });
          },
        });
      }

      // Address fade-up
      if (addressRef.current && !isFooterVisible) {
        gsap.set(addressRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: addressRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(addressRef.current, {
              opacity: 1,
              duration: 0.5,
              delay: 0.5,
              ease: "power2.out",
            });
          },
        });
      }

      // Contact actions staggered
      const contactActions = contactActionsRef.current.filter(Boolean);
      if (contactActions.length > 0 && !isFooterVisible) {
        gsap.set(contactActions, { opacity: 0 });
        ScrollTrigger.create({
          trigger: contactActions[0],
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(contactActions, {
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.6,
              ease: "power2.out",
            });
          },
        });
      }

      // Social cards staggered
      const socialCards = socialCardsRef.current.filter(Boolean);
      if (socialCards.length > 0 && socialCards[0]?.parentElement && !isFooterVisible) {
        gsap.set(socialCards, { opacity: 0 });
        ScrollTrigger.create({
          trigger: socialCards[0].parentElement,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(socialCards, {
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              delay: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // CTA button
      if (ctaBtnRef.current && !isFooterVisible) {
        gsap.set(ctaBtnRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: ctaBtnRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(ctaBtnRef.current, {
              opacity: 1,
              duration: 0.6,
              delay: 1,
              ease: "power2.out",
            });
          },
        });
      }

      // Bottom bar elements
      const bottomLinks = bottomLinksRef.current.filter(Boolean);
      if (bottomLinks.length > 0 && bottomBarRef.current && !isFooterVisible) {
        gsap.set(bottomLinks, { opacity: 0 });
        ScrollTrigger.create({
          trigger: bottomBarRef.current,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(bottomLinks, {
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              delay: 1.1,
              ease: "power2.out",
            });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isRTL]);

  // Add hover micro-interactions
  useEffect(() => {
    if (!footerRef.current) return;

    const socialCards = socialCardsRef.current.filter(Boolean);
    const contactActions = contactActionsRef.current.filter(Boolean);
    const ctaBtn = ctaBtnRef.current;


    const handleSocialHover = (element: HTMLElement, isEnter: boolean) => {
      const icon = element.querySelector('[class*="socialIcon"]') as HTMLElement;
      if (isEnter) {
        gsap.to(element, {
          scale: 1.1,
          rotation: gsap.utils.random(-5, 5),
          y: -8,
          duration: 0.3,
          ease: "power2.out",
        });
        if (icon) {
          gsap.to(icon, {
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else {
        gsap.to(element, {
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    const handleContactHover = (element: HTMLElement, isEnter: boolean) => {
      if (isEnter) {
        gsap.to(element, {
          y: -4,
          scale: 1.02,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handleCtaHover = (element: HTMLElement, isEnter: boolean) => {
      if (isEnter) {
        gsap.to(element, {
          scale: 1.05,
          y: -2,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handlers: Array<{
      element: HTMLElement;
      enter: () => void;
      leave: () => void;
    }> = [];

    socialCards.forEach((card) => {
      if (!card) return;
      const enterHandler = () => handleSocialHover(card, true);
      const leaveHandler = () => handleSocialHover(card, false);
      card.addEventListener("mouseenter", enterHandler);
      card.addEventListener("mouseleave", leaveHandler);
      handlers.push({ element: card, enter: enterHandler, leave: leaveHandler });
    });

    contactActions.forEach((action) => {
      if (!action) return;
      const enterHandler = () => handleContactHover(action, true);
      const leaveHandler = () => handleContactHover(action, false);
      action.addEventListener("mouseenter", enterHandler);
      action.addEventListener("mouseleave", leaveHandler);
      handlers.push({ element: action, enter: enterHandler, leave: leaveHandler });
    });

    if (ctaBtn) {
      const enterHandler = () => handleCtaHover(ctaBtn, true);
      const leaveHandler = () => handleCtaHover(ctaBtn, false);
      ctaBtn.addEventListener("mouseenter", enterHandler);
      ctaBtn.addEventListener("mouseleave", leaveHandler);
      handlers.push({ element: ctaBtn, enter: enterHandler, leave: leaveHandler });
    }

    return () => {
      handlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return {
    footerRef,
    starsRef,
    titleRef,
    logoRef,
    subtitleRef,
    addressRef,
    contactActionsRef,
    socialCardsRef,
    ctaBtnRef,
    bottomBarRef,
    bottomLinksRef,
  };
};

