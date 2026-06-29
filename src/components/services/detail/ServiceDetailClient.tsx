"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { ServiceDetailResponse, LocalizedText } from "@/lib/service-detail";
import ServiceHeader from "./ServiceHeader";
import ServiceDescription from "./ServiceDescription";
import ServiceBenefits from "./ServiceBenefits";
import ServiceImages from "./ServiceImages";
import RelatedServices from "./RelatedServices";
import styles from "./ServiceDetail.module.css";

type ServiceDetailClientProps = {
  initialData: ServiceDetailResponse;
  serviceId: string;
};

type FetchState = "idle" | "loading" | "refreshing" | "error";

const pickLocale = (language: string, value?: LocalizedText) =>
  value ? (language === "ar" ? value.ar : value.en) : "";

const ServiceDetailClient = ({
  initialData,
  serviceId,
}: ServiceDetailClientProps) => {
  const { language, dir } = useLanguage();
  const [data, setData] = useState<ServiceDetailResponse>(initialData);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const latestDataRef = useRef<ServiceDetailResponse>(initialData);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    latestDataRef.current = data;
  }, [data]);

  const fetchLatest = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const hasExistingData = Boolean(latestDataRef.current?.service);
    setFetchState(hasExistingData ? "refreshing" : "loading");
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch service detail: ${response.status}`);
      }

      const payload = (await response.json()) as ServiceDetailResponse;
      setData(payload);
      latestDataRef.current = payload;
      setFetchState("idle");
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      console.error(error);
      setFetchState("error");
      setErrorMessage(
        language === "ar"
          ? "تعذر تحديث بيانات الخدمة. حاول مرة أخرى."
          : "Unable to refresh the service detail. Please try again.",
      );
    }
  }, [serviceId, language]);

  useEffect(() => {
    fetchLatest();
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchLatest]);

  // Scroll to top when component mounts or serviceId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [serviceId]);

  const service = data.service;

  const stats = [
    {
      label: language === "ar" ? "ممتلكات المعرض" : "Gallery Items",
      value: String(service.gallery?.length || 0),
    },
    {
      label: language === "ar" ? "فوائد" : "Benefits",
      value: `+${service.benefits?.length || 0}`,
    },
    {
      label: language === "ar" ? "فئة" : "Category",
      value: language === "ar" ? "مخصص" : "Custom",
    },
  ];

  const localizedRelated = data.relatedServices.map(s => ({
    id: s.id,
    slug: s.slug,
    title: pickLocale(language, s.title),
    description: pickLocale(language, s.description),
    image: s.image,
    price: language === "ar" ? s.priceAr : s.price
  }));

  return (
    <div className={styles.page} dir={dir}>
      {(fetchState === "refreshing" || fetchState === "error") && (
        <div
          className={`${styles.statusBanner} ${
            fetchState === "error" ? styles.statusBannerError : ""
          }`}
          role={fetchState === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span>
            {fetchState === "refreshing"
              ? language === "ar"
                ? "يتم تحديث البيانات مباشرة..."
                : "Refreshing live data..."
              : errorMessage}
          </span>
          {fetchState === "error" && (
            <button type="button" onClick={fetchLatest}>
              {language === "ar" ? "إعادة المحاولة" : "Retry"}
            </button>
          )}
        </div>
      )}

      <div className={styles.section}>
        <ServiceHeader
          title={pickLocale(language, service.heroTitle) || pickLocale(language, service.title)}
          description={pickLocale(language, service.description)}
          longDescription={pickLocale(language, service.longDescription)}
          price={language === "ar" ? service.priceAr : service.price}
          mainImage={service.mainImage}
          stats={stats}
          language={language}
          dir={dir as 'ltr' | 'rtl'}
        />

        <ServiceDescription
          description={pickLocale(language, service.description)}
          longDescription={pickLocale(language, service.longDescription)}
          features={language === "ar" ? service.features.ar : service.features.en}
          language={language}
          dir={dir as 'ltr' | 'rtl'}
        />

        <ServiceBenefits
          benefits={service.benefits.map(b => ({
            id: b.id,
            icon: b.icon,
            title: pickLocale(language, b.title),
            description: pickLocale(language, b.description)
          }))}
          language={language}
          dir={dir as 'ltr' | 'rtl'}
        />

        <ServiceImages
          mainImage={service.mainImage}
          gallery={service.gallery.map(g => ({
            id: g.id,
            url: g.url,
            caption: pickLocale(language, g.caption)
          }))}
          language={language}
          dir={dir as 'ltr' | 'rtl'}
        />

        <RelatedServices
          services={localizedRelated}
          language={language}
          dir={dir as 'ltr' | 'rtl'}
        />
      </div>
    </div>
  );
};

export default ServiceDetailClient;
