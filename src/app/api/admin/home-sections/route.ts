import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import HomeSection from "@/models/HomeSection";
import { readState } from "@/lib/localDbHelper";

export async function GET() {
  try {
    await connectDB();
    const sections = await HomeSection.find({} as any).sort({ order: 1 });
    console.log("Fetching DB home sections:", sections.length);
    return NextResponse.json(sections);
  } catch (error) {
    console.warn("Failed to fetch home sections from DB, falling back to localState:", error);
    try {
      const state = readState();
      if (state && Array.isArray(state.homeSections)) {
        return NextResponse.json(state.homeSections);
      }
    } catch (fallbackError) {
      console.error("Local state fallback failed:", fallbackError);
    }
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  void request;
  return NextResponse.json(
    { error: "Creating new home sections is disabled" },
    { status: 405 }
  );
}