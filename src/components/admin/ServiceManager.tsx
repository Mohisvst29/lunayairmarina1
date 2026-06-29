"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./ServiceManager.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeImageUrl } from "@/utils/imageUrl";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});
import "react-quill-new/dist/quill.snow.css";

const MAX_GALLERY_ITEMS = 4;

// --- Types ---
type GalleryItem = {
  fileId?: string;
  caption?: string;
  captionAr?: string;
};

type BenefitItem = {
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  icon?: string;
};

type CopyShape = {
  headerTitle: string;
  addButton: string;
  confirmDelete: string;
  stats: {
    gallery: (count: number) => string;
    features: (count: number) => string;
    benefits: (count: number) => string;
    advantages: (count: number) => string;
  };
  modal: {
    eyebrowNew: string;
    eyebrowEdit: string;
    newTitle: string;
    editTitle: string;
    closeLabel: string;
  };
  fields: {
    titleEn: string;
    descEn: string;
    titleAr: string;
    descAr: string;
    heroBadgeEn: string;
    heroBadgeAr: string;
    heroTitleEn: string;
    heroTitleAr: string;
    detailedDescEn: string;
    detailedDescAr: string;
    price: string;
    priceAr: string;
    primaryImage: string;
  };
  helpers: {
    imageRequired: string;
    primaryImage: string;
  };
  gallery: {
    title: string;
    description: string;
    empty: (limit: number) => string;
    add: string;
    captionEn: string;
    captionAr: string;
    noImage: string;
    previewAlt: string;
    fileSelected: string;
  };
  features: {
    title: string;
    description: string;
    add: string;
    empty: string;
    placeholderEn: string;
    placeholderAr: string;
  };
  benefits: {
    title: string;
    description: string;
    add: string;
    empty: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    remove: string;
  };
  advantages: {
    title: string;
    description: string;
    add: string;
    empty: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    remove: string;
  };
  relatedServices: {
    title: string;
    description: string;
    empty: string;
    placeholder: string;
    selected: (count: number) => string;
  };
  actions: {
    remove: string;
    cancel: string;
    save: string;
    saving: string;
  };
  errors: {
    primaryImage: string;
    generic: string;
  };
};

