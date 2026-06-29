import mongoose, { Schema, models, model, Model } from "mongoose";

// 1. تعريف الـ Interface (لو مش موجود عندك في مكان تاني)
export interface IPageSection {
  page: "about" | "app";
  key: string;
  label: string;
  order: number;
  enabled: boolean;
  content: any; // استخدمنا any هنا لتسهيل التعامل مع الهياكل المعقدة في الـ Build
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    page: {
      type: String,
      required: true,
      enum: ["about", "app"],
    },
    key: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 100,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    content: {
      en: {
        badge: { type: String, default: "", trim: true },
        title: { type: String, default: "", trim: true },
        lead: { type: String, default: "", trim: true },
        description: { type: String, default: "", trim: true },
        quote: { type: String, default: "", trim: true },
        imageId: { type: String, default: null },
        videoId: { type: String, default: null },
        buttonText: { type: String, default: "", trim: true },
        buttonUrl: { type: String, default: "", trim: true },
      },
      ar: {
        badge: { type: String, default: "", trim: true },
        title: { type: String, default: "", trim: true },
        lead: { type: String, default: "", trim: true },
        description: { type: String, default: "", trim: true },
        quote: { type: String, default: "", trim: true },
        imageId: { type: String, default: null },
        videoId: { type: String, default: null },
        buttonText: { type: String, default: "", trim: true },
        buttonUrl: { type: String, default: "", trim: true },
      },
      items: [
        {
          en: {
            title: { type: String, default: "", trim: true },
            body: { type: String, default: "", trim: true },
            detail: { type: String, default: "", trim: true },
            value: { type: String, default: "", trim: true },
            label: { type: String, default: "", trim: true },
            imageId: { type: String, default: null },
          },
          ar: {
            title: { type: String, default: "", trim: true },
            body: { type: String, default: "", trim: true },
            detail: { type: String, default: "", trim: true },
            value: { type: String, default: "", trim: true },
            label: { type: String, default: "", trim: true },
            imageId: { type: String, default: null },
          },
          icon: { type: String, default: "" },
          year: { type: String, default: "" },
          url: { type: String, default: "" },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

PageSectionSchema.index({ page: 1, key: 1 }, { unique: true });

// 2. التعديل الجوهري للـ Export
export type PageSectionModelType = Model<IPageSection>;

const PageSection = (models.PageSection as PageSectionModelType) || 
                    model<IPageSection>("PageSection", PageSectionSchema, "page_sections");

export default PageSection;