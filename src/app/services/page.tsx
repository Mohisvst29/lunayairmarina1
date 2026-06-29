"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useServicesAnimations } from "@/hooks/useServicesAnimations";
import RotatingBorderButton from "@/components/RotatingBorderButton";
import ServicesList from "@/components/ServicesList";
import { useLanguage, Locale } from "@/context/LanguageContext";
import styles from "./page.module.css";

const SERVICES_CONTENT: Record<
  Locale,
  {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    overview: {
      badge: string;
      title: string;
      description: string;
    };
    services: Array<{
      id: number;
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      icon: string;
    }>;
    featured: {
      badge: string;
      title: string;
      description: string;
      stats: Array<{ value: string; label: string }>;
      cta: string;
    };
    process: {
      badge: string;
      title: string;
      description: string;
      steps: Array<{ step: number; title: string; description: string }>;
    };
    cta: {
      title: string[];
      description: string;
      primary: string;
      secondary: string;
    };
  }
> = {
  en: {
    hero: {
      eyebrow: "Exceptional Marine Luxury",
      title: "Lunier Marina Services",
      description:
        "The yachting industry has evolved tremendously. Owning a yacht now demands precise management of a complex asset. We deliver total peace of mind with comprehensive management and operations support so you enjoy the sea while we handle the details.",
      primaryCta: "Book a Consultation",
      secondaryCta: "Learn About Our Vision",
    },
    overview: {
      badge: "Our Services",
      title: "Comprehensive Yacht Management",
      description:
        "Lunier Marina offers an unparalleled range of services to meet every owner's requirements. Whether you need operational support, technical assistance, or financial oversight, choose our integrated approach or request a tailored module.",
    },
    services: [
      {
        id: 1,
        title: "Yacht & Boat Management",
        subtitle: "Comprehensive 360° Management",
        description:
          "We provide a complete solution covering operational, technical, and financial oversight. From crew supervision and periodic maintenance to budget management and maritime compliance, we handle everything.",
        features: [
          "Crew Supervision",
          "Maintenance",
          "Budget Management",
          "Regulatory Compliance",
        ],
        icon: "Anchor",
      },
      {
        id: 2,
        title: "Visiting Yacht Agency",
        subtitle: "Maritime Procedures Facilitation",
        description:
          "We welcome visiting yachts to Saudi shores and manage every procedure for a smooth arrival and departure—entry permits, customs clearance, and required documentation included.",
        features: [
          "Entry Permits",
          "Customs Clearance",
          "Documentation",
          "Logistics",
        ],
        icon: "Waves",
      },
      {
        id: 3,
        title: "Marina & Club Operations",
        subtitle: "Luxury Marina Management",
        description:
          "We manage marinas according to the highest global standards, providing a safe and luxurious environment for docking yachts and boats. We also operate yacht clubs that offer exclusive recreational services and amenities for yacht and boat owners, utilizing modern technology to make them the perfect destination for relaxation and socializing.",
        features: [
          "Marina Management",
          "Club Operations",
          "Smart Technology",
          "Exclusive Amenities",
        ],
        icon: "Umbrella",
      },
      {
        id: 4,
        title: "Crew Recruitment Services",
        subtitle: "Professional & Qualified Crew",
        description:
          "The right crew defines the onboard experience. Our recruitment team carefully vets candidates to match your preferences in skill, personality, and service mindset.",
        features: [
          "Careful Selection",
          "Skills Matching",
          "Personality Fit",
          "Continuous Training",
        ],
        icon: "Users",
      },
    ],
    featured: {
      badge: "Featured Service",
      title: "Comprehensive 360° Management",
      description:
        "A modular management program covering every operational, technical, and financial touchpoint. Opt for full coverage or select only what you need—we keep your vessel guest-ready around the clock.",
      stats: [
        { value: "360°", label: "Comprehensive Approach" },
        { value: "24/7", label: "Dedicated Support" },
        { value: "100%", label: "Operational Oversight" },
      ],
      cta: "Book a Free Consultation",
    },
    process: {
      badge: "How We Work",
      title: "Simple and Transparent Process",
      description: "We follow a structured path to deliver seamless service.",
      steps: [
        {
          step: 1,
          title: "Contact",
          description: "Connect via phone or email to outline your needs.",
        },
        {
          step: 2,
          title: "Consultation",
          description: "We analyze requirements and recommend tailored solutions.",
        },
        {
          step: 3,
          title: "Planning",
          description:
            "A detailed operational and technical plan keeps every detail aligned.",
        },
        {
          step: 4,
          title: "Delivery",
          description:
            "We execute the agreed scope with proactive monitoring and reporting.",
        },
        {
          step: 5,
          title: "Support",
          description: "Continuous 24/7 coverage ensures total peace of mind.",
        },
      ],
    },
    cta: {
      title: [
        "Lunier Marina",
        "More than management—a partnership in luxury and excellence",
      ],
      description:
        "Ready to begin your exceptional marine journey? Contact us for a free consultation and discover the ideal management program for your yacht.",
      primary: "Contact Us",
      secondary: "Learn More",
    },
  },
  ar: {
    hero: {
      eyebrow: "رفاهية بحرية استثنائية",
      title: "خدمات لونير مارينا",
      description:
        "تطور عالم اليخوت يتطلب إدارة دقيقة لأصل معقد. نوفر لك راحة البال الكاملة عبر خدمات إدارة وتشغيل متكاملة، لتستمتع بالبحر بينما نتولى نحن جميع التفاصيل.",
      primaryCta: "احجز استشارة",
      secondaryCta: "تعرّف على رؤيتنا",
    },
    overview: {
      badge: "",
      title: "إدارة شاملة لليخوت",
      description:
        "تقدم لونير مارينا مجموعة خدمات لا مثيل لها لتلبية جميع متطلبات الملاك. سواء احتجت إلى دعم تشغيلي أو فني أو مالي، يمكنك اختيار نهج متكامل أو تصميم باقة مخصصة.",
    },
    services: [
      {
        id: 1,
        title: "إدارة اليخوت والقوارب",
        subtitle: "إدارة شاملة بزاوية 360°",
        description:
          "نقدم حلاً متكاملاً يشمل الجوانب التشغيلية والفنية والمالية. من الإشراف على الطاقم والصيانة الدورية إلى إدارة الميزانية والامتثال البحري، نتولى كل التفاصيل.",
        features: [
          "إشراف الطاقم",
          "الصيانة",
          "إدارة الميزانية",
          "الامتثال للأنظمة",
        ],
        icon: "Anchor",
      },
      {
        id: 2,
        title: "وكالة اليخوت الزائرة",
        subtitle: "تسهيل الإجراءات البحرية",
        description:
          "نستقبل اليخوت الزائرة إلى سواحل المملكة وندير جميع الإجراءات لضمان وصول ومغادرة سلسة، بما في ذلك تصاريح الدخول والتخليص الجمركي والمستندات المطلوبة.",
        features: [
          "تصاريح الدخول",
          "التخليص الجمركي",
          "إعداد المستندات",
          "الدعم اللوجستي",
        ],
        icon: "Waves",
      },
      {
        id: 3,
        title: "إدارة وتشغيل المراسي والنوادي البحرية",
        subtitle: "إدارة مراسي فاخرة",
        description:
          "نعمل على إدارة المراسي البحرية بأعلى المعايير العالمية، مما يوفر بيئة آمنة وفاخرة لرسو اليخوت والقوارب. كما ندير النوادي البحرية التي تقدم خدمات ترفيهية ووسائل راحة حصرية لأصحاب اليخوت والقوارب، وباستخدام التكنولوجيا الحديثة مما يجعلها وجهة مثالية للاسترخاء والتواصل.",
        features: [
          "إدارة المراسي",
          "تشغيل النوادي",
          "تقنيات ذكية",
          "مزايا حصرية",
        ],
        icon: "Umbrella",
      },
      {
        id: 4,
        title: "توظيف الطاقم",
        subtitle: "طاقم محترف ومؤهل",
        description:
          "اختيار الطاقم المناسب أساس التجربة الفاخرة. يقوم فريق التوظيف بانتقاء المرشحين بعناية ليتوافقوا مع تفضيلاتك من حيث المهارات والشخصية.",
        features: [
          "اختيار دقيق",
          "مواءمة المهارات",
          "انسجام الشخصية",
          "تدريب مستمر",
        ],
        icon: "Users",
      },
    ],
    featured: {
      badge: "",
      title: "إدارة شاملة بزاوية 360°",
      description:
        "برنامج إدارة مرن يغطي كل نقطة تشغيلية وفنية ومالية. يمكنك اختيار تغطية كاملة أو خدمات محددة، مع ضمان جاهزية قاربك واستعداد الطاقم على مدار الساعة.",
      stats: [
        { value: "360°", label: "منهج متكامل" },
        { value: "24/7", label: "دعم متواصل" },
        { value: "100%", label: "رقابة تشغيلية" },
      ],
      cta: "احجز استشارة مجانية",
    },
    process: {
      badge: "آلية العمل",
      title: "خطوات واضحة وشفافة",
      description: "نتّبع مسارًا منهجيًا لضمان تجربة سلسة من البداية للنهاية.",
      steps: [
        {
          step: 1,
          title: "التواصل",
          description: "تواصل معنا عبر الهاتف أو البريد لعرض احتياجاتك.",
        },
        {
          step: 2,
          title: "الاستشارة",
          description:
            "نحلل المتطلبات ونقترح حلولًا مخصصة لليخت أو القارب الخاص بك.",
        },
        {
          step: 3,
          title: "التخطيط",
          description:
            "نضع خطة دقيقة تغطي الجوانب التشغيلية والفنية والمالية.",
        },
        {
          step: 4,
          title: "التنفيذ",
          description:
            "نبدأ تنفيذ الخدمات المتفق عليها مع متابعة وتقارير مستمرة.",
        },
        {
          step: 5,
          title: "الدعم",
          description: "نوفر دعمًا متواصلًا على مدار الساعة لراحة بالك.",
        },
      ],
    },
    cta: {
      title: ["لونير مارينا", "أكثر من إدارة، إنها شراكة نحو الفخامة والتميز"],
      description:
        "هل أنت مستعد لبدء رحلتك البحرية الاستثنائية؟ تواصل معنا للحصول على استشارة مجانية واكتشف البرنامج الأنسب لإدارة يختك.",
      primary: "تواصل معنا",
      secondary: "اعرف المزيد",
    },
  },
};

