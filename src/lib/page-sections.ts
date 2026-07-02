import connectDB from "@/lib/db";
import PageSection from "@/models/PageSection";
import { readState } from "@/lib/localDbHelper";

export async function getPageSections(page: string) {
  try {
    await connectDB();
    const sections = await PageSection.find({ page, enabled: true }).sort({ order: 1 }).exec();
    
    const result: Record<string, any> = {};
    sections.forEach((sec) => {
      result[sec.key] = {
        _id: sec._id.toString(),
        page: sec.page,
        key: sec.key,
        label: sec.label,
        order: sec.order,
        enabled: sec.enabled,
        content: sec.content
      };
    });
    return result;
  } catch (error) {
    console.warn(`Error fetching ${page} sections from DB, falling back to localState:`, error);
    try {
      const state = readState();
      const localSections = state.pageSections?.[page];
      if (localSections) {
        const result: Record<string, any> = {};
        Object.entries(localSections).forEach(([key, val]: [string, any]) => {
          result[key] = {
            _id: `${page}-${key}`,
            page,
            key,
            label: key,
            order: 0,
            enabled: true,
            content: val
          };
        });
        return result;
      }
    } catch (fallbackError) {
      console.error("Local pageSections fallback failed:", fallbackError);
    }
    return null;
  }
}
