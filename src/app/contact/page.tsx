"use client";

import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import { useLanguage, Locale } from "@/context/LanguageContext";
import {
  getMailHref,
  getPhoneHref,
  handlePhoneIntent,
} from "@/lib/contactInfo";
import styles from "./page.module.css";

type HighlightItem = {
  label: string;
  value: string;
  helper: string;
  type?: "phone" | "email";
};

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const CONTACT_CONTENT: Record<
  Locale,
  {
    hero: {
      badge: string;
      title: string;
      lead: string;
    };
    highlights: HighlightItem[];
    access: Array<{ title: string; body: string; action: string }>;
    map: {
      badge: string;
      title: string;
      description: string;
      tag: string;
      hours: Array<{ day: string; time: string }>;
    };
  }
> = {
  en: {
    hero: {
      badge: "contact lunier marina",
      title: "Let's plot your next voyage together",
      lead:
        "Our concierge team blends meticulous yacht management with the warmth of a private club. Reach out for bespoke maintenance plans, rapid turnarounds, or a discreet guest experience anywhere on the globe.",
    },
    highlights: [
      {
        label: "Concierge line",
        value: "531561212",
        helper: "Daily • 7am – 11pm AST",
        type: "phone",
      },
      {
        label: "Email",
        value: "Info@lunayairmarina.com",
        helper: "Responses within 24h",
        type: "email",
      },
      {
        label: "Head office",
        value: "Al Murjan Tower, Prince Sultan Road, Al Rawdah, Jeddah",
        helper: "Private appointments only",
      },
    ],
    access: [
      {
        title: "Plan a visit",
        body: "Schedule a walkthrough of your vessel or meet our engineering partners in person.",
        action: "Book a lounge pass",
      },
      {
        title: "Emergency desk",
        body: "24/7 monitoring for mechanical alerts, weather routing, and on-call crew swaps.",
        action: "Ping duty officer",
      },
      {
        title: "Charter concierge",
        body: "We coordinate provisioning, customs clearance and guest experiences worldwide.",
        action: "Design an itinerary",
      },
    ],
    map: {
      badge: "visit the lounge",
      title: "Executive lounge at Al Murjan Tower",
      description:
        "Inside Al Murjan Tower on Prince Sultan Road, our private lounge offers chart tables, engineering showcases, and a tasting bar curated for owners. Book ahead so our concierge can prepare your preferred refreshments.",
      tag: "Jeddah • Al Murjan Tower",
      hours: [
        { day: "Monday – Thursday", time: "08:00 – 20:00 AST" },
        { day: "Friday", time: "09:00 – 18:00 AST" },
        { day: "Saturday", time: "10:00 – 16:00 AST" },
        { day: "Sunday", time: "By appointment only" },
      ],
    },
  },
  ar: {
    hero: {
      badge: "تواصل مع لونير مارينا",
      title: "دعنا نخطط رحلتك البحرية القادمة معًا",
      lead:
        "يجمع فريق الكونسييرج بين إدارة اليخوت الدقيقة ودفء الأندية الخاصة. تواصل معنا لخطط صيانة مخصصة أو استجابات عاجلة أو تجربة ضيوف خاصة في أي وجهة حول العالم.",
    },
    highlights: [
      {
        label: "خط الكونسييرج",
        value: "531561212",
        helper: "يومياً • 7 صباحاً – 11 مساءً بتوقيت السعودية",
        type: "phone",
      },
      {
        label: "البريد الإلكتروني",
        value: "Info@lunayairmarina.com",
        helper: "نرد خلال 24 ساعة",
        type: "email",
      },
      {
        label: "المكتب الرئيسي",
        value: "برج المرجان، طريق الأمير سلطان، حي الروضة، جدة",
        helper: "حسب المواعيد المسبقة فقط",
      },
    ],
    access: [
      {
        title: "خطط للزيارة",
        body: "احجز جولة على متن يختك أو لقاءً مع شركائنا الهندسيين حضورياً.",
        action: "احجز تصريح الدخول",
      },
      {
        title: "مكتب الطوارئ",
        body: "مراقبة على مدار الساعة للتنبيهات الميكانيكية ومسارات الطقس وتبديل الطاقم.",
        action: "تواصل مع الضابط المناوب",
      },
      {
        title: "كونسييرج التأجير",
        body: "ننسق التموين والتخليص الجمركي وتجارب الضيوف حول العالم.",
        action: "صمّم خط سير",
      },
    ],
    map: {
      badge: "زر الصالة",
      title: "الصالة التنفيذية في برج المرجان",
      description:
        "داخل برج المرجان على طريق الأمير سلطان، تمنحك صالتنا الخاصة طاولات ملاحة ومعارض هندسية وركن تذوق معداً للمالكين. احجز مسبقاً ليجهز الكونسييرج ضيافتك المفضلة.",
      tag: "جدة • برج المرجان",
      hours: [
        { day: "الإثنين – الخميس", time: "08:00 – 20:00" },
        { day: "الجمعة", time: "09:00 – 18:00" },
        { day: "السبت", time: "10:00 – 16:00" },
        { day: "الأحد", time: "حسب الموعد" },
      ],
    },
  },
};

