import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import HomeSection from "@/models/HomeSection";

export async function GET() {
  try {
    await connectDB();
    const sections = await HomeSection.find({} as any).sort({ order: 1 });
    console.log("Fetching DB home sections:", sections.length);
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Failed to fetch home sections from DB:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  void request;
  return NextResponse.json(
    { error: "Creating new home sections is disabled" },
    { status: 405 }
  );
}