const TEXT: Record<string, CopyShape> = {
  en: {
    headerTitle: "Services Management",
    addButton: "Add New Service",
    confirmDelete: "Are you sure you want to delete this service?",
    stats: {
      gallery: (count: number) =>
        `${count} gallery ${count === 1 ? "item" : "items"}`,
      features: (count: number) =>
        `${count} ${count === 1 ? "feature" : "features"}`,
      benefits: (count: number) =>
        `${count} ${count === 1 ? "benefit" : "benefits"}`,
      advantages: (count: number) =>
        `${count} ${count === 1 ? "advantage" : "advantages"}`,
    },
    modal: {
      eyebrowNew: "Create new service",
      eyebrowEdit: "Update existing service",
      newTitle: "New Service",
      editTitle: "Edit Service",
      closeLabel: "Close dialog",
    },
    fields: {
      titleEn: "Service Title (English)",
      descEn: "Service Description (English)",
      titleAr: "Service Title (Arabic)",
      descAr: "Service Description (Arabic)",
      heroBadgeEn: "Hero Badge (English)",
      heroBadgeAr: "Hero Badge (Arabic)",
      heroTitleEn: "Hero Title (English)",
      heroTitleAr: "Hero Title (Arabic)",
      detailedDescEn: "Hero/Detailed Description (English)",
      detailedDescAr: "Hero/Detailed Description (Arabic)",
      price: "Price (Optional)",
      priceAr: "Price (Arabic)",
      primaryImage: "Primary Service Image",
    },
    helpers: {
      imageRequired: "Required for new services.",
      primaryImage: "Please upload a primary service image.",
    },
    gallery: {
      title: "Gallery",
      description:
        "Show up to four detail shots that appear on the public detail page.",
      empty: (limit: number) =>
        `No gallery images yet. Add up to ${limit} slots to showcase the service experience.`,
      add: "Add Image",
      captionEn: "Caption (English)",
      captionAr: "التسمية التوضيحية (عربي)",
      noImage: "No image selected",
      previewAlt: "Gallery preview",
      fileSelected: "New image selected",
    },
    features: {
      title: "Key Features",
      description: "Supports the Key Features list shown on the detail page.",
      add: "Add Feature",
      empty:
        "No features yet. Use the button above to highlight key selling points.",
      placeholderEn: "Feature (English)",
      placeholderAr: "الميزة (عربي)",
    },
    benefits: {
      title: "Benefits",
      description:
        "Displayed in the value section so visitors see tangible outcomes.",
      add: "Add Benefit",
      empty:
        "Add at least one benefit to replace the placeholder copy on the detail page.",
      titleEn: "Title (EN)",
      titleAr: "العنوان (AR)",
      descEn: "Description (EN)",
      descAr: "الوصف (AR)",
      remove: "Remove Benefit",
    },
    advantages: {
      title: "Advantages (Why Choose Us)",
      description: 'Displayed in the "Why Choose" section.',
      add: "Add Advantage",
      empty: "Add at least one advantage.",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      descEn: "Description (EN)",
      descAr: "Description (AR)",
      remove: "Remove Advantage",
    },
    relatedServices: {
      title: "Related Services",
      description:
        "Select up to 4 services to display as related on this service page.",
      empty:
        "No related services selected. Click the dropdown to add related services.",
      placeholder: "Select related services...",
      selected: (count: number) =>
        `${count} service${count === 1 ? "" : "s"} selected`,
    },
    actions: {
      remove: "Remove",
      cancel: "Cancel",
      save: "Save Service",
      saving: "Saving…",
    },
    errors: {
      primaryImage: "Please upload a primary service image.",
      generic: "Failed to save service. Please try again.",
    },
  },
  ar: {
    headerTitle: "إدارة الخدمات",
    addButton: "إضافة خدمة جديدة",
    confirmDelete: "هل أنت متأكد من حذف هذه الخدمة؟",
    stats: {
      gallery: (count: number) => `${count} صورة في المعرض`,
      features: (count: number) => `${count} ميزة`,
      benefits: (count: number) => `${count} فائدة`,
      advantages: (count: number) => `${count} ميزة تنافسية`,
    },
    modal: {
      eyebrowNew: "إنشاء خدمة جديدة",
      eyebrowEdit: "تعديل خدمة حالية",
      newTitle: "خدمة جديدة",
      editTitle: "تعديل الخدمة",
      closeLabel: "إغلاق النافذة",
    },
    fields: {
      titleEn: "عنوان الخدمة (بالإنجليزية)",
      descEn: "وصف الخدمة (بالإنجليزية)",
      titleAr: "عنوان الخدمة (بالعربية)",
      descAr: "وصف الخدمة (بالعربية)",
      heroBadgeEn: "شارة الهيرو (بالإنجليزية)",
      heroBadgeAr: "شارة الهيرو (بالعربية)",
      heroTitleEn: "عنوان الهيرو (بالإنجليزية)",
      heroTitleAr: "عنوان الهيرو (بالعربية)",
      detailedDescEn: "وصف الهيرو/التفصيلي (بالإنجليزية)",
      detailedDescAr: "وصف الهيرو/التفصيلي (بالعربية)",
      price: "السعر (اختياري)",
      priceAr: "السعر (بالعربية)",
      primaryImage: "الصورة الرئيسية للخدمة",
    },
    helpers: {
      imageRequired: "مطلوب للخدمات الجديدة.",
      primaryImage: "يرجى رفع الصورة الرئيسية للخدمة.",
    },
    gallery: {
      title: "المعرض",
      description: "أضف حتى أربع صور توضيحية تظهر في صفحة الخدمة.",
      empty: (limit: number) =>
        `لا توجد صور حالياً. يمكنك إضافة حتى ${limit} صور لإبراز الخدمة.`,
      add: "إضافة صورة",
      captionEn: "التسمية التوضيحية (بالإنجليزية)",
      captionAr: "التسمية التوضيحية (بالعربية)",
      noImage: "لم يتم اختيار صورة",
      previewAlt: "معاينة المعرض",
      fileSelected: "تم اختيار صورة جديدة",
    },
    features: {
      title: "المزايا الرئيسية",
      description: "تظهر هذه العناصر في قسم المزايا في صفحة الخدمة.",
      add: "إضافة ميزة",
      empty: "لا توجد مزايا بعد. استخدم الزر لإضافة أبرز النقاط.",
      placeholderEn: "الميزة (بالإنجليزية)",
      placeholderAr: "الميزة (بالعربية)",
    },
    benefits: {
      title: "الفوائد",
      description: "يتم عرض هذه الفوائد في قسم القيمة المضافة.",
      add: "إضافة فائدة",
      empty: "أضف فائدة واحدة على الأقل لاستبدال النص الافتراضي.",
      titleEn: "العنوان (بالإنجليزية)",
      titleAr: "العنوان (بالعربية)",
      descEn: "الوصف (بالإنجليزية)",
      descAr: "الوصف (بالعربية)",
      remove: "حذف الفائدة",
    },
    advantages: {
      title: "المزايا التنافسية (لماذا نحن)",
      description: 'يتم عرض هذه في قسم "لماذا تختارنا".',
      add: "إضافة ميزة تنافسية",
      empty: "أضف ميزة واحدة على الأقل.",
      titleEn: "العنوان (بالإنجليزية)",
      titleAr: "العنوان (بالعربية)",
      descEn: "الوصف (بالإنجليزية)",
      descAr: "الوصف (بالعربية)",
      remove: "حذف",
    },
    relatedServices: {
      title: "الخدمات ذات الصلة",
      description:
        "اختر ما يصل إلى 4 خدمات لعرضها كخدمات ذات صلة في هذه الصفحة.",
      empty:
        "لم يتم اختيار خدمات ذات صلة. انقر على القائمة المنسدلة لإضافة خدمات.",
      placeholder: "اختر الخدمات ذات الصلة...",
      selected: (count: number) => `${count} خدمة مختارة`,
    },
    actions: {
      remove: "حذف",
      cancel: "إلغاء",
      save: "حفظ الخدمة",
      saving: "جارٍ الحفظ…",
    },
    errors: {
      primaryImage: "يرجى رفع الصورة الرئيسية للخدمة.",
      generic: "تعذر حفظ الخدمة. يرجى المحاولة مرة أخرى.",
    },
  },
} as const;