export default function ServicesPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLElement | null>(null);

  const ctaRef = useRef<HTMLElement | null>(null);
  const { language, dir } = useLanguage();
  const content = SERVICES_CONTENT[language];
  const [heroBgImage, setHeroBgImage] = useState("/api/images/slug/services-banner");
  const [featuredImageId, setFeaturedImageId] = useState<string | null>(null);

  // Fetch the latest image URLs
  useEffect(() => {
    const updateImages = async () => {
      try {
        // Fetch services banner
        const bannerResponse = await fetch("/api/admin/images?section=services-banner", {
          cache: 'no-store',
        });
        if (bannerResponse.ok) {
          const bannerImages = await bannerResponse.json();
          const bannerImage = Array.isArray(bannerImages) && bannerImages.length > 0 ? bannerImages[0] : null;
          if (bannerImage?._id) {
            setHeroBgImage(`/api/images/${bannerImage._id}`);
          } else {
            // Fallback to ocean-sunrise if services-banner doesn't exist yet
            const fallbackResponse = await fetch("/api/admin/images?slug=ocean-sunrise", {
              cache: 'no-store',
            });
            if (fallbackResponse.ok) {
              const fallbackImages = await fallbackResponse.json();
              const fallbackImage = Array.isArray(fallbackImages) && fallbackImages.length > 0 ? fallbackImages[0] : null;
              if (fallbackImage?._id) {
                setHeroBgImage(`/api/images/${fallbackImage._id}`);
              }
            }
          }
        }

        // Fetch featured image (ocean-sunrise for featured section)
        const featuredResponse = await fetch("/api/admin/images?slug=ocean-sunrise", {
          cache: 'no-store',
        });
        if (featuredResponse.ok) {
          const featuredImages = await featuredResponse.json();
          const featuredImage = Array.isArray(featuredImages) && featuredImages.length > 0 ? featuredImages[0] : null;
          if (featuredImage?._id) {
            setFeaturedImageId(featuredImage._id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    updateImages();

    // Re-fetch every 30 seconds to check for updates
    const interval = setInterval(updateImages, 30000);
    return () => clearInterval(interval);
  }, []);

  useServicesAnimations({
    rootRef,
    heroRef,
    servicesRef,
    featuredRef,

    ctaRef,
  });

  return (
    <main className={styles.page} ref={rootRef} style={{ direction: dir }}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        ref={heroRef}
        style={{
          backgroundImage: `linear-gradient(145deg, rgba(1, 6, 18, 0.85), rgba(9, 30, 58, 0.55)), url(${heroBgImage})`,
        }}
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow} data-animate="hero">
            {content.hero.eyebrow}
          </p>
          <h1 className={styles.heroTitle} data-animate="hero">
            {content.hero.title}
          </h1>
          <p className={styles.heroSubtitle} data-animate="hero">
            {content.hero.description}
          </p>

        </div>
      </section>

      {/* Services Overview Cards */}
      <section className={styles.servicesSection} ref={servicesRef}>
        <div className={styles.sectionHeader}>
          {content.overview.badge && (
            <p className={styles.sectionBadge} data-animate="services">
              {content.overview.badge}
            </p>
          )}
          <h2 className={styles.sectionTitle} data-animate="services">
            {content.overview.title}
          </h2>
          <p className={styles.sectionDescription} data-animate="services">
            {content.overview.description}
          </p>
        </div>
        <ServicesList
          compact
          showHeader={false}
          showSideCards={false}
        />
      </section>

      {/* Featured Service Highlight */}
      <section className={styles.featuredSection} ref={featuredRef}>
        <div className={styles.featuredContent}>
          <div className={styles.featuredText} data-animate="featured">
            {content.featured.badge && <p className={styles.sectionBadge}>{content.featured.badge}</p>}
            <h2>{content.featured.title}</h2>
            <p className={styles.featuredDescription}>
              {content.featured.description}
            </p>
            <div className={styles.featuredStats}>
              {content.featured.stats.map((stat) => (
                <div className={styles.statItem} key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className={styles.featuredBtn}>
              <RotatingBorderButton text={content.featured.cta} />
            </Link>
          </div>
          <div className={styles.featuredMedia} data-animate="featured">
            <div className={styles.featuredImageWrapper}>
              <Image
                src={featuredImageId ? `/api/images/${featuredImageId}` : "/api/images/slug/ocean-sunrise"}
                alt="Luxury yacht management services"
                width={600}
                height={700}
                className={styles.featuredImage}
                unoptimized={true}
                priority={false}
              />
              <div className={styles.featuredGlow} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={styles.ctaContent} data-animate="cta">
          <div className={styles.ctaGlow} aria-hidden="true" />
          <h2 className={styles.ctaTitle}>
            {content.cta.title.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index !== content.cta.title.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.ctaDescription}>{content.cta.description}</p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.ctaPrimaryBtn}>
              {content.cta.primary} <span aria-hidden="true">➝</span>
            </Link>
            <Link href="/about" className={styles.ctaSecondaryBtn}>
              {content.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


