"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./HomeSectionsManager.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeImageUrl, normalizeVideoUrl } from "@/utils/imageUrl";
import QuillEditor, { quillModules, quillFormats } from "./QuillEditor";
// --- TypeScript Interfaces ---
type LangType = "ar" | "en";

interface BiLingualString {
  en: string;
  ar: string;
}

interface FAQItem {
  question: BiLingualString;
  answer: BiLingualString;
}

interface ContentBlock {
  en: {
    title: string;
    description: string;
    imageId?: string | null;
  };
  ar: {
    title: string;
    description: string;
    imageId?: string | null;
  };
}

interface SectionContent {
  en: {
    title: string;
    description: string;
    imageId?: string | null;
    videoId?: string | null;
  };
  ar: {
    title: string;
    description: string;
    imageId?: string | null;
    videoId?: string | null;
  };
  faqs?: FAQItem[];
  blocks?: ContentBlock[];
}

interface HomeSection {
  _id: string;
  key:
    | "hero"
    | "experience"
    | "video"
    | "relationship"
    | "services"
    | "commitment"
    | "contact"
    | "faq";
  label: string;
  order: number;
  enabled: boolean;
  content: SectionContent;
}

export default function HomeSectionsManager() {
  const { dir } = useLanguage();
  const [items, setItems] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  // Fetch data

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/home-sections", {
        cache: "no-store",
      });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Update text field
  const updateField = (
    sectionId: string,
    lang: LangType,
    key: "title" | "description" | "videoId" | "imageId", // ضيف imageId هنا
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId) return item;
        return {
          ...item,
          content: {
            ...item.content,
            [lang]: { ...item.content[lang], [key]: value },
          },
        };
      }),
    );
  };
  const handleVideoUpload = async (
    sectionId: string,
    lang: LangType,
    file: File,
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", "home-sections-video");
    formData.append("language", lang);

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.fileId) {
      return data.fileId; // Return just the ID, we normalize on render
    } else {
      throw new Error("No fileId returned");
    }
  };

  // Update block field
  const updateBlockField = (
    sectionId: string,
    blockIndex: number,
    lang: LangType,
    key: "title" | "description",
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId) return item;
        const blocks = [...(item.content.blocks || [])];
        if (!blocks[blockIndex]) {
          blocks[blockIndex] = {
            en: { title: "", description: "", imageId: null },
            ar: { title: "", description: "", imageId: null },
          };
        }
        blocks[blockIndex] = {
          ...blocks[blockIndex],
          [lang]: { ...blocks[blockIndex][lang], [key]: value },
        };
        return {
          ...item,
          content: { ...item.content, blocks },
        };
      }),
    );
  };

  // Update enabled status
  const toggleEnabled = (sectionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId) return item;
        return { ...item, enabled: !item.enabled };
      }),
    );
  };

  // Image upload
  const handleImageUpload = async (
    sectionId: string,
    lang: LangType,
    file: File,
    blockIndex?: number,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", "home-sections");

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        setItems((prev) =>
          prev.map((item) => {
            if (item._id !== sectionId) return item;
            if (blockIndex !== undefined) {
              const blocks = [...(item.content.blocks || [])];
              if (!blocks[blockIndex]) {
                blocks[blockIndex] = {
                  en: { title: "", description: "", imageId: null },
                  ar: { title: "", description: "", imageId: null },
                };
              }
              blocks[blockIndex] = {
                ...blocks[blockIndex],
                [lang]: { ...blocks[blockIndex][lang], imageId: data.url },
              };
              return { ...item, content: { ...item.content, blocks } };
            } else {
              return {
                ...item,
                content: {
                  ...item.content,
                  [lang]: { ...item.content[lang], imageId: data.url },
                },
              };
            }
          }),
        );
      } else {
        alert("Failed to get image URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    }
  };

  // Video upload

  // FAQ management
  const addFaq = (sectionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId) return item;
        const faqs = [...(item.content.faqs || [])];
        faqs.push({
          question: { en: "", ar: "" },
          answer: { en: "", ar: "" },
        });
        return {
          ...item,
          content: { ...item.content, faqs },
        };
      }),
    );
  };

  const updateFaq = (
    sectionId: string,
    index: number,
    field: "question" | "answer",
    lang: LangType,
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId || !item.content.faqs) return item;
        const faqs = [...item.content.faqs];
        faqs[index] = {
          ...faqs[index],
          [field]: { ...faqs[index][field], [lang]: value },
        };
        return {
          ...item,
          content: { ...item.content, faqs },
        };
      }),
    );
  };

  const removeFaq = (sectionId: string, index: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== sectionId || !item.content.faqs) return item;
        const faqs = item.content.faqs.filter((_, i) => i !== index);
        return {
          ...item,
          content: { ...item.content, faqs },
        };
      }),
    );
  };

  // Save changes
  const handleSave = async (id: string) => {
    const itemToSave = items.find((it) => it._id === id);
    if (!itemToSave) return;

    const { _id, ...savePayload } = itemToSave;
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/home-sections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savePayload),
      });

      if (res.ok) alert("Changes saved successfully ✨");
      else throw new Error("Failed to save");
    } catch (err) {
      alert("Error saving changes");
    } finally {
      setSavingId(null);
    }
  };

  // لتتبع حالة الرفع: { "item_id-lang": true }

  // 1. تعريف حالة التحميل لكل حقل بشكل منفصل
  const [uploadingStatus, setUploadingStatus] = useState<
    Record<string, boolean>
  >({});

  // 2. الدالة الأساسية بعد التعديل
  const handleMediaUpload = async (
    itemId: string,
    lang: LangType,
    file: File,
  ) => {
    const fieldKey = `${itemId}-${lang}`;
    setUploadingStatus((prev) => ({ ...prev, [fieldKey]: true }));

    try {
      const isVideo = file.type.startsWith("video/");
      let uploadedRef = "";

      if (isVideo) {
        uploadedRef = await handleVideoUpload(itemId, lang, file);
        updateField(itemId, lang, "videoId", uploadedRef);
        updateField(itemId, lang, "imageId", ""); // Clear image if video exists
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("section", "home-sections");
        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          updateField(itemId, lang, "imageId", data.url);
          updateField(itemId, lang, "videoId", ""); // Clear video if image exists
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload media");
    } finally {
      setUploadingStatus((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };
  return (
    <div className={styles.container} dir={dir}>
      <header className={styles.header}>
        <h2 className={styles.title}>Home Sections Manager</h2>
        <p className={styles.subtitle}>
          Customize your website's landing page sections
        </p>
      </header>

      {loading ? (
        <div className={styles.loader}>Loading sections...</div>
      ) : (
        <div className={styles.sectionList}>
          {items.map((item) => (
            <div
              key={item._id}
              className={`${styles.sectionCard} ${openSectionId === item._id ? styles.isOpen : ""}`}
            >
              {/* Header */}
              <div className={styles.sectionHeader}>
                <div
                  className={styles.headerMain}
                  onClick={() =>
                    setOpenSectionId(
                      openSectionId === item._id ? null : item._id,
                    )
                  }
                >
                  <div className={styles.keyBadge}>{item.key}</div>
                  <span className={styles.sectionLabel}>{item.label}</span>
                  <span className={styles.chevron}>
                    {openSectionId === item._id ? "▲" : "▼"}
                  </span>
                </div>

                <div className={styles.headerActions}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleEnabled(item._id)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              {/* Content */}
              {openSectionId === item._id && (
                <div className={styles.sectionBody}>
                  {/* Conditional Rendering based on key */}
                  {(item.key === "hero" || item.key === "experience") && (
                    <>
                      {/* Title */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Title</div>
                        <div className={styles.inputPair}>
                          <input
                            dir="rtl"
                            className={styles.input}
                            value={item.content.ar?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="العنوان بالعربية"
                          />
                          <input
                            dir="ltr"
                            className={styles.input}
                            value={item.content.en?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Title in English"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Description</div>
                        <div className={styles.inputPair}>
                          <textarea
                            dir="rtl"
                            className={styles.textarea}
                            value={item.content.ar?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="الوصف بالعربية"
                            rows={3}
                          />
                          <textarea
                            dir="ltr"
                            className={styles.textarea}
                            value={item.content.en?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Description in English"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* MEDIA (Image OR Video) */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Media</div>
                        <div className={styles.uploadPair}>
                          {(["ar", "en"] as const).map((lang) => (
                            <div key={lang} className={styles.uploadBox}>
                              <label className={styles.uploadLabel}>
                                {lang === "ar"
                                  ? "Arabic Media"
                                  : "English Media"}
                              </label>

                              {/* Preview */}
                              <div className={styles.mediaPreview}>
                                {item.content[lang]?.videoId ? (
                                  <video controls className={styles.preview}>
                                    <source
                                      src={normalizeVideoUrl(
                                        item.content[lang].videoId,
                                      )}
                                    />
                                  </video>
                                ) : item.content[lang]?.imageId ? (
                                  <img
                                    src={normalizeImageUrl(
                                      item.content[lang].imageId || "",
                                    )}
                                    className={styles.preview}
                                    alt="preview"
                                  />
                                ) : (
                                  <div className={styles.noImage}>No Media</div>
                                )}
                              </div>

                              {/* Upload */}
                              <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleMediaUpload(item._id, lang, file);
                                }}
                              />

                              {/* Loading */}
                              {uploadingStatus[`${item._id}-${lang}`] && (
                                <div className={styles.loading}>
                                  Uploading...
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {item.key === "services" && (
                    <div className={styles.servicesManager}>
                      {[0, 1].map((idx) => (
                        <div key={idx} className={styles.serviceBlock}>
                          <h4 className={styles.subSectionTitle}>
                            Service Card {idx + 1}
                          </h4>
                          <div className={styles.fieldGrid}>
                            <div className={styles.fieldLabel}>Title</div>
                            <div className={styles.inputPair}>
                              <input
                                dir="rtl"
                                className={styles.input}
                                value={
                                  item.content.blocks?.[idx]?.ar?.title || ""
                                }
                                onChange={(e) =>
                                  updateBlockField(
                                    item._id,
                                    idx,
                                    "ar",
                                    "title",
                                    e.target.value,
                                  )
                                }
                                placeholder="العنوان بالعربية"
                              />
                              <input
                                dir="ltr"
                                className={styles.input}
                                value={
                                  item.content.blocks?.[idx]?.en?.title || ""
                                }
                                onChange={(e) =>
                                  updateBlockField(
                                    item._id,
                                    idx,
                                    "en",
                                    "title",
                                    e.target.value,
                                  )
                                }
                                placeholder="Title in English"
                              />
                            </div>
                          </div>
                          <div className={styles.fieldGrid}>
                            <div className={styles.fieldLabel}>Description</div>
                            <div className={styles.inputPair}>
                              <div
                                className={styles.quillWrapper}
                                style={{ direction: "rtl" }}
                              >
                                <QuillEditor
                                  theme="snow"
                                  value={
                                    item.content.blocks?.[idx]?.ar
                                      ?.description || ""
                                  }
                                  onChange={(val) =>
                                    updateBlockField(
                                      item._id,
                                      idx,
                                      "ar",
                                      "description",
                                      val,
                                    )
                                  }
                                  modules={quillModules}
                                  formats={quillFormats}
                                />
                              </div>
                              <div
                                className={styles.quillWrapper}
                                style={{ direction: "ltr" }}
                              >
                                <QuillEditor
                                  theme="snow"
                                  value={
                                    item.content.blocks?.[idx]?.en
                                      ?.description || ""
                                  }
                                  onChange={(val) =>
                                    updateBlockField(
                                      item._id,
                                      idx,
                                      "en",
                                      "description",
                                      val,
                                    )
                                  }
                                  modules={quillModules}
                                  formats={quillFormats}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.fieldGrid}>
                            <div className={styles.fieldLabel}>Image</div>
                            <div className={styles.uploadPair}>
                              <div className={styles.uploadBox}>
                                <label className={styles.uploadLabel}>
                                  Arabic Image
                                </label>
                                <div className={styles.imagePreview}>
                                  {item.content.blocks?.[idx]?.ar?.imageId ? (
                                    <img
                                      src={
                                        normalizeImageUrl(
                                          item.content.blocks[idx].ar.imageId,
                                        ) || ""
                                      }
                                      alt="AR Preview"
                                    />
                                  ) : (
                                    <div className={styles.noImage}>
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file)
                                      handleImageUpload(
                                        item._id,
                                        "ar",
                                        file,
                                        idx,
                                      );
                                  }}
                                />
                              </div>
                              <div className={styles.uploadBox}>
                                <label className={styles.uploadLabel}>
                                  English Image
                                </label>
                                <div className={styles.imagePreview}>
                                  {item.content.blocks?.[idx]?.en?.imageId ? (
                                    <img
                                      src={
                                        normalizeImageUrl(
                                          item.content.blocks[idx].en.imageId,
                                        ) || ""
                                      }
                                      alt="EN Preview"
                                    />
                                  ) : (
                                    <div className={styles.noImage}>
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file)
                                      handleImageUpload(
                                        item._id,
                                        "en",
                                        file,
                                        idx,
                                      );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.key === "video" && (
                    <>
                      {/* حقول العنوان */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Title</div>
                        <div className={styles.inputPair}>
                          <input
                            dir="rtl"
                            className={styles.input}
                            value={item.content.ar?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="العنوان بالعربية"
                          />
                          <input
                            dir="ltr"
                            className={styles.input}
                            value={item.content.en?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Title in English"
                          />
                        </div>
                      </div>

                      {/* حقول الوصف */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Description</div>
                        <div className={styles.inputPair}>
                          <textarea
                            dir="rtl"
                            className={styles.textarea}
                            value={item.content.ar?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="الوصف بالعربية"
                            rows={3}
                          />
                          <textarea
                            dir="ltr"
                            className={styles.textarea}
                            value={item.content.en?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Description in English"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* قسم رفع الفيديو */}
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Video Upload</div>
                        <div className={styles.uploadPair}>
                          {/* فيديو اللغة العربية */}
                          <div className={styles.uploadBox}>
                            <label className={styles.uploadLabel}>
                              Arabic Video (MP4/WebM)
                            </label>
                            <div className={styles.videoPreview}>
                              {/* عرض نسبة التحميل إذا كانت جارية */}
                              {uploadingStatus[`${item._id}_ar`] !==
                              undefined ? (
                                <div className={styles.progressContainer}>
                                  <div
                                    className={styles.progressBar}
                                    style={{
                                      width: `${uploadingStatus[`${item._id}_ar`]}%`,
                                    }}
                                  />
                                  <span className={styles.progressText}>
                                    {uploadingStatus[`${item._id}_ar`]}%
                                  </span>
                                </div>
                              ) : item.content.ar?.videoId ? (
                                <video
                                  controls
                                  preload="metadata"
                                  style={{ maxHeight: "200px", width: "100%" }}
                                >
                                  <source
                                    src={`/api/videos/${item.content.ar.videoId}`}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <div className={styles.noImage}>No Video</div>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              className={styles.fileInput}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                  handleVideoUpload(item._id, "ar", file);
                              }}
                            />
                          </div>

                          {/* فيديو اللغة الإنجليزية */}
                          <div className={styles.uploadBox}>
                            <label className={styles.uploadLabel}>
                              English Video (MP4/WebM)
                            </label>
                            <div className={styles.videoPreview}>
                              {/* عرض نسبة التحميل إذا كانت جارية */}
                              {uploadingStatus[`${item._id}_en`] !==
                              undefined ? (
                                <div className={styles.progressContainer}>
                                  <div
                                    className={styles.progressBar}
                                    style={{
                                      width: `${uploadingStatus[`${item._id}_en`]}%`,
                                    }}
                                  />
                                  <span className={styles.progressText}>
                                    {uploadingStatus[`${item._id}_en`]}%
                                  </span>
                                </div>
                              ) : item.content.en?.videoId ? (
                                <video
                                  controls
                                  preload="metadata"
                                  style={{ maxHeight: "200px", width: "100%" }}
                                >
                                  <source
                                    src={`/api/videos/${item.content.en.videoId}`}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <div className={styles.noImage}>No Video</div>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              className={styles.fileInput}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                  handleVideoUpload(item._id, "en", file);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {item.key === "faq" && (
                    <div className={styles.faqManager}>
                      <div className={styles.faqHeader}>
                        <h4 className={styles.subTitle}>Manage FAQs</h4>
                        <button
                          type="button" // دايماً حدد النوع عشان ما يعملش submit للفورم بالخطأ
                          className={styles.addButton}
                          onClick={() => addFaq(item._id)}
                        >
                          + Add FAQ
                        </button>
                      </div>

                      <div className={styles.faqList}>
                        {/* تأكد من وجود المصفوفة حتى لو فاضية */}
                        {Array.isArray(item.content?.faqs) &&
                        item.content.faqs.length > 0 ? (
                          item.content.faqs.map((faq, idx) => (
                            <div
                              key={`${item._id}-faq-${idx}`}
                              className={styles.faqItem}
                            >
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => removeFaq(item._id, idx)}
                                title="Remove FAQ"
                              >
                                ×
                              </button>

                              {/* Question Field */}
                              <div className={styles.fieldGrid}>
                                <div className={styles.fieldLabel}>
                                  Question
                                </div>
                                <div className={styles.inputPair}>
                                  <input
                                    dir="rtl"
                                    className={styles.input}
                                    value={faq.question?.ar || ""} // تأمين لو الـ object ناقص
                                    onChange={(e) =>
                                      updateFaq(
                                        item._id,
                                        idx,
                                        "question",
                                        "ar",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="السؤال"
                                  />
                                  <input
                                    dir="ltr"
                                    className={styles.input}
                                    value={faq.question?.en || ""}
                                    onChange={(e) =>
                                      updateFaq(
                                        item._id,
                                        idx,
                                        "question",
                                        "en",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Question"
                                  />
                                </div>
                              </div>

                              {/* Answer Field */}
                              <div className={styles.fieldGrid}>
                                <div className={styles.fieldLabel}>Answer</div>
                                <div className={styles.inputPair}>
                                  <textarea
                                    dir="rtl"
                                    className={styles.textarea}
                                    value={faq.answer?.ar || ""}
                                    onChange={(e) =>
                                      updateFaq(
                                        item._id,
                                        idx,
                                        "answer",
                                        "ar",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="الإجابة"
                                    rows={2}
                                  />
                                  <textarea
                                    dir="ltr"
                                    className={styles.textarea}
                                    value={faq.answer?.en || ""}
                                    onChange={(e) =>
                                      updateFaq(
                                        item._id,
                                        idx,
                                        "answer",
                                        "en",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Answer"
                                    rows={2}
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className={styles.noData}>
                            No FAQs added yet. Click "+ Add FAQ" to start.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fallback for other keys like relationship, commitment, contact */}
                  {["relationship", "commitment", "contact"].includes(
                    item.key,
                  ) && (
                    <>
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Title</div>
                        <div className={styles.inputPair}>
                          <input
                            dir="rtl"
                            className={styles.input}
                            value={item.content.ar?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="العنوان بالعربية"
                          />
                          <input
                            dir="ltr"
                            className={styles.input}
                            value={item.content.en?.title || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Title in English"
                          />
                        </div>
                      </div>
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Section Images</div>
                        <div className={styles.inputPair}>
                          {(["ar", "en"] as const).map((lang) => (
                            <div key={lang} className={styles.uploadWrapper}>
                              {/* الـ Input المخفي */}
                              <input
                                type="file"
                                id={`upload-img-${lang}-${item._id}`}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageUpload(item._id, lang, file);
                                  }
                                }}
                              />

                              {/* زرار الرفع اللي بيشغل الـ input المخفي */}
                              <button
                                type="button"
                                className={`${styles.uploadBtn} ${item.content[lang]?.imageId ? styles.hasFile : ""}`}
                                onClick={() =>
                                  document
                                    .getElementById(
                                      `upload-img-${lang}-${item._id}`,
                                    )
                                    ?.click()
                                }
                              >
                                {item.content[lang]?.imageId
                                  ? "🔄 Change"
                                  : "📁 Upload"}
                                {lang === "ar"
                                  ? " Arabic Image"
                                  : " English Image"}
                              </button>

                              {/* عرض الحالة أو الصورة المصغرة */}
                              {item.content[lang]?.imageId && (
                                <div className={styles.imagePreviewWrapper}>
                                  <span className={styles.fileDone}>✅</span>
                                  <img
                                    src={normalizeImageUrl(
                                      item.content[lang].imageId,
                                    )}
                                    alt="Preview"
                                    className={styles.miniPreview}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.fieldGrid}>
                        <div className={styles.fieldLabel}>Description</div>
                        <div className={styles.inputPair}>
                          <textarea
                            dir="rtl"
                            className={styles.textarea}
                            value={item.content.ar?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "ar",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="الوصف بالعربية"
                            rows={3}
                          />
                          <textarea
                            dir="ltr"
                            className={styles.textarea}
                            value={item.content.en?.description || ""}
                            onChange={(e) =>
                              updateField(
                                item._id,
                                "en",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Description in English"
                            rows={3}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className={styles.saveAction}>
                    <button
                      className={styles.saveButton}
                      disabled={savingId === item._id}
                      onClick={() => handleSave(item._id)}
                    >
                      {savingId === item._id ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
