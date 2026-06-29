"use client";

import { MutableRefObject, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SectionRef = MutableRefObject<HTMLElement | null>;

interface AboutAnimationRefs {
  rootRef: MutableRefObject<HTMLElement | null>;
  heroRef: SectionRef;
  storyRef: SectionRef;
  missionRef: SectionRef;
  valuesRef: SectionRef;
  timelineRef: SectionRef;
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

export const useAboutAnimations = ({
  rootRef,
  heroRef,
  storyRef,
  missionRef,
  valuesRef,
  timelineRef,
  ctaRef,
}: AboutAnimationRefs) => {
  useLayoutEffect(() => {
    registerGsapPlugins();

    if (!rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroTargets = heroRef.current.querySelectorAll(
          "[data-animate='hero']",
        );
        gsap.from(heroTargets, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
          stagger: 0.1,
        });
      }

      if (storyRef.current) {
        gsap.from(storyRef.current.querySelector("[data-animate='story-text']"), {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
          },
        });

        gsap.from(
          storyRef.current.querySelector("[data-animate='story-media']"),
          {
            opacity: 0,
            x: 60,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
            },
          },
        );
      }

      if (missionRef.current) {
        const missionTargets = missionRef.current.querySelectorAll(
          "[data-animate='mission-card']",
        );
        gsap.from(missionTargets, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
          },
        });
      }

      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll(
          "[data-animate='value-card']",
        );
        gsap.from(valueCards, {
          opacity: 0,
          y: 50,
          duration: 0.85,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          },
        });
      }

      if (timelineRef.current) {
        const milestones = timelineRef.current.querySelectorAll(
          "[data-animate='milestone']",
        );
        milestones.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: -40,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          });
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
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
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef, heroRef, storyRef, missionRef, valuesRef, timelineRef, ctaRef]);
};










