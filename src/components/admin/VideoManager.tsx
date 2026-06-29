"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './VideoManager.module.css';
import { useLanguage } from '@/context/LanguageContext';

// ... imports
// (Make sure to keep imports)

interface GridFSFile {
    _id: string;
    filename: string;
    uploadDate: string;
    metadata?: {
        category?: string;
        section?: string;
        slug?: string;
        order?: number;
        language?: string;
        poster?: string; // Image ID for thumbnail
        cloudinaryUrl?: string; // Cloudinary URL
    };
}

type VideoVariant = {
    key: 'en' | 'ar';
    slug: string;
    language: string;
    label: string;
    fallbackSlugs?: string[];
};

const VIDEO_VARIANTS: VideoVariant[] = [
    {
        key: 'en',
        slug: 'homepage-video-en',
        language: 'en',
        label: 'Homepage Video (English)',
        fallbackSlugs: ['homepage-video'], // backward compatibility for existing uploads
    },
    {
        key: 'ar',
        slug: 'homepage-video-ar',
        language: 'ar',
        label: 'فيديو الصفحة الرئيسية (عربي)',
    },
];

export default function VideoManager() {
    const { language, dir } = useLanguage();
    const [videos, setVideos] = useState<GridFSFile[]>([]);
    const [videosBySlug, setVideosBySlug] = useState<Record<string, GridFSFile | null>>({});
    const [replacing, setReplacing] = useState(false);

    // Upload state
    const [inputType, setInputType] = useState<'file' | 'url'>('file');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cloudinaryInput, setCloudinaryInput] = useState<string>('');

    const [replacingVideoId, setReplacingVideoId] = useState<string | null>(null);
    const [selectedVariantSlug, setSelectedVariantSlug] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [uploadingThumbnail, setUploadingThumbnail] = useState<string | null>(null);

    const copy = language === 'ar'
        ? {
            // ... existing copy ...
            title: 'إدارة الفيديو',
            description: 'إدارة فيديو الصفحة الرئيسية لكل لغة (إنجليزي / عربي)',
            homepageVideoEn: 'فيديو الصفحة الرئيسية (إنجليزي)',
            homepageVideoAr: 'فيديو الصفحة الرئيسية (عربي)',
            selectVideo: 'اختر فيديو للاستبدال',
            replaceVideo: 'استبدال الفيديو',
            replacing: 'جاري الاستبدال…',
            uploadVideo: 'رفع فيديو جديد',
            uploading: 'جاري الرفع…',
            videosInSection: 'الفيديو في هذا القسم',
            noVideo: 'لا يوجد فيديو في هذا القسم بعد',
            updateNote: 'يمكنك رفع فيديو مخصص لكل لغة. يمكنك استخدام ملف محلي أو رابط Cloudinary.',
            thumbnail: 'صورة مصغرة (اختياري)',
            thumbnailDesc: 'صورة تظهر أثناء تحميل الفيديو',
            uploadThumbnail: 'رفع صورة مصغرة',
            removeThumbnail: 'إزالة الصورة',
            savingThumbnail: 'جاري الحفظ…',
            useFile: 'رفع ملف',
            useUrl: 'رابط Cloudinary',
            urlPlaceholder: 'https://res.cloudinary.com/...',
            enterUrl: 'أدخل رابط الفيديو',
        }
        : {
            title: 'Video Management',
            description: 'Manage homepage videos per language (English / Arabic)',
            homepageVideoEn: 'Homepage Video (English)',
            homepageVideoAr: 'Homepage Video (Arabic)',
            selectVideo: 'Select Video to Replace',
            replaceVideo: 'Replace Video',
            replacing: 'Replacing…',
            uploadVideo: 'Upload New Video',
            uploading: 'Uploading…',
            videosInSection: 'Video in this section',
            noVideo: 'No video in this section yet',
            updateNote: 'You can upload a dedicated video for each language. Use a local file or Cloudinary URL.',
            thumbnail: 'Thumbnail (Optional)',
            thumbnailDesc: 'Image shown while video is loading',
            uploadThumbnail: 'Upload Thumbnail',
            removeThumbnail: 'Remove Thumbnail',
            savingThumbnail: 'Saving…',
            useFile: 'Upload File',
            useUrl: 'Cloudinary URL',
            urlPlaceholder: 'https://res.cloudinary.com/...',
            enterUrl: 'Enter video URL',
        };

    const fetchVideos = useCallback(async () => {
        // ... (Keep existing fetchVideos implementation)
        const res = await fetch(`/api/admin/videos?section=homepage-video`);
        if (res.ok) {
            const data = await res.json();
            setVideos(data);

            const lookup: Record<string, GridFSFile | null> = {};
            VIDEO_VARIANTS.forEach((variant) => {
                const match = data.find((file: GridFSFile) => {
                    const slug = file.metadata?.slug;
                    return slug === variant.slug || variant.fallbackSlugs?.includes(slug ?? '');
                });
                lookup[variant.slug] = match || null;
            });
            setVideosBySlug(lookup);
        }
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, variantSlug: string, videoId?: string) => {
        if (!e.target.files?.[0]) {
            if (inputType === 'file') setSelectedFile(null);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setReplacingVideoId(videoId || null);
        setSelectedVariantSlug(variantSlug);
    };

    const handleReplace = async (videoId: string, variant: VideoVariant) => {
        if (inputType === 'file' && !selectedFile) return;
        if (inputType === 'url' && !cloudinaryInput) return;

        if (replacingVideoId !== videoId || selectedVariantSlug !== variant.slug) return;

        setReplacing(true);

        const formData = new FormData();
        if (inputType === 'file' && selectedFile) {
            formData.append('file', selectedFile);
        } else if (inputType === 'url' && cloudinaryInput) {
            formData.append('cloudinaryUrl', cloudinaryInput);
        }

        try {
            // Note: Current Replace API might not handle metadata updates properly if it expects a file replacement
            // Ideally we delete and upload new, ensuring same slug.
            // But let's try calling the upload endpoint with logic to replace based on slug?
            // Actually, for replacing, the backend PUT is usually for content replacement.
            // If we are switching from File to URL, simple PUT might fail if not updated. 
            // Let's use the POST endpoint which handles slug conflict by deleting old one.

            formData.append('section', 'homepage-video');
            formData.append('category', 'homepage');
            formData.append('slug', variant.slug);
            formData.append('language', variant.language);

            const createRes = await fetch('/api/admin/videos', {
                method: 'POST',
                body: formData,
            });

            if (createRes.ok) {
                setSelectedFile(null);
                setCloudinaryInput('');
                setReplacingVideoId(null);
                await fetchVideos();
                const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            } else {
                const error = await createRes.json();
                alert(error.error || 'Failed to replace video');
            }
        } catch (error) {
            console.error('Replace failed', error);
            alert('Failed to replace video');
        } finally {
            setReplacing(false);
        }
    };

    const handleUpload = async (variant: VideoVariant) => {
        if (inputType === 'file' && !selectedFile) return;
        if (inputType === 'url' && !cloudinaryInput) return;
        if (selectedVariantSlug !== variant.slug) return;

        setUploading(true);

        const formData = new FormData();
        if (inputType === 'file' && selectedFile) {
            formData.append('file', selectedFile);
        } else if (inputType === 'url' && cloudinaryInput) {
            formData.append('cloudinaryUrl', cloudinaryInput);
        }

        formData.append('section', 'homepage-video');
        formData.append('category', 'homepage');
        formData.append('slug', variant.slug);
        formData.append('language', variant.language);

        try {
            const res = await fetch('/api/admin/videos', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setSelectedFile(null);
                setCloudinaryInput('');
                setReplacingVideoId(null);
                await fetchVideos();
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

    // ... thumbnail handlers (keep as is) ...
    const handleThumbnailUpload = async (videoId: string) => {
        if (!thumbnailFile) return;
        setUploadingThumbnail(videoId);

        try {
            const imageFormData = new FormData();
            imageFormData.append('file', thumbnailFile);
            imageFormData.append('section', 'video-thumbnails');
            imageFormData.append('category', 'videos');

            const uploadRes = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: imageFormData,
            });

            if (!uploadRes.ok) {
                throw new Error('Failed to upload thumbnail image');
            }

            const { fileId } = await uploadRes.json();

            const updateRes = await fetch(`/api/admin/videos/${videoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ poster: fileId }),
            });

            if (updateRes.ok) {
                setThumbnailFile(null);
                await fetchVideos();
            } else {
                throw new Error('Failed to update video with thumbnail');
            }
        } catch (error) {
            console.error('Thumbnail upload failed', error);
            alert('Failed to upload thumbnail');
        } finally {
            setUploadingThumbnail(null);
        }
    };

    const handleRemoveThumbnail = async (videoId: string) => {
        setUploadingThumbnail(videoId);
        try {
            const updateRes = await fetch(`/api/admin/videos/${videoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ poster: null }),
            });

            if (updateRes.ok) {
                await fetchVideos();
            } else {
                throw new Error('Failed to remove thumbnail');
            }
        } catch (error) {
            console.error('Remove thumbnail failed', error);
            alert('Failed to remove thumbnail');
        } finally {
            setUploadingThumbnail(null);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString;
        }
    };

    const renderVariantCard = (variant: VideoVariant, label: string) => {
        const currentVideo = videosBySlug[variant.slug];
        const isSelectedVariant = selectedVariantSlug === variant.slug;
        const hasPendingReplace = replacingVideoId && isSelectedVariant;

        // Helper to check if we can submit
        const canSubmit = inputType === 'file' ? !!selectedFile : !!cloudinaryInput;

        return (
            <div className={styles.videoList} key={variant.slug}>
                <div className={styles.sectionSelector}>
                    <label className={styles.label}>{label}</label>
                    <p className={styles.updateNote}>{copy.updateNote}</p>
                </div>

                <div className={styles.listHeader}>
                    <h4 className={styles.panelTitle}>{copy.videosInSection}</h4>
                </div>

                {/* Input Type Selector */}
                <div className={styles.inputTypeSelector} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <label>
                        <input
                            type="radio"
                            checked={inputType === 'file'}
                            onChange={() => setInputType('file')}
                        /> {copy.useFile}
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={inputType === 'url'}
                            onChange={() => setInputType('url')}
                        /> {copy.useUrl}
                    </label>
                </div>

                {!currentVideo && (
                    <div className={styles.emptyState}>
                        <p>{copy.noVideo}</p>
                        <div className={styles.uploadGroup}>
                            {inputType === 'file' ? (
                                <>
                                    <input
                                        type="file"
                                        id={`video-upload-${variant.slug}`}
                                        className={styles.hiddenInput}
                                        onChange={(e) => handleFileSelect(e, variant.slug)}
                                        accept="video/*"
                                    />
                                    <label htmlFor={`video-upload-${variant.slug}`} className={styles.uploadLabel}>
                                        {copy.uploadVideo}
                                    </label>
                                </>
                            ) : (
                                <input
                                    type="text"
                                    placeholder={copy.urlPlaceholder}
                                    className={styles.urlInput}
                                    value={selectedVariantSlug === variant.slug ? cloudinaryInput : ''}
                                    onChange={(e) => {
                                        setCloudinaryInput(e.target.value);
                                        setSelectedVariantSlug(variant.slug);
                                    }}
                                    style={{ padding: '0.5rem', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            )}

                            {canSubmit && isSelectedVariant && !replacingVideoId && (
                                <button
                                    type="button"
                                    onClick={() => handleUpload(variant)}
                                    className={styles.uploadButton}
                                    disabled={uploading}
                                >
                                    {uploading ? copy.uploading : copy.uploadVideo}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {currentVideo && (
                    <div className={styles.videoCard}>
                        <div className={styles.videoPreview}>
                            <video
                                src={currentVideo.metadata?.cloudinaryUrl || `/api/videos/${currentVideo._id}`}
                                controls
                                className={styles.videoThumbnail}
                                preload="metadata"
                                poster={currentVideo.metadata?.poster ? `/api/images/${currentVideo.metadata.poster}` : undefined}
                            />
                        </div>
                        <div className={styles.videoInfo}>
                            <p className={styles.videoName}>
                                {currentVideo.metadata?.cloudinaryUrl ? 'Cloudinary Hosted' : currentVideo.filename}
                            </p>
                            {currentVideo.metadata?.cloudinaryUrl && (
                                <p className={styles.videoUrl} style={{ fontSize: '0.8rem', color: '#888', wordBreak: 'break-all' }}>
                                    {currentVideo.metadata.cloudinaryUrl}
                                </p>
                            )}
                            <p className={styles.videoDate}>{formatDate(currentVideo.uploadDate)}</p>
                        </div>

                        {/* Thumbnail Section */}
                        <div className={styles.thumbnailSection}>
                            <label className={styles.thumbnailLabel}>{copy.thumbnail}</label>
                            <p className={styles.thumbnailDesc}>{copy.thumbnailDesc}</p>

                            {currentVideo.metadata?.poster ? (
                                <div className={styles.thumbnailPreview}>
                                    <Image
                                        src={`/api/images/${currentVideo.metadata.poster}`}
                                        alt="Video thumbnail"
                                        width={120}
                                        height={68}
                                        className={styles.thumbnailImage}
                                        unoptimized={true}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveThumbnail(currentVideo._id)}
                                        className={styles.removeThumbnailBtn}
                                        disabled={uploadingThumbnail === currentVideo._id}
                                    >
                                        {uploadingThumbnail === currentVideo._id ? copy.savingThumbnail : copy.removeThumbnail}
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.thumbnailUpload}>
                                    <input
                                        type="file"
                                        id={`thumbnail-${variant.slug}`}
                                        className={styles.hiddenInput}
                                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                                        accept="image/*"
                                    />
                                    <label htmlFor={`thumbnail-${variant.slug}`} className={styles.uploadLabel}>
                                        {copy.uploadThumbnail}
                                    </label>
                                    {thumbnailFile && (
                                        <button
                                            type="button"
                                            onClick={() => handleThumbnailUpload(currentVideo._id)}
                                            className={styles.uploadButton}
                                            disabled={uploadingThumbnail === currentVideo._id}
                                        >
                                            {uploadingThumbnail === currentVideo._id ? copy.savingThumbnail : copy.uploadThumbnail}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.videoActions}>
                            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{copy.selectVideo}</p>
                            <div className={styles.replaceGroup}>
                                {inputType === 'file' ? (
                                    <>
                                        <input
                                            type="file"
                                            id={`file-replace-${variant.slug}`}
                                            className={styles.hiddenInput}
                                            onChange={(e) => handleFileSelect(e, variant.slug, currentVideo._id)}
                                            accept="video/*"
                                        />
                                        <label htmlFor={`file-replace-${variant.slug}`} className={styles.replaceLabel}>
                                            {copy.replaceVideo} (File)
                                        </label>
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={copy.urlPlaceholder}
                                        className={styles.urlInput}
                                        style={{ padding: '0.5rem', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                        value={(selectedVariantSlug === variant.slug && replacingVideoId === currentVideo._id) ? cloudinaryInput : ''}
                                        onChange={(e) => {
                                            setCloudinaryInput(e.target.value);
                                            setReplacingVideoId(currentVideo._id);
                                            setSelectedVariantSlug(variant.slug);
                                        }}
                                    />
                                )}

                                {canSubmit && hasPendingReplace && (
                                    <button
                                        type="button"
                                        onClick={() => handleReplace(currentVideo._id, variant)}
                                        className={styles.replaceButton}
                                        disabled={replacing}
                                    >
                                        {replacing ? copy.replacing : copy.replaceVideo}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.container} dir={dir} data-dir={dir}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>{copy.title}</h3>
                    <p className={styles.subtitle}>{copy.description}</p>
                </div>
            </div>

            <div className={styles.content}>
                {VIDEO_VARIANTS.map((variant) =>
                    renderVariantCard(
                        variant,
                        variant.key === 'en'
                            ? copy.homepageVideoEn
                            : copy.homepageVideoAr,
                    ),
                )}
            </div>
        </div>
    );
}
































