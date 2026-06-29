"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useBlogAnimations } from "@/hooks/useBlogAnimations";
import { BlogListSkeleton } from "@/components/blog/BlogSkeleton";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  category?: string;
  slug: string;
  slugAr?: string;
  author?: string;
  createdAt: string;
  tags?: string[];
  published?: boolean;
}

export default function BlogPage() {
  const { language, t, dir } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useBlogAnimations({ heroRef, postsRef, searchRef });

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs?lang=${language}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            // Filter to only show published posts
            const publishedPosts = data.filter(
              (post: BlogPost & { published?: boolean }) =>
                post.published !== false,
            );
            setPosts(publishedPosts);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, [language]);

  // Fetch banner image
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/api/admin/images?section=blog-banner", {
          cache: "no-store",
        });
        if (res.ok) {
          const images = await res.json();
          if (Array.isArray(images) && images.length > 0) {
            setBannerImage(images[0]._id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog banner", error);
      }
    };
    fetchBanner();
  }, []);

  const categories = useMemo(() => {
    const cats = posts
      .map((post) => post.category)
      .filter((cat): cat is string => Boolean(cat));
    return Array.from(new Set(cats));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className={styles.blogPage} style={{ direction: dir }}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.skeletonBadge} />
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonDescription} />
          </div>
        </section>
        <section className={styles.filtersSection}>
          <div className={styles.filtersContainer}>
            <div className={styles.skeletonSearch} />
            <div className={styles.skeletonCategories} />
          </div>
        </section>
        <section className={styles.postsSection}>
          <div className={styles.container}>
            <BlogListSkeleton />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.blogPage} style={{ direction: dir }}>
      <section ref={heroRef} className={styles.hero}>
        {bannerImage && (
          <>
            <Image
              src={`/api/images/${bannerImage}`}
              alt="Blog Banner"
              fill
              className={styles.heroBgImage}
              priority
            />
            <div className={styles.heroOverlay} />
          </>
        )}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} data-animate="hero">
            {t("blog.title")}
          </h1>
          <p className={styles.heroDescription} data-animate="hero">
            {t("blog.description")}
          </p>
        </div>
      </section>

      <section ref={searchRef} className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.searchWrapper} data-animate="search">
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM15 15l-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {categories.length > 0 && (
            <div className={styles.categoriesWrapper} data-animate="categories">
              <button
                className={`${styles.categoryTag} ${!selectedCategory ? styles.categoryTagActive : ""}`}
                onClick={() => setSelectedCategory(null)}
              >
                {t("blog.allCategories")}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryTag} ${selectedCategory === category ? styles.categoryTagActive : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section ref={postsRef} className={styles.postsSection}>
        <div className={styles.container}>
          {filteredPosts.length === 0 ? (
            <div className={styles.noResults}>
              <p>{t("blog.noResults")}</p>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {filteredPosts.map((post, index) => (
                <article
                  key={post._id}
                  className={styles.postCard}
                  data-animate="post-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={`/blog/${language === "ar" ? post.slugAr || post.slug || post._id : post.slug || post._id}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={
                          post.featuredImage?.startsWith("http")
                            ? post.featuredImage
                            : post.featuredImage?.startsWith("/")
                              ? post.featuredImage
                              : post.featuredImage
                                ? `/api/images/${post.featuredImage}`
                                : "/api/images/slug/ocean-sunrise"
                        }
                        alt={post.title}
                        fill
                        className={styles.cardImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {post.category && (
                        <span className={styles.cardCategory}>
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardAuthor}>
                          {post.author || t("blog.defaultAuthor")}
                        </span>
                        <span className={styles.cardDate}>
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.readMore}>
                          {t("blog.readMore")}
                        </span>
                        <svg
                          className={styles.readMoreIcon}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6 12l4-4-4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
