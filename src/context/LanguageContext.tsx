"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export type Locale = 'en' | 'ar';

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type TranslationValue = string | number | boolean | null | TranslationDictionary | TranslationValue[];
type TranslationDictionary = {
    [key: string]: TranslationValue;
};

const LANGUAGE_STORAGE_KEY = 'lm_language';

const getStoredLanguage = (): Locale => {
    if (typeof window === 'undefined') {
        return 'ar';
    }
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'ar' || saved === 'en' ? saved : 'ar';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [languageState, setLanguageState] = useState<Locale>(() => getStoredLanguage());

    const persistLanguage = (lang: Locale) => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
            }
        } catch {
            // ignore storage errors (private mode, etc.)
        }
    };

    const setLanguage = (lang: Locale) => {
        setLanguageState(lang);
        persistLanguage(lang);
    };

    const translations: Record<Locale, TranslationDictionary> = {
        en: en as TranslationDictionary,
        ar: ar as TranslationDictionary,
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: TranslationValue = translations[languageState];
        for (const k of keys) {
            if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
                value = (value as TranslationDictionary)[k];
            } else {
                return key;
            }
        }
        return typeof value === 'string' ? value : key;
    };

    const dir = languageState === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.lang = languageState;
        document.documentElement.dir = dir;
    }, [languageState, dir]);

    return (
        <LanguageContext.Provider value={{ language: languageState, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
