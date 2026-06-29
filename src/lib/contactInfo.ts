"use client";

import type { MouseEvent } from "react";

const COUNTRY_CODE = "966";
const LOCAL_NUMBER = "531561212";

export const CONTACT_PHONE_DISPLAY = "00966531561212";
export const CONTACT_EMAIL = "Info@lunayairmarina.com";
export const CONTACT_WHATSAPP_MESSAGE =
  "Hello Lunier Marina, I'd like to connect.";

const PHONE_E164 = `+${COUNTRY_CODE}${LOCAL_NUMBER}`;
const PHONE_WHATSAPP = `${COUNTRY_CODE}${LOCAL_NUMBER}`;

export const getPhoneHref = () => `tel:${PHONE_E164}`;

export const getWhatsAppHref = (message = CONTACT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;

export const getMailHref = () => `mailto:${CONTACT_EMAIL}`;

const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Mobi/i.test(
    navigator.userAgent
  );

type PhoneIntentOptions = {
  message?: string;
};

export const ABOUT_CONTENT: any = {
  ar: {
    hero: {
      badge: "من نحن",
      title: ["نصنع رحلات هادئة", "وجاهزة للإبحار"],
      lead: "نحن فريق من المختصين في تأجير اليخوت وتنظيم الرحلات البحرية الفاخرة في الخليج العربي.",
     stats: [
  { value: "42", label: "يختاً مداراً • الخليج والمتوسط" },
  { value: "78", label: "شريكاً متخصصاً في الأحواض والطاقم والتأجير" },
  { value: "13", label: "دقيقة متوسط استجابة غرفة العمليات" }
]
    },
    story: {
      badge: "قصتنا",
      title: "إرث المراسي الملكية مع حرفية عصرية",
      paragraphs: [
        "نشأت لونير مارينا في صالات دبي هاربور، حيث نقلنا بروتوكولات الأندية الخاصة إلى عالم البحار المفتوحة. نقرأ تقاليد العائلات وطقوسهم الثقافية ومتطلباتهم التقنية لنصمم رحلات تبدو سهلة لكنها مُعدة بعناية.",
        "يضم طاقمنا متعدد اللغات مهندسين بحريين وقباطنة سابقين ومنسقي ضيافة ومحللي استدامة. نُدير التموين والامتثال والتأجير وإعادة التجهيز من خلال نقطة اتصال واحدة لكل مالك."
      ],
      card: { label: "منذ", value: "2014", helper: "سنة التأسيس" }
    },
    missionVision: [
      {
        title: "مهمتنا",
        body: "توفير رحلات بحرية آمنة وفاخرة تناسب كل المناسبات، مع ضمان أعلى معايير الجودة والراحة لكل عميل."
      },
      {
        title: "رؤيتنا",
        body: "أن نكون المرجع الأول في تأجير اليخوت في منطقة الخليج، ونشكل مستقبل السياحة البحرية الفاخرة."
      }
    ],
    values: {
      badge: "قيمنا",
      title: "أكثر من إبحار — إليه عهد ثقة",
      description: "كل رحلة نصممها تعكس التزامنا بالجودة والأمان والخدمة الشخصية.",
      cards: [
        { title: "الأمان أولاً", body: "كل يخوتنا مرخصة ومجهزة بأعلى معايير السلامة البحرية." },
        { title: "الخدمة الشخصية", body: "نصمم كل رحلة حسب احتياجاتك وتفضيلاتك تماماً." },
        { title: "الالتزام بالمواعيد", body: "نحترم وقتك — الإقلاع في الموعد المحدد دائماً بلا استثناء." },
        { title: "الشفافية", body: "لا رسوم مخفية، لا مفاجآت — كل شيء واضح من البداية." }
      ]
    },
    client: {
      badge: "عملاؤنا",
      title: "علاقات رفيعة المستوى أساسها الخصوصية",
      paragraphs: [
        "نخدم العائلات الكريمة والمؤسسات الكبرى والشخصيات المرموقة في منطقة الخليج.",
        "سرية تامة، خدمة لا تُضاهى، وتجربة تستحق أن تتكرر."
      ],
      quote: "الثقة أساس كل رحلة نقوم بها.",
      highlightsTitle: "لماذا تختارنا",
      highlights: [
        "طاقم محترف ومرخص",
        "يخوت فاخرة ومصانة",
        "حجز مرن وسهل",
        "دعم على مدار الساعة"
      ]
    },
    cta: {
      badge: "للتواصل معنا",
      title: "هل أنت جاهز للموسم المقبل؟",
      description: "انضم إلى الحلقة التي تشكل مستقبل البحوث في الخليج.",
      button: "تواصل معنا"
    }
  },
  en: {
    hero: {
      badge: "About Us",
      title: ["We Craft Smooth Voyages", "Ready to Set Sail"],
      lead: "We are a team of specialists in luxury yacht charters and sea trips across the Arabian Gulf.",
   stats: [
  { value: "42", label: "managed vessels • GCC & Mediterranean" },
  { value: "78", label: "specialist partners across yards, crew, and charter" },
  { value: "13", label: "minutes average response from our fleet desk" }
]
    },
    story: {
      badge: "Our Story",
      title: "Royal Marina Heritage with Modern Craftsmanship",
      paragraphs: [
        "Lunier Marina was born in the halls of Dubai Harbour, where we brought private club protocols to the open seas. We read family traditions, cultural rituals, and technical requirements to craft voyages that feel effortless yet are meticulously prepared.",
        "Our multilingual crew includes marine engineers, former captains, hospitality coordinators, and sustainability analysts. We manage provisioning, compliance, chartering, and refitting through a single point of contact for every owner."
      ],
      card: { label: "Since", value: "2014", helper: "Foundation Year" }
    },
    missionVision: [
      {
        title: "Our Mission",
        body: "To provide safe and luxurious sea trips for all occasions, ensuring the highest standards of quality and comfort for every client."
      },
      {
        title: "Our Vision",
        body: "To become the leading yacht charter reference in the Gulf region and shape the future of luxury maritime tourism."
      }
    ],
    values: {
      badge: "Our Values",
      title: "More Than Sailing — A Bond of Trust",
      description: "Every trip we design reflects our commitment to quality, safety, and personal service.",
      cards: [
        { title: "Safety First", body: "All our yachts are licensed and equipped to the highest maritime safety standards." },
        { title: "Personal Service", body: "We tailor every trip exactly to your needs and preferences." },
        { title: "Punctuality", body: "We respect your time — departure is always on schedule, no exceptions." },
        { title: "Transparency", body: "No hidden fees, no surprises — everything is clear from the very start." }
      ]
    },
    client: {
      badge: "Our Clients",
      title: "Premium Relationships Built on Privacy",
      paragraphs: [
        "We serve distinguished families, major corporations, and prominent figures across the Gulf.",
        "Complete confidentiality, unmatched service, and an experience worth repeating."
      ],
      quote: "Trust is the foundation of every voyage we undertake.",
      highlightsTitle: "Why Choose Us",
      highlights: [
        "Professional licensed crew",
        "Luxury well-maintained yachts",
        "Flexible and easy booking",
        "24/7 customer support"
      ]
    },
    cta: {
      badge: "Contact Us",
      title: "Ready for the Next Season?",
      description: "Join the circle shaping the future of maritime tourism in the Gulf.",
      button: "Get in Touch"
    }
  }
};

export const handlePhoneIntent = (
  event?: MouseEvent<HTMLAnchorElement>,
  options?: PhoneIntentOptions
) => {
  event?.preventDefault();
  if (typeof window === "undefined") return;

  if (isMobileDevice()) {
    window.location.href = getPhoneHref();
    return;
  }

  window.open(
    getWhatsAppHref(options?.message),
    "_blank",
    "noopener,noreferrer"
  );
};







































