"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ServiceManager.module.css';
import { useLanguage, Locale } from '@/context/LanguageContext';
import QuillEditor, { quillModules, quillFormats } from './QuillEditor';

interface Blog {
    _id: string;
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
}

type EditableBlog = Omit<Partial<Blog>, 'tags'> & {
    tags?: string[] | string;
};

type LocaleCopy = {
    headerTitle: string;
    addButton: string;
    confirmDelete: string;
    modal: {
        eyebrowNew: string;
        eyebrowEdit: string;
        newTitle: string;
        editTitle: string;
        closeLabel: string;
    };
    fields: {
        titleEn: string;
        titleAr: string;
        excerptEn: string;
        excerptAr: string;
        contentEn: string;
        contentAr: string;
        featuredImage: string;
        extraImages: string;
        category: string;
        author: string;
        authorAr: string;
        published: string;
        tags: string;
    };
    actions: {
        remove: string;
        cancel: string;
        save: string;
        saving: string;
    };
    errors: {
        generic: string;
    };
    banner: {
        manageButton: string;
        title: string;
        current: string;
        uploadLabel: string;
        save: string;
        saving: string;
        success: string;
        error: string;
    };
};

const TEXT: Record<Locale, LocaleCopy> = {
    en: {
        headerTitle: 'Blog Management',
        addButton: 'Add New Blog Post',
        confirmDelete: 'Are you sure you want to delete this blog post?',
        modal: {
            eyebrowNew: 'Create new blog post',
            eyebrowEdit: 'Update existing blog post',
            newTitle: 'New Blog Post',
            editTitle: 'Edit Blog Post',
            closeLabel: 'Close dialog',
        },
        fields: {
            titleEn: 'Title (English)',
            titleAr: 'Title (Arabic)',
            excerptEn: 'Excerpt (English)',
            excerptAr: 'Excerpt (Arabic)',
            contentEn: 'Content (English)',
            contentAr: 'Content (Arabic)',
            featuredImage: 'Featured Image',
            extraImages: 'Extra Images (Max 3)',
            category: 'Category',
            author: 'Author (English)',
            authorAr: 'Author (Arabic)',
            published: 'Published',
            tags: 'Tags (comma-separated)',
        },
        actions: {
            remove: 'Remove',
            cancel: 'Cancel',
            save: 'Save Blog Post',
            saving: 'Saving…',
        },
        errors: {
            generic: 'Failed to save blog post. Please try again.',
        },
        banner: {
            manageButton: 'Manage Banner',
            title: 'Blog Page Banner',
            current: 'Current Banner',
            uploadLabel: 'Upload New Banner',
            save: 'Save Banner',
            saving: 'Saving...',
            success: 'Banner updated successfully',
            error: 'Failed to update banner',
        },
    },
    ar: {
        headerTitle: 'إدارة المدونة',
        addButton: 'إضافة مقال جديد',
        confirmDelete: 'هل أنت متأكد من حذف هذا المقال؟',
        modal: {
            eyebrowNew: 'إنشاء مقال جديد',
            eyebrowEdit: 'تعديل مقال موجود',
            newTitle: 'مقال جديد',
            editTitle: 'تعديل المقال',
            closeLabel: 'إغلاق النافذة',
        },
        fields: {
            titleEn: 'العنوان (بالإنجليزية)',
            titleAr: 'العنوان (بالعربية)',
            excerptEn: 'الملخص (بالإنجليزية)',
            excerptAr: 'الملخص (بالعربية)',
            contentEn: 'المحتوى (بالإنجليزية)',
            contentAr: 'المحتوى (بالعربية)',
            featuredImage: 'الصورة الرئيسية',
            extraImages: 'صور إضافية (أقصى 3)',
            category: 'الفئة',
            author: 'المؤلف (بالإنجليزية)',
            authorAr: 'المؤلف (بالعربية)',
            published: 'منشور',
            tags: 'العلامات (مفصولة بفواصل)',
        },
        actions: {
            remove: 'حذف',
            cancel: 'إلغاء',
            save: 'حفظ المقال',
            saving: 'جارٍ الحفظ…',
        },
        errors: {
            generic: 'تعذر حفظ المقال. يرجى المحاولة مرة أخرى.',
        },
        banner: {
            manageButton: 'إدارة البانر',
            title: 'بانر صفحة المدونة',
            current: 'البانر الحالي',
            uploadLabel: 'رفع بانر جديد',
            save: 'حفظ البانر',
            saving: 'جارٍ الحفظ...',
            success: 'تم تحديث البانر بنجاح',
            error: 'فشل تحديث البانر',
        },
    },
};

