"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServicesList.module.css";
import ServicesListSkeleton from "./ServicesListSkeleton";
import { normalizeImageUrl } from "@/utils/imageUrl";

interface Service {
  _id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  image: string;
  slug?: string;
  blocks?: any[];
}
interface ServicesListProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  blocks?: any[];
  compact?: boolean; // أضف هذا السطر
  showSideCards?: boolean; // أضف هذا السطر
}
export default function ServicesList({
  badge = "Our Services",
  title = "Premium Yacht Services",
  subtitle = "Comprehensive management and maintenance solutions for your vessel.",
  showHeader = true,
  blocks = [],
  compact = false, // استقبلها هنا بقيمة افتراضية
  showSideCards = false,
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { dir, language } = useLanguage();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`/api/services?lang=${language}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [language]);

  if (loading) return <ServicesListSkeleton />;
  if (services.length === 0) return null;

  const isArabic = language === "ar";

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container} style={{ direction: dir }}>
        {showHeader && (
          <div className={styles.header}>
            <p className={styles.badge}>{badge}</p>
            <h2 className={styles.title}>{title}</h2>
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>
        )}

        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const currentTitle = isArabic
              ? service.titleAr || service.title
              : service.title;
            const currentDesc = isArabic
              ? service.descriptionAr || service.description
              : service.description;

            return (
              <Link
                href={`/services/${service.slug || service._id}`}
                key={service._id}
                className={styles.serviceCard}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={normalizeImageUrl(service.image) || ""}
                    alt={currentTitle}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{currentTitle}</h3>
                  <div
                    className={styles.cardDescription}
                    dangerouslySetInnerHTML={{ __html: currentDesc }}
                  />
                  <span className={styles.readMore}>
                    {isArabic ? "اقرأ المزيد" : "Read More"} ➝
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
