import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lunayairmarina.com"),
  title: {
    default: "Lunier Marina | Yacht and Boat Management",
    template: "%s | Lunier Marina",
  },
  description:
    "Yacht and Boat Management services across Saudi Arabia, Kuwait, and Bahrain.",
  alternates: {
    canonical: "https://www.lunayairmarina.com",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lily+Script+One&family=Playfair+Display:wght@400;600&family=Poppins:wght@300;400;500;600&display=swap"
        />
        <Script
          id="lunier-marina-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lunier Marina",
              url: "https://www.lunayairmarina.com/",
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
