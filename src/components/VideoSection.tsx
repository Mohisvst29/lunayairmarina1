"use client";

import { useEffect, useState } from "react";
import styles from "./VideoSection.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeImageUrl, normalizeVideoUrl } from "@/utils/imageUrl";

export default function VideoSection({
  titleOverride,
  descriptionOverride,
}: any) {
  const { dir, language } = useLanguage();
  const [sectionData, setSectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // --- هنا بنثبت الفيديوهات ياباشا ---
  // هات الـ IDs دي من MongoDB (collection: videos.files)
  const STATIC_VIDEOS: Record<string, string> = {
    ar: "69dac6876609167fec7ad592", // استبدل ده بـ ID الفيديو العربي
    en: "69dac4fb6609167fec7ad573", // استبدل ده بـ ID الفيديو الإنجليزي
  };

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await fetch("/api/admin/home-sections", {
          cache: "no-store",
        });
        const data = await res.json();
        const videoSection = data.find((s: any) => s.key === "video");
        setSectionData(videoSection);
      } catch (err) {
        console.error("Error fetching video data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  const currentContent = sectionData?.content?.[language];

  // العناوين لسه بتيجي من الباك اند عادي أو الـ Props
  const heading =
    titleOverride || currentContent?.title || "Experience the Journey";
  const description = descriptionOverride || currentContent?.description || "";

  // هنا بنجبر الكود يستخدم الـ IDs اللي إحنا ثبتناها فوق
  const finalVideoId = language === "ar" ? STATIC_VIDEOS.ar : STATIC_VIDEOS.en;

  if (loading) return <div className={styles.skeleton} />;

  return (
    <section className={styles.videoSection} dir={dir}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2
            className={styles.title}
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              color: "#5D688B",
              marginBottom: "1.5rem",
            }}
          >
            {heading}
          </h2>

          {description && (
            <div
              className={styles.description}
              style={{
                fontSize: "1.3rem",
                fontWeight: "500",
                color: "#575C7A",
                lineHeight: "1.8",
                textAlign: "justify",
                textJustify: "inter-word",
                maxWidth: "750px",
                marginLeft: "auto",
                marginRight: "auto",
                whiteSpace: "pre-line",
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div className={styles.videoCard}>
          <div className={styles.videoFrame}>
            {finalVideoId ? (
              <video
                key={finalVideoId} // ضروري جداً عشان يغير الفيديو فوراً لما تحول اللغة
                className={`${styles.video} ${!videoReady ? styles.videoHidden : ""}`}
                controls
                playsInline
                onCanPlay={() => setVideoReady(true)}
                // الـ Poster ممكن تسيبه ييجي من الباك اند عادي
                poster={normalizeImageUrl(currentContent?.imageId) || undefined}
              >
                <source
                  src={normalizeVideoUrl(finalVideoId) || ""}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className={styles.fallback}>
                <p>
                  {language === "ar"
                    ? "الفيديو غير متوفر"
                    : "Video unavailable"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
