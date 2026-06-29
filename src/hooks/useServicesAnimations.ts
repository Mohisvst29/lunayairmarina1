"use client";

import { MutableRefObject, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SectionRef = MutableRefObject<HTMLElement | null>;

interface ServicesAnimationRefs {
  rootRef: MutableRefObject<HTMLElement | null>;
  heroRef: SectionRef;
  servicesRef: SectionRef;
  featuredRef: SectionRef;

  ctaRef: SectionRef;
}

let gsapRegistered = false;

const registerGsapPlugins = () => {
  if (typeof window === "undefined" || gsapRegistered) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
};

export const useServicesAnimations = ({
  rootRef,
  heroRef,
  servicesRef,
  featuredRef,

  ctaRef,
}: ServicesAnimationRefs) => {
  useLayoutEffect(() => {
    registerGsapPlugins();

    if (!rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero Section - Fade in + upward slide on load
      if (heroRef.current) {
        const heroTargets = heroRef.current.querySelectorAll("[data-animate='hero']");
        if (heroTargets.length > 0) {
          gsap.from(heroTargets, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.2,
          });
        }
      }

      // Services Overview Cards - Stagger animation
      if (servicesRef.current) {
        const sectionHeader = servicesRef.current.querySelectorAll("[data-animate='services']");
        if (sectionHeader.length > 0) {
          gsap.from(sectionHeader, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 85%",
            },
          });
        }

        const serviceCards = servicesRef.current.querySelectorAll("[data-animate='service-card']");
        if (serviceCards.length > 0) {
          gsap.from(serviceCards, {
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
            },
          });
        }
      }

      // Featured Service - Zoom-in or fade-slide
      if (featuredRef.current) {
        const featuredTargets = featuredRef.current.querySelectorAll("[data-animate='featured']");
        if (featuredTargets.length > 0) {
          gsap.from(featuredTargets, {
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 80%",
            },
          });
        }
      }

      // Final CTA - Fade/slide animation
      if (ctaRef.current) {
        const ctaTargets = ctaRef.current.querySelectorAll("[data-animate='cta']");
        if (ctaTargets.length > 0) {
          gsap.from(ctaTargets, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef, heroRef, servicesRef, featuredRef, ctaRef]);
};










