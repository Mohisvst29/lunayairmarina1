import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./RotatingBorderButton.module.css";

interface RotatingBorderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
}

export default function RotatingBorderButton({
  text = "know more",
  icon = "➝",
  type = "button",
  ...props
}: RotatingBorderButtonProps) {
  return (
    <button type={type} className={styles.rotatingBorderButton} {...props}>
      <span className={styles.rotatingBorder} aria-hidden="true" />
      <span className={styles.buttonFace}>
        <span className={styles.label}>{text}</span>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
      </span>
    </button>
  );
}

