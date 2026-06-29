'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import MobileFloatingCard from './MobileFloatingCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        howDidYouHear: '',
        message: '',
        privacy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                howDidYouHear: '',
                message: '',
                privacy: false,
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact-section" className={styles.section}>
            {/* Mobile Floating Cards */}
            <MobileFloatingCard section="contact" position="left" />
            <MobileFloatingCard section="contact" position="right" />

            <div className={styles.container}>
                <h2 className={styles.title}>{t('appPage.contact.heading')}</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('appPage.contact.labels.fullName')}</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input} 
                            placeholder={t('appPage.contact.placeholders.name')} 
                            required
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('appPage.contact.labels.email')}</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input} 
                            placeholder={t('appPage.contact.placeholders.email')} 
                            required
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('appPage.contact.labels.phone')}</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.input} 
                            placeholder={t('appPage.contact.placeholders.phone')} 
                            required
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('appPage.contact.labels.howDidYouHear')}</label>
                        <select 
                            name="howDidYouHear"
                            value={formData.howDidYouHear}
                            onChange={handleChange}
                            className={styles.select}
                            disabled={status === 'submitting'}
                        >
                            <option value="">{language === 'ar' ? 'اختر خياراً...' : 'Select an option...'}</option>
                            <option>{t('appPage.contact.options.socialMedia')}</option>
                            <option>{t('appPage.contact.options.searchEngine')}</option>
                            <option>{t('appPage.contact.options.referral')}</option>
                            <option>{t('appPage.contact.options.other')}</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('appPage.contact.labels.message')}</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={styles.textarea} 
                            placeholder={t('appPage.contact.placeholders.message')}
                            required
                            disabled={status === 'submitting'}
                        ></textarea>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <input 
                            type="checkbox" 
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            className={styles.checkbox} 
                            id="privacy" 
                            required
                            disabled={status === 'submitting'}
                        />
                        <label htmlFor="privacy" className={styles.checkboxLabel}>
                            {t('appPage.contact.privacyPolicy')}
                        </label>
                    </div>

                    {status === "success" && (
                        <div className={styles.statusMessage} role="alert" aria-live="polite">
                            <svg className={styles.statusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <span>
                                {language === "ar"
                                    ? "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
                                    : "Message sent successfully! We'll get back to you soon."}
                            </span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className={`${styles.statusMessage} ${styles.statusError}`} role="alert" aria-live="assertive">
                            <svg className={styles.statusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v4M12 16h.01" />
                            </svg>
                            <span>
                                {language === "ar"
                                    ? "حدث خطأ. يرجى المحاولة مرة أخرى."
                                    : "Something went wrong. Please try again."}
                            </span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={status === 'submitting' || status === 'success'}
                    >
                        {status === 'submitting' 
                            ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                            : t('appPage.contact.button.send')}
                    </button>
                </form>
            </div>
        </section>
    );
}
