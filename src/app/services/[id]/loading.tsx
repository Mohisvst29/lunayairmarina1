import styles from "./loading.module.css";

export default function LoadingServiceDetail() {
  return (
    <div className={styles.page} aria-busy="true">
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.heroContent}>
          <div className={`${styles.shimmer} ${styles.badgeSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.titleSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.descSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.metaSkeleton}`} />
        </div>
        <div className={styles.heroMedia}>
          <div className={`${styles.shimmer} ${styles.imageSkeleton}`} />
        </div>
      </section>
    </div>
  );
}
