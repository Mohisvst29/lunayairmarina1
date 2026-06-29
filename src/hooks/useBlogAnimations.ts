import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let gsapRegistered = false;

const registerGsapPlugins = () => {
    if (gsapRegistered || typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
};

interface BlogAnimationRefs {
    heroRef: RefObject<HTMLElement | null>;
    postsRef: RefObject<HTMLElement | null>;
    searchRef: RefObject<HTMLElement | null>;
}

export const useBlogAnimations = ({
    heroRef,
    postsRef,
    searchRef,
}: BlogAnimationRefs) => {
    useLayoutEffect(() => {
        registerGsapPlugins();

        const ctx = gsap.context(() => {
            // Hero Section - Fade in + upward slide on load
            if (heroRef.current) {
                const heroTargets = heroRef.current.querySelectorAll("[data-animate='hero']");
                if (heroTargets.length > 0) {
                    gsap.from(heroTargets, {
                        opacity: 0,
                        y: 60,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: 0.2,
                        stagger: 0.15,
                    });
                }
            }

            // Search and Filter Section - Fade in on scroll
            if (searchRef.current) {
                const searchTargets = searchRef.current.querySelectorAll("[data-animate='search'], [data-animate='categories']");
                if (searchTargets.length > 0) {
                    gsap.from(searchTargets, {
                        opacity: 0,
                        y: 40,
                        duration: 0.9,
                        ease: "power2.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: searchRef.current,
                            start: "top 85%",
                        },
                    });
                }
            }

            // Blog Posts Grid - Stagger animation
            if (postsRef.current) {
                const postCards = postsRef.current.querySelectorAll("[data-animate='post-card']");
                if (postCards.length > 0) {
                    gsap.from(postCards, {
                        opacity: 0,
                        y: 60,
                        scale: 0.95,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: postsRef.current,
                            start: "top 80%",
                        },
                    });
                }
            }
        });

        return () => ctx.revert();
    }, [heroRef, postsRef, searchRef]);
};

