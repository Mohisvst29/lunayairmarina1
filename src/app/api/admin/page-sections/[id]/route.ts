import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PageSection from "@/models/PageSection";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const body = await request.json();

    const query: any = id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: id }
      : id.includes('-')
        ? { page: id.split('-')[0], key: id.split('-')[1] }
        : { key: id };

    const updateFields: any = {};
    if (body.enabled !== undefined) updateFields.enabled = body.enabled;
    if (body.content !== undefined) updateFields.content = body.content;

    const updatedSection = await PageSection.findOneAndUpdate(
      query,
      { $set: updateFields },
      { new: true } as any
    );

    if (!updatedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error(`Failed to update page section ${id} in DB:`, error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
