import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PageSection from "@/models/PageSection";

const ABOUT_DEFAULTS = [
  { page: "about", key: "hero", label: "Hero", order: 100 },
  { page: "about", key: "story", label: "Our Story", order: 200 },
  { page: "about", key: "mission", label: "Mission & Vision", order: 300 },
  { page: "about", key: "values", label: "Our Values", order: 400 },
  { page: "about", key: "client", label: "Client Service", order: 500 },
  { page: "about", key: "services", label: "Service Suite", order: 600 },
  { page: "about", key: "commitments", label: "Our Commitment", order: 700 },
  { page: "about", key: "timeline", label: "Timeline", order: 800 },
  { page: "about", key: "partners", label: "Partners", order: 900 },
  { page: "about", key: "careers", label: "Careers", order: 1000 },
  { page: "about", key: "cta", label: "Call to Action", order: 1100 },
];

const APP_DEFAULTS = [
  { page: "app", key: "overlay", label: "Coming Soon Overlay", order: 100 },
  { page: "app", key: "hero", label: "Hero", order: 200 },
  { page: "app", key: "benefits", label: "Benefits Title", order: 300 },
  { page: "app", key: "feature1", label: "Feature 1: Tank Levels", order: 400 },
  { page: "app", key: "feature2", label: "Feature 2: Checklist", order: 500 },
  { page: "app", key: "feature3", label: "Feature 3: Services", order: 600 },
  { page: "app", key: "faq", label: "FAQ", order: 700 },
  { page: "app", key: "contact", label: "Contact Form", order: 800 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  if (!page || !["about", "app"].includes(page)) {
    return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 });
  }

  try {
    await connectDB();
    const defaults = page === "about" ? ABOUT_DEFAULTS : APP_DEFAULTS;

    const currentSections = await PageSection.find({ page });

    for (const def of defaults) {
      const exists = currentSections.some((s) => s.key === def.key);
      if (!exists) {
        const newSec = new PageSection({
          page: def.page,
          key: def.key,
          label: def.label,
          order: def.order,
          enabled: true,
          content: {
            en: { title: def.label, description: "" },
            ar: { title: def.label, description: "" }
          }
        });
        await newSec.save();
      }
    }

    const allSections = await PageSection.find({ page }).sort({ order: 1 });
    return NextResponse.json(allSections);
  } catch (error) {
    console.error(`Failed to fetch ${page} sections from DB:`, error);
    return NextResponse.json({ error: `Failed to fetch ${page} sections` }, { status: 500 });
  }
}
