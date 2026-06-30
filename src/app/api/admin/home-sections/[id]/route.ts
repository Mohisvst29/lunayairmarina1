import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import HomeSection from "@/models/HomeSection";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: any = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { key: id };

    const updateData: any = {};
    if (body.enabled !== undefined) updateData.enabled = body.enabled;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.page !== undefined) updateData.page = body.page;

    const updatedSection = await HomeSection.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true } as any
    );

    if (!updatedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error("Failed to update home section in DB:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  _context: { params: Promise<{ id: string }> },
) {
  return NextResponse.json(
    { error: "Deleting home sections is disabled" },
    { status: 405 },
  );
}