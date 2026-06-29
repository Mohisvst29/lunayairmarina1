import { NextRequest, NextResponse } from "next/server";
import { readState, writeState } from "@/lib/localDbHelper";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const state = readState();

    let foundPage = "";
    let foundKey = "";
    let foundSection: any = null;

    for (const pageName of Object.keys(state.pageSections)) {
      const pageSections = state.pageSections[pageName];
      for (const key of Object.keys(pageSections)) {
        const sec = pageSections[key];
        if (sec._id === id || sec.key === id || `${pageName}-${key}` === id) {
          foundPage = pageName;
          foundKey = key;
          foundSection = sec;
          break;
        }
      }
      if (foundSection) break;
    }

    if (!foundSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    const { key, page, _id, ...updateData } = body;

    state.pageSections[foundPage][foundKey] = {
      ...foundSection,
      ...updateData,
      _id: foundSection._id,
      page: foundSection.page,
      key: foundSection.key,
    };

    writeState(state);
    return NextResponse.json(state.pageSections[foundPage][foundKey]);
  } catch (error) {
    console.error(`Failed to update page section ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
