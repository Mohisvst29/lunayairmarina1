"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import styles from "./ContactSection.module.css";
import { useLanguage } from "@/context/LanguageContext";
import {
  getMailHref,
  getPhoneHref,
  handlePhoneIntent,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
} from "@/lib/contactInfo";

import { normalizeImageUrl } from "@/utils/imageUrl";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactSectionProps {
  titleOverride?: string;
  descriptionOverride?: string;
  imageIdOverride?: string | null;
}

export default function ContactSection({
  titleOverride,
  descriptionOverride,
  imageIdOverride,
}: ContactSectionProps) {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const phoneHref = getPhoneHref();
  const mailHref = getMailHref();
  const address = language === "ar"
    ? "برج المرجان، طريق الأمير سلطان، حي الروضة، جدة"
    : "Al Murjan Tower, Prince Sultan Road, Al Rawdah District, Jeddah, Saudi Arabia";

  return (
    <section id="contact-form" className={styles.contactSection}>
      <div className={styles.contactInner}>
        <div className={styles.contactHeader}>

          <h2>{titleOverride || t('contact.title')}</h2>
          <div 
            className={styles.contactSubtitle} 
            dangerouslySetInnerHTML={{ __html: descriptionOverride || t('contact.subtitle') }} 
          />
        </div>

        <div className={styles.contactContent}>
          {/* Visual + Contact Form */}
          <div className={styles.visualColumn}>
            <div className={styles.contactImage}>
              <Image
                src={normalizeImageUrl(imageIdOverride) || "/api/images/slug/contact-hero"}
                alt={language === "ar" ? "اليخت في البحر مع طاقم الضيافة" : "Luxury yacht concierge preparing for guests"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 540px"
                className={styles.contactImageMedia}
              />
            </div>

            <div className={styles.formWrapper}>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                  <div className={styles.field}>
                    <label htmlFor="name">
                      <span className={styles.fieldLabel}>
                        {t('contact.first_name')}
                      </span>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.placeholders.firstName')}
                        required
                        disabled={status === "submitting"}
                        aria-required="true"
                      />
                    </label>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email">
                      <span className={styles.fieldLabel}>
                        {t('contact.email')}
                      </span>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.placeholders.email')}
                        required
                        disabled={status === "submitting"}
                        aria-required="true"
                      />
                    </label>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">
                      <span className={styles.fieldLabel}>
                        {t('contact.interest')}
                      </span>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('contact.placeholders.interest')}
                        rows={6}
                        required
                        disabled={status === "submitting"}
                        aria-required="true"
                      />
                    </label>
                  </div>
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className={styles.statusMessage} role="alert" aria-live="polite">
                    <svg
                      className={styles.statusIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
                  <div
                    className={`${styles.statusMessage} ${styles.statusError}`}
                    role="alert"
                    aria-live="assertive"
                  >
                    <svg
                      className={styles.statusIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
                  className={styles.contactSubmit}
                  disabled={status === "submitting" || status === "success"}
                  aria-busy={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      <span>
                        {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.send')}</span>
                      <span className={styles.submitArrow} aria-hidden="true">
                        ➝
                      </span>
                    </>
                  )}
                </button>

                <p className={styles.contactNote}>
                  <span className={styles.noteIcon} aria-hidden="true">
                    ⏱
                  </span>
                  {t('contact.note')}
                </p>
              </form>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardContent}>
              <h3 className={styles.infoCardTitle}>
                {language === "ar" ? "معلومات التواصل" : "Get in Touch"}
              </h3>
              <p className={styles.infoCardDescription}>
                {language === "ar"
                  ? "نحن هنا لمساعدتك. تواصل معنا عبر أي من القنوات التالية."
                  : "We're here to help. Reach out through any of the channels below."}
              </p>

              <div className={styles.infoItems}>
                <a
                  href={phoneHref}
                  onClick={(e) => handlePhoneIntent(e)}
                  className={styles.infoItem}
                  aria-label={`${language === "ar" ? "اتصل بنا" : "Call us"}: ${CONTACT_PHONE_DISPLAY}`}
                >
                  <div className={styles.infoIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>
                      {language === "ar" ? "الهاتف" : "Phone"}
                    </span>
                    <span className={styles.infoValue}>{CONTACT_PHONE_DISPLAY}</span>
                  </div>
                </a>

                <a
                  href={mailHref}
                  className={styles.infoItem}
                  aria-label={`${language === "ar" ? "أرسل بريد إلكتروني" : "Send email"}: ${CONTACT_EMAIL}`}
                >
                  <div className={styles.infoIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </span>
                    <span className={styles.infoValue}>{CONTACT_EMAIL}</span>
                  </div>
                </a>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>
                      {language === "ar" ? "العنوان" : "Address"}
                    </span>
                    <span className={styles.infoValue}>{address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
