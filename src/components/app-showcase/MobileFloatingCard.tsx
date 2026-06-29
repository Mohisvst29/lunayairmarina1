'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ClipboardCheck, Check } from 'lucide-react';
import styles from './MobileFloatingCard.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface MobileFloatingCardProps {
    section: 'hero' | 'tankLevels' | 'checklist' | 'services' | 'faq' | 'contact';
    position: 'left' | 'right';
}

const sectionContent = {
    hero: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                    ]
                },
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                        'appPage.mockup.checklist.decks',
                        'appPage.mockup.checklist.cupholders',
                    ]
                },
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                        'appPage.mockup.checklist.fingerprints',
                    ]
                }
            ]
        }
    },
    tankLevels: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                    ]
                }
            ]
        }
    },
    checklist: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                        'appPage.mockup.checklist.decks',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                        'appPage.mockup.checklist.fingerprints',
                    ]
                }
            ]
        }
    },
    services: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                    ]
                }
            ]
        }
    },
    faq: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                    ]
                }
            ]
        }
    },
    contact: {
        left: {
            title: 'appPage.mockup.checklist.title',
            sections: [
                {
                    title: 'appPage.mockup.checklist.exterior',
                    items: [
                        'appPage.mockup.checklist.washdown',
                        'appPage.mockup.checklist.windshield',
                    ]
                }
            ]
        },
        right: {
            title: null,
            sections: [
                {
                    title: 'appPage.mockup.checklist.interior',
                    items: [
                        'appPage.mockup.checklist.sinks',
                        'appPage.mockup.checklist.floors',
                    ]
                }
            ]
        }
    }
};

export default function MobileFloatingCard({ section, position }: MobileFloatingCardProps) {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Find the parent section element by ID
        const findSection = () => {
            const sectionIds: Record<string, string> = {
                hero: 'hero-section',
                tankLevels: 'tankLevels-section',
                checklist: 'checklist-section',
                services: 'services-section',
                faq: 'faq-section',
                contact: 'contact-section'
            };

            const sectionId = sectionIds[section];
            if (sectionId) {
                sectionRef.current = document.getElementById(sectionId);
            }
        };
        
        // Wait for DOM to be ready
        setTimeout(findSection, 100);

        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                setIsVisible(true);
                
                // Hide after 5 seconds
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);
            }
        };

        const handleTouch = () => {
            if (!hasInteracted && sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight * 1.2 && rect.bottom > -100;
                
                if (isInView) {
                    handleInteraction();
                }
            }
        };

        // Use IntersectionObserver for better performance
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasInteracted) {
                        // Delay show for better UX
                        setTimeout(() => {
                            handleInteraction();
                        }, 800);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -20% 0px'
            }
        );

        // Observe section when found
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Also listen for touch events
        window.addEventListener('touchstart', handleTouch, { passive: true });
        window.addEventListener('scroll', handleTouch, { passive: true });

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('scroll', handleTouch);
        };
    }, [hasInteracted, section]);

    const content = sectionContent[section]?.[position];
    if (!content) return null;

    return (
        <div
            ref={cardRef}
            className={`${styles.floatingCard} ${styles[`floatingCard${position.charAt(0).toUpperCase() + position.slice(1)}`]} ${isVisible ? styles.visible : ''}`}
        >
            <div className={styles.cardHeader}>
                <span className={styles.cardBoatName}>{t('appPage.mockup.common.boatName')}</span>
            </div>
            {content.title && (
                <div className={styles.checklistTitle}>
                    <ClipboardCheck size={16} className={styles.iconGreen} /> {t(content.title)}
                </div>
            )}
            {content.sections.map((section, idx) => (
                <div key={idx} className={styles.checklistSection}>
                    <div className={styles.checklistSectionTitle}>{t(section.title)}</div>
                    <div className={styles.checklistItems}>
                        {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className={styles.checklistItem}>
                                <Check size={14} className={styles.checkmark} /> {t(item)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

