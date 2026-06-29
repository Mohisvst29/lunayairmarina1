"use client";

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Locale, useLanguage } from '@/context/LanguageContext';
import styles from '@/app/admin/AdminLayout.module.css';
import { usePathname } from 'next/navigation';

type CopyShape = {
    brandEyebrow: string;
    brandTitle: string;
    pageEyebrow: string;
    pageTitle: string;
    logout: string;
    menuLabel: string;
    closeMenuLabel: string;
    languageLabels: Record<Locale, string>;
    userEmail: string;
    userRole: string;
    nav: Array<{ label: string; href: string; external?: boolean }>;
};

const LANGUAGE_SEQUENCE: Locale[] = ['en', 'ar'];

const COPY: Record<Locale, CopyShape> = {
    en: {
        brandEyebrow: 'Control center',
        brandTitle: 'Admin Panel',
        pageEyebrow: 'Welcome back',
        pageTitle: 'Dashboard Overview',
        logout: 'Logout',
        menuLabel: 'Toggle navigation',
        closeMenuLabel: 'Close sidebar',
        languageLabels: {
            en: 'English',
            ar: 'العربية',
        },
        userEmail: 'admin@example.com',
        userRole: 'Administrator',
        nav: [
            { label: 'Dashboard', href: '/admin' },
            { label: 'View Site', href: '/' },
        ],
    },
    ar: {
        brandEyebrow: 'لوحة التحكم',
        brandTitle: 'لوحة الإدارة',
        pageEyebrow: 'مرحباً بعودتك',
        pageTitle: 'نظرة عامة',
        logout: 'تسجيل الخروج',
        menuLabel: 'فتح/إغلاق القائمة',
        closeMenuLabel: 'إغلاق الشريط الجانبي',
        languageLabels: {
            en: 'English',
            ar: 'العربية',
        },
        userEmail: 'admin@example.com',
        userRole: 'مسؤول النظام',
        nav: [
            { label: 'لوحة التحكم', href: '/admin' },
            { label: 'عرض الموقع', href: '/' },
        ],
    },
};

export default function AdminShell({ children }: { children: ReactNode }) {
    const { language, setLanguage, dir } = useLanguage();
    const pathname = usePathname();
    const copy = COPY[language];

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const applyMatch = (matches: boolean) => {
            setIsDesktop(matches);
            setSidebarOpen(matches);
        };
        applyMatch(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => applyMatch(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (!isDesktop) {
            setSidebarOpen(false); // eslint-disable-line react-hooks/exhaustive-deps
        }
    }, [pathname, isDesktop]);

    const toggleSidebar = () => {
        if (isDesktop) return;
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        if (!isDesktop) {
            setSidebarOpen(false);
        }
    };

    const handleLanguageChange = (next: Locale) => {
        if (next !== language) {
            setLanguage(next);
        }
    };

    const renderLanguageSwitch = (extraClass?: string) => (
        <div
            className={`${styles.languageSwitch} ${extraClass ?? ''}`}
            role="group"
            aria-label="Language switcher"
        >
            {LANGUAGE_SEQUENCE.map((locale) => (
                <button
                    key={locale}
                    type="button"
                    className={`${styles.languageOption} ${language === locale ? styles.languageOptionActive : ''
                        }`}
                    aria-pressed={language === locale}
                    onClick={() => handleLanguageChange(locale)}
                >
                    {copy.languageLabels[locale]}
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.shell} data-dir={dir}>
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div>
                        <p className={styles.sidebarEyebrow}>{copy.brandEyebrow}</p>
                        <h1 className={styles.sidebarTitle}>{copy.brandTitle}</h1>
                    </div>
                    {!isDesktop && (
                        <button
                            type="button"
                            className={styles.sidebarClose}
                            onClick={closeSidebar}
                            aria-label={copy.closeMenuLabel}
                        >
                            ×
                        </button>
                    )}
                </div>

                <nav className={styles.nav}>
                    {copy.nav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={closeSidebar}
                                prefetch={false}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarSection}>{renderLanguageSwitch()}</div>

                <div className={styles.sidebarFooter}>
                    <button type="button" className={styles.logout}>
                        {copy.logout}
                    </button>
                </div>
            </aside>

            {!isDesktop && sidebarOpen && (
                <button
                    type="button"
                    className={styles.sidebarBackdrop}
                    aria-label={copy.closeMenuLabel}
                    onClick={closeSidebar}
                />
            )}

            <div className={styles.main}>
                <header className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        {!isDesktop && (
                            <button
                                type="button"
                                className={styles.menuButton}
                                aria-label={copy.menuLabel}
                                aria-pressed={sidebarOpen}
                                onClick={toggleSidebar}
                            >
                                <span className={styles.menuIcon} />
                            </button>
                        )}
                        <div>
                            <p className={styles.topBarEyebrow}>{copy.pageEyebrow}</p>
                            <h2 className={styles.topBarTitle}>{copy.pageTitle}</h2>
                        </div>
                    </div>

                    <div className={styles.topBarRight}>
                        <div className={styles.topBarLanguage}>
                            {renderLanguageSwitch(styles.languageSwitchInline)}
                        </div>
                        <div className={styles.userMeta}>
                            <div className={styles.userText}>
                                <span className={styles.userEmail}>{copy.userEmail}</span>
                                <span className={styles.userRole}>{copy.userRole}</span>
                            </div>
                            <div className={styles.userBadge}>{copy.userEmail.charAt(0).toUpperCase()}</div>
                        </div>
                    </div>
                </header>

                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}

