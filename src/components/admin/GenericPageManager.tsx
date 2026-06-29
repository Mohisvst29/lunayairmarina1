"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./HomeSectionsManager.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeImageUrl } from "@/utils/imageUrl";
import QuillEditor, { quillModules, quillFormats } from "./QuillEditor";

interface PageSectionItem {
  en: {
    title: string;
    body: string;
    detail?: string;
    value?: string;
    label?: string;
    imageId?: string | null;
  };
  ar: {
    title: string;
    body: string;
    detail?: string;
    value?: string;
    label?: string;
    imageId?: string | null;
  };
  icon?: string;
  year?: string;
  url?: string;
}

interface PageSectionContent {
  en: {
    badge?: string;
    title?: string;
    lead?: string;
    description?: string;
    quote?: string;
    imageId?: string | null;
    buttonText?: string;
    buttonUrl?: string;
  };
  ar: {
    badge?: string;
    title?: string;
    lead?: string;
    description?: string;
    quote?: string;
    imageId?: string | null;
    buttonText?: string;
    buttonUrl?: string;
  };
  items?: PageSectionItem[];
}

interface PageSection {
  _id: string;
  page: "about" | "app";
  key: string;
  label: string;
  order: number;
  enabled: boolean;
  content: PageSectionContent;
}

