"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import CommitmentShowcase from "@/components/CommitmentShowcase";
import RelationshipSection from "@/components/RelationshipSection";
import ServicesList from "@/components/ServicesList";
import VideoSection from "@/components/VideoSection";
import YachtAppSection from "@/components/YachtAppSection";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeImageUrl, normalizeVideoUrl } from "@/utils/imageUrl";

interface HeroMediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  order: number;
  poster?: string;
}

type HomeSectionKey =
  | "hero"
  | "experience"
  | "video"
  | "relationship"
  | "services"
  | "commitment"
  | "contact"
  | "faq";

interface HomeSectionConfig {
  _id: string;
  key: HomeSectionKey;
  label: string;
  order: number;
  enabled: boolean;
  content?: {
    en?: {
      title?: string;
      description?: string;
      imageId?: string | null;
      videoId?: string | null;
    };
    ar?: {
      title?: string;
      description?: string;
      imageId?: string | null;
      videoId?: string | null;
    };
    faqs?: Array<{
      question: { ar: string; en: string };
      answer: { ar: string; en: string };
    }>;
  };
}

export default function Home() {
  const { t, language } = useLanguage();
  const [heroMedia, setHeroMedia] = useState<HeroMediaItem[]>([
    {
      id: "default",
      url: "/api/images/slug/ocean-sunrise",
      type: "image",
      order: 0,
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardImageId, setCardImageId] = useState<string | null>(null);
  const [logoImageId, setLogoImageId] = useState<string | null>(null);
  const [homeSections, setHomeSections] = useState<HomeSectionConfig[]>([]);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Preload hero background image for better LCP
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/api/images/slug/ocean-sunrise";
    link.fetchPriority = "high";
    document.head.appendChild(link);

    // Also preload the hero video for instant playback
    const videoLink = document.createElement("link");
    videoLink.rel = "preload";
    videoLink.as = "video";
    videoLink.href = "/لونير%20.mp4";
    videoLink.fetchPriority = "high";
    document.head.appendChild(videoLink);

    return () => {
      document.head.removeChild(link);
      if (document.head.contains(videoLink)) {
        document.head.removeChild(videoLink);
      }
    };
  }, []);

  useEffect(() => {
    const fetchHomeSections = async () => {
      try {
        const res = await fetch("/api/admin/home-sections", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setHomeSections(
            data
              .filter((item: HomeSectionConfig) => item.enabled)
              .sort(
                (a: HomeSectionConfig, b: HomeSectionConfig) =>
                  a.order - b.order,
              ),
          );
        }
      } catch (error) {
        console.error("Failed to fetch home sections:", error);
      }
    };
    fetchHomeSections();
  }, []);

  const isSectionEnabled = (key: HomeSectionKey) => {
    if (homeSections.length === 0) return true;
    return homeSections.some(
      (section) => section.key === key && section.enabled,
    );
  };

  const getSectionData = (key: HomeSectionKey) =>
    homeSections.find((section) => section.key === key);

  const getSectionTitle = (key: HomeSectionKey) =>
    language === "ar"
      ? getSectionData(key)?.content?.ar?.title ||
        getSectionData(key)?.content?.en?.title
      : getSectionData(key)?.content?.en?.title ||
        getSectionData(key)?.content?.ar?.title;

  const getSectionDescription = (key: HomeSectionKey) =>
    language === "ar"
      ? getSectionData(key)?.content?.ar?.description ||
        getSectionData(key)?.content?.en?.description
      : getSectionData(key)?.content?.en?.description ||
        getSectionData(key)?.content?.ar?.description;

  const getSectionImageId = (key: HomeSectionKey) =>
    language === "ar"
      ? getSectionData(key)?.content?.ar?.imageId ||
        getSectionData(key)?.content?.en?.imageId
      : getSectionData(key)?.content?.en?.imageId ||
        getSectionData(key)?.content?.ar?.imageId;
  const getSectionVideoId = (key: HomeSectionKey) =>
    language === "ar"
      ? getSectionData(key)?.content?.ar?.videoId ||
        getSectionData(key)?.content?.en?.videoId
      : getSectionData(key)?.content?.en?.videoId ||
        getSectionData(key)?.content?.ar?.videoId;

  const heroBackgroundImageId = getSectionImageId("hero");

  const heroVideoId = getSectionVideoId("hero");

  // 🎯 unified media source (image OR video OR fallback slider)
  const heroSingleMedia: HeroMediaItem[] = heroVideoId
    ? [
        {
          id: `hero-video-${heroVideoId}`,
          url: heroVideoId.startsWith("/api")
            ? heroVideoId
            : normalizeVideoUrl(heroVideoId) || "",
          type: "video",
          order: -9999,
        },
      ]
    : heroBackgroundImageId
      ? [
          {
            id: `hero-img-${heroBackgroundImageId}`,
            url: normalizeImageUrl(heroBackgroundImageId) || "",
            type: "image",
            order: -9999,
          },
        ]
      : heroMedia; // fallback القديم بتاعك زي ما هو
  // Fetch the latest media URLs (images and videos)
  useEffect(() => {
    const updateMedia = async () => {
      try {
        const mediaItems: HeroMediaItem[] = [];

        // Fetch hero banner images (hero-home section)
        const bannerResponse = await fetch(
          "/api/admin/images?section=hero-home",
          {
            cache: "no-store",
          },
        );
        if (bannerResponse.ok) {
          const bannerImages = await bannerResponse.json();
          if (Array.isArray(bannerImages)) {
            bannerImages.forEach(
              (img: { _id?: string; metadata?: { order?: number } }) => {
                if (img._id) {
                  mediaItems.push({
                    id: img._id,
                    url: normalizeImageUrl(img._id) || "",
                    type: "image",
                    order: img.metadata?.order || 0,
                  });
                }
              },
            );
          }
        }

        // Fetch hero banner videos (hero-home section)
        const videoResponse = await fetch(
          "/api/admin/videos?section=hero-home",
          {
            cache: "no-store",
          },
        );
        if (videoResponse.ok) {
          const heroVideos = await videoResponse.json();
          if (Array.isArray(heroVideos)) {
            heroVideos.forEach(
              (vid: {
                _id?: string;
                metadata?: {
                  order?: number;
                  slug?: string;
                  poster?: string;
                  cloudinaryUrl?: string;
                };
              }) => {
                if (vid._id) {
                  const slug = vid.metadata?.slug;
                  mediaItems.push({
                    id: vid._id,
                    url:
                      normalizeVideoUrl(
                        vid.metadata?.cloudinaryUrl || vid._id,
                      ) || "",
                    type: "video",
                    order:
                      slug === "hero-lonier-video"
                        ? -1000
                        : vid.metadata?.order || 0,
                    poster:
                      normalizeImageUrl(vid.metadata?.poster) || undefined,
                  });
                }
              },
            );
          }
        }

        // If the priority hero video is missing from the API, add a static fallback
        const hasPriorityHero = mediaItems.some(
          (item) => item.type === "video" && item.order === -1000,
        );
        if (!hasPriorityHero) {
          mediaItems.unshift({
            id: "hero-lonier-video-static",
            url: `/لونير%20.mp4`,
            type: "video",
            order: -1000,
          });
        }

        // Sort by order
        mediaItems.sort((a, b) => a.order - b.order);

        if (mediaItems.length > 0) {
          setHeroMedia(mediaItems);
        } else {
          // Fallback to ocean-sunrise if no hero media exists
          const fallbackResponse = await fetch(
            "/api/admin/images?slug=ocean-sunrise",
            {
              cache: "no-store",
            },
          );
          if (fallbackResponse.ok) {
            const fallbackImages = await fallbackResponse.json();
            const fallbackImage =
              Array.isArray(fallbackImages) && fallbackImages.length > 0
                ? fallbackImages[0]
                : null;
            if (fallbackImage?._id) {
              setHeroMedia([
                {
                  id: fallbackImage._id,
                  url: `/api/images/${fallbackImage._id}`,
                  type: "image",
                  order: 0,
                },
              ]);
            }
          }
        }

        // Fetch experience section images (card image and logo)
        const experienceResponse = await fetch(
          "/api/admin/images?section=experience-section",
          {
            cache: "no-store",
          },
        );
        if (experienceResponse.ok) {
          const experienceImages = await experienceResponse.json();
          const cardImage = experienceImages.find(
            (img: { metadata?: { slug?: string; section?: string } }) =>
              img.metadata?.slug === "ocean-sunrise" ||
              (img.metadata?.section === "experience-section" &&
                !img.metadata?.slug?.includes("logo")),
          );
          if (cardImage?._id) {
            setCardImageId(normalizeImageUrl(cardImage._id));
          } else if (experienceImages.length > 0) {
            const nonLogoImage = experienceImages.find(
              (img: { metadata?: { slug?: string }; filename?: string }) =>
                !img.metadata?.slug?.includes("logo") &&
                !img.filename?.toLowerCase().includes("logo"),
            );
            if (nonLogoImage?._id) {
              setCardImageId(normalizeImageUrl(nonLogoImage._id));
            }
          }
          const logoImage = experienceImages.find(
            (img: { metadata?: { slug?: string }; filename?: string }) =>
              img.metadata?.slug === "lm-logo" ||
              img.filename?.toLowerCase().includes("logo"),
          );
          if (logoImage?._id) {
            setLogoImageId(normalizeImageUrl(logoImage._id));
          }
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
      }
    };
    updateMedia();

    // Re-fetch every 30 seconds to check for updates
    const interval = setInterval(updateMedia, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle video playback when slide changes
  const handleSlideChange = useCallback(
    (newIndex: number) => {
      // Pause all videos
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Play video if current slide is a video
      const currentMedia = heroMedia[newIndex];
      if (currentMedia?.type === "video") {
        const videoEl = videoRefs.current[currentMedia.id];
        if (videoEl) {
          videoEl.play().catch(() => {
            // Autoplay may be blocked, that's okay
          });
        }
      }

      setCurrentSlide(newIndex);
    },
    [heroMedia],
  );

  // Ensure the first slide (especially hero video) starts playing once media is ready
  useEffect(() => {
    if (heroMedia.length > 0) {
      handleSlideChange(0);
    }
  }, [heroMedia, handleSlideChange]);

  // Auto-rotate slides
  useEffect(() => {
    if (heroMedia.length <= 1) return;

    const currentMedia = heroMedia[currentSlide];

    // For videos, wait for them to end before changing
    if (currentMedia?.type === "video") {
      const videoEl = videoRefs.current[currentMedia.id];
      if (videoEl) {
        const handleEnded = () => {
          handleSlideChange((currentSlide + 1) % heroMedia.length);
        };
        videoEl.addEventListener("ended", handleEnded);
        return () => videoEl.removeEventListener("ended", handleEnded);
      }
    }

    // For images, use timeout
    const slideInterval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % heroMedia.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [heroMedia, currentSlide, handleSlideChange]);

  return (
    <main className={styles.page}>
      {isSectionEnabled("hero") && (
        <div className={styles.hero} data-animate-on-load>
          {/* 1. الطبقة الأساسية: الفيديو الثابت (The Eternal Loop) */}
          <div className={styles.heroSlider}>
            <div className={`${styles.heroSlide} ${styles.active}`}>
              <video
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className={styles.heroVideo}
                src="/لونير%20.mp4"
                // @ts-expect-error fetchPriority works in modern browsers
                fetchPriority="high"
                onEnded={(e) => e.currentTarget.play()} // أمان إضافي للوب
              />
              <div className={styles.heroVideoOverlay} />
            </div>

            {/* 2. طبقة الـ Media الإضافية (لو فيه صور تانية من الباك اند تظهر فوق الفيديو أو تبدل معاه) */}
            {heroMedia
              .filter((m) => m.id !== "default")
              .map((media, index) => (
                <div
                  key={media.id}
                  className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ""}`}
                  style={{
                    backgroundImage:
                      media.type === "image" ? `url(${media.url})` : "none",
                  }}
                >
                  {media.type === "video" && index === currentSlide && (
                    <video
                      src={media.url}
                      autoPlay
                      muted
                      loop
                      className={styles.heroVideo}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* 3. محتوى الهيرو (النصوص) */}
          <section className={styles.heroContent}>
            {/* الـ Badge الفخم اللي أنت عامله */}

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleArabic}>
                {getSectionTitle("hero") || t("hero.title")}
              </span>
            </h1>
          </section>

          {/* المؤشرات (Indicators) */}
          {heroMedia.length > 1 && (
            <div className={styles.sliderIndicators}>
              {heroMedia.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.indicator} ${idx === currentSlide ? styles.active : ""}`}
                  onClick={() => handleSlideChange(idx)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      /////////////////////////////////////// section two /////////////
      {isSectionEnabled("experience") && (
        <section className={styles.experienceSection} data-animate-on-scroll>
          <div className={styles.experienceCard}>
            <article className={styles.arabicCopy}>
              <p className={styles.arabicTitle}>
                {getSectionTitle("experience") ||
                  getSectionData("experience")?.label ||
                  t("about.title")}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    getSectionDescription("experience") ||
                    t("about.description"),
                }}
              />
            </article>

            <div className={styles.cardMedia}>
              <Image
                src={
                  normalizeImageUrl(getSectionImageId("experience")) ||
                  normalizeImageUrl(cardImageId) ||
                  "/newbackgrounds/secondsection-mainpage.webp"
                }
                alt="Luxury yacht seating overlooking the sea"
                width={300}
                height={400}
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, 300px"
                loading="lazy"
              />
            </div>
          </div>

          <p className={styles.trustCopy}>{t("partnerships.subtitle")}</p>
        </section>
      )}
      {/* // ahmed-video// */}
      {isSectionEnabled("video") && (
        <VideoSection
          titleOverride={getSectionTitle("video")}
          descriptionOverride={getSectionDescription("video")}
          videoIdOverride={getSectionVideoId("video")}
        />
      )}
      {isSectionEnabled("relationship") && (
        <RelationshipSection
          imageIdOverride={getSectionImageId("relationship")}
        />
      )}
      {isSectionEnabled("services") && (
        <div id="services-section">
          {/* @ts-ignore */}
          <ServicesList
            badge={t("services.title")}
            title={
              getSectionTitle("services") || t("services.management_title")
            }
            subtitle={
              getSectionDescription("services") || t("services.management_desc")
            }
            showHeader={false}
            blocks={(getSectionData("services")?.content as any)?.blocks || []}
          />
        </div>
      )}
      {/* <YachtAppSection /> */}
      {isSectionEnabled("commitment") && (
        <CommitmentShowcase />
      )}
      {isSectionEnabled("contact") && (
        <ContactSection
          titleOverride={getSectionTitle("contact")}
          descriptionOverride={getSectionDescription("contact")}
          imageIdOverride={getSectionImageId("contact")}
        />
      )}
      {/* في ملف page.tsx */}
      {isSectionEnabled("faq") && (
        <FaqSection
          titleOverride={getSectionTitle("faq")}
          descriptionOverride={getSectionDescription("faq")}
          faqs={getSectionData("faq")?.content?.faqs || []}
        />
      )}
    </main>
  );
}
