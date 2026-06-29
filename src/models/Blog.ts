import mongoose, { Schema, Document, Model, models, model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    titleAr?: string;
    excerpt: string;
    excerptAr?: string;
    content: string;
    contentAr?: string;
    featuredImage?: string;
    extraImages?: string[];
    category?: string;
    slug: string;
    slugAr?: string;
    author?: string;
    authorAr?: string;
    published: boolean;
    tags?: string[];
    internalLinks?: Array<{
        keyword: string;
        targetUrl: string;
        targetType: 'blog' | 'service' | 'page';
        title?: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        titleAr: { type: String },
        excerpt: { type: String, required: true },
        excerptAr: { type: String },
        content: { type: String, required: true },
        contentAr: { type: String },
        featuredImage: { type: String },
        extraImages: [{ type: String }],
        category: { type: String },
        slug: { type: String, required: true, unique: true },
        slugAr: { type: String, unique: true, sparse: true },
        author: { type: String, default: 'Lunier Marina Team' },
        authorAr: { type: String, default: 'فريق لونير مارينا' },
        published: { type: Boolean, default: false },
        tags: [{ type: String }],
        internalLinks: [{
            keyword: { type: String, required: true },
            targetUrl: { type: String, required: true },
            targetType: { type: String, enum: ['blog', 'service', 'page'], required: true },
            title: { type: String }
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

// Indexes
BlogSchema.index({ published: 1, createdAt: -1 });
BlogSchema.index({ category: 1 });

// التعديل هنا:
export type BlogModelType = Model<IBlog>;

const Blog = (models.Blog as BlogModelType) || model<IBlog>('Blog', BlogSchema);

export default Blog;