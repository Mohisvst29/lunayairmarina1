"use client";

import { useGlobalMicroInteractions } from "@/hooks/useGlobalMicroInteractions";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Global micro-interactions wrapper component
 * Applies site-wide subtle animations and interactions
 */
export default function GlobalMicroInteractions() {
  const { dir } = useLanguage();
  useGlobalMicroInteractions({ isRTL: dir === "rtl", enabled: true });
  return null;
}





































