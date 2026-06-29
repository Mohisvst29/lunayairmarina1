import React, { useId } from "react";
import styles from "./SectionSeparator.module.css";

export default function SectionSeparator() {
  const id = useId();
  const gradientId1 = `goldGradient-${id}`;
  const gradientId2 = `goldGradientStrong-${id}`;

  return (
    <div className={styles.separator}>
      <svg
        className={styles.wave}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId1} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B5010" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B6914" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6B5010" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id={gradientId2} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a4510" stopOpacity="1" />
            <stop offset="50%" stopColor="#7a6018" stopOpacity="1" />
            <stop offset="100%" stopColor="#5a4510" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* خلفية داكنة كاملة */}
        <rect width="1440" height="120" fill="#0a1628" />

        {/* الشريط الذهبي المتموج - الطبقة السفلية */}
        <path
          d="M0,55 C240,75 480,45 720,60 C960,75 1200,45 1440,60 L1440,80 C1200,65 960,90 720,75 C480,60 240,90 0,75 Z"
          fill={`url(#${gradientId2})`}
        />

        {/* الشريط الذهبي المتموج - الطبقة العلوية أفتح */}
        <path
          d="M0,58 C240,72 480,48 720,62 C960,76 1200,48 1440,62 L1440,72 C1200,58 960,82 720,68 C480,54 240,82 0,68 Z"
          fill={`url(#${gradientId1})`}
        />

        {/* موجة داكنة علوية */}
        <path
          d="M0,0 L1440,0 L1440,55 C1200,45 960,62 720,55 C480,48 240,62 0,55 Z"
          fill="#0a1628"
        />

        {/* موجة داكنة سفلية */}
        <path
          d="M0,80 C240,90 480,72 720,80 C960,88 1200,72 1440,80 L1440,120 L0,120 Z"
          fill="#0a1628"
        />
      </svg>
    </div>
  );
}
