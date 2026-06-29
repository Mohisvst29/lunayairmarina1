import connectDB from "@/lib/db";
import PageSection from "@/models/PageSection";

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
    console.error(`Error fetching ${page} sections:`, error);
    return null;
  }
}
