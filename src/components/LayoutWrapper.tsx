"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import GlobalMicroInteractions from "@/components/GlobalMicroInteractions";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        // Admin pages get a clean layout without Navbar/Footer
        return <>{children}</>;
    }

    // Public pages get the full layout
    return (
        <>
            <GlobalMicroInteractions />
            <Navbar />
            {children}
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