export default function GenericPageManager({
  page,
}: {
  page: "about" | "app";
}) {
  const { language, dir } = useLanguage();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/page-sections?page=${page}`, {
        cache: "no-store",
      });
      const data = await res.json();

      // السحر هنا: بنعمل Filter عشان ناخد نسخة واحدة بس من كل Key
      const uniqueSections = data.filter(
        (section, index, self) =>
          index === self.findIndex((s) => s.key === section.key),
      );

      // ترتيب الأقسام بناءً على حقل order (لو موجود) عشان يظهروا بترتيب الصفحة
      const sortedSections = uniqueSections.sort(
        (a, b) => (a.order || 0) - (b.order || 0),
      );

      setSections(sortedSections);
    } catch (err) {
      console.error(`Fetch ${page} error:`, err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const updateField = (
    sectionId: string,
    lang: "en" | "ar",
    field: keyof PageSectionContent["en"],
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s._id !== sectionId) return s;
        return {
          ...s,
          content: {
            ...s.content,
            [lang]: { ...s.content[lang], [field]: value },
          },
        };
      }),
    );
  };

  const updateItemField = (
    sectionId: string,
    itemIndex: number,
    lang: "en" | "ar",
    field: keyof PageSectionItem["en"],
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s._id !== sectionId) return s;
        const items = [...(s.content.items || [])];
        if (!items[itemIndex]) return s;
        items[itemIndex] = {
          ...items[itemIndex],
          [lang]: { ...items[itemIndex][lang], [field]: value },
        };
        return { ...s, content: { ...s.content, items } };
      }),
    );
  };

  const updateItemMeta = (
    sectionId: string,
    itemIndex: number,
    field: "icon" | "year" | "url",
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s._id !== sectionId) return s;
        const items = [...(s.content.items || [])];
        if (!items[itemIndex]) return s;
        items[itemIndex] = { ...items[itemIndex], [field]: value };
        return { ...s, content: { ...s.content, items } };
      }),
    );
  };

  const handleImageUpload = async (
    sectionId: string,
    lang: "en" | "ar",
    file: File,
    itemIndex?: number,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (itemIndex !== undefined) {
          updateItemField(sectionId, itemIndex, lang, "imageId", data.url);
        } else {
          updateField(sectionId, lang, "imageId", data.url);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleSave = async (sectionId: string) => {
    const section = sections.find((s) => s._id === sectionId);
    if (!section) return;
    setSavingId(sectionId);
    try {
      const res = await fetch(`/api/admin/page-sections/${sectionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      if (res.ok) alert("Saved successfully ✨");
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingId(null);
    }
  };

  const addItem = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s._id !== sectionId) return s;
        const items = [...(s.content.items || [])];
        items.push({
          en: { title: "", body: "" },
          ar: { title: "", body: "" },
        });
        return { ...s, content: { ...s.content, items } };
      }),
    );
  };

  const removeItem = (sectionId: string, index: number) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s._id !== sectionId) return s;
        const items = s.content.items?.filter((_, i) => i !== index) || [];
        return { ...s, content: { ...s.content, items } };
      }),
    );
  };

  return (
    <div className={styles.container} dir={dir}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Manage {page === "about" ? "About" : "App"} Page
        </h2>
      </header>

      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <div className={styles.sectionList}>
          {sections.map((section) => (
            <div
              key={section._id}
              className={`${styles.sectionCard} ${openSectionId === section._id ? styles.isOpen : ""}`}
            >
              <div
                className={styles.sectionHeader}
                onClick={() =>
                  setOpenSectionId(
                    openSectionId === section._id ? null : section._id,
                  )
                }
              >
                <div className={styles.headerMain}>
                  <div className={styles.keyBadge}>{section.key}</div>
                  <span className={styles.sectionLabel}>{section.label}</span>
                </div>
                <span className={styles.chevron}>
                  {openSectionId === section._id ? "▲" : "▼"}
                </span>
              </div>

              {openSectionId === section._id && (
                <div className={styles.sectionBody}>
                  {/* Standard Fields: Badge, Title, Lead, Button */}
                  <div className={styles.fieldGrid}>
                    <div className={styles.fieldLabel}>Header Info</div>
                    <div className={styles.inputPair}>
                      <div>
                        <input
                          className={styles.input}
                          value={section.content.ar?.badge || ""}
                          onChange={(e) =>
                            updateField(
                              section._id,
                              "ar",
                              "badge",
                              e.target.value,
                            )
                          }
                          placeholder="Badge AR"
                          dir="rtl"
                        />
                        <input
                          className={styles.input}
                          value={section.content.en?.badge || ""}
                          onChange={(e) =>
                            updateField(
                              section._id,
                              "en",
                              "badge",
                              e.target.value,
                            )
                          }
                          placeholder="Badge EN"
                        />
                      </div>
                      <div>
                        <input
                          className={styles.input}
                          value={section.content.ar?.title || ""}
                          onChange={(e) =>
                            updateField(
                              section._id,
                              "ar",
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="Title AR"
                          dir="rtl"
                        />
                        <input
                          className={styles.input}
                          value={section.content.en?.title || ""}
                          onChange={(e) =>
                            updateField(
                              section._id,
                              "en",
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="Title EN"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description / Lead using Quill */}
                  <div className={styles.fieldGrid}>
                    <div className={styles.fieldLabel}>Main Content</div>
                    <div className={styles.inputPair}>
                      <div
                        className={styles.quillWrapper}
                        style={{ direction: "rtl" }}
                      >
                        <QuillEditor
                          theme="snow"
                          value={section.content.ar?.description || ""}
                          onChange={(val) =>
                            updateField(section._id, "ar", "description", val)
                          }
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </div>
                      <div className={styles.quillWrapper}>
                        <QuillEditor
                          theme="snow"
                          value={section.content.en?.description || ""}
                          onChange={(val) =>
                            updateField(section._id, "en", "description", val)
                          }
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Image Upload */}
                  <div className={styles.fieldGrid}>
                    <div className={styles.fieldLabel}>Featured Media</div>
                    <div className={styles.uploadPair}>
                      <div className={styles.uploadBox}>
                        <div className={styles.imagePreview}>
                          {section.content.en?.imageId ? (
                            <img
                              src={
                                normalizeImageUrl(section.content.en.imageId) ||
                                ""
                              }
                              alt="Preview"
                            />
                          ) : (
                            <div className={styles.noImage}>No Image</div>
                          )}
                        </div>
                        <input
                          type="file"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleImageUpload(
                              section._id,
                              "en",
                              e.target.files[0],
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items List (Dynamic) */}
                  <div className={styles.faqManager}>
                    <div className={styles.faqHeader}>
                      <h4 className={styles.subTitle}>Manage List Items</h4>
                      <button
                        className={styles.addButton}
                        onClick={() => addItem(section._id)}
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className={styles.faqList}>
                      {section.content.items?.map((item, idx) => (
                        <div key={idx} className={styles.faqItem}>
                          <button
                            className={styles.removeButton}
                            onClick={() => removeItem(section._id, idx)}
                          >
                            ×
                          </button>
                          <div className={styles.fieldGrid}>
                            <div className={styles.fieldLabel}>
                              Item Details
                            </div>
                            <div className={styles.inputPair}>
                              <div>
                                <input
                                  className={styles.input}
                                  value={item.ar.title}
                                  onChange={(e) =>
                                    updateItemField(
                                      section._id,
                                      idx,
                                      "ar",
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Title AR"
                                  dir="rtl"
                                />
                                <input
                                  className={styles.input}
                                  value={item.en.title}
                                  onChange={(e) =>
                                    updateItemField(
                                      section._id,
                                      idx,
                                      "en",
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Title EN"
                                />
                              </div>
                              <div>
                                <textarea
                                  className={styles.textarea}
                                  value={item.ar.body}
                                  onChange={(e) =>
                                    updateItemField(
                                      section._id,
                                      idx,
                                      "ar",
                                      "body",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Body AR"
                                  dir="rtl"
                                  rows={2}
                                />
                                <textarea
                                  className={styles.textarea}
                                  value={item.en.body}
                                  onChange={(e) =>
                                    updateItemField(
                                      section._id,
                                      idx,
                                      "en",
                                      "body",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Body EN"
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.fieldGrid}>
                            <div className={styles.fieldLabel}>
                              Meta (Icon/Year/Url)
                            </div>
                            <div className={styles.inputPair}>
                              <input
                                className={styles.input}
                                value={item.icon || ""}
                                onChange={(e) =>
                                  updateItemMeta(
                                    section._id,
                                    idx,
                                    "icon",
                                    e.target.value,
                                  )
                                }
                                placeholder="Icon (e.min mission/vision)"
                              />
                              <input
                                className={styles.input}
                                value={item.year || ""}
                                onChange={(e) =>
                                  updateItemMeta(
                                    section._id,
                                    idx,
                                    "year",
                                    e.target.value,
                                  )
                                }
                                placeholder="Year/Value"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.saveAction}>
                    <button
                      className={styles.saveButton}
                      disabled={savingId === section._id}
                      onClick={() => handleSave(section._id)}
                    >
                      {savingId === section._id ? "Saving..." : "Save Changes"}
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
