"use client";

import { MutableRefObject, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AnimationRefs = {
    headerRef: MutableRefObject<HTMLElement | null>;
    imagesRef: MutableRefObject<HTMLElement | null>;
    descriptionRef: MutableRefObject<HTMLElement | null>;
    benefitsRef: MutableRefObject<HTMLElement | null>;
    relatedRef: MutableRefObject<HTMLElement | null>;
    dir: 'ltr' | 'rtl';
};

type SectionConfig = {
    ref: MutableRefObject<HTMLElement | null>;
    selector: string;
    from: gsap.TweenVars;
    to?: gsap.TweenVars;
};

export function useServiceDetailAnimations({
    headerRef,
    imagesRef,
    descriptionRef,
    benefitsRef,
    relatedRef,
    dir,
}: AnimationRefs) {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure we only run animations after component is mounted on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || !isMounted) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Wait for next frame to ensure DOM is fully rendered
        const frameId = requestAnimationFrame(() => {
            const ctx = gsap.context(() => {
                if (headerRef.current) {
                    const headerElements = Array.from(headerRef.current.querySelectorAll('[data-animate="heading"]'));
                    const heroMedia = headerRef.current.querySelector('[data-animate="hero-media"]');
                    const heroStats = Array.from(headerRef.current.querySelectorAll('[data-animate="hero-stat"]'));

                    // Collect all valid targets into a flat array
                    const allTargets: Element[] = [...headerElements];
                    if (heroMedia) allTargets.push(heroMedia);
                    allTargets.push(...heroStats);

                    // Only proceed if we have actual elements
                    if (allTargets.length > 0) {
                        gsap.set(allTargets, { opacity: 0, y: 50 });

                        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                        if (headerElements.length > 0) {
                            tl.to(headerElements, {
                                opacity: 1,
                                y: 0,
                                duration: 0.9,
                                stagger: 0.08,
                            });
                        }

                        if (heroMedia) {
                            tl.to(
                                heroMedia,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                },
                                headerElements.length > 0 ? '-=0.4' : 0
                            );
                        }

                        if (heroStats.length > 0) {
                            tl.to(
                                heroStats,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.7,
                                    stagger: 0.1,
                                },
                                '-=0.5'
                            );
                        }
                    }
                }

                const sections: SectionConfig[] = [
                    {
                        ref: imagesRef,
                        selector: '[data-animate="images"]',
                        from: { opacity: 0, y: 60 },
                    },
                    {
                        ref: descriptionRef,
                        selector: '[data-animate="description"]',
                        from: { opacity: 0, y: 60 },
                    },
                    {
                        ref: benefitsRef,
                        selector: '[data-animate="benefit-card"]',
                        from: { opacity: 0, y: 80, rotationX: 10 },
                    },
                    {
                        ref: relatedRef,
                        selector: '[data-animate="related-card"]',
                        from: { opacity: 0, x: dir === 'rtl' ? 80 : -80, scale: 0.95 },
                    },
                ];

                sections.forEach(({ ref, selector, from }) => {
                    if (!ref.current) {
                        return;
                    }

                    const targets = Array.from(ref.current.querySelectorAll(selector));
                    if (targets.length === 0) {
                        return;
                    }

                    gsap.set(targets, from);

                    ScrollTrigger.create({
                        trigger: ref.current,
                        start: 'top 85%',
                        once: true,
                        onEnter: () => {
                            gsap.to(targets, {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                scale: 1,
                                duration: 0.9,
                                stagger: 0.12,
                                ease: 'power3.out',
                            });
                        },
                    });
                });
            });

            return () => {
                ctx.revert();
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        });

        return () => {
            cancelAnimationFrame(frameId);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [headerRef, imagesRef, descriptionRef, benefitsRef, relatedRef, dir, isMounted]);
}
