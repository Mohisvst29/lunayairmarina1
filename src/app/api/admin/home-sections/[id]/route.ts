import { NextRequest, NextResponse } from "next/server";
import { readState, writeState } from "@/lib/localDbHelper";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const state = readState();
    const index = state.homeSections.findIndex((s: any) => s._id === id || s.key === id);

    if (index === -1) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    state.homeSections[index] = {
      ...state.homeSections[index],
      ...body,
      key: state.homeSections[index].key,
      label: state.homeSections[index].label,
      order: state.homeSections[index].order,
    };

    writeState(state);
    return NextResponse.json(state.homeSections[index]);
  } catch (error) {
    console.error("Failed to update home section:", error);
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