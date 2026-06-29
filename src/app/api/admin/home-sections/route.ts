import { NextRequest, NextResponse } from "next/server";
import { readState } from "@/lib/localDbHelper";

export async function GET() {
  try {
    const rawSections = readState().homeSections;
    const sections = rawSections.map((s: any) => ({
      _id: s._id || s.key,
      ...s
    }));
    console.log("Fetching local home sections:", sections.length);
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Failed to fetch home sections:", error);
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