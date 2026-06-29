import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IServiceBenefit {
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    icon?: string;
}

export interface IServiceGalleryItem {
    fileId: string;
    caption?: string;
    captionAr?: string;
    order?: number;
}

export interface IService extends Document {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    detailedDescription?: string;
    detailedDescriptionAr?: string;
    image: string; // GridFS File ID or Filename
    gallery?: IServiceGalleryItem[];
    features?: string[];
    featuresAr?: string[];
    benefits?: IServiceBenefit[];
    advantages?: IServiceBenefit[];
    advantagesTitle?: string;
    advantagesTitleAr?: string;
    benefitsTitle?: string;
    benefitsTitleAr?: string;
    heroBadge?: string;
    heroBadgeAr?: string;
    heroTitle?: string;
    heroTitleAr?: string;
    extra1Enabled?: boolean;
    extra1Title?: string;
    extra1TitleAr?: string;
    extra1Description?: string;
    extra1DescriptionAr?: string;
    extra2Enabled?: boolean;
    extra2Title?: string;
    extra2TitleAr?: string;
    extra2Description?: string;
    extra2DescriptionAr?: string;
    sectionOrder?: string[]; // Order of sections: 'benefits' | 'advantages' | 'extra1' | 'extra2'
    isFeatured?: boolean;
    relatedServices?: Types.ObjectId[];
    slug?: string;
    category?: string;
    order?: number;
    price?: string;
    priceAr?: string;
    metaTitle?: string;
    metaDescription?: string;
    seoImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const GallerySchema = new Schema<IServiceGalleryItem>(
    {
        fileId: { type: String, required: true },
        caption: { type: String },
        captionAr: { type: String },
        order: { type: Number, default: 0 },
    },
    { _id: false }
);

const BenefitSchema = new Schema<IServiceBenefit>(
    {
        title: { type: String },
        titleAr: { type: String },
        description: { type: String },
        descriptionAr: { type: String },
        icon: { type: String },
    },
    { _id: false }
);

const ServiceSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        titleAr: { type: String, required: true },
        description: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        detailedDescription: { type: String },
        detailedDescriptionAr: { type: String },
        image: { type: String, required: true },
        gallery: { type: [GallerySchema], default: [] },
        features: { type: [String], default: [] },
        featuresAr: { type: [String], default: [] },
        benefits: { type: [BenefitSchema], default: [] },
        advantages: { type: [BenefitSchema], default: [] },
        advantagesTitle: { type: String },
        advantagesTitleAr: { type: String },
        benefitsTitle: { type: String },
        benefitsTitleAr: { type: String },
        heroBadge: { type: String },
        heroBadgeAr: { type: String },
        heroTitle: { type: String },
        heroTitleAr: { type: String },
        extra1Enabled: { type: Boolean, default: false },
        extra1Title: { type: String },
        extra1TitleAr: { type: String },
        extra1Description: { type: String },
        extra1DescriptionAr: { type: String },
        extra2Enabled: { type: Boolean, default: false },
        extra2Title: { type: String },
        extra2TitleAr: { type: String },
        extra2Description: { type: String },
        extra2DescriptionAr: { type: String },
        sectionOrder: { type: [String], default: ['benefits', 'advantages', 'extra1', 'extra2'] },
        isFeatured: { type: Boolean, default: false },
        relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
        slug: { type: String, trim: true, index: true, sparse: true },
        category: { type: String },
        order: { type: Number, default: 0 },
        price: { type: String },
        priceAr: { type: String },
        metaTitle: { type: String },
        metaDescription: { type: String },
        seoImage: { type: String },
    },
    {
        timestamps: true,
    }
);

const Service: Model<IService> =
    mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