export default function ContactPage() {
  const { language, dir } = useLanguage();
  const content = CONTACT_CONTENT[language];
  const phoneHref = getPhoneHref();
  const mailHref = getMailHref();

  const scrollToContactForm = () => {
    if (typeof document === "undefined") return;
    const target = document.getElementById("contact-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderHighlightValue = (item: HighlightItem) => {
    if (item.type === "phone") {
      return (
        <a
          href={phoneHref}
          onClick={(event) => handlePhoneIntent(event)}
          className={`${styles.highlightValue} ${styles.highlightLink}`}
          data-variant="phone"
          dir="ltr"
          aria-label={`${item.label} ${item.value}`}
        >
          {item.value}
          <WhatsAppIcon className={styles.phoneIcon} />
        </a>
      );
    }

    if (item.type === "email") {
      return (
        <a
          href={mailHref}
          className={`${styles.highlightValue} ${styles.highlightLink}`}
          data-variant="email"
          aria-label={`${item.label} ${item.value}`}
        >
          {item.value}
        </a>
      );
    }

    return <span className={styles.highlightValue}>{item.value}</span>;
  };

  const renderHighlightHelper = (item: HighlightItem) => {
    // For the Arabic concierge line, replace the middle dot with a styled icon
    if (language === "ar" && item.type === "phone") {
      const parts = item.helper.split("•");
      const before = parts[0] ?? "";
      const after = parts[1] ?? "";

      return (
        <p className={styles.highlightHelper}>
          {before.trim()}{" "}
          <span className={styles.helperIcon} aria-hidden="true" />
          {" "}{after.trim()}
        </p>
      );
    }

    return <p className={styles.highlightHelper}>{item.helper}</p>;
  };

  return (
    <main className={styles.page} style={{ direction: dir }}>
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroBeams} aria-hidden="true" />
        <div className={styles.heroOrbs} aria-hidden="true" />
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroBadge}>{content.hero.badge}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroLead}>{content.hero.lead}</p>

          <div className={styles.highlightGrid}>
            {content.highlights.map((item) => (
              <article key={item.label} className={styles.highlightCard}>
                <p className={styles.highlightLabel}>{item.label}</p>
                {renderHighlightValue(item)}
                {renderHighlightHelper(item)}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.mediaGlow} aria-hidden="true" />
          <Image
            src="/api/images/slug/contact-hero"
            alt="Concierge preparing a luxury yacht itinerary"
            width={720}
            height={960}
            className={styles.heroImage}
            priority
            unoptimized={true}
          />
          <div className={styles.mediaCard}>
            <p>Average response</p>
            <strong>13 minutes</strong>
            <span>Global fleet clients • 2025</span>
          </div>
        </div>
      </section>

      <section className={styles.accessSection}>
        {content.access.map((detail) => (
          <article key={detail.title} className={styles.accessCard}>
            <p className={styles.accessLabel}>●</p>
            <div>
              <h2>{detail.title}</h2>
              <p>{detail.body}</p>
            </div>
            <button
              type="button"
              className={styles.accessAction}
              onClick={scrollToContactForm}
            >
              {detail.action}
              <span aria-hidden="true">➝</span>
            </button>
          </article>
        ))}
      </section>

      <ContactSection />

      <section className={styles.mapSection}>
        <div className={styles.mapContent}>
          <div className={styles.mapCopy}>
            <p className={styles.mapBadge}>{content.map.badge}</p>
            <h2>{content.map.title}</h2>
            <p>{content.map.description}</p>

            <ul className={styles.hoursList}>
              {content.map.hours.map((slot) => (
                <li key={slot.day}>
                  <span>{slot.day}</span>
                  <span>{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mapFrame}>
            <Image
              src="/api/images/slug/contact-map"
              alt="Aerial view of the Red Sea coastline"
              width={720}
              height={520}
              className={styles.mapImage}
              priority={false}
              unoptimized={true}
            />
            <div className={styles.mapTag}>
              {content.map.tag}
              <span aria-hidden="true">⛵</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}