export default function BlogManager() {
    const { language, dir } = useLanguage();
    const copy = TEXT[language];
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<EditableBlog>(createEmptyBlog());
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [extraImageFiles, setExtraImageFiles] = useState<(File | null)[]>([null, null, null]);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [internalLinks, setInternalLinks] = useState<Array<{ keyword: string; targetUrl: string; targetType: 'blog' | 'service' | 'page'; title?: string }>>([]);

    // Banner state
    const [bannerId, setBannerId] = useState<string | null>(null);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [bannerLoading, setBannerLoading] = useState(false);

    useEffect(() => {
        fetchBlogs();
        fetchBanner();
    }, []);

    const fetchBlogs = async () => {
        const res = await fetch('/api/admin/blogs');
        if (res.ok) {
            const data = await res.json();
            setBlogs(data);
        }
    };

    const fetchBanner = async () => {
        try {
            const res = await fetch("/api/admin/images?section=blog-banner");
            if (res.ok) {
                const images = await res.json();
                if (Array.isArray(images) && images.length > 0) {
                    setBannerId(images[0]._id);
                }
            }
        } catch (error) {
            console.error('Failed to fetch blog banner', error);
        }
    };

    const openModal = (blog?: Blog) => {
        setCurrentBlog(blog ? { ...blog } : createEmptyBlog());
        setInternalLinks(blog?.internalLinks || []);
        setImageFile(null);
        setExtraImageFiles([null, null, null]);
        setFormError(null);
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsEditing(false);
        setCurrentBlog(createEmptyBlog());
        setInternalLinks([]);
        setImageFile(null);
        setExtraImageFiles([null, null, null]);
        setFormError(null);
    };

    const openBannerModal = () => {
        setImageFile(null);
        setIsBannerModalOpen(true);
    };

    const closeBannerModal = () => {
        setIsBannerModalOpen(false);
        setImageFile(null);
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'blog');
        formData.append('category', 'blog');

        const uploadRes = await fetch('/api/admin/upload-image', {
            method: 'POST',
            body: formData,
        });

        if (!uploadRes.ok) {
            throw new Error('Failed to upload image');
        }

        const uploadJson = await uploadRes.json();
        return uploadJson.fileId as string;
    };

    const resolveImage = async (file: File | null, existingId?: string) => {
        if (file) {
            return uploadFile(file);
        }
        return existingId;
    };

    const resolveExtraImages = async () => {
        const extraImages = currentBlog.extraImages || [];
        const newExtraImages = await Promise.all(
            extraImageFiles.map(async (file, index) => {
                if (file) {
                    return uploadFile(file);
                }
                return extraImages[index] || '';
            })
        );
        return newExtraImages.filter(Boolean); // Remove empty strings if any
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setFormError(null);

        try {
            const url = currentBlog._id
                ? `/api/admin/blogs/${currentBlog._id}`
                : '/api/admin/blogs';
            const method = currentBlog._id ? 'PUT' : 'POST';

            const imageId = await resolveImage(imageFile, currentBlog.featuredImage);
            const extraImageIds = await resolveExtraImages();

            // Parse tags from comma-separated string
            let tags: string[] = [];
            if (currentBlog.tags) {
                if (typeof currentBlog.tags === 'string') {
                    tags = (currentBlog.tags as string).split(',').map(t => t.trim()).filter(Boolean);
                } else if (Array.isArray(currentBlog.tags)) {
                    tags = currentBlog.tags as string[];
                }
            }

            const payload = {
                title: currentBlog.title,
                titleAr: currentBlog.titleAr,
                excerpt: currentBlog.excerpt,
                excerptAr: currentBlog.excerptAr,
                content: currentBlog.content,
                contentAr: currentBlog.contentAr,
                featuredImage: imageId,
                extraImages: extraImageIds,
                category: currentBlog.category,
                slug: currentBlog.slug,
                author: currentBlog.author || 'Lunier Marina Team',
                authorAr: currentBlog.authorAr || 'فريق لونير مارينا',
                published: currentBlog.published ?? false,
                tags,
                internalLinks,
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errorData.error || 'Failed to save blog post');
            }

            closeModal();
            fetchBlogs();
        } catch (error: unknown) {
            console.error('Submit error:', error);
            setFormError(error instanceof Error ? error.message : copy.errors.generic);
        } finally {
            setLoading(false);
        }
    };

    const handleBannerSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!imageFile) return;

        setBannerLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('section', 'blog-banner');
            formData.append('category', 'blog');
            formData.append('slug', 'blog-main-banner');

            const res = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload banner');
            }

            const data = await res.json();
            setBannerId(data.fileId);
            alert(copy.banner.success);
            closeBannerModal();
        } catch (error) {
            console.error('Banner upload error:', error);
            alert(copy.banner.error);
        } finally {
            setBannerLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(copy.confirmDelete)) return;

        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Refetch blogs to ensure UI is in sync with database
                await fetchBlogs();
            } else {
                const errorData = await res.json().catch(() => ({ error: 'Failed to delete blog' }));
                console.error('Delete failed:', errorData);
                alert(errorData.error || 'Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Error deleting blog. Please try again.');
        }
    };

    const addInternalLink = () => {
        setInternalLinks([...internalLinks, { keyword: '', targetUrl: '', targetType: 'page', title: '' }]);
    };

    const removeInternalLink = (index: number) => {
        setInternalLinks(internalLinks.filter((_, i) => i !== index));
    };

    const updateInternalLink = (index: number, field: string, value: string) => {
        const updated = [...internalLinks];
        updated[index] = { ...updated[index], [field]: value };
        setInternalLinks(updated);
    };

    const isEditingExisting = Boolean(currentBlog._id);
    const modalEyebrow = isEditingExisting ? copy.modal.eyebrowEdit : copy.modal.eyebrowNew;
    const modalTitleText = isEditingExisting ? copy.modal.editTitle : copy.modal.newTitle;

    return (
        <div className={styles.container} dir={dir} data-dir={dir}>
            <div className={styles.header}>
                <h3 className={styles.headerTitle}>{copy.headerTitle}</h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className={styles.secondaryButton} onClick={openBannerModal}>
                        {copy.banner.manageButton}
                    </button>
                    <button className={styles.primaryButton} onClick={() => openModal()}>
                        {copy.addButton}
                    </button>
                </div>
            </div>

            {isBannerModalOpen && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal} style={{ maxWidth: '600px' }}>
                        <div className={styles.modalHeader}>
                            <div>
                                <p className={styles.modalEyebrow}>SETTINGS</p>
                                <h4 className={styles.modalTitle}>{copy.banner.title}</h4>
                            </div>
                            <button
                                aria-label={copy.modal.closeLabel}
                                className={styles.closeButton}
                                onClick={closeBannerModal}
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                        <form className={styles.form} onSubmit={handleBannerSubmit}>
                            <div className={styles.formScrollArea}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.banner.current}</label>
                                    {bannerId ? (
                                        <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
                                            <Image
                                                src={`/api/images/${bannerId}`}
                                                alt="Current Banner"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                unoptimized={true}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                            <p style={{ color: 'var(--text-muted)' }}>No banner set</p>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.banner.uploadLabel}</label>
                                    <input
                                        accept="image/*"
                                        className={styles.input}
                                        onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                                        type="file"
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <button className={styles.secondaryButton} onClick={closeBannerModal} type="button">
                                    {copy.actions.cancel}
                                </button>
                                <button className={styles.submitButton} disabled={bannerLoading} type="submit">
                                    {bannerLoading ? copy.banner.saving : copy.banner.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div>
                                <p className={styles.modalEyebrow}>{modalEyebrow}</p>
                                <h4 className={styles.modalTitle}>{modalTitleText}</h4>
                            </div>
                            <button
                                aria-label={copy.modal.closeLabel}
                                className={styles.closeButton}
                                onClick={closeModal}
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formScrollArea}>
                                {formError && <div className={styles.formError}>{formError}</div>}

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.titleEn}</label>
                                    <input
                                        className={styles.input}
                                        onChange={(event) =>
                                            setCurrentBlog({ ...currentBlog, title: event.target.value })
                                        }
                                        required
                                        type="text"
                                        value={currentBlog.title || ''}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.titleAr}</label>
                                    <input
                                        className={styles.input}
                                        onChange={(event) =>
                                            setCurrentBlog({ ...currentBlog, titleAr: event.target.value })
                                        }
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                        type="text"
                                        value={currentBlog.titleAr || ''}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.excerptEn}</label>
                                    <textarea
                                        className={styles.textarea}
                                        onChange={(event) =>
                                            setCurrentBlog({ ...currentBlog, excerpt: event.target.value })
                                        }
                                        required
                                        rows={3}
                                        value={currentBlog.excerpt || ''}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.excerptAr}</label>
                                    <textarea
                                        className={styles.textarea}
                                        onChange={(event) =>
                                            setCurrentBlog({ ...currentBlog, excerptAr: event.target.value })
                                        }
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                        rows={3}
                                        value={currentBlog.excerptAr || ''}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.contentEn}</label>
                                    <div className={styles.quillWrapper}>
                                        <QuillEditor
                                            value={currentBlog.content || ''}
                                            onChange={(content) =>
                                                setCurrentBlog({ ...currentBlog, content })
                                            }
                                            modules={quillModules}
                                            formats={quillFormats}
                                            theme="snow"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.contentAr}</label>
                                    <div className={styles.quillWrapper} style={{ direction: 'rtl' }}>
                                        <QuillEditor
                                            value={currentBlog.contentAr || ''}
                                            onChange={(content) =>
                                                setCurrentBlog({ ...currentBlog, contentAr: content })
                                            }
                                            modules={quillModules}
                                            formats={quillFormats}
                                            theme="snow"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>{copy.fields.category}</label>
                                        <input
                                            className={styles.input}
                                            onChange={(event) =>
                                                setCurrentBlog({ ...currentBlog, category: event.target.value })
                                            }
                                            type="text"
                                            value={currentBlog.category || ''}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>{copy.fields.tags}</label>
                                        <input
                                            className={styles.input}
                                            onChange={(event) =>
                                                setCurrentBlog({ ...currentBlog, tags: event.target.value as string })
                                            }
                                            type="text"
                                            value={typeof currentBlog.tags === 'string' ? currentBlog.tags : (currentBlog.tags || []).join(', ')}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>{copy.fields.author}</label>
                                        <input
                                            className={styles.input}
                                            onChange={(event) =>
                                                setCurrentBlog({ ...currentBlog, author: event.target.value })
                                            }
                                            type="text"
                                            value={currentBlog.author || ''}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>{copy.fields.authorAr}</label>
                                        <input
                                            className={styles.input}
                                            onChange={(event) =>
                                                setCurrentBlog({ ...currentBlog, authorAr: event.target.value })
                                            }
                                            style={{ direction: 'rtl', textAlign: 'right' }}
                                            type="text"
                                            value={currentBlog.authorAr || ''}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            checked={currentBlog.published ?? false}
                                            onChange={(event) =>
                                                setCurrentBlog({ ...currentBlog, published: event.target.checked })
                                            }
                                        />
                                        {' '}{copy.fields.published}
                                    </label>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.featuredImage}</label>
                                    <input
                                        accept="image/*"
                                        className={styles.input}
                                        onChange={(event) => {
                                            setFormError(null);
                                            setImageFile(event.target.files?.[0] ?? null);
                                        }}
                                        type="file"
                                    />
                                    {imageFile && <span className={styles.fileName}>{imageFile.name}</span>}
                                    {currentBlog.featuredImage && !imageFile && (
                                        <div style={{ marginTop: '0.5rem', position: 'relative', width: '200px', height: '120px' }}>
                                            <Image
                                                src={`/api/images/${currentBlog.featuredImage}`}
                                                alt="Featured"
                                                fill
                                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                                                unoptimized={true}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{copy.fields.extraImages}</label>
                                    {[0, 1, 2].map((index) => (
                                        <div key={index} style={{ marginBottom: '1rem' }}>
                                            <input
                                                accept="image/*"
                                                className={styles.input}
                                                onChange={(event) => {
                                                    const newExtraFiles = [...extraImageFiles];
                                                    newExtraFiles[index] = event.target.files?.[0] ?? null;
                                                    setExtraImageFiles(newExtraFiles);
                                                }}
                                                type="file"
                                            />
                                            {extraImageFiles[index] && <span className={styles.fileName}>{extraImageFiles[index]?.name}</span>}
                                            {currentBlog.extraImages?.[index] && !extraImageFiles[index] && (
                                                <div style={{ marginTop: '0.5rem', position: 'relative', width: '100px', height: '60px' }}>
                                                    <Image
                                                        src={`/api/images/${currentBlog.extraImages[index]}`}
                                                        alt={`Extra ${index + 1}`}
                                                        fill
                                                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                        unoptimized={true}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Internal Links Section */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>SEO Internal Links</label>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                        Add contextual links within your blog content to improve SEO and navigation.
                                    </p>
                                    {internalLinks.map((link, index) => (
                                        <div key={index} style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: '1fr 1fr 100px 40px', 
                                            gap: '0.5rem', 
                                            marginBottom: '0.75rem',
                                            padding: '0.75rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '8px'
                                        }}>
                                            <input
                                                type="text"
                                                placeholder="Keyword"
                                                value={link.keyword}
                                                onChange={(e) => updateInternalLink(index, 'keyword', e.target.value)}
                                                className={styles.input}
                                                style={{ marginBottom: 0 }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Target URL (e.g., /services)"
                                                value={link.targetUrl}
                                                onChange={(e) => updateInternalLink(index, 'targetUrl', e.target.value)}
                                                className={styles.input}
                                                style={{ marginBottom: 0 }}
                                            />
                                            <select
                                                value={link.targetType}
                                                onChange={(e) => updateInternalLink(index, 'targetType', e.target.value)}
                                                className={styles.input}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <option value="page">Page</option>
                                                <option value="service">Service</option>
                                                <option value="blog">Blog</option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => removeInternalLink(index)}
                                                className={styles.cardButton}
                                                style={{ 
                                                    background: 'rgba(239, 68, 68, 0.2)', 
                                                    color: '#ef4444',
                                                    padding: '0.5rem'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addInternalLink}
                                        className={styles.secondaryButton}
                                        style={{ marginTop: '0.5rem' }}
                                    >
                                        + Add Internal Link
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <button className={styles.secondaryButton} onClick={closeModal} type="button">
                                    {copy.actions.cancel}
                                </button>
                                <button className={styles.submitButton} disabled={loading} type="submit">
                                    {loading ? copy.actions.saving : copy.actions.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className={styles.cards}>
                {blogs.map((blog) => (
                    <div className={styles.card} key={blog._id}>
                        <div className={styles.thumb}>
                            {blog.featuredImage && (
                                <Image
                                    alt={blog.title}
                                    className={styles.thumbImage}
                                    fill
                                    sizes="120px"
                                    src={`/api/images/${blog.featuredImage}`}
                                    unoptimized={true}
                                />
                            )}
                        </div>
                        <div className={styles.details}>
                            <h4 className={styles.serviceTitle}>{blog.title}</h4>
                            <p className={styles.description}>{blog.excerpt}</p>
                            {blog.titleAr && <h4 className={styles.serviceTitle}>{blog.titleAr}</h4>}
                            {blog.excerptAr && <p className={`${styles.description} ${styles.rtlText}`}>{blog.excerptAr}</p>}
                            {blog.category && <p className={styles.price}>Category: {blog.category}</p>}
                            <p className={styles.price}>Status: {blog.published ? 'Published' : 'Draft'}</p>
                        </div>
                        <div className={styles.cardActions}>
                            <button
                                className={`${styles.cardButton} ${styles.editButton}`}
                                onClick={() => openModal(blog)}
                                type="button"
                            >
                                Edit
                            </button>
                            <button
                                className={`${styles.cardButton} ${styles.deleteButton}`}
                                onClick={() => handleDelete(blog._id)}
                                type="button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function createEmptyBlog(): EditableBlog {
    return {
        title: '',
        titleAr: '',
        excerpt: '',
        excerptAr: '',
        content: '',
        contentAr: '',
        featuredImage: '',
        extraImages: [],
        category: '',
        slug: '',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونير مارينا',
        published: false,
        tags: [],
        internalLinks: [],
    };
}

