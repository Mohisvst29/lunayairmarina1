// src/components/AboutHeroStats.tsx
import React from "react";

export default function AboutHeroStats({ stats, language }: any) {
  const isAr = language === "ar";

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "2.5rem",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {stats?.map((stat: any, index: number) => (
        <div
          key={index}
          style={{
            flex: "1 1 200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "1.25rem 1.75rem",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            direction: isAr ? "rtl" : "ltr",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "2.75rem",
              fontWeight: "700",
              color: "#ffffff",
              lineHeight: "1",
              direction: "ltr",
            }}
          >
            {stat.value}
          </span>

          <span
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.4",
              textAlign: "left",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