interface Service {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  detailedDescription?: string;
  detailedDescriptionAr?: string;
  heroBadge?: string;
  heroBadgeAr?: string;
  heroTitle?: string;
  heroTitleAr?: string;
  image: string;
  price?: string;
  priceAr?: string;
  gallery?: GalleryItem[];
  features?: string[];
  featuresAr?: string[];
  benefits?: BenefitItem[];
  advantages?: BenefitItem[];
  relatedServices?: string[];
}

type EditableService = Partial<Service>;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
    [{ direction: "rtl" }],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
  "video",
  "direction",
];

function createEmptyService(data?: Service): EditableService {
  if (data) return { ...data };
  return {
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    detailedDescription: "",
    detailedDescriptionAr: "",
    heroBadge: "",
    heroBadgeAr: "",
    heroTitle: "",
    heroTitleAr: "",
    price: "",
    priceAr: "",
    image: "",
    gallery: [],
    features: [],
    featuresAr: [],
    benefits: [],
    advantages: [],
    relatedServices: [],
  };
}

export default function ServiceManager() {
  const { language, dir } = useLanguage();
  const copy: CopyShape = TEXT[language];

  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [currentService, setCurrentService] =
    useState<EditableService>(createEmptyService());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/services");
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
  };

  // --- DELETE HANDLER (Moved inside the Component) ---
  const handleDelete = async (id: string) => {
    if (!window.confirm(copy.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const openModal = (service?: Service) => {
    const shaped = createEmptyService(service);
    setCurrentService(shaped);
    setImageFile(null);
    setGalleryFiles(new Array(shaped.gallery?.length ?? 0).fill(null));
    setFormError(null);
    setIsEditingExisting(!!service);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentService(createEmptyService());
    setImageFile(null);
    setGalleryFiles([]);
    setFormError(null);
  };

  const uploadFile = async (
    file: File,
    section: "services-primary" | "services-gallery",
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", section);
    formData.append("category", "services");

    const uploadRes = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) throw new Error("Failed to upload image");
    const uploadJson = await uploadRes.json();
    return uploadJson.fileId as string;
  };

  const resolveMainImage = async () => {
    if (imageFile) return uploadFile(imageFile, "services-primary");
    return currentService.image;
  };

  const resolveGallery = async () => {
    const gallery = currentService.gallery ?? [];
    if (gallery.length === 0) return [];

    return await Promise.all(
      gallery.map(async (slot, index) => {
        let fileId = slot.fileId;
        if (galleryFiles[index]) {
          fileId = await uploadFile(galleryFiles[index]!, "services-gallery");
        }
        if (!fileId)
          throw new Error(`Gallery item ${index + 1} requires an image.`);
        return {
          fileId,
          caption: slot.caption ?? "",
          captionAr: slot.captionAr ?? "",
          order: index,
        };
      }),
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);

    try {
      const url = currentService._id
        ? `/api/admin/services/${currentService._id}`
        : "/api/admin/services";
      const method = currentService._id ? "PUT" : "POST";

      const imageId = await resolveMainImage();
      if (!imageId) {
        setFormError(copy.errors.primaryImage);
        setLoading(false);
        return;
      }

      const gallery = await resolveGallery();

      const payload = {
        ...currentService,
        image: imageId,
        gallery,
        relatedServices: Array.isArray(currentService.relatedServices)
          ? currentService.relatedServices
          : [],
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save service");

      closeModal();
      fetchServices();
    } catch (error: any) {
      setFormError(error.message || copy.errors.generic);
    } finally {
      setLoading(false);
    }
  };
  const detectDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };
  return (
    <div className={styles.container} dir={dir} data-dir={dir}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>{copy.headerTitle}</h3>
        <button className={styles.primaryButton} onClick={() => openModal()}>
          {copy.addButton}
        </button>
      </div>

      {isEditing && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEyebrow}>
                  {isEditingExisting
                    ? copy.modal.eyebrowEdit
                    : copy.modal.eyebrowNew}
                </p>
                <h4 className={styles.modalTitle}>
                  {isEditingExisting
                    ? copy.modal.editTitle
                    : copy.modal.newTitle}
                </h4>
              </div>
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formScrollArea}>
                {formError && (
                  <div className={styles.formError}>{formError}</div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {copy.fields.primaryImage}
                  </label>
                  <p className={styles.helperText}>
                    {copy.helpers.primaryImage}
                  </p>
                  <div className={styles.mainImageUpload}>
                    <div className={styles.mainImagePreview}>
                      {currentService.image ? (
                        <Image
                          src={normalizeImageUrl(currentService.image) || ""}
                          alt="Main Preview"
                          fill
                          className={styles.thumbImage}
                        />
                      ) : (
                        <div className={styles.noImagePlaceholder}>
                          No Image
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className={styles.fileInput}
                    />
                    {imageFile && (
                      <p className={styles.fileName}>{imageFile.name}</p>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{copy.fields.titleEn}</label>
                  <input
                    className={styles.input}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        title: e.target.value,
                      })
                    }
                    required
                    value={currentService.title || ""}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{copy.fields.descEn}</label>
                  <div className={styles.quillWrapper}>
                    <ReactQuill
                      theme="snow"
                      value={currentService.description || ""}
                      onChange={(val) =>
                        setCurrentService({
                          ...currentService,
                          description: val,
                        })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{copy.fields.titleAr}</label>
                  <input
                    className={styles.input}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        titleAr: e.target.value,
                      })
                    }
                    required
                    style={{ direction: "rtl", textAlign: "right" }}
                    value={currentService.titleAr || ""}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{copy.fields.descAr}</label>
                  <div
                    className={styles.quillWrapper}
                    style={{ direction: "rtl" }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={currentService.descriptionAr || ""}
                      onChange={(val) =>
                        setCurrentService({
                          ...currentService,
                          descriptionAr: val,
                        })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {copy.fields.detailedDescEn}
                  </label>
                  <div className={styles.quillWrapper}>
                    <ReactQuill
                      theme="snow"
                      value={currentService.detailedDescription || ""}
                      onChange={(val) =>
                        setCurrentService({
                          ...currentService,
                          detailedDescription: val,
                        })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {copy.fields.detailedDescAr}
                  </label>
                  <div
                    className={styles.quillWrapper}
                    style={{ direction: "rtl" }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={currentService.detailedDescriptionAr || ""}
                      onChange={(val) =>
                        setCurrentService({
                          ...currentService,
                          detailedDescriptionAr: val,
                        })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {copy.fields.heroBadgeAr}
                    </label>
                    <input
                      className={styles.input}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          heroBadgeAr: e.target.value,
                        })
                      }
                      style={{ direction: "rtl", textAlign: "right" }}
                      value={currentService.heroBadgeAr || ""}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {copy.fields.heroBadgeEn}
                    </label>
                    <input
                      className={styles.input}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          heroBadge: e.target.value,
                        })
                      }
                      value={currentService.heroBadge || ""}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {copy.fields.heroTitleEn}
                    </label>
                    <input
                      className={styles.input}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          heroTitle: e.target.value,
                        })
                      }
                      value={currentService.heroTitle || ""}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {copy.fields.heroTitleAr}
                    </label>
                    <input
                      className={styles.input}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          heroTitleAr: e.target.value,
                        })
                      }
                      style={{ direction: "rtl", textAlign: "right" }}
                      value={currentService.heroTitleAr || ""}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.secondaryButton}
                  onClick={closeModal}
                  type="button"
                >
                  {copy.actions.cancel}
                </button>
                <button
                  className={styles.primaryButton}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? copy.actions.saving : copy.actions.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.cards}>
        {services.map((service) => (
          <div key={service._id} className={styles.card}>
            <div className={styles.thumb}>
              <Image
                src={
                  normalizeImageUrl(service.image) || "/api/images/placeholder"
                }
                alt={service.title}
                fill
                className={styles.thumbImage}
              />
            </div>
            <div className={styles.details}>
              <h5 className={styles.serviceTitle}>
                {language === "ar" ? service.titleAr : service.title}
              </h5>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html:
                    language === "ar"
                      ? service.descriptionAr
                      : service.description,
                }}
              />
              {service.price && (
                <p className={styles.price}>
                  {language === "ar" ? service.priceAr : service.price}
                </p>
              )}
            </div>
            <div className={styles.cardActions}>
              <button
                onClick={() => openModal(service)}
                className={`${styles.cardButton} ${styles.editButton}`}
              >
                {copy.modal.editTitle}
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className={`${styles.cardButton} ${styles.deleteButton}`}
              >
                {copy.actions.remove}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
