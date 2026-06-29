"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import styles from './ImageManager.module.css';
import { useLanguage, Locale } from '@/context/LanguageContext';

// ... imports
// (Keep imports)

type ImageSection =
    | 'hero-home'
    | 'experience-section'
    | 'why-choose-us'
    | 'testimonials'
    | 'about-page'
    | 'contact-page'
    | 'services-banner';

type MediaType = 'image' | 'video';

interface GridFSFile {
    _id: string;
    filename: string;
    uploadDate: string;
    metadata?: {
        category?: string;
        section?: ImageSection | string;
        slug?: string;
        order?: number;
        contentType?: string;
        mediaType?: MediaType;
        cloudinaryUrl?: string; // Cloudinary Support
    };
}

// ... types ...

type SectionCopy = Record<ImageSection, { label: string; group: string }>;

const IMAGE_SECTIONS: Record<Locale, SectionCopy> = {
    en: {
        'hero-home': { label: 'Hero Banner (Main Slider)', group: 'Homepage' },
        'experience-section': { label: 'Experience Section (ocean-sunrise)', group: 'Homepage' },
        'why-choose-us': { label: 'Why Choose Us (relationship-crew)', group: 'Homepage' },
        'testimonials': { label: 'Testimonial Avatars (portrait-vip-1 to 12)', group: 'Homepage' },
        'about-page': { label: 'About Page Images', group: 'About Page' },
        'contact-page': { label: 'Contact Page Images', group: 'Contact Page' },
        'services-banner': { label: 'Services Page Banner', group: 'Services Page' },
    },
    ar: {
        'hero-home': { label: 'البانر الرئيسي (السلايدر)', group: 'الصفحة الرئيسية' },
        'experience-section': { label: 'قسم التجربة (ocean-sunrise)', group: 'الصفحة الرئيسية' },
        'why-choose-us': { label: 'لماذا تختارنا (relationship-crew)', group: 'الصفحة الرئيسية' },
        'testimonials': { label: 'صور الشهادات (portrait-vip-1 إلى 12)', group: 'الصفحة الرئيسية' },
        'about-page': { label: 'صور صفحة من نحن', group: 'صفحة من نحن' },
        'contact-page': { label: 'صور صفحة الاتصال', group: 'صفحة الاتصال' },
        'services-banner': { label: 'بانر صفحة الخدمات', group: 'صفحة الخدمات' },
    },
};

