import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./ConicGradientButton.module.css";

interface ConicGradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
}

export default function ConicGradientButton({
  text = "know more",
  icon = "➝",
  ...props
}: ConicGradientButtonProps) {
  return (
    <button type="button" className={styles.button} {...props}>
      <span className={styles.conicBorder} aria-hidden="true" />
      <span className={styles.overlay}>
        <span>{text}</span>
        <span className={styles.icon}>{icon}</span>
      </span>
    </button>
  );
}









