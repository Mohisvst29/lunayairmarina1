"use client";

import styles from './BlogSkeleton.module.css';

export function BlogCardSkeleton() {
    return (
        <article className={styles.cardSkeleton}>
            <div className={styles.imageSkeleton} />
            <div className={styles.contentSkeleton}>
                <div className={styles.metaSkeleton}>
                    <div className={styles.skeletonLine} style={{ width: '100px', height: '14px' }} />
                    <div className={styles.skeletonLine} style={{ width: '80px', height: '14px' }} />
                </div>
                <div className={styles.skeletonLine} style={{ width: '100%', height: '24px', marginBottom: '12px' }} />
                <div className={styles.skeletonLine} style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
                <div className={styles.skeletonLine} style={{ width: '85%', height: '16px', marginBottom: '20px' }} />
                <div className={styles.footerSkeleton}>
                    <div className={styles.skeletonLine} style={{ width: '100px', height: '14px' }} />
                </div>
            </div>
        </article>
    );
}

export function BlogListSkeleton() {
    return (
        <div className={styles.gridSkeleton}>
            {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
            ))}
        </div>
    );
}

export function BlogDetailSkeleton() {
    return (
        <main className={styles.detailSkeleton}>
            <div className={styles.progressSkeleton} />
            
            <header className={styles.headerSkeleton}>
                <div className={styles.headerContentSkeleton}>
                    <div className={styles.skeletonLine} style={{ width: '120px', height: '36px', borderRadius: '100px', marginBottom: '1.5rem' }} />
                    <div className={styles.metaRowSkeleton}>
                        <div className={styles.skeletonLine} style={{ width: '100px', height: '28px', borderRadius: '100px' }} />
                        <div className={styles.skeletonLine} style={{ width: '80px', height: '28px', borderRadius: '100px' }} />
                    </div>
                    <div className={styles.skeletonLine} style={{ width: '90%', height: '56px', marginBottom: '1.5rem' }} />
                    <div className={styles.authorSkeleton}>
                        <div className={styles.avatarSkeleton} />
                        <div>
                            <div className={styles.skeletonLine} style={{ width: '150px', height: '20px', marginBottom: '8px' }} />
                            <div className={styles.skeletonLine} style={{ width: '120px', height: '16px' }} />
                        </div>
                    </div>
                </div>
                <div className={styles.imageSkeletonLarge} />
            </header>

            <article className={styles.contentSkeletonDetail}>
                <div className={styles.contentWrapperSkeleton}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={styles.paragraphSkeleton}>
                            <div className={styles.skeletonLine} style={{ width: '100%', height: '20px', marginBottom: '12px' }} />
                            <div className={styles.skeletonLine} style={{ width: '100%', height: '20px', marginBottom: '12px' }} />
                            <div className={styles.skeletonLine} style={{ width: '95%', height: '20px', marginBottom: '12px' }} />
                        </div>
                    ))}
                </div>
            </article>
        </main>
    );
}








































