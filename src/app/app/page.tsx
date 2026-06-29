import React from "react";
import { getPageSections } from "@/lib/page-sections";
import AppPageClient from "@/components/AppPageClient";

// Force dynamic rendering to ensure fresh CMS data on every request
export const dynamic = "force-dynamic";
export const revalidate = 0;

// src/app/app/page.tsx
export default async function AppShowcasePage(props: {
  searchParams: Promise<any>;
}) {
  // انتظر فك تشفير الـ Params أولاً
  const searchParams = await props.searchParams;

  // الآن يمكنك استخراج اللغة بأمان
  const language = searchParams?.lang || "en";

  const cmsData = await getPageSections("app");

  return <AppPageClient cmsData={{}} language={language} />;
}
