"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./FeatureSection.module.css";
import MobileFloatingCard from "./MobileFloatingCard";
import { useLanguage } from "@/context/LanguageContext";
import {
  Fuel,
  ClipboardCheck,
  History as HistoryIcon,
  Wrench,
  ChevronLeft,
  LayoutDashboard,
  Ship,
  Check,
} from "lucide-react";

interface FeatureProps {
  number: string;
  title: string;
  description: string;
  imageSrc?: string;
  reversed?: boolean;
  features?: string[];
  variant?: "tankLevels" | "checklist" | "services";
  lightBg?: boolean;
}

export default function FeatureSection({
  title,
  description,
  reversed = false,
  variant = "tankLevels",
  lightBg = false,
}: FeatureProps) {
  const { t } = useLanguage();
  const mockupWrapperRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const { language } = useLanguage();
  useEffect(() => {
    const wrapper = mockupWrapperRef.current;
    if (!wrapper) return;

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

    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const renderFloatingCards = () => {
    if (variant === "tankLevels") {
      return (
        <>
          <div className={`${styles.floatingCard} ${styles.floatingCardLeft}`}>
            <div className={styles.cardHeader}>
              <Fuel size={16} className={styles.iconBlue} />
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardLabel}>
                {t("appPage.mockup.dashboard.tankLevels")}
              </div>
              <div className={styles.cardValue}>75%</div>
            </div>
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingCardRight}`}>
            <div className={styles.cardHeader}>
              <Fuel size={16} className={styles.iconBlue} />
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardLabel}>
                {t("appPage.mockup.dashboard.tankLevels")}
              </div>
              <div className={styles.cardValue}>45%</div>
            </div>
          </div>
        </>
      );
    }

    if (variant === "checklist") {
      return (
        <>
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
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingCardRight}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
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
        </>
      );
    }

    if (variant === "services") {
      return (
        <>
          <div className={`${styles.floatingCard} ${styles.floatingCardLeft}`}>
            <div className={styles.cardHeader}>
              <Wrench size={16} className={styles.iconRed} />
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardLabel}>
                {t("appPage.mockup.services.serviceType")}
              </div>
              <div className={styles.serviceCardName}>
                {t("appPage.mockup.services.bottomPaint")}
              </div>
              <div className={`${styles.serviceCardDue} ${styles.dueRed}`}>
                Sep 19 2024
              </div>
            </div>
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingCardRight}`}>
            <div className={styles.cardHeader}>
              <Wrench size={16} className={styles.iconRed} />
              <span className={styles.cardBoatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardLabel}>
                {t("appPage.mockup.services.serviceType")}
              </div>
              <div className={styles.serviceCardName}>
                {t("appPage.mockup.services.engineService")}
              </div>
              <div className={`${styles.serviceCardDue} ${styles.dueOrange}`}>
                Aug 14 2024
              </div>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  const renderPhoneContent = () => {
    const PhoneNav = ({ activeIndex }: { activeIndex: number }) => (
      <div className={styles.phoneNav}>
        <div
          className={`${styles.navItem} ${activeIndex === 0 ? styles.active : ""}`}
        >
          <LayoutDashboard size={20} />
        </div>
        <div
          className={`${styles.navItem} ${activeIndex === 1 ? styles.active : ""}`}
        >
          <Ship size={20} />
        </div>
        <div
          className={`${styles.navItem} ${activeIndex === 2 ? styles.active : ""}`}
        >
          <ClipboardCheck size={20} />
        </div>
        <div
          className={`${styles.navItem} ${activeIndex === 3 ? styles.active : ""}`}
        >
          <Wrench size={20} />
        </div>
      </div>
    );

    switch (variant) {
      case "tankLevels":
        return (
          <div className={styles.phoneScreen}>
            <div className={styles.phoneHeader}>
              <ChevronLeft className={styles.backArrow} />
              <span className={styles.boatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>
            <div className={styles.screenTitle}>
              <Fuel size={18} className={styles.iconBlue} />{" "}
              {t("appPage.mockup.tanks.title")}
            </div>
            <div className={styles.screenSubtitle}>
              {t("appPage.mockup.common.lastUpdatedToday")}
            </div>

            <div className={styles.tankLevels}>
              <div className={styles.tankItem}>
                <span className={styles.tankLabel}>
                  {t("appPage.mockup.tanks.diesel")}
                </span>
                <div className={styles.tankBar}>
                  <div
                    className={`${styles.tankFill} ${styles.tankFillDiesel}`}
                  ></div>
                </div>
                <div className={styles.tankScale}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div className={styles.tankItem}>
                <span className={styles.tankLabel}>
                  {t("appPage.mockup.tanks.water")}
                </span>
                <div className={styles.tankBar}>
                  <div
                    className={`${styles.tankFill} ${styles.tankFillWater}`}
                  ></div>
                </div>
                <div className={styles.tankScale}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div className={styles.tankItem}>
                <span className={styles.tankLabel}>
                  {t("appPage.mockup.tanks.waste")}
                </span>
                <div className={styles.tankBar}>
                  <div
                    className={`${styles.tankFill} ${styles.tankFillWaste}`}
                  ></div>
                </div>
                <div className={styles.tankScale}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div className={styles.tankItem}>
                <span className={styles.tankLabel}>
                  {t("appPage.mockup.tanks.gas")}
                </span>
                <div className={styles.tankBar}>
                  <div
                    className={`${styles.tankFill} ${styles.tankFillGas}`}
                  ></div>
                </div>
                <div className={styles.tankScale}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            <PhoneNav activeIndex={1} />
          </div>
        );

      case "checklist":
        return (
          <div className={styles.phoneScreen}>
            <div className={styles.phoneHeader}>
              <ChevronLeft className={styles.backArrow} />
              <span className={styles.boatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>

            <div className={styles.checklistContent}>
              <div className={styles.checklistHeader}>
                <div className={styles.screenTitle}>
                  <ClipboardCheck size={18} className={styles.iconGreen} />{" "}
                  {t("appPage.mockup.checklist.title")}
                </div>
                <div className={styles.historyBtn}>
                  <HistoryIcon size={14} />{" "}
                  {t("appPage.mockup.checklist.history")}
                </div>
              </div>
              <div className={styles.screenSubtitle}>
                {t("appPage.mockup.common.lastUpdatedYesterday")}
              </div>

              <div className={styles.checklistSection}>
                <div className={styles.sectionTitle}>
                  {t("appPage.mockup.checklist.exterior")}
                </div>
                <div className={styles.checklistItems}>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.washdown")}
                  </div>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.windshield")}
                  </div>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.decks")}
                  </div>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.cupholders")}
                  </div>
                </div>
              </div>

              <div className={styles.checklistSection}>
                <div className={styles.sectionTitle}>
                  {t("appPage.mockup.checklist.interior")}
                </div>
                <div className={styles.checklistItems}>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.sinks")}
                  </div>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.floors")}
                  </div>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.fingerprints")}
                  </div>
                </div>
              </div>

              <div className={styles.checklistSection}>
                <div className={styles.sectionTitle}>
                  {t("appPage.mockup.checklist.bellowDeck")}
                </div>
                <div className={styles.checklistItems}>
                  <div className={styles.checklistItem}>
                    <Check size={14} className={styles.itemCheck} />
                    {t("appPage.mockup.checklist.strainer")}
                  </div>
                </div>
              </div>
            </div>
            <PhoneNav activeIndex={2} />
          </div>
        );

      case "services":
        return (
          <div className={styles.phoneScreen}>
            <div className={styles.phoneHeader}>
              <ChevronLeft className={styles.backArrow} />
              <span className={styles.boatName}>
                {t("appPage.mockup.common.boatName")}
              </span>
            </div>

            <div className={styles.servicesContent}>
              <div className={styles.servicesTitle}>
                <Wrench size={18} className={styles.iconRed} />{" "}
                {t("appPage.mockup.services.title")}
              </div>

              <div className={styles.servicesList}>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.bottomPaint")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueRed}`}>
                    Sep 19 2024
                  </span>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.engineService")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueOrange}`}>
                    Aug 14 2024
                  </span>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.driveService")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueGreen}`}>
                    {t("appPage.mockup.services.noDueDate")}
                  </span>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.generatorService")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueRed}`}>
                    Sep 15 2024
                  </span>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.seakeeperService")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueOrange}`}>
                    Aug 10 2024
                  </span>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceType}>
                      {t("appPage.mockup.services.serviceType")}
                    </span>
                    <span className={styles.serviceName}>
                      {t("appPage.mockup.services.acService")}
                    </span>
                  </div>
                  <span className={`${styles.serviceDue} ${styles.dueGray}`}>
                    {t("appPage.mockup.services.noDueDate")}
                  </span>
                </div>
              </div>
            </div>
            <PhoneNav activeIndex={3} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`${lightBg ? styles.lightBgWrapper : styles.darkBgWrapper}`}
      id={`${variant}-section`}
    >
      <div
        className={`${styles.section} ${reversed ? styles.reversed : ""}`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {/* باقي المحتوى زي ما هو */}
        <MobileFloatingCard section={variant} position="left" />
        <MobileFloatingCard section={variant} position="right" />

        <div
          ref={mockupWrapperRef}
          className={`${styles.mockupWrapper} ${isInteracting ? styles.interacting : ""}`}
        >
          {renderFloatingCards()}
          <div className={styles.phoneMockup}>{renderPhoneContent()}</div>
        </div>

        <div className={styles.content}>
          <div className={styles.waveDivider}>~~~</div>
          <h2 className={styles.title}>{title}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}
