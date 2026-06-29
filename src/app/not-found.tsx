import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.badge}>
          <span className={styles.badgeIcon} aria-hidden="true" />
          404 - page not found
        </p>

        <h1 id="not-found-title" className={styles.title}>
          Looks like you&apos;ve hit a dead end.
        </h1>

        <p className={styles.copy}>
          The page you&apos;re looking for doesn&apos;t exist, or maybe it just
          took an unexpected detour.
        </p>

        <div className={styles.buttonRow}>
          <Link href="/" className={`${styles.button} ${styles.primary}`}>
            Go Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}

