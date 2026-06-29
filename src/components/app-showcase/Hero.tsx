"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import appStyles from "../../app/app/app.module.css";
import ContourPattern from "../ContourPattern";
import MobileFloatingCard from "./MobileFloatingCard";
import { useLanguage } from "@/context/LanguageContext";
import {
  Fuel,
  ClipboardCheck,
  Shield,
  Info,
  FileText,
  Users,
  Wrench,
  History as HistoryIcon,
  Ship,
  LayoutDashboard,
  ChevronLeft,
  Check,
} from "lucide-react";

interface HeroProps {
  label?: string;
  title?: string;
  titleSuffix?: string;
  description?: string;
  ctaText?: string;
}

export default function Hero({
  label,
  title,
  titleSuffix,
  description,
  ctaText,
}: HeroProps) {
  const { t } = useLanguage();
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mockupContainerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      setIsInteracting(true);
    };

    const handleTouchEnd = () => {
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const handleMouseEnter = () => {
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      setIsInteracting(false);
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero-section">
      {/* Mobile Floating Cards */}
      <MobileFloatingCard section="hero" position="left" />
      <MobileFloatingCard section="hero" position="right" />

      {/* Yacht Background */}
      <div className={styles.yachtBg}></div>

      {/* Background Pattern */}
      <div className={styles.bgPattern}>
        <ContourPattern opacity={0.1} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>
            {label || t("appPage.hero.label")}
          </span>
          <h1 className={styles.title}>
            {title || t("appPage.hero.title")}
            <span className={appStyles.textGold}>
              {" "}
              {titleSuffix || t("appPage.hero.titleSuffix")}
            </span>
          </h1>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: description || t("appPage.hero.description"),
            }}
          />

          <div className={styles.actions}>
            <a href="#contact" className={appStyles.buttonPrimary}>
              {ctaText || t("appPage.hero.askQuestion")}
            </a>
          </div>

          <div className={styles.storeButtons}>
            <a href="#" className={styles.storeBtn}>
              <svg
                className={styles.storeIcon}
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className={styles.storeTextContainer}>
                <span className={styles.storeSmallText}>
                  {t("appPage.hero.downloadAppStore")}
                </span>
                <span className={styles.storeBigText}>
                  {t("appPage.hero.appStore")}
                </span>
              </div>
            </a>
            <a href="#" className={styles.storeBtn}>
              <svg
                className={styles.storeIcon}
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className={styles.storeTextContainer}>
                <span className={styles.storeSmallText}>
                  {t("appPage.hero.getFromGoogle")}
                </span>
                <span className={styles.storeBigText}>
                  {t("appPage.hero.googlePlay")}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div
          ref={mockupContainerRef}
          className={`${styles.mockupContainer} ${isInteracting ? styles.interacting : ""}`}
        >
          {/* Left Floating Card - Mini Checklist */}
          <div className={`${styles.floatingCard} ${styles.floatingCardLeft}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.checklistTitle}>
              <ClipboardCheck size={16} className={styles.iconGreen} />{" "}
              {t("appPage.mockup.checklist.title")}
            </div>
            <div className={styles.checklistSection}>
              <div className={styles.checklistSectionTitle}>
                {t("appPage.mockup.checklist.exterior")}
              </div>
              <div className={styles.checklistItems}>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.washdown")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.windshield")}
                </div>
              </div>
            </div>
            <div className={styles.checklistSection}>
              <div className={styles.checklistSectionTitle}>
                {t("appPage.mockup.checklist.interior")}
              </div>
              <div className={styles.checklistItems}>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.sinks")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.floors")}
                </div>
              </div>
            </div>
          </div>

          {/* Main Phone Mockup */}
          <div className={styles.phoneMockup}>
            <div className={styles.screen}>
              <div className={styles.phoneHeader}>
                <ChevronLeft className={styles.backArrow} />
                <span className={styles.boatName}>
                  {t("appPage.mockup.common.boatName")}
                </span>
              </div>

              <div className={styles.boatImage}>
                <div className={styles.boatImageContent}></div>
              </div>

              <div className={styles.dashboardGrid}>
                <div className={styles.dashboardItem}>
                  <div className={`${styles.dashboardIcon} ${styles.iconBlue}`}>
                    <Fuel size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.tankLevels")}
                  </span>
                  <span className={styles.dashboardValue}>75%</span>
                </div>
                <div className={styles.dashboardItem}>
                  <div
                    className={`${styles.dashboardIcon} ${styles.iconGreen}`}
                  >
                    <ClipboardCheck size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.checklist")}
                  </span>
                  <span className={styles.dashboardValue}>
                    4/5 {t("appPage.mockup.dashboard.done")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div
                    className={`${styles.dashboardIcon} ${styles.iconOrange}`}
                  >
                    <Shield size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.safety")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.valid")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div
                    className={`${styles.dashboardIcon} ${styles.iconPurple}`}
                  >
                    <Info size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.systems")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.good")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div
                    className={`${styles.dashboardIcon} ${styles.iconYellow}`}
                  >
                    <FileText size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.docs")}
                  </span>
                  <span className={styles.dashboardValue}>
                    3 {t("appPage.mockup.dashboard.active")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={`${styles.dashboardIcon} ${styles.iconTeal}`}>
                    <Users size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.crew")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.onBoard")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={`${styles.dashboardIcon} ${styles.iconRed}`}>
                    <Wrench size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.service")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.dueSoon")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={`${styles.dashboardIcon} ${styles.iconPink}`}>
                    <HistoryIcon size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.history")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.view")}
                  </span>
                </div>
                <div className={styles.dashboardItem}>
                  <div
                    className={`${styles.dashboardIcon} ${styles.iconIndigo}`}
                  >
                    <Ship size={20} />
                  </div>
                  <span className={styles.dashboardLabel}>
                    {t("appPage.mockup.dashboard.info")}
                  </span>
                  <span className={styles.dashboardValue}>
                    {t("appPage.mockup.dashboard.details")}
                  </span>
                </div>
              </div>

              <div className={styles.phoneNav}>
                <div className={`${styles.navItem} ${styles.active}`}>
                  <LayoutDashboard size={20} />
                </div>
                <div className={styles.navItem}>
                  <Ship size={20} />
                </div>
                <div className={styles.navItem}>
                  <ClipboardCheck size={20} />
                </div>
                <div className={styles.navItem}>
                  <Wrench size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Card - Details */}
          <div className={`${styles.floatingCard} ${styles.floatingCardRight}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.checklistSection}>
              <div className={styles.checklistSectionTitle}>
                {t("appPage.mockup.checklist.exterior")}
              </div>
              <div className={styles.checklistItems}>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.washdown")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.windshield")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.decks")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.cupholders")}
                </div>
              </div>
            </div>
            <div className={styles.checklistSection}>
              <div className={styles.checklistSectionTitle}>
                {t("appPage.mockup.checklist.interior")}
              </div>
              <div className={styles.checklistItems}>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.sinks")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.floors")}
                </div>
                <div className={styles.checklistItem}>
                  <Check size={14} className={styles.checkmark} />{" "}
                  {t("appPage.mockup.checklist.fingerprints")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
