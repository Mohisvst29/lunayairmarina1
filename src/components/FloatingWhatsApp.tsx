"use client";

import Link from "next/link";
import { getWhatsAppHref } from "@/lib/contactInfo";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <Link
      href={getWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingButton}
      aria-label="Contact us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.59 2 2.13 6.3 2.13 11.62c0 2.13.78 4.08 2.08 5.64L3 22l4.93-1.6c1.27.41 2.64.63 4.1.63 5.45 0 9.91-4.3 9.91-9.62C21.94 6.3 17.49 2 12.04 2Zm5.64 12.92c-.24.67-1.38 1.27-1.9 1.34-.49.07-1.11.1-1.79-.11-.41-.13-.94-.3-1.62-.58-2.85-1.19-4.7-3.97-4.84-4.15-.14-.19-1.16-1.55-1.16-2.95 0-1.41.74-2.1 1-2.39.24-.27.64-.4 1.03-.4.12 0 .23 0 .33.01.29.02.43.03.62.48.24.58.82 2.01.89 2.16.07.15.12.33.04.52-.07.19-.11.31-.21.48-.1.17-.22.38-.32.51-.11.13-.23.27-.1.51.12.24.5.81 1.07 1.32.74.66 1.36.86 1.6.97.24.11.38.09.52-.05.14-.15.6-.69.76-.93.16-.24.32-.2.55-.12.22.07 1.4.67 1.64.79.24.12.4.18.46.28.05.1.05.64-.19 1.31Z" />
      </svg>
    </Link>
  );
}

