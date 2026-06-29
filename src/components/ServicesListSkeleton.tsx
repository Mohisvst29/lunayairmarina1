"use client";

import styles from './ServicesListSkeleton.module.css';

export default function ServicesListSkeleton({ compact = false }: { compact?: boolean }) {
    return (
        <section className={`${styles.skeletonRoot} ${compact ? styles.compactSection : ''}`}>
            <div className={styles.container}>
                {/* Header Skeleton */}
                {!compact && (
                    <div className={styles.headerSkeleton}>
                        <div className={styles.shimmer} style={{ width: '120px', height: '32px', borderRadius: '100px' }} />
                        <div className={styles.shimmer} style={{ width: '60%', height: '48px', marginBottom: '1rem' }} />
                        <div className={styles.shimmer} style={{ width: '40%', height: '24px' }} />
                    </div>
                )}

                <div className={styles.servicesMainLayout}>
                    <div className={styles.servicesContentArea}>
                        {/* Render 2 groups to simulate content */}
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i}>
                                {/* Main Service Card Skeleton */}
                                <div className={styles.mainCardSkeleton}>
                                    <div className={styles.mainImageSim} />
                                    <div className={styles.mainContentSim}>
                                        <div className={styles.textLine} style={{ width: '70%', height: '32px', marginBottom: '1rem' }} />
                                        <div className={styles.textLine} style={{ width: '90%', marginBottom: '0.5rem' }} />
                                        <div className={styles.textLine} style={{ width: '85%', marginBottom: '0.5rem' }} />
                                        <div className={styles.textLine} style={{ width: '60%' }} />
                                    </div>
                                </div>

                                {/* Sub Services Grid Skeleton */}
                                <div className={styles.subServicesGrid}>
                                    {Array.from({ length: 2 }).map((_, j) => (
                                        <div key={j} className={styles.subCardSkeleton}>
                                            <div className={styles.subImageSim} />
                                            <div className={styles.subContentSim}>
                                                <div className={styles.textLine} style={{ width: '80%', height: '20px', marginBottom: '0.5rem' }} />
                                                <div className={styles.textLine} style={{ width: '100%' }} />
                                                <div className={styles.textLine} style={{ width: '90%' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