export default function ImageManager() {
    const { language, dir } = useLanguage();
    const [activeSection, setActiveSection] = useState<ImageSection>('hero-home');
    const [images, setImages] = useState<GridFSFile[]>([]);
    const [heroVideos, setHeroVideos] = useState<GridFSFile[]>([]);
    const [replacing, setReplacing] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [replacingImageId, setReplacingImageId] = useState<string | null>(null);
    const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
    const [uploading, setUploading] = useState(false);

    // New Image Upload State
    const [newImageFile, setNewImageFile] = useState<File | null>(null);

    // New Video Upload State
    const [videoInputType, setVideoInputType] = useState<'file' | 'url'>('file');
    const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
    const [videoCloudinaryUrl, setVideoCloudinaryUrl] = useState<string>('');

    const [deleting, setDeleting] = useState<string | null>(null);

    const isHeroSection = activeSection === 'hero-home';

    const copy = language === 'ar'
        ? {
            // ... (keep existing)
            title: 'إدارة الصور',
            description: 'تحديث صور الموقع حسب الأقسام',
            heroDescription: 'إدارة صور وفيديوهات البانر الرئيسي - يمكنك إضافة وحذف وإعادة ترتيب العناصر',
            section: 'القسم',
            selectImage: 'اختر صورة للاستبدال',
            replaceImage: 'استبدال الصورة',
            replacing: 'جاري الاستبدال…',
            imagesInSection: 'الصور في هذا القسم',
            heroMediaTitle: 'وسائط البانر الرئيسي',
            noImages: 'لا توجد صور في هذا القسم بعد',
            noHeroMedia: 'لا توجد صور أو فيديوهات في البانر بعد',
            moveUp: 'تحريك لأعلى',
            moveDown: 'تحريك لأسفل',
            order: 'الترتيب:',
            slide: 'الشريحة',
            heroHint: 'استخدم أزرار التحريك لضبط ترتيب الشرائح في الصفحة',
            updateNote: 'ملاحظة: يمكنك فقط تحديث الصور الموجودة. لا يمكن إضافة أو حذف الصور.',
            heroNote: 'نصيحة: يمكنك إضافة صور وفيديوهات متعددة للبانر الرئيسي. سيتم عرضها كسلايدر.',
            addImage: 'إضافة صورة',
            addVideo: 'إضافة فيديو',
            uploadImage: 'رفع الصورة',
            uploadVideo: 'رفع الفيديو',
            uploading: 'جاري الرفع…',
            delete: 'حذف',
            deleting: 'جاري الحذف…',
            confirmDelete: 'هل أنت متأكد من حذف هذا العنصر؟',
            imageType: 'صورة',
            videoType: 'فيديو',
            useFile: 'ملف',
            useUrl: 'رابط Cloudinary',
            urlPlaceholder: 'https://res.cloudinary.com/...',
        }
        : {
            // ... (keep existing)
            title: 'Image Management',
            description: 'Update website images by section',
            heroDescription: 'Manage hero banner images and videos - add, delete, and reorder items',
            section: 'Section',
            selectImage: 'Select Image to Replace',
            replaceImage: 'Replace Image',
            replacing: 'Replacing…',
            imagesInSection: 'Images in this section',
            heroMediaTitle: 'Hero Banner Media',
            noImages: 'No images in this section yet',
            noHeroMedia: 'No images or videos in the banner yet',
            moveUp: 'Move Up',
            moveDown: 'Move Down',
            order: 'Order:',
            slide: 'Slide',
            heroHint: 'Use move buttons to adjust the order of slides on the site',
            updateNote: 'Note: You can only update existing images. Adding and deleting images is disabled.',
            heroNote: 'Tip: You can add multiple images and videos to the hero banner. They will display as a slider.',
            addImage: 'Add Image',
            addVideo: 'Add Video',
            uploadImage: 'Upload Image',
            uploadVideo: 'Upload Video',
            uploading: 'Uploading…',
            delete: 'Delete',
            deleting: 'Deleting…',
            confirmDelete: 'Are you sure you want to delete this item?',
            imageType: 'Image',
            videoType: 'Video',
            useFile: 'File',
            useUrl: 'Cloudinary URL',
            urlPlaceholder: 'https://res.cloudinary.com/...',
        };

    // ... (UseMemo Logic) ...
    const orderedImages = useMemo(() => {
        return [...images].sort((a, b) => {
            const orderA = typeof a.metadata?.order === 'number' ? a.metadata.order : new Date(a.uploadDate).getTime();
            const orderB = typeof b.metadata?.order === 'number' ? b.metadata.order : new Date(b.uploadDate).getTime();
            return orderA - orderB;
        });
    }, [images]);

    const heroMedia = useMemo(() => {
        if (!isHeroSection) return [];
        const allMedia: (GridFSFile & { isVideo: boolean })[] = [
            ...orderedImages.map(img => ({ ...img, isVideo: false })),
            ...heroVideos.map(vid => ({ ...vid, isVideo: true })),
        ];
        return allMedia.sort((a, b) => {
            const orderA = typeof a.metadata?.order === 'number' ? a.metadata.order : new Date(a.uploadDate).getTime();
            const orderB = typeof b.metadata?.order === 'number' ? b.metadata.order : new Date(b.uploadDate).getTime();
            return orderA - orderB;
        });
    }, [orderedImages, heroVideos, isHeroSection]);

    // ... (Fetch Logic) ...
    const fetchImages = useCallback(async () => {
        const res = await fetch(`/api/admin/images?section=${activeSection}`);
        if (res.ok) {
            const data = await res.json();
            setImages(data);
        }
    }, [activeSection]);

    const fetchHeroVideos = useCallback(async () => {
        if (!isHeroSection) {
            setHeroVideos([]);
            return;
        }
        const res = await fetch('/api/admin/videos?section=hero-home');
        if (res.ok) {
            const data = await res.json();
            setHeroVideos(data);
        }
    }, [isHeroSection]);

    useEffect(() => {
        fetchImages();
        fetchHeroVideos();
    }, [fetchImages, fetchHeroVideos]);

    // ... (Image handlers) ...
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
        if (!e.target.files?.[0]) {
            setSelectedFile(null);
            setReplacingImageId(null);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setReplacingImageId(imageId);
    };

    const handleReplace = async (imageId: string) => {
        if (!selectedFile || replacingImageId !== imageId) return;
        setReplacing(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch(`/api/admin/images/${imageId}`, {
                method: 'PUT',
                body: formData,
            });
            if (res.ok) {
                setSelectedFile(null);
                setReplacingImageId(null);
                await fetchImages();
                const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to replace image');
            }
        } catch (error) {
            console.error('Replace failed', error);
            alert('Failed to replace image');
        } finally {
            setReplacing(false);
        }
    };

    const handleAddImage = async () => {
        if (!newImageFile || !isHeroSection) return;
        setUploading(true);
        // ... (Keep existing implementation)
        const formData = new FormData();
        formData.append('file', newImageFile);
        formData.append('section', 'hero-home');
        formData.append('category', 'hero');
        const maxOrder = Math.max(...heroMedia.map(m => m.metadata?.order || 0), 0);
        formData.append('order', String(maxOrder + 100));

        try {
            const res = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setNewImageFile(null);
                await fetchImages();
                const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleAddVideo = async () => {
        if (videoInputType === 'file' && !newVideoFile) return;
        if (videoInputType === 'url' && !videoCloudinaryUrl) return;
        if (!isHeroSection) return;

        setUploading(true);

        const formData = new FormData();
        if (videoInputType === 'file' && newVideoFile) {
            formData.append('file', newVideoFile);
        } else if (videoInputType === 'url' && videoCloudinaryUrl) {
            formData.append('cloudinaryUrl', videoCloudinaryUrl);
        }

        formData.append('section', 'hero-home');
        formData.append('category', 'hero');
        // Generate a standard slug for hero items if needed, or let API handle generic slug if missing
        // For hero slider videos, we usually just want them in the collection

        const maxOrder = Math.max(...heroMedia.map(m => m.metadata?.order || 0), 0);
        formData.append('order', String(maxOrder + 100));

        try {
            const res = await fetch('/api/admin/videos', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setNewVideoFile(null);
                setVideoCloudinaryUrl('');
                await fetchHeroVideos();
                const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to upload video');
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to upload video');
        } finally {
            setUploading(false);
        }
    };

    // ... (Keep existing handleDelete and handleReorder) ...
    const handleDelete = async (id: string, isVideo: boolean) => {
        if (!confirm(copy.confirmDelete)) return;
        setDeleting(id);

        try {
            const endpoint = isVideo ? `/api/admin/videos/${id}` : `/api/admin/images/${id}`;
            const res = await fetch(endpoint, { method: 'DELETE' });
            if (res.ok) {
                if (isVideo) {
                    await fetchHeroVideos();
                } else {
                    await fetchImages();
                }
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete failed', error);
            alert('Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const handleReorder = useCallback(async (currentIndex: number, direction: 'up' | 'down') => {
        if (!isHeroSection) return;
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= heroMedia.length) return;

        const reordered = [...heroMedia];
        const [moved] = reordered.splice(currentIndex, 1);
        reordered.splice(targetIndex, 0, moved);

        const updates = reordered.map((file, index) => ({
            id: file._id,
            order: (index + 1) * 100,
            isVideo: file.isVideo,
        }));

        setIsUpdatingOrder(true);
        try {
            await Promise.all(
                updates.map((item) => {
                    const endpoint = item.isVideo
                        ? `/api/admin/videos/${item.id}`
                        : `/api/admin/images/${item.id}`;
                    return fetch(endpoint, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ order: item.order }),
                    });
                })
            );
        } finally {
            setIsUpdatingOrder(false);
            await fetchImages();
            await fetchHeroVideos();
        }
    }, [isHeroSection, heroMedia, fetchImages, fetchHeroVideos]);

    // ... (Keep existing groupedSections and formatDate) ...
    const groupedSections = useMemo(() => {
        const sectionData = IMAGE_SECTIONS[language];
        const groups: Record<string, Array<{ key: ImageSection; label: string }>> = {};

        Object.entries(sectionData).forEach(([key, value]) => {
            if (!groups[value.group]) {
                groups[value.group] = [];
            }
            groups[value.group].push({ key: key as ImageSection, label: value.label });
        });

        return groups;
    }, [language]);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString;
        }
    };

    return (
        <div className={styles.container} dir={dir} data-dir={dir}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>{copy.title}</h3>
                    <p className={styles.subtitle}>
                        {isHeroSection ? copy.heroDescription : copy.description}
                    </p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.imagesList}>
                    {/* ... (Keep existing Section Selector) ... */}
                    <div className={styles.sectionSelector}>
                        <label className={styles.label}>{copy.section}</label>
                        <select
                            className={styles.select}
                            value={activeSection}
                            onChange={(e) => setActiveSection(e.target.value as ImageSection)}
                        >
                            {Object.entries(groupedSections).map(([group, items]) => (
                                <optgroup key={group} label={group}>
                                    {items.map(({ key, label }) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <p className={styles.updateNote}>
                            {isHeroSection ? copy.heroNote : copy.updateNote}
                        </p>
                    </div>

                    {/* Hero Section: Add Image/Video Controls */}
                    {isHeroSection && (
                        <div className={styles.uploadSection}>
                            <div className={styles.uploadGroup}>
                                <input
                                    type="file"
                                    id="new-image-upload"
                                    className={styles.hiddenInput}
                                    accept="image/*"
                                    onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                                />
                                <label htmlFor="new-image-upload" className={styles.fileLabel}>
                                    📷 {copy.addImage}
                                </label>
                                {newImageFile && (
                                    <>
                                        <span className={styles.fileName}>{newImageFile.name}</span>
                                        <button
                                            type="button"
                                            className={styles.uploadButton}
                                            onClick={handleAddImage}
                                            disabled={uploading}
                                        >
                                            {uploading ? copy.uploading : copy.uploadImage}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Video Upload Section with URL Support */}
                            <div className={styles.uploadGroup} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
                                    <label style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={videoInputType === 'file'}
                                            onChange={() => setVideoInputType('file')}
                                        /> {copy.useFile}
                                    </label>
                                    <label style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={videoInputType === 'url'}
                                            onChange={() => setVideoInputType('url')}
                                        /> {copy.useUrl}
                                    </label>
                                </div>

                                {videoInputType === 'file' ? (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            id="new-video-upload"
                                            className={styles.hiddenInput}
                                            accept="video/*"
                                            onChange={(e) => setNewVideoFile(e.target.files?.[0] || null)}
                                        />
                                        <label htmlFor="new-video-upload" className={styles.fileLabel}>
                                            🎬 {copy.addVideo}
                                        </label>
                                        {newVideoFile && (
                                            <>
                                                <span className={styles.fileName}>{newVideoFile.name}</span>
                                                <button
                                                    type="button"
                                                    className={styles.uploadButton}
                                                    onClick={handleAddVideo}
                                                    disabled={uploading}
                                                >
                                                    {uploading ? copy.uploading : copy.uploadVideo}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                                        <input
                                            type="text"
                                            placeholder={copy.urlPlaceholder}
                                            value={videoCloudinaryUrl}
                                            onChange={(e) => setVideoCloudinaryUrl(e.target.value)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #ccc',
                                                fontSize: '0.9rem',
                                                width: '100%',
                                                maxWidth: '300px'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={styles.uploadButton}
                                            onClick={handleAddVideo}
                                            disabled={uploading || !videoCloudinaryUrl}
                                        >
                                            {uploading ? copy.uploading : copy.addVideo}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Media List */}
                    <div className={styles.listHeader}>
                        <h4 className={styles.panelTitle}>
                            {isHeroSection ? copy.heroMediaTitle : copy.imagesInSection}
                        </h4>
                        {isHeroSection && heroMedia.length > 1 && (
                            <p className={styles.heroHint}>{copy.heroHint}</p>
                        )}
                    </div>

                    {isHeroSection ? (
                        <>
                            {heroMedia.length === 0 && (
                                <p className={styles.emptyState}>{copy.noHeroMedia}</p>
                            )}
                            <div className={styles.imageGrid}>
                                {heroMedia.map((item, index) => {
                                    const slug = item.metadata?.slug;
                                    return (
                                        <div key={item._id} className={styles.imageCard}>
                                            <div className={styles.imagePreview}>
                                                {item.isVideo ? (
                                                    <video
                                                        src={item.metadata?.cloudinaryUrl || `/api/videos/${item._id}`}
                                                        className={styles.videoThumbnail}
                                                        muted
                                                        preload="metadata"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={`/api/images/${item._id}`}
                                                        alt={item.filename}
                                                        fill
                                                        className={styles.thumbnail}
                                                        sizes="300px"
                                                        unoptimized={true}
                                                    />
                                                )}
                                                <span className={styles.mediaTypeBadge}>
                                                    {item.isVideo ? `🎬 ${copy.videoType}` : `📷 ${copy.imageType}`}
                                                </span>
                                            </div>
                                            <div className={styles.imageInfo}>
                                                <p className={styles.imageName}>
                                                    {item.metadata?.cloudinaryUrl ? 'Cloudinary Video' : item.filename}
                                                </p>
                                                {item.metadata?.cloudinaryUrl && (
                                                    <p className={styles.imageSlug} style={{ color: '#888', wordBreak: 'break-all', fontSize: '0.8rem' }}>
                                                        {item.metadata.cloudinaryUrl}
                                                    </p>
                                                )}
                                                <p className={styles.imageDate}>{formatDate(item.uploadDate)}</p>
                                                {slug && <p className={styles.imageSlug}>slug: {slug}</p>}
                                                <p className={styles.imageOrder}>
                                                    {copy.slide} {index + 1} • {copy.order} {item.metadata?.order ?? '—'}
                                                </p>
                                            </div>
                                            <div className={styles.imageActions}>
                                                {heroMedia.length > 1 && (
                                                    <div className={styles.orderButtons}>
                                                        {/* ... (Keep existing Order Buttons) ... */}
                                                        <button
                                                            type="button"
                                                            className={styles.orderButton}
                                                            disabled={index === 0 || isUpdatingOrder}
                                                            onClick={() => handleReorder(index, 'up')}
                                                            aria-label={copy.moveUp}
                                                        >
                                                            ↑
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styles.orderButton}
                                                            disabled={index === heroMedia.length - 1 || isUpdatingOrder}
                                                            onClick={() => handleReorder(index, 'down')}
                                                            aria-label={copy.moveDown}
                                                        >
                                                            ↓
                                                        </button>
                                                    </div>
                                                )}
                                                {/* ... (Keep replace for images) ... */}
                                                {!item.isVideo && (
                                                    <div className={styles.replaceGroup}>
                                                        <input
                                                            type="file"
                                                            id={`file-replace-${item._id}`}
                                                            className={styles.hiddenInput}
                                                            onChange={(e) => handleFileSelect(e, item._id)}
                                                            accept="image/*"
                                                        />
                                                        <label htmlFor={`file-replace-${item._id}`} className={styles.replaceLabel}>
                                                            {copy.selectImage}
                                                        </label>
                                                        {replacingImageId === item._id && selectedFile && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleReplace(item._id)}
                                                                className={styles.replaceButton}
                                                                disabled={replacing}
                                                            >
                                                                {replacing ? copy.replacing : copy.replaceImage}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(item._id, item.isVideo)}
                                                    disabled={deleting === item._id}
                                                >
                                                    {deleting === item._id ? copy.deleting : copy.delete}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        // ... (Keep existing Non-Hero List) ...
                        <>
                            {orderedImages.length === 0 && (
                                <p className={styles.emptyState}>{copy.noImages}</p>
                            )}
                            <div className={styles.imageGrid}>
                                {orderedImages.map((img) => {
                                    const slug = img.metadata?.slug;
                                    return (
                                        <div key={img._id} className={styles.imageCard}>
                                            <div className={styles.imagePreview}>
                                                <Image
                                                    src={`/api/images/${img._id}`}
                                                    alt={img.filename}
                                                    fill
                                                    className={styles.thumbnail}
                                                    sizes="300px"
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className={styles.imageInfo}>
                                                <p className={styles.imageName}>{img.filename}</p>
                                                <p className={styles.imageDate}>{formatDate(img.uploadDate)}</p>
                                                {slug && <p className={styles.imageSlug}>slug: {slug}</p>}
                                            </div>
                                            <div className={styles.imageActions}>
                                                <div className={styles.replaceGroup}>
                                                    <input
                                                        type="file"
                                                        id={`file-replace-${img._id}`}
                                                        className={styles.hiddenInput}
                                                        onChange={(e) => handleFileSelect(e, img._id)}
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor={`file-replace-${img._id}`} className={styles.replaceLabel}>
                                                        {copy.selectImage}
                                                    </label>
                                                    {replacingImageId === img._id && selectedFile && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleReplace(img._id)}
                                                            className={styles.replaceButton}
                                                            disabled={replacing}
                                                        >
                                                            {replacing ? copy.replacing : copy.replaceImage}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
