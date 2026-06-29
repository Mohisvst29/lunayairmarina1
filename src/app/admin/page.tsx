"use client";

import { useRef, useState } from "react";
import ImageManager from "@/components/admin/ImageManager";
import ServiceManager from "@/components/admin/ServiceManager";
import BlogManager from "@/components/admin/BlogManager";
import VideoManager from "@/components/admin/VideoManager";
import HomeSectionsManager from "@/components/admin/HomeSectionsManager";
import GenericPageManager from "@/components/admin/GenericPageManager";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";

type TabKey =
  | "services"
  | "blogs"
  | "images"
  | "videos"
  | "home-sections"
  | "about-page"
  | "app-page";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("services");
  const { language, dir } = useLanguage();
  const copy =
    language === "ar"
      ? {
          services: "الخدمات",
          images: "مكتبة الصور",
          blogs: "المدونة",
          videos: "الفيديو",
          homeSections: "اقسام الصفحة الرئيسية",
          aboutPage: "إدارة صفحة عنّا",
          appPage: "إدارة صفحة التطبيق",
        }
      : {
          services: "Services",
          images: "Image Library",
          blogs: "Blog",
          videos: "Video",
          homeSections: "Home Sections",
          aboutPage: "Manage About Page",
          appPage: "Manage App Page",
        };
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    services: null,
    blogs: null,
    images: null,
    videos: null,
    "home-sections": null,
    "about-page": null,
    "app-page": null,
  });

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "services", label: copy.services },
    { key: "blogs", label: copy.blogs },
    { key: "images", label: copy.images },
    { key: "videos", label: copy.videos },
    { key: "home-sections", label: copy.homeSections },
    { key: "about-page", label: copy.aboutPage },
    { key: "app-page", label: copy.appPage },
  ];

  const handleArrowNavigation = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const keys = ["ArrowRight", "ArrowLeft"];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    const order: TabKey[] = [
      "services",
      "blogs",
      "images",
      "videos",
      "home-sections",
      "about-page",
      "app-page",
    ];
    const currentIndex = order.indexOf(activeTab);
    const isRtl = dir === "rtl";
    const delta =
      event.key === "ArrowRight" ? (isRtl ? -1 : 1) : isRtl ? 1 : -1;
    const nextIndex = (currentIndex + delta + order.length) % order.length;
    const nextTab = order[nextIndex];

    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <div className={styles.wrapper} dir={dir}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleArrowNavigation}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(element) => {
              tabRefs.current[tab.key] = element;
            }}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`${tab.key}-panel`}
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => setActiveTab(tab.key)}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.panel} role="tabpanel" id={`${activeTab}-panel`}>
        {activeTab === "services" && <ServiceManager />}
        {activeTab === "blogs" && <BlogManager />}
        {activeTab === "images" && <ImageManager />}
        {activeTab === "videos" && <VideoManager />}
        {activeTab === "home-sections" && <HomeSectionsManager />}
        {activeTab === "about-page" && <GenericPageManager page="about" />}
        {activeTab === "app-page" && <GenericPageManager page="app" />}
      </div>
    </div>
  );
}
