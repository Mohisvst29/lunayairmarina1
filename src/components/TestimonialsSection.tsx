 "use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./TestimonialsSection.module.css";
import { useLanguage } from "@/context/LanguageContext";

const testimonialSlugs = [
  "portrait-vip-1", "portrait-vip-2", "portrait-vip-3", "portrait-vip-4",
  "portrait-vip-", "portrait-vip-6", "portrait-vip-7", "portrait-vip-8",
  "portrait-vip-9", "portrait-vip-10", "portrait-vip-11", "portrait-vip-12",
];

const testimonials = [
  {
    name: "Hannah Ward",
    role: "Freelance Product Marketer",
    slug: "portrait-vip-1",
  },
  {
    name: "Elena Petrova",
    role: "COO at BioScale",
    slug: "portrait-vip-2",
  },
  {
    name: "Samir Khan",
    role: "Head of Marketing at PayNow",
    slug: "portrait-vip-3",
  },
  {
    name: "Daniel Cho",
    role: "CEO at LeadBridge",
    slug: "portrait-vip-4",
  },
  {
    name: "Chris Donovan",
    role: "Co-founder at SparkPoint",
    slug: "portrait-vip-5",
  },
  {
    name: "Julia Harris",
    role: "Founder at Taskly",
    slug: "portrait-vip-6",
  },
  {
    name: "Rachel Meyer",
    role: "SaaS Growth Consultant",
    slug: "portrait-vip-7",
  },
  {
    name: "Martin Ross",
    role: "Co-founder at BuildOps",
    slug: "portrait-vip-8",
  },
  {
    name: "Arjun Patel",
    role: "Product Marketing Manager at DataFuse",
    slug: "portrait-vip-9",
  },
  {
    name: "Kevin O'Neill",
    role: "Creative Director at LaunchLab",
    slug: "portrait-vip-10",
  },
  {
    name: "Laura Kim",
    role: "Product Designer at Connectly",
    slug: "portrait-vip-11",
  },
  {
    name: "Kelly Morgan",
    role: "Head of Growth at CloudSync",
    slug: "portrait-vip-12",
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Fetch image URLs with cache busting on mount
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls: Record<string, string> = {};
      for (const slug of testimonialSlugs) {
        try {
          const response = await fetch(`/api/admin/images?slug=${slug}`, {
            cache: 'no-store',
          });
          if (response.ok) {
            const images = await response.json();
            const image = Array.isArray(images) && images.length > 0 ? images[0] : null;
            if (image?.uploadDate) {
              const timestamp = new Date(image.uploadDate).getTime();
              urls[slug] = `/api/images/slug/${slug}?v=${timestamp}`;
            } else {
              urls[slug] = `/api/images/slug/${slug}?v=${Date.now()}`;
            }
          } else {
            urls[slug] = `/api/images/slug/${slug}?v=${Date.now()}`;
          }
        } catch {
          urls[slug] = `/api/images/slug/${slug}?v=${Date.now()}`;
        }
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, []);

  return (
    <section
      id="reviews"
      className={styles.testimonialsSection}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.testimonialsInner}>
        <h2 id="testimonials-heading">{t("testimonials.title")}</h2>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((person) => (
            <article key={person.name} className={styles.testimonialCard}>
              <Image
                src={imageUrls[person.slug] || `/api/images/slug/${person.slug}`}
                alt={person.name}
                width={56}
                height={56}
                className={styles.avatar}
                unoptimized={true}
              />
              <div className={styles.testimonialCopy}>
                <p className={styles.personName}>{person.name}</p>
                <p className={styles.personRole}>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

