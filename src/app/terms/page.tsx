import TermsPageClient from "./TermsPageClient";
import { defaultTermsContent } from "@/data/termsContent";

export const metadata = {
  title: `Terms & Conditions — ${defaultTermsContent.siteName}`,
  description:
    "Review Lunier Marina’s Terms & Conditions covering eligibility, billing, data usage, and dispute resolution for our premium maritime services.",
  alternates: {
    canonical: "/terms",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: defaultTermsContent.siteName,
  email: defaultTermsContent.contact.email,
  telephone: defaultTermsContent.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: defaultTermsContent.contact.address,
    addressCountry: "AE",
  },
  url: "https://luniermarina.com/terms",
};

export default function TermsPage() {
  return (
    <>
      <TermsPageClient content={defaultTermsContent} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}







































