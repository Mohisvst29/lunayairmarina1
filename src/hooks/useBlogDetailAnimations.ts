import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let gsapRegistered = false;

const registerGsapPlugins = () => {
    if (gsapRegistered || typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
};

interface BlogDetailAnimationRefs {
    headerRef: RefObject<HTMLElement | null>;
    contentRef: RefObject<HTMLElement | null>;
    relatedRef: RefObject<HTMLElement | null>;
    dir: 'ltr' | 'rtl';
}

export const useBlogDetailAnimations = ({
    headerRef,
    contentRef,
    relatedRef,
    dir,
}: BlogDetailAnimationRefs) => {
    useLayoutEffect(() => {
        registerGsapPlugins();

        const ctx = gsap.context(() => {
            // Header Section - Fade in + upward slide on load
            if (headerRef.current) {
                const headerTargets = headerRef.current.querySelectorAll("[data-animate='header']");
                const xOffset = dir === 'rtl' ? 40 : -40;
                
                gsap.from(headerTargets, {
                    opacity: 0,
                    y: 60,
                    x: xOffset,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.2,
                    stagger: 0.15,
                });

                // Parallax effect on featured image
                const imageParallax = headerRef.current.querySelector('[data-parallax="true"]');
                if (imageParallax) {
                    gsap.to(imageParallax, {
                        yPercent: 30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageParallax,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                }
            }

            // Content Section - Staggered animations for paragraphs and images
            if (contentRef.current) {
                const contentTargets = contentRef.current.querySelectorAll("[data-animate='content']");
                gsap.from(contentTargets, {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                    },
                });

                // Animate paragraphs and images within content
                const paragraphs = contentRef.current.querySelectorAll('.postContent p');
                const images = contentRef.current.querySelectorAll('.postContent img');
                const blockquotes = contentRef.current.querySelectorAll('.postContent blockquote');

                [...paragraphs, ...images, ...blockquotes].forEach((element, index) => {
                    gsap.from(element, {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 90%",
                        },
                        delay: index * 0.05,
                    });
                });
            }

            // Related Posts Section - Stagger animation with hover micro-interactions
            if (relatedRef.current) {
                const relatedTargets = relatedRef.current.querySelectorAll("[data-animate='related']");
                gsap.from(relatedTargets, {
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: relatedRef.current,
                        start: "top 80%",
                    },
                });

                // Add hover micro-interactions
                relatedTargets.forEach((card) => {
                    const cardElement = card as HTMLElement;
                    cardElement.addEventListener('mouseenter', () => {
                        gsap.to(cardElement, {
                            scale: 1.02,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    });
                    cardElement.addEventListener('mouseleave', () => {
                        gsap.to(cardElement, {
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    });
                });
            }
        });

        return () => ctx.revert();
    }, [headerRef, contentRef, relatedRef, dir]);
};

