import { siteConfig } from "@/lib/site-config";

export default function AttorneySchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: siteConfig.lawyerName,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
    areaServed: siteConfig.city,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
