import { Schema, models, model } from "mongoose";

export type HomeSectionKey =
  | "hero"
  | "experience"
  | "video"
  | "relationship"
  | "services"
  | "commitment"
  | "contact"
  | "faq";
 
 
const HomeSectionSchema = new Schema(
  {
    page: { type: String, required: true, default: "home", index: true },
    key: { type: String, required: true },
    label: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 100 },
    enabled: { type: Boolean, required: true, default: true },
    content: {
      en: { title: { type: String, default: "" }, description: { type: String, default: "" }, imageId: { type: String, default: null }, videoId: { type: String, default: null } },
      ar: { title: { type: String, default: "" }, description: { type: String, default: "" }, imageId: { type: String, default: null }, videoId: { type: String, default: null } },
      blocks: { type: [Schema.Types.Mixed], default: [] },
      faqs: { type: [Schema.Types.Mixed], default: [] },
    },
  },
  { timestamps: true }
);

// منع تكرار نفس القسم لنفس الصفحة
HomeSectionSchema.index({ page: 1, key: 1 }, { unique: true });

const HomeSection = models.HomeSection || model("HomeSection", HomeSectionSchema, "home_sections");
export default HomeSection